import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent, HanoiDisk, HanoiData } from '../../events/events';

function* updateHanoiState(pegs: HanoiDisk[][], moveCount: number, message: string): Generator<AlgoEvent, void, unknown> {
  const deepCopyPegs = pegs.map(peg => [...peg]);
  yield createEvent.auxiliary({
    type: 'hanoi',
    hanoiData: {
      pegs: deepCopyPegs,
      moveCount,
      message
    }
  });
}

export const hanoiInfo: IAlgorithm<ArrayInput> = {
  id: 'hanoi-recursion',
  name: 'Tower of Hanoi',
  category: 'recursion',
  difficulty: 'intermediate',
  pseudocodeLines: [
    'function hanoi(n, source, target, aux):',
    '  if n == 1:',
    '    move disk from source to target',
    '    return',
    '  hanoi(n - 1, source, aux, target)',
    '  move disk from source to target',
    '  hanoi(n - 1, aux, target, source)',
  ],
  timeComplexity: { best: 'O(2^n)', average: 'O(2^n)', worst: 'O(2^n)' },
  spaceComplexity: 'O(n)',
  parameters: [
    { id: 'n', label: 'Disks', type: 'number', min: 1, max: 6, default: 3 }
  ],

  validate: (input) => ({ ok: true }),

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const n = Number(params?.['n'] ?? 3);

    // Initialize Pegs
    const pegs: HanoiDisk[][] = [[], [], []];
    const colors = ['#EF4444', '#F97316', '#F59E0B', '#10B981', '#3B82F6', '#6366F1'];

    for (let i = n; i >= 1; i--) {
      pegs[0].push({ size: i, color: colors[(i - 1) % colors.length] });
    }

    let moveCount = 0;
    yield* updateHanoiState(pegs, moveCount, `Starting Tower of Hanoi with ${n} disks`);

    // Peg indices: 0=Source, 1=Aux, 2=Dest
    // Wait, typical labeling is Source, Aux, Dest. 
    // Let's use Source=0, Aux=1, Target=2 as initial args, but names mapping:
    // Actually recursive call permutes them.

    const pegNames = ['Source', 'Auxiliary', 'Destination'];

    function* solve(k: number, sourceIdx: number, targetIdx: number, auxIdx: number): Generator<AlgoEvent, void, unknown> {
      if (k === 1) {
        yield createEvent.highlight([1, 2]);
        const disk = pegs[sourceIdx].pop()!;
        pegs[targetIdx].push(disk);
        moveCount++;
        yield* updateHanoiState(pegs, moveCount, `Moved disk ${disk.size} from ${pegNames[sourceIdx]} to ${pegNames[targetIdx]}`);
        return;
      }

      yield createEvent.highlight([4]);
      yield* solve(k - 1, sourceIdx, auxIdx, targetIdx);

      yield createEvent.highlight([5]);
      const disk = pegs[sourceIdx].pop()!;
      pegs[targetIdx].push(disk);
      moveCount++;
      yield* updateHanoiState(pegs, moveCount, `Moved disk ${disk.size} from ${pegNames[sourceIdx]} to ${pegNames[targetIdx]}`);

      yield createEvent.highlight([6]);
      yield* solve(k - 1, auxIdx, targetIdx, sourceIdx);
    }

    yield* solve(n, 0, 2, 1);
    yield createEvent.message(`Tower of Hanoi complete in ${moveCount} moves`, 'info');
  }
};
