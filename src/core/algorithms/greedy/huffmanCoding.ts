import { IAlgorithm } from '../IAlgorithm';
import { ArrayInput } from '../../models';
import { AlgoEvent, createEvent } from '../../events/events';

/**
 * Huffman Coding
 * 
 * Build optimal prefix-free binary codes based on character frequencies
 * Greedy choice: Always merge two nodes with lowest frequencies
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */

interface HuffmanNode {
  char: string | null;
  freq: number;
  left: HuffmanNode | null;
  right: HuffmanNode | null;
}

export const huffmanCoding: IAlgorithm<ArrayInput> = {
  id: 'huffman-coding',
  name: 'Huffman Coding',
  category: 'greedy',
  difficulty: 'advanced',

  pseudocodeLines: [
    'function huffmanCoding(charFreqs):',
    '  // Create leaf nodes for each character',
    '  heap = MinHeap(charFreqs)',
    '',
    '  while heap.size > 1:',
    '    // Extract two minimum frequency nodes',
    '    left = heap.extractMin()',
    '    right = heap.extractMin()',
    '',
    '    // Create internal node with combined freq',
    '    merged = Node(freq = left.freq + right.freq)',
    '    merged.left = left, merged.right = right',
    '',
    '    heap.insert(merged)',
    '',
    '  return heap.extractMin()  // Root of Huffman tree',
  ],

  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
  },

  spaceComplexity: 'O(n)',

  parameters: [
    {
      id: 'text',
      label: 'Sample Text',
      type: 'select',
      default: 'ABBCCCDDDDEEEEE',
      options: [
        { value: 'ABBCCCDDDDEEEEE', label: 'ABBCCCDDDDEEEEE' },
        { value: 'ABRACADABRA', label: 'ABRACADABRA' },
        { value: 'HELLO WORLD', label: 'HELLO WORLD' },
      ],
    },
  ],

  validate(input: ArrayInput) {
    return { ok: true };
  },

  *run(input: ArrayInput, params?: Record<string, string | number>): Generator<AlgoEvent, void, unknown> {
    const text = String(params?.['text'] ?? 'ABBCCCDDDDEEEEE');

    // Calculate character frequencies
    const freqMap: Map<string, number> = new Map();
    for (const char of text) {
      freqMap.set(char, (freqMap.get(char) ?? 0) + 1);
    }

    yield createEvent.message(`Analyzing text: "${text}"`, 'info');
    yield createEvent.highlight([0, 1]);

    // Display frequencies
    const chars = Array.from(freqMap.keys());

    yield createEvent.pointer(
      [],
      chars.map(c => ({ name: `'${c}'`, value: freqMap.get(c)! })),
      'Character Frequencies'
    );

    // Create initial nodes (min heap simulation with array)
    let heap: HuffmanNode[] = chars.map(c => ({
      char: c,
      freq: freqMap.get(c)!,
      left: null,
      right: null,
    }));

    yield createEvent.message('Creating leaf nodes for each character', 'step');
    yield createEvent.highlight([2]);

    // Sort to simulate min-heap
    heap.sort((a, b) => a.freq - b.freq);

    yield createEvent.pointer(
      [],
      heap.map(n => ({ name: n.char ?? '?', value: n.freq })),
      'Min-Heap (sorted by freq)'
    );

    let step = 0;

    // Build Huffman tree
    while (heap.length > 1) {
      step++;
      yield createEvent.message(`Step ${step}: Extracting two minimum nodes`, 'step');
      yield createEvent.highlight([4, 5, 6, 7]);

      // Extract two minimum
      const left = heap.shift()!;
      const right = heap.shift()!;

      const leftLabel = left.char ?? `(${left.freq})`;
      const rightLabel = right.char ?? `(${right.freq})`;

      yield createEvent.message(
        `Merging: ${leftLabel}(${left.freq}) + ${rightLabel}(${right.freq})`,
        'step'
      );
      yield createEvent.highlight([9, 10, 11]);

      // Create merged node
      const merged: HuffmanNode = {
        char: null,
        freq: left.freq + right.freq,
        left,
        right,
      };

      yield createEvent.message(`Created internal node with freq = ${merged.freq}`, 'step');
      yield createEvent.highlight([13]);

      // Insert back into heap (maintaining sorted order)
      heap.push(merged);
      heap.sort((a, b) => a.freq - b.freq);

      // Visualize current heap state
      yield createEvent.pointer(
        [],
        heap.map(n => ({
          name: n.char ?? `*`,
          value: n.freq,
          highlight: n === merged,
        })),
        'Heap after merge'
      );
    }

    // Generate codes by traversing tree
    const codes: Map<string, string> = new Map();

    function generateCodes(node: HuffmanNode | null, code: string) {
      if (!node) return;
      if (node.char !== null) {
        codes.set(node.char, code || '0'); // Single char case
        return;
      }
      generateCodes(node.left, code + '0');
      generateCodes(node.right, code + '1');
    }

    const root = heap[0];
    generateCodes(root, '');

    yield createEvent.message('Huffman tree complete! Generating codes...', 'step');
    yield createEvent.highlight([15]);

    // Display final codes
    const sortedChars = Array.from(codes.keys()).sort();
    yield createEvent.pointer(
      [],
      sortedChars.map(c => ({
        name: `'${c}'`,
        value: codes.get(c)!,
      })),
      'Huffman Codes'
    );

    // Calculate compression stats
    const originalBits = text.length * 8; // Assuming 8 bits per char
    let compressedBits = 0;
    for (const char of text) {
      compressedBits += codes.get(char)!.length;
    }
    const ratio = ((1 - compressedBits / originalBits) * 100).toFixed(1);

    yield createEvent.message(
      `Compression: ${originalBits} bits → ${compressedBits} bits (${ratio}% reduction)`,
      'info'
    );

    const codesSummary = sortedChars.map(c => `${c}:${codes.get(c)}`).join(', ');
    yield createEvent.result('string', codesSummary, 'Huffman Codes');
  },
};
