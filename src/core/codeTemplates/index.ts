/**
 * Code Templates Registry
 * Exports all algorithm code templates
 */

import { AlgorithmCodeTemplates, SupportedLanguage, AlgorithmCategory } from './types';
import { bubbleSortCode } from './bubbleSort';
import { selectionSortCode } from './selectionSort';
import { insertionSortCode } from './insertionSort';
import { mergeSortCode } from './mergeSort';
import { heapSortCode } from './heapSort';
import { quickSortCode } from './quickSort';
import { shellSortCode } from './shellSort';
import { radixSortCode } from './radixSort';
import { countingSortCode } from './countingSort';
import { bucketSortCode } from './bucketSort';
import { cocktailShakerSortCode } from './cocktailShakerSort';
import { cycleSortCode } from './cycleSort';
import { timSortCode } from './timSort';
import { introSortCode } from './introSort';
import { pigeonholeSortCode } from './pigeonholeSort';
// Searching algorithms
import { linearSearchCode } from './linearSearch';
import { binarySearchCode } from './binarySearch';
import { jumpSearchCode } from './jumpSearch';
import { interpolationSearchCode } from './interpolationSearch';
import { exponentialSearchCode } from './exponentialSearch';
import { ternarySearchCode } from './ternarySearch';
import { fibonacciSearchCode } from './fibonacciSearch';
import { sentinelLinearSearchCode } from './sentinelLinearSearch';
import { bidirectionalSearchCode } from './bidirectionalSearch';
import { lowerBoundCode } from './lowerBound';
import { upperBoundCode } from './upperBound';
import { searchInsertPositionCode } from './searchInsertPosition';
import { peakElementCode } from './peakElement';
import { rotatedArraySearchCode } from './rotatedArraySearch';
import { rotatedArrayMinCode } from './rotatedArrayMin';
import { matrixBinarySearchCode } from './matrixBinarySearch';
// Arrays algorithms
import { arrayOperationsCode } from './arrayOperations';
import { twoPointersCode } from './twoPointers';
import { slidingWindowCode } from './slidingWindow';
import { prefixSumCode } from './prefixSum';
import { kadanesCode } from './kadanes';
import { dutchNationalFlagCode } from './dutchNationalFlag';
import { mooresVotingCode } from './mooresVoting';
import { mergeSortedArraysCode } from './mergeSortedArrays';
import { rotateArrayCode } from './rotateArray';
import { arrayRearrangementCode } from './arrayRearrangement';
import { nextPermutationCode } from './nextPermutation';
// Strings algorithms
import { stringOperationsCode } from './stringOperations';
import { characterFrequencyCode } from './characterFrequency';
import { bruteForceSearchCode } from './bruteForceSearch';
import { kmpCode } from './kmp';
import { rabinKarpCode } from './rabinKarp';
import { zAlgorithmCode } from './zAlgorithm';
import { boyerMooreCode } from './boyerMoore';
import { anagramDetectionCode } from './anagramDetection';
import { longestPalindromicSubstringCode } from './longestPalindromicSubstring';
import { longestCommonSubstringCode } from './longestCommonSubstring';
import { stringRotationCode } from './stringRotation';
import { removeDuplicatesCode } from './removeDuplicates';
// Stacks algorithms
import { stackOperationsCode } from './stackOperations';
import { balancedParenthesesCode } from './balancedParentheses';
import { infixToPostfixCode } from './infixToPostfix';
import { infixToPrefixCode } from './infixToPrefix';
import { postfixEvalCode } from './postfixEval';
import { prefixEvalCode } from './prefixEval';
import { nextGreaterElementCode } from './nextGreaterElement';
import { nextSmallerElementCode } from './nextSmallerElement';
import { stockSpanCode } from './stockSpan';
import { largestRectangleHistogramCode } from './largestRectangleHistogram';
import { validStackSequencesCode } from './validStackSequences';
// Queues algorithms
import { queueOperationsCode } from './queueOperations';
import { circularQueueCode } from './circularQueue';
import { dequeCode } from './deque';
import { priorityQueueCode } from './priorityQueue';
import { queueUsingStacksCode } from './queueUsingStacks';
import { stackUsingQueuesCode } from './stackUsingQueues';
import { lruCacheCode } from './lruCache';
import { slidingWindowMaximumCode } from './slidingWindowMaximum';
import { firstNonRepeatingCharCode } from './firstNonRepeatingChar';
import { generateBinaryNumbersCode } from './generateBinaryNumbers';
import { circularTourCode } from './circularTour';
// Linked Lists algorithms
import { singlyLinkedListCode } from './singlyLinkedList';
import { doublyLinkedListCode } from './doublyLinkedList';
import { circularLinkedListCode } from './circularLinkedList';
import { circularDoublyLinkedListCode } from './circularDoublyLinkedList';
import { reverseLinkedListCode } from './reverseLinkedList';
import { findMiddleCode } from './findMiddle';
import { mergeSortedListsCode } from './mergeSortedLists';
import { removeNthFromEndCode } from './removeNthFromEnd';
import { detectCycleCode } from './detectCycle';
import { findCycleStartCode } from './findCycleStart';
import { palindromeLinkedListCode } from './palindromeLinkedList';
import { intersectionPointCode } from './intersectionPoint';
import { rotateListCode } from './rotateList';
import { flattenMultilevelCode } from './flattenMultilevel';
// Recursion & Backtracking algorithms
import { factorialCode } from './factorial';
import { fibonacciRecursiveCode } from './fibonacciRecursive';
import { sumOfDigitsCode } from './sumOfDigits';
import { powerRecursiveCode } from './powerRecursive';
import { gcdCode } from './gcd';
import { towerOfHanoiCode } from './towerOfHanoi';
import { binarySearchRecursiveCode } from './binarySearchRecursive';
import { nQueensCode } from './nQueens';
import { sudokuSolverCode } from './sudokuSolver';
import { ratInMazeCode } from './ratInMaze';
import { permutationsCode } from './permutations';
// Trees algorithms
import { inorderTraversalCode } from './inorderTraversal';
import { preorderTraversalCode } from './preorderTraversal';
import { postorderTraversalCode } from './postorderTraversal';
import { levelOrderTraversalCode } from './levelOrderTraversal';
import { treeHeightCode } from './treeHeight';
import { isBalancedCode } from './isBalanced';
import { isBSTCode } from './isBST';
import { bstOperationsCode } from './bstOperations';
import { lowestCommonAncestorCode } from './lowestCommonAncestor';
// Heaps algorithms
import { maxHeapCode } from './maxHeap';
import { minHeapCode } from './minHeap';
import { buildHeapCode } from './buildHeap';
import { kthLargestCode } from './kthLargest';
import { kthSmallestCode } from './kthSmallest';
import { mergeKSortedListsCode } from './mergeKSortedLists';
import { topKFrequentCode } from './topKFrequent';
import { medianOfStreamCode } from './medianOfStream';
// Hashing algorithms
import { hashFunctionsCode } from './hashFunctions';
import { chainingCode } from './chaining';
import { openAddressingCode } from './openAddressing';
import { rehashingCode } from './rehashing';
import { twoSumHashCode } from './twoSumHash';
import { groupAnagramsCode } from './groupAnagrams';
import { longestConsecutiveCode } from './longestConsecutive';
import { subarrayZeroSumCode } from './subarrayZeroSum';
import { countDistinctWindowCode } from './countDistinctWindow';
// Graphs algorithms
import { adjacencyMatrixCode } from './adjacencyMatrix';
import { adjacencyListCode } from './adjacencyList';
import { bfsCode } from './bfs';
import { dfsCode } from './dfs';
import { dijkstraCode } from './dijkstra';
import { bellmanFordCode } from './bellmanFord';
import { floydWarshallCode } from './floydWarshall';
import { aStarCode } from './aStar';
import { kruskalMSTCode } from './kruskalMST';
import { primMSTCode } from './primMST';
import { kahnTopologicalSortCode } from './kahnTopologicalSort';
import { dfsTopologicalSortCode } from './dfsTopologicalSort';
import { connectedComponentsCode } from './connectedComponents';
import { kosarajuSCCCode } from './kosarajuSCC';
import { tarjanSCCCode } from './tarjanSCC';
import { cycleDetectionCode } from './cycleDetectionGraph';
// Dynamic Programming algorithms
import { fibonacciDPCode } from './fibonacciDP';
import { climbingStairsCode } from './climbingStairs';
import { houseRobberCode } from './houseRobber';
import { lisCode } from './lis';
import { coinChangeCode } from './coinChange';
import { knapsack01Code } from './knapsack01';
import { lcsCode } from './lcs';
import { editDistanceCode } from './editDistance';
import { matrixChainMultiplicationCode } from './matrixChain';
import { uniquePathsCode } from './uniquePaths';
import { minPathSumCode } from './minPathSum';
import { subsetSumCode } from './subsetSum';
import { partitionEqualSubsetCode } from './partitionEqualSubset';
import { rodCuttingCode } from './rodCutting';
import { wordBreakCode } from './wordBreak';
// Greedy algorithms
import { activitySelectionCode } from './activitySelection';
import { jobSequencingCode } from './jobSequencing';
import { meetingRoomsCode } from './meetingRooms';
import { fractionalKnapsackCode } from './fractionalKnapsack';
import { huffmanCodingCode } from './huffmanCoding';
import { minimumPlatformsCode } from './minimumPlatforms';
import { mergeIntervalsCode } from './mergeIntervals';
import { insertIntervalCode } from './insertInterval';
import { nonOverlappingIntervalsCode } from './nonOverlappingIntervals';

