import { IAlgorithm, AlgorithmParameter } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * First Non-Repeating Character in Stream
 * 
 * Find first unique character at each step of a stream.
 * Uses queue of candidates and frequency map.
 * 
 * Time Complexity: O(n) amortized
 * Space Complexity: O(n)
 */

export const firstNonRepeatingCharacter: IAlgorithm<ArrayInput> = {
  id: 'first-non-repeating-character',
  name: 'First Non-Repeating Character',
  category: 'queues',
  difficulty: 'advanced',

  pseudocodeLines: [
    'function firstNonRepeating(stream):',
    '  queue = []  // candidates',
    '  freq = {}   // frequency map',
    '  for each char in stream:',
    '    freq[char]++',
    '    queue.enqueue(char)',
    '    // Remove repeating chars from front',
    '    while queue not empty and freq[queue.front] > 1:',
    '      queue.dequeue()',
    '    if queue not empty:',
    '      output queue.front',
    '    else:',
    '      output "None"',
  ],

  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },

  spaceComplexity: 'O(n)',

  parameters: [],

  validate(input: ArrayInput) {
    if (!input.values || !Array.isArray(input.values)) {
      return { ok: false, error: 'Input must be an array of characters (as ASCII codes)' };
    }
    return { ok: true };
  },

  *run(input: ArrayInput): Generator<AlgoEvent, void, unknown> {
    // Convert to characters (assuming ASCII codes)
    const stream = input.values.map(v => String.fromCharCode(v));
    const queue: string[] = [];
    const freq: Map<string, number> = new Map();
    const results: string[] = [];

    yield createEvent.message(`Finding first non-repeating character in stream`, 'info', 0);
    yield createEvent.message(`Stream: "${stream.join('')}"`, 'explanation');
    yield createEvent.highlight([0, 1, 2]);

    // Helper to create streamChars with current highlight
    const getStreamChars = (currentIdx: number) => stream.map((char, idx) => ({
      char,
      index: idx,
      highlight: idx === currentIdx ? 'current' as const : idx < currentIdx ? 'found' as const : undefined,
    }));

    // Show initial state with both string and queue
    yield createEvent.auxiliary({
      type: 'queue',
      queueData: {
        elements: [],
        frontIndex: -1,
        rearIndex: -1,
        streamChars: stream.map((char, idx) => ({ char, index: idx })),
        message: 'Starting stream processing...',
      },
    });

    for (let i = 0; i < stream.length; i++) {
      const char = stream[i];
      yield createEvent.message(`Processing: '${char}'`, 'step');
      yield createEvent.highlight([3, 4, 5]);

      // Update frequency
      freq.set(char, (freq.get(char) || 0) + 1);
      queue.push(char);

      yield createEvent.message(`Added '${char}' to queue, freq[${char}] = ${freq.get(char)}`, 'explanation');

      // Show current state with highlighted character
      yield createEvent.auxiliary({
        type: 'queue',
        queueData: {
          elements: [...queue],
          frontIndex: queue.length > 0 ? 0 : -1,
          rearIndex: queue.length > 0 ? queue.length - 1 : -1,
          streamChars: getStreamChars(i),
          message: `Added '${char}' to queue`,
        },
      });

      // Remove repeating characters from front
      yield createEvent.highlight([6, 7, 8]);
      while (queue.length > 0 && (freq.get(queue[0]) || 0) > 1) {
        const removed = queue.shift();
        yield createEvent.message(`Removing '${removed}' (frequency > 1)`, 'explanation');

        yield createEvent.auxiliary({
          type: 'queue',
          queueData: {
            elements: [...queue],
            frontIndex: queue.length > 0 ? 0 : -1,
            rearIndex: queue.length > 0 ? queue.length - 1 : -1,
            streamChars: getStreamChars(i),
            message: `Removed '${removed}' (repeating)`,
          },
        });
      }

      yield createEvent.highlight([9, 10, 11, 12]);
      if (queue.length > 0) {
        results.push(queue[0]);
        yield createEvent.message(`First non-repeating at step ${i + 1}: '${queue[0]}'`, 'info');

        yield createEvent.auxiliary({
          type: 'queue',
          queueData: {
            elements: [...queue],
            frontIndex: 0,
            rearIndex: queue.length - 1,
            streamChars: getStreamChars(i),
            message: `First non-repeating: '${queue[0]}'`,
          },
        });
      } else {
        results.push('#');
        yield createEvent.message(`No non-repeating character at step ${i + 1}`, 'info');

        yield createEvent.auxiliary({
          type: 'queue',
          queueData: {
            elements: [],
            frontIndex: -1,
            rearIndex: -1,
            streamChars: getStreamChars(i),
            message: 'No unique character',
          },
        });
      }
    }

    yield createEvent.message(`Results: [${results.join(', ')}]`, 'info');
    yield createEvent.result('string', results.join(''), 'First non-repeating at each step');
  },
};
