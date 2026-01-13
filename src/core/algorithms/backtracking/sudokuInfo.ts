import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, BacktrackingCell } from '../../events/events';
import { updateBacktrackingState } from './utils';

export const sudokuInfo: IAlgorithm<ArrayInput> = {
  id: 'sudoku-solver',
  name: 'Sudoku Solver',
  category: 'backtracking',
  difficulty: 'advanced',
  pseudocodeLines: [
    'function solveSudoku(board):',
    '  row, col = findEmpty(board)',
    '  if no empty cells: return true',
    '  for num = 1 to 9:',
    '    if isValid(board, row, col, num):',
    '      board[row][col] = num',
    '      if solveSudoku(board): return true',
    '      board[row][col] = "."',
    '  return false',
  ],
  timeComplexity: { best: 'O(1)', average: 'O(9^m)', worst: 'O(9^m) where m is empty cells' },
  spaceComplexity: 'O(1)',
  parameters: [],

  validate: (input) => ({ ok: true }),

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {

    // Default puzzle (0 = empty)
    const defaultPuzzle = [
      5, 3, 0, 0, 7, 0, 0, 0, 0,
      6, 0, 0, 1, 9, 5, 0, 0, 0,
      0, 9, 8, 0, 0, 0, 0, 6, 0,
      8, 0, 0, 0, 6, 0, 0, 0, 3,
      4, 0, 0, 8, 0, 3, 0, 0, 1,
      7, 0, 0, 0, 2, 0, 0, 0, 6,
      0, 6, 0, 0, 0, 0, 2, 8, 0,
      0, 0, 0, 4, 1, 9, 0, 0, 5,
      0, 0, 0, 0, 8, 0, 0, 7, 9
    ];

    const puzzleValues = (input.values && input.values.length === 81) ? input.values : defaultPuzzle;

    // Initialize Grid
    const grid: BacktrackingCell[][] = [];
    for (let r = 0; r < 9; r++) {
      const row: BacktrackingCell[] = [];
      for (let c = 0; c < 9; c++) {
        const val = puzzleValues[r * 9 + c];
        row.push({
          row: r,
          col: c,
          value: val === 0 ? '' : val,
          status: val === 0 ? 'empty' : 'blocked'
        });
      }
      grid.push(row);
    }

    yield createEvent.message(`Starting Sudoku Solver`, 'info');
    yield* updateBacktrackingState(grid, 'Initial Board');

    function isValid(r: number, c: number, num: number): boolean {
      // Row & Col
      for (let i = 0; i < 9; i++) {
        if (grid[r][i].value === num && i !== c) return false;
        if (grid[i][c].value === num && i !== r) return false;
      }
      // 3x3 Box
      const boxR = Math.floor(r / 3) * 3;
      const boxC = Math.floor(c / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[boxR + i][boxC + j].value === num && (boxR + i !== r || boxC + j !== c)) return false;
        }
      }
      return true;
    }

    function* solve(): Generator<AlgoEvent, boolean, unknown> {
      // Find empty
      let row = -1;
      let col = -1;
      let isEmpty = false;
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (grid[i][j].value === '') {
            row = i; col = j;
            isEmpty = true;
            break;
          }
        }
        if (isEmpty) break;
      }

      if (!isEmpty) {
        yield createEvent.highlight([2]);
        yield createEvent.message('Sudoku Solved!', 'info');
        // Mark all filled as solution
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (grid[i][j].status !== 'blocked') grid[i][j].status = 'solution';
          }
        }
        yield* updateBacktrackingState(grid, 'Solved');
        return true;
      }

      yield createEvent.highlight([1]); // Found empty

      for (let num = 1; num <= 9; num++) {
        yield createEvent.highlight([3]);

        grid[row][col].value = num;
        grid[row][col].status = 'tentative';
        yield* updateBacktrackingState(grid, `Trying ${num} at [${row}, ${col}]`, { row, col });

        if (isValid(row, col, num)) {
          yield createEvent.highlight([4, 5, 6]);
          grid[row][col].status = 'placed';

          if (yield* solve()) return true;

          // Backtrack
          yield createEvent.highlight([7]);
          grid[row][col].status = 'visited';
          yield* updateBacktrackingState(grid, `Backtracking from [${row}, ${col}]`, { row, col });

          grid[row][col].value = '';
          grid[row][col].status = 'empty';
        } else {
          // Conflict
          grid[row][col].status = 'conflict';
          yield* updateBacktrackingState(grid, `Conflict for ${num} at [${row}, ${col}]`, { row, col });
          grid[row][col].value = '';
          grid[row][col].status = 'empty';
        }
      }

      yield createEvent.highlight([8]);
      return false;
    }

    const success = yield* solve();
    if (!success) {
      yield createEvent.message('No solution exists', 'info');
    }
  }
};

export const sudokuAbout = {
  id: 'sudoku-solver',
  name: 'Sudoku Solver',
  category: 'backtracking',
  difficulty: 'advanced',
  description: 'Fills a 9×9 grid so that each row, column, and 3×3 subgrid contains all digits from 1 to 9.',
  howItWorks: 'Finds an empty cell, tries digits 1-9. If a digit is valid, place it and recurse. If recursion returns success, done. If not, backtrack (reset cell to empty) and try next digit.',
  keyInsight: 'Sudoku is a classic exact cover problem. While backtracking is standard, Algorithm X with Dancing Links (DLX) is the most efficient solver.',
  bestFor: ['Solving logic puzzles', 'Constraint satisfaction demonstrations', 'Generating valid puzzles'],
  avoidWhen: ['Puzzle has multiple solutions (and you need unique)', 'Puzzle is invalid (detecting this early is hard without specialized logic)'],
  funFact: 'The minimum number of clues needed for a unique solution 9x9 Sudoku is 17. No valid 16-clue puzzle exists.',
  optimizationTips: ['Use "Most Constrained Variable" heuristic: pick empty cell with fewest valid options first', 'Propagate constraints (forward checking)'],
  tags: ['Backtracking', 'Puzzle', 'Grid', 'Advanced'],
};
