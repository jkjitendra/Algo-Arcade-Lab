
import { BacktrackingCell, createEvent, AlgoEvent } from '../../events/events';

export function* updateBacktrackingState(
  grid: BacktrackingCell[][],
  message?: string,
  currentCell?: { row: number; col: number },
  conflicts?: { row: number; col: number }[]
): Generator<AlgoEvent, void, unknown> {
  const rows = grid.length;
  const cols = grid[0].length;

  // Deep copy grid to avoid mutation issues
  const gridCopy = grid.map(row => row.map(cell => ({ ...cell })));

  yield createEvent.auxiliary({
    type: 'backtracking',
    backtrackingData: {
      grid: gridCopy,
      rows,
      cols,
      message,
      currentCell,
      conflicts
    }
  });
}
