import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Valid Stack Sequences
 * 
 * Check if a given push/pop sequence is valid
 */
export const validStackSequences: IAlgorithm<ArrayInput> = {
  id: 'valid-stack-sequences',
  name: 'Valid Stack Sequences',
  category: 'stacks',
  difficulty: 'intermediate',

  pseudocodeLines: [
    'function validateSequence(pushed, popped):',
    '  stack = empty stack',
    '  popIndex = 0',
    '  for each val in pushed:',
    '    push(stack, val)',
    '    while stack not empty and top == popped[popIndex]:',
    '      pop(stack)',
    '      popIndex++',
    '  return stack is empty',
  ],

  timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  spaceComplexity: 'O(n)',

  parameters: [
    {
      type: 'text',
      id: 'popSequence',
      label: 'Pop Sequence (comma-separated)',
      default: '4,5,3,2,1',
      placeholder: '4,5,3,2,1',
      maxLength: 50,
    } as AlgorithmParameter,
  ],

  validate(input: ArrayInput) {
    if (!input.values || input.values.length === 0) {
      return { ok: false, error: 'Push sequence cannot be empty' };
    }
    if (input.values.length > 10) {
      return { ok: false, error: 'Sequence length must be 10 or less' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, number | string>): Generator<AlgoEvent, void, unknown> {
    const pushed = [...input.values];
    const popStr = (params?.popSequence as string) || '4,5,3,2,1';
    const popped = popStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));

    yield createEvent.message(`Validating push sequence: [${pushed.join(', ')}]`, 'info', 0);
    yield createEvent.message(`Pop sequence: [${popped.join(', ')}]`, 'info');

    if (pushed.length !== popped.length) {
      yield createEvent.message(`Invalid: sequences have different lengths`, 'info');
      yield createEvent.result('boolean', false, 'Invalid - different lengths');
      return;
    }

    const stack: number[] = [];
    let popIndex = 0;

    yield createEvent.highlight([0, 1, 2]);
    yield createEvent.auxiliary({
      type: 'stack',
      stackData: { elements: [], topIndex: -1 },
    });

    for (let i = 0; i < pushed.length; i++) {
      const val = pushed[i];

      yield createEvent.highlight([3, 4]);
      yield createEvent.mark([i], 'current');
      yield createEvent.message(`Pushing ${val}`, 'explanation');

      // Show push animation first
      yield createEvent.auxiliary({
        type: 'stack',
        stackData: {
          elements: [...stack],
          topIndex: stack.length - 1,
          animating: 'push',
          animatingValue: val,
        },
      });

      stack.push(val);
      yield createEvent.push(val, 'stack');

      // Pop matching elements
      while (stack.length > 0 && popIndex < popped.length && stack[stack.length - 1] === popped[popIndex]) {
        yield createEvent.highlight([5, 6, 7]);
        const top = stack[stack.length - 1];  // Get element without removing
        yield createEvent.message(`Top ${top} matches popped[${popIndex}], popping`, 'explanation');

        // Show pop animation BEFORE removing element
        yield createEvent.auxiliary({
          type: 'stack',
          stackData: {
            elements: [...stack],  // Element still in array
            topIndex: stack.length - 1,
            animating: 'pop',
            animatingValue: top,
          },
        });

        // Now remove element
        stack.pop();
        yield createEvent.pop(top, 'stack');
        popIndex++;
      }

      yield createEvent.unmark([i]);
    }

    yield createEvent.pointer([], []);
    yield createEvent.highlight([8]);

    const isValid = stack.length === 0;

    if (isValid) {
      yield createEvent.message(`VALID: Stack is empty - sequence is valid! ✓`, 'info');
      yield createEvent.result('boolean', true, 'VALID sequence');
    } else {
      yield createEvent.message(`INVALID: Stack not empty - remaining: [${stack.join(', ')}]`, 'info');
      yield createEvent.result('boolean', false, 'INVALID sequence');
    }

    yield createEvent.auxiliary({
      type: 'stack',
      stackData: { elements: [...stack], topIndex: stack.length - 1 },
    });
  },
};
