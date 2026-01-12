import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, BacktrackingCell } from '../../events/events';
import { updateBacktrackingState } from './utils';

export const ratMazeInfo: IAlgorithm<ArrayInput> = {
  id: 'rat-in-maze',
  name: 'Rat in a Maze',
  category: 'backtracking',
  difficulty: 'intermediate',
  pseudocodeLines: [
    'function solveMaze(maze, x, y, sol):',
    '  if x, y is goal: return true',
    '  if isValid(x, y):',
    '    sol[x][y] = 1',
    '    if solveMaze(maze, x+1, y): return true',
    '    if solveMaze(maze, x, y+1): return true',
    '    sol[x][y] = 0 // backtrack',
    '    return false',
  ],
  timeComplexity: { best: 'O(N)', average: 'O(2^(N^2))', worst: 'O(2^(N^2))' },
  spaceComplexity: 'O(N^2)',
  parameters: [],

  validate: (input) => ({ ok: true }),

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {

    // Default Maze: 1=Open, 0=Blocked (Typical)
    // But for grid visualizer: 1=Wall? 
    // Let's use: 0=Open, 1=Blocked.
    const maze = [
      [0, 1, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [1, 1, 0, 1, 0],
      [0, 0, 0, 0, 0]
    ];
    const N = 5;

    // Initialize Grid
    const grid: BacktrackingCell[][] = [];
    for (let r = 0; r < N; r++) {
      const row: BacktrackingCell[] = [];
      for (let c = 0; c < N; c++) {
        const isWall = maze[r][c] === 1;
        row.push({
          row: r,
          col: c,
          value: isWall ? '🧱' : '',
          status: isWall ? 'blocked' : 'empty'
        });
      }
      grid.push(row);
    }

    // Mark Start and End
    grid[0][0].status = 'start';
    grid[N - 1][N - 1].status = 'end';
    grid[N - 1][N - 1].value = '🏁';
    grid[0][0].value = '🐀';

    yield createEvent.message(`Rat in a Maze (Start: Top-Left, End: Bottom-Right)`, 'info');
    yield* updateBacktrackingState(grid, 'Initial Maze');

    function isValid(x: number, y: number): boolean {
      return x >= 0 && x < N && y >= 0 && y < N && maze[x][y] === 0;
    }

    function* solve(x: number, y: number): Generator<AlgoEvent, boolean, unknown> {
      if (x === N - 1 && y === N - 1) {
        grid[x][y].status = 'solution';
        grid[x][y].value = '🏁';
        yield createEvent.highlight([1]);
        yield* updateBacktrackingState(grid, 'Reached Destination!', { row: x, col: y });
        return true;
      }

      if (isValid(x, y)) {
        // Check if already visited in current path (avoid cycles if using 4 directions)
        // But basic recursion handles Down/Right which has no cycles. 
        // If 4 directions, we need visited array.
        // Let's do 4 directions for fun: D, R, U, L.

        if (grid[x][y].status === 'visited' || grid[x][y].status === 'solution' || grid[x][y].status === 'tentative') {
          return false;
        }

        yield createEvent.highlight([2]);

        const prevValue = grid[x][y].value; // Should be '' or '🐀'
        const prevStatus = grid[x][y].status;

        grid[x][y].status = 'tentative'; // Current path
        if (x !== 0 || y !== 0) grid[x][y].value = '👣'; // Footprints

        yield* updateBacktrackingState(grid, `Exploring [${x}, ${y}]`, { row: x, col: y });

        // Directions: Down, Right, Up, Left
        const dx = [1, 0, -1, 0];
        const dy = [0, 1, 0, -1];

        for (let i = 0; i < 4; i++) {
          const nx = x + dx[i];
          const ny = y + dy[i];

          if (yield* solve(nx, ny)) {
            grid[x][y].status = 'solution';
            yield* updateBacktrackingState(grid, 'Path Found', { row: x, col: y });
            return true;
          }
        }

        // Backtrack
        yield createEvent.highlight([6]);
        grid[x][y].status = 'visited'; // Dead end
        grid[x][y].value = '❌';
        yield* updateBacktrackingState(grid, `Backtracking from [${x}, ${y}]`, { row: x, col: y });

        return false;
      }

      return false;
    }

    const success = yield* solve(0, 0);
    if (!success) {
      yield createEvent.message('No path found', 'info');
    }
  }
};