// Registry of all code templates
const codeTemplatesRegistry: Map<string, AlgorithmCodeTemplates> = new Map();

// Register all templates
[
  // Sorting
  bubbleSortCode,
  selectionSortCode,
  insertionSortCode,
  mergeSortCode,
  heapSortCode,
  quickSortCode,
  shellSortCode,
  radixSortCode,
  countingSortCode,
  bucketSortCode,
  cocktailShakerSortCode,
  cycleSortCode,
  timSortCode,
  introSortCode,
  pigeonholeSortCode,
  // Searching
  linearSearchCode,
  binarySearchCode,
  jumpSearchCode,
  interpolationSearchCode,
  exponentialSearchCode,
  ternarySearchCode,
  fibonacciSearchCode,
  sentinelLinearSearchCode,
  bidirectionalSearchCode,
  lowerBoundCode,
  upperBoundCode,
  searchInsertPositionCode,
  peakElementCode,
  rotatedArraySearchCode,
  rotatedArrayMinCode,
  matrixBinarySearchCode,
  // Arrays
  arrayOperationsCode,
  twoPointersCode,
  slidingWindowCode,
  prefixSumCode,
  kadanesCode,
  dutchNationalFlagCode,
  mooresVotingCode,
  mergeSortedArraysCode,
  rotateArrayCode,
  arrayRearrangementCode,
  nextPermutationCode,
  // Strings
  stringOperationsCode,
  characterFrequencyCode,
  bruteForceSearchCode,
  kmpCode,
  rabinKarpCode,
  zAlgorithmCode,
  boyerMooreCode,
  anagramDetectionCode,
  longestPalindromicSubstringCode,
  longestCommonSubstringCode,
  stringRotationCode,
  removeDuplicatesCode,
  // Stacks
  stackOperationsCode,
  balancedParenthesesCode,
  infixToPostfixCode,
  infixToPrefixCode,
  postfixEvalCode,
  prefixEvalCode,
  nextGreaterElementCode,
  nextSmallerElementCode,
  stockSpanCode,
  largestRectangleHistogramCode,
  validStackSequencesCode,
  // Queues
  queueOperationsCode,
  circularQueueCode,
  dequeCode,
  priorityQueueCode,
  queueUsingStacksCode,
  stackUsingQueuesCode,
  lruCacheCode,
  slidingWindowMaximumCode,
  firstNonRepeatingCharCode,
  generateBinaryNumbersCode,
  circularTourCode,
  // Linked Lists
  singlyLinkedListCode,
  doublyLinkedListCode,
  circularLinkedListCode,
  circularDoublyLinkedListCode,
  reverseLinkedListCode,
  findMiddleCode,
  mergeSortedListsCode,
  removeNthFromEndCode,
  detectCycleCode,
  findCycleStartCode,
  palindromeLinkedListCode,
  intersectionPointCode,
  rotateListCode,
  flattenMultilevelCode,
  // Recursion & Backtracking
  factorialCode,
  fibonacciRecursiveCode,
  sumOfDigitsCode,
  powerRecursiveCode,
  gcdCode,
  towerOfHanoiCode,
  binarySearchRecursiveCode,
  nQueensCode,
  sudokuSolverCode,
  ratInMazeCode,
  permutationsCode,
  // Trees
  inorderTraversalCode,
  preorderTraversalCode,
  postorderTraversalCode,
  levelOrderTraversalCode,
  treeHeightCode,
  isBalancedCode,
  isBSTCode,
  bstOperationsCode,
  lowestCommonAncestorCode,
  // Heaps
  maxHeapCode,
  minHeapCode,
  buildHeapCode,
  kthLargestCode,
  kthSmallestCode,
  mergeKSortedListsCode,
  topKFrequentCode,
  medianOfStreamCode,
  // Hashing
  hashFunctionsCode,
  chainingCode,
  openAddressingCode,
  rehashingCode,
  twoSumHashCode,
  groupAnagramsCode,
  longestConsecutiveCode,
  subarrayZeroSumCode,
  countDistinctWindowCode,
  // Graphs
  adjacencyMatrixCode,
  adjacencyListCode,
  bfsCode,
  dfsCode,
  dijkstraCode,
  bellmanFordCode,
  floydWarshallCode,
  aStarCode,
  kruskalMSTCode,
  primMSTCode,
  kahnTopologicalSortCode,
  dfsTopologicalSortCode,
  connectedComponentsCode,
  kosarajuSCCCode,
  tarjanSCCCode,
  cycleDetectionCode,
  // Dynamic Programming
  fibonacciDPCode,
  climbingStairsCode,
  houseRobberCode,
  lisCode,
  coinChangeCode,
  knapsack01Code,
  lcsCode,
  editDistanceCode,
  matrixChainMultiplicationCode,
  uniquePathsCode,
  minPathSumCode,
  subsetSumCode,
  partitionEqualSubsetCode,
  rodCuttingCode,
  wordBreakCode,
  // Greedy Algorithms
  activitySelectionCode,
  jobSequencingCode,
  meetingRoomsCode,
  fractionalKnapsackCode,
  huffmanCodingCode,
  minimumPlatformsCode,
  mergeIntervalsCode,
  insertIntervalCode,
  nonOverlappingIntervalsCode,
].forEach((template) => {
  codeTemplatesRegistry.set(template.algorithmId, template);
});

