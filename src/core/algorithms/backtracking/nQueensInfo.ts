import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, BacktrackingCell } from '../../events/events';
import { updateBacktrackingState } from './utils';

export const nQueensInfo: IAlgorithm<ArrayInput> = {
  id: 'n-queens',
  name: 'N-Queens',
  category: 'backtracking',
  difficulty: 'advanced',
  pseudocodeLines: [
    'function solveNQueens(board, row):',
    '  if row == N:',
    '    return true',
    '  for col = 0 to N-1:',
    '    if isSafe(board, row, col):',
    '      board[row][col] = "Q"',
    '      if solveNQueens(board, row + 1):',
    '        return true',
    '      board[row][col] = "."',
    '  return false',
  ],
  timeComplexity: { best: 'O(N)', average: 'O(N!)', worst: 'O(N!)' },
  spaceComplexity: 'O(N^2)',
  parameters: [
    { id: 'n', label: 'Board Size', type: 'number', min: 4, max: 10, default: 4 }
  ],

  validate: (input) => ({ ok: true }),

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const N = Number(params?.['n'] ?? 4);

    // Initialize Grid
    const grid: BacktrackingCell[][] = [];
    for (let r = 0; r < N; r++) {
      const row: BacktrackingCell[] = [];
      for (let c = 0; c < N; c++) {
        row.push({ row: r, col: c, value: '', status: 'empty' });
      }
      grid.push(row);
    }

    yield createEvent.message(`Solving N-Queens for N=${N}`, 'info');
    yield* updateBacktrackingState(grid, 'Initial Board');

    function isSafe(r: number, c: number): boolean {
      // Check column
      for (let i = 0; i < r; i++) {
        if (grid[i][c].value === 'Q') return false;
      }
      // Check left diagonal
      for (let i = r, j = c; i >= 0 && j >= 0; i--, j--) {
        if (grid[i][j].value === 'Q') return false;
      }
      // Check right diagonal
      for (let i = r, j = c; i >= 0 && j < N; i--, j++) {
        if (grid[i][j].value === 'Q') return false;
      }
      return true;
    }

    function* solve(row: number): Generator<AlgoEvent, boolean, unknown> {
      if (row >= N) {
        yield createEvent.highlight([1, 2]);
        yield createEvent.message('All queens placed successfully!', 'info');
        // Mark all as solution
        for (let r = 0; r < N; r++) {
          for (let c = 0; c < N; c++) {
            if (grid[r][c].value === 'Q') grid[r][c].status = 'solution';
          }
        }
        yield* updateBacktrackingState(grid, 'Solution Found');
        return true;
      }

      yield createEvent.highlight([3]);

      for (let col = 0; col < N; col++) {
        yield createEvent.highlight([4]);

        // Mark current cell being considered
        grid[row][col].status = 'tentative';
        grid[row][col].value = '?';

        yield* updateBacktrackingState(grid, `Checking position [${row}, ${col}]`, { row, col });

        if (isSafe(row, col)) {
          yield createEvent.highlight([5, 6]);

          grid[row][col].value = 'Q';
          grid[row][col].status = 'placed';
          yield* updateBacktrackingState(grid, `Placed Queen at [${row}, ${col}]`, { row, col });

          if (yield* solve(row + 1)) {
            yield createEvent.highlight([7, 8]);
            return true;
          }

          // Backtrack
          yield createEvent.highlight([9]);
          grid[row][col].value = '';
          grid[row][col].status = 'visited'; // Was placed here but backtracked
          yield* updateBacktrackingState(grid, `Backtracking from [${row}, ${col}]`, { row, col });

          // Small delay/step to show it clearing
          yield createEvent.message(`Can't place queen at next row, removing Queen at [${row}, ${col}]`, 'explanation');
          grid[row][col].status = 'empty';

        } else {
          // Conflict
          grid[row][col].status = 'conflict';
          grid[row][col].value = 'X';
          yield* updateBacktrackingState(grid, `Conflict at [${row}, ${col}]`, { row, col });

          // Clear conflict quickly
          grid[row][col].status = 'empty'; // or visited
          grid[row][col].value = '';
        }
      }

      yield createEvent.highlight([10]);
      return false;
    }

    const success = yield* solve(0);
    if (!success) {
      yield createEvent.message('No solution found for this board size', 'info');
    }
  }
};

export const nQueensAbout = {
  id: 'n-queens',
  name: 'N-Queens',
  category: 'backtracking',
  difficulty: 'advanced',
  description: 'Places N queens on an N×N chessboard so that no two queens attack each other (same row, column, or diagonal).',
  howItWorks: 'Tries placing a queen in row R, column C. If valid, recursively tries to place queens in row R+1. If stuck, backtracks (removes queen) and tries next column.',
  keyInsight: 'The number of solutions grows exponentially. Pruning the search tree by checking validity early drastically reduces the search space compared to brute force.',
  bestFor: ['Constraint satisfaction problems', 'Testing backtracking performance', 'Puzzle solving'],
  avoidWhen: ['N is large (N=27 has been solved but takes massive cluster resources)', 'Only one solution is needed (heuristic repair methods are faster)'],
  funFact: 'The 8-Queens problem was originally proposed in 1848 chess player Max Bezzel. Gauss worked on it but didn\'t fully solve it.',
  optimizationTips: ['Use bitmasks to track occupied columns and diagonals for O(1) validity check', 'Exploit symmetry to reduce search space by half'],
  tags: ['Backtracking', 'Puzzle', 'Chess', 'Advanced'],
};
