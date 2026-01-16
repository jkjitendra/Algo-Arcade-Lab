export const huffmanCodingInfo = {
  id: 'huffman-coding',
  name: 'Huffman Coding',
  category: 'greedy',
  difficulty: 'advanced',
  description: 'Constructs optimal prefix-free binary codes for characters based on their frequencies, minimizing the total encoded length.',
  howItWorks: 'Build a binary tree bottom-up by repeatedly merging the two nodes with lowest frequencies. Assign 0 to left edges and 1 to right edges to generate codes.',
  keyInsight: 'Frequent characters get shorter codes. The greedy choice of always merging smallest frequencies ensures optimal prefix-free encoding.',
  bestFor: ['Data compression', 'File encoding', 'Transmission optimization', 'Teaching tree-based greedy algorithms'],
  avoidWhen: ['Equal frequency distribution (all codes same length)', 'Need adaptive coding for streaming', 'Security/encryption is a concern'],
  funFact: 'Invented by David Huffman in 1952 as a term paper. ZIP, GZIP, JPEG, and MP3 all use variations of Huffman coding.',
  optimizationTips: ['Use priority queue (min-heap) for O(n log n) time', 'Canonical Huffman codes simplify decoding', 'Adaptive Huffman for streaming data'],
  tags: ['Greedy', 'Trees', 'Advanced', 'Compression', 'Classic'],
};
