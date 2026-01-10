
import { RecursionNode, createEvent, AlgoEvent } from '../../events/events';

export function* updateRecursionState(
  nodes: RecursionNode[],
  rootId?: string,
  currentId?: string,
  message?: string
): Generator<AlgoEvent, void, unknown> {
  yield createEvent.auxiliary({
    type: 'recursion',
    recursionData: {
      nodes: JSON.parse(JSON.stringify(nodes)), // Deep copy to avoid reference issues
      rootId,
      currentId,
      message
    }
  });
}