/**
 * Get code template for an algorithm
 */
export function getCodeTemplate(algorithmId: string): AlgorithmCodeTemplates | undefined {
  return codeTemplatesRegistry.get(algorithmId);
}

/**
 * Get code for a specific algorithm and language
 */
export function getCode(algorithmId: string, language: SupportedLanguage): string | undefined {
  const template = codeTemplatesRegistry.get(algorithmId);
  return template?.templates[language];
}

/**
 * Get all available algorithm IDs with code templates
 */
export function getAvailableAlgorithmsWithCode(): string[] {
  return Array.from(codeTemplatesRegistry.keys());
}

/**
 * Get all available algorithms with their names and categories
 */
export function getAvailableAlgorithms(): { id: string; name: string; category: AlgorithmCategory }[] {
  return Array.from(codeTemplatesRegistry.values()).map((t) => ({
    id: t.algorithmId,
    name: t.algorithmName,
    category: t.category,
  }));
}

/**
 * Get all available algorithms grouped by category
 */
export function getAlgorithmsByCategory(): Record<AlgorithmCategory, { id: string; name: string }[]> {
  const grouped: Record<string, { id: string; name: string }[]> = {};

  Array.from(codeTemplatesRegistry.values()).forEach((t) => {
    if (!grouped[t.category]) {
      grouped[t.category] = [];
    }
    grouped[t.category].push({ id: t.algorithmId, name: t.algorithmName });
  });

  return grouped as Record<AlgorithmCategory, { id: string; name: string }[]>;
}

/**
 * Get available categories that have algorithms
 */
export function getAvailableCategories(): AlgorithmCategory[] {
  const categories = new Set<AlgorithmCategory>();
  Array.from(codeTemplatesRegistry.values()).forEach((t) => {
    categories.add(t.category);
  });
  return Array.from(categories);
}

/**
 * Check if an algorithm has code templates
 */
export function hasCodeTemplate(algorithmId: string): boolean {
  return codeTemplatesRegistry.has(algorithmId);
}

// Export types
export * from './types';
