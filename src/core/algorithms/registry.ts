import { IAlgorithm, AlgorithmMeta } from './IAlgorithm';
import { ArrayInput } from '../models';
import { bubbleSort } from './sorting/bubbleSort';
import { selectionSort } from './sorting/selectionSort';
import { insertionSort } from './sorting/insertionSort';
import { cocktailShakerSort } from './sorting/cocktailShakerSort';
import { shellSort } from './sorting/shellSort';
import { cycleSort } from './sorting/cycleSort';
import { mergeSort } from './sorting/mergeSort';
import { quickSort } from './sorting/quickSort';
import { heapSort } from './sorting/heapSort';
import { countingSort } from './sorting/countingSort';
import { radixSort } from './sorting/radixSort';
import { bucketSort } from './sorting/bucketSort';
import { pigeonholeSort } from './sorting/pigeonholeSort';
import { timSort } from './sorting/timSort';
import { introSort } from './sorting/introSort';
// Arrays algorithms
import { arrayOperations } from './arrays/arrayOperations';
import { twoPointers } from './arrays/twoPointers';
import { slidingWindow } from './arrays/slidingWindow';
import { prefixSum } from './arrays/prefixSum';
import { kadanes } from './arrays/kadanes';
import { dutchNationalFlag } from './arrays/dutchNationalFlag';
import { mooresVoting } from './arrays/mooresVoting';
import { mergeSortedArrays } from './arrays/mergeSortedArrays';
import { rotateArray } from './arrays/rotateArray';
import { arrayRearrangement } from './arrays/arrayRearrangement';
import { nextPermutation } from './arrays/nextPermutation';
// String algorithms
import { stringOperations } from './strings/stringOperations';
import { characterFrequency } from './strings/characterFrequency';
import { bruteForceSearch } from './strings/bruteForceSearch';
import { kmpAlgorithm } from './strings/kmpAlgorithm';
import { rabinKarp } from './strings/rabinKarp';
import { zAlgorithm } from './strings/zAlgorithm';
import { boyerMoore } from './strings/boyerMoore';
import { anagramDetection } from './strings/anagramDetection';
import { longestPalindromicSubstring } from './strings/longestPalindromicSubstring';
import { longestCommonSubstring } from './strings/longestCommonSubstring';
import { stringRotation } from './strings/stringRotation';
import { removeDuplicates } from './strings/removeDuplicates';
// Searching algorithms
import { linearSearch } from './searching/linearSearch';
import { sentinelLinearSearch } from './searching/sentinelLinearSearch';
import { bidirectionalSearch } from './searching/bidirectionalSearch';
import { binarySearch } from './searching/binarySearch';
import { lowerBound } from './searching/lowerBound';
import { upperBound } from './searching/upperBound';
import { searchInsertPosition } from './searching/searchInsertPosition';
import { peakElement } from './searching/peakElement';
import { rotatedArraySearch } from './searching/rotatedArraySearch';
import { rotatedArrayMin } from './searching/rotatedArrayMin';
import { jumpSearch } from './searching/jumpSearch';
import { interpolationSearch } from './searching/interpolationSearch';
import { exponentialSearch } from './searching/exponentialSearch';
import { fibonacciSearch } from './searching/fibonacciSearch';
import { ternarySearch } from './searching/ternarySearch';
import { matrixBinarySearch } from './searching/matrixBinarySearch';
// Stack algorithms
import { stackOperations } from './stacks/stackOperations';
import { balancedParentheses } from './stacks/balancedParentheses';
import { infixToPostfix } from './stacks/infixToPostfix';
import { infixToPrefix } from './stacks/infixToPrefix';
import { postfixEvaluation } from './stacks/postfixEvaluation';
import { prefixEvaluation } from './stacks/prefixEvaluation';
import { nextGreaterElement } from './stacks/nextGreaterElement';
import { nextSmallerElement } from './stacks/nextSmallerElement';
import { stockSpan } from './stacks/stockSpan';
import { largestRectangleHistogram } from './stacks/largestRectangleHistogram';
import { validStackSequences } from './stacks/validStackSequences';
// Queue algorithms
import { queueOperations } from './queues/queueOperations';
import { circularQueue } from './queues/circularQueue';
import { deque } from './queues/deque';
import { priorityQueue } from './queues/priorityQueue';
import { queueUsingTwoStacks } from './queues/queueUsingTwoStacks';
import { stackUsingTwoQueues } from './queues/stackUsingTwoQueues';
import { lruCache } from './queues/lruCache';
import { slidingWindowMaximum } from './queues/slidingWindowMaximum';
import { firstNonRepeatingCharacter } from './queues/firstNonRepeatingCharacter';
import { generateBinaryNumbers } from './queues/generateBinaryNumbers';
import { circularTour } from './queues/circularTour';
// Linked List algorithms
import { singlyLinkedList } from './linkedlists/singlyLinkedList';
import { doublyLinkedList } from './linkedlists/doublyLinkedList';
import { circularLinkedList } from './linkedlists/circularLinkedList';
import { circularDoublyLinkedList } from './linkedlists/circularDoublyLinkedList';
import { reverseLinkedList } from './linkedlists/reverseLinkedList';
import { detectCycle } from './linkedlists/detectCycle';
import { findCycleStart } from './linkedlists/findCycleStart';
import { findMiddle } from './linkedlists/findMiddle';
import { mergeSortedLists } from './linkedlists/mergeSortedLists';
import { removeNthFromEnd } from './linkedlists/removeNthFromEnd';
import { palindromeLinkedList } from './linkedlists/palindromeLinkedList';
import { intersectionPoint } from './linkedlists/intersectionPoint';
import { rotateList } from './linkedlists/rotateList';
import { flattenMultilevelList } from './linkedlists/flattenMultilevelList';

// Recursion algorithms
import { factorialInfo } from './recursion/factorialInfo';
import { fibonacciInfo } from './recursion/fibonacciInfo';
import { sumDigitsInfo } from './recursion/sumDigitsInfo';
import { powerInfo } from './recursion/powerInfo';
import { gcdInfo } from './recursion/gcdInfo';
import { hanoiInfo } from './recursion/hanoiInfo';
import { binarySearchRecursiveInfo } from './recursion/binarySearchRecursiveInfo';

// Backtracking algorithms
import { nQueensInfo } from './backtracking/nQueensInfo';
import { sudokuInfo } from './backtracking/sudokuInfo';
import { ratMazeInfo } from './backtracking/ratMazeInfo';
import { permutationsInfo } from './backtracking/permutationsInfo';


/**
 * Registry of all available algorithms
 */
const algorithmRegistry: Map<string, IAlgorithm<ArrayInput>> = new Map();

/**
 * Algorithm metadata for UI
 */
const algorithmMeta: Map<string, AlgorithmMeta> = new Map();

/**
 * Register an algorithm
 */
export function registerAlgorithm(algorithm: IAlgorithm<ArrayInput>): void {
  algorithmRegistry.set(algorithm.id, algorithm);
  algorithmMeta.set(algorithm.id, {
    id: algorithm.id,
    name: algorithm.name,
    category: algorithm.category,
    difficulty: algorithm.difficulty,
    tags: [],
    description: '',
  });
}

/**
 * Get an algorithm by ID
 */
export function getAlgorithm(id: string): IAlgorithm<ArrayInput> | undefined {
  return algorithmRegistry.get(id);
}

/**
 * Get all registered algorithms
 */
export function getAllAlgorithms(): AlgorithmMeta[] {
  return Array.from(algorithmMeta.values());
}

/**
 * Get algorithms by category
 */
export function getAlgorithmsByCategory(category: string): AlgorithmMeta[] {
  return getAllAlgorithms().filter((algo) => algo.category === category);
}

// ============ ARRAYS ============
// Tier 1: Basic Operations
registerAlgorithm(arrayOperations);
// Tier 2: Patterns
registerAlgorithm(twoPointers);
registerAlgorithm(slidingWindow);
registerAlgorithm(prefixSum);
// Tier 3: Classic Algorithms
registerAlgorithm(kadanes);
registerAlgorithm(dutchNationalFlag);
registerAlgorithm(mooresVoting);
registerAlgorithm(mergeSortedArrays);
registerAlgorithm(rotateArray);
registerAlgorithm(arrayRearrangement);
registerAlgorithm(nextPermutation);

// ============ SORTING ============
// Tier 1: Fundamentals
registerAlgorithm(bubbleSort);
registerAlgorithm(selectionSort);
registerAlgorithm(insertionSort);
registerAlgorithm(cocktailShakerSort);
// Tier 2: Improved Simple
registerAlgorithm(shellSort);
registerAlgorithm(cycleSort);
// Tier 3: Divide & Conquer
registerAlgorithm(mergeSort);
registerAlgorithm(quickSort);
registerAlgorithm(heapSort);
// Tier 4: Hybrid
registerAlgorithm(timSort);
registerAlgorithm(introSort);
// Tier 5: Non-Comparison
registerAlgorithm(countingSort);
registerAlgorithm(radixSort);
registerAlgorithm(bucketSort);
registerAlgorithm(pigeonholeSort);

// ============ STRINGS ============
// Tier 1: Core Operations
registerAlgorithm(stringOperations);
registerAlgorithm(characterFrequency);
// Tier 2: Pattern Matching
registerAlgorithm(bruteForceSearch);
registerAlgorithm(kmpAlgorithm);
registerAlgorithm(rabinKarp);
registerAlgorithm(zAlgorithm);
registerAlgorithm(boyerMoore);
// Tier 3: String Manipulation
registerAlgorithm(anagramDetection);
registerAlgorithm(longestPalindromicSubstring);
registerAlgorithm(longestCommonSubstring);
registerAlgorithm(stringRotation);
registerAlgorithm(removeDuplicates);

// ============ SEARCHING ============
// Tier 1: Linear Search Variants
registerAlgorithm(linearSearch);
registerAlgorithm(sentinelLinearSearch);
registerAlgorithm(bidirectionalSearch);
// Tier 2: Binary Search Variants
registerAlgorithm(binarySearch);
registerAlgorithm(lowerBound);
registerAlgorithm(upperBound);
registerAlgorithm(searchInsertPosition);
registerAlgorithm(peakElement);
registerAlgorithm(rotatedArraySearch);
registerAlgorithm(rotatedArrayMin);
// Tier 3: Specialized Search
registerAlgorithm(jumpSearch);
registerAlgorithm(interpolationSearch);
registerAlgorithm(exponentialSearch);
registerAlgorithm(fibonacciSearch);
registerAlgorithm(ternarySearch);
registerAlgorithm(matrixBinarySearch);

// ============ STACKS ============
// Tier 1: Core Operations
registerAlgorithm(stackOperations);
// Tier 2: Expression Handling
registerAlgorithm(balancedParentheses);
registerAlgorithm(infixToPostfix);
registerAlgorithm(infixToPrefix);
registerAlgorithm(postfixEvaluation);
registerAlgorithm(prefixEvaluation);
// Tier 3: Monotonic Stack Applications
registerAlgorithm(nextGreaterElement);
registerAlgorithm(nextSmallerElement);
registerAlgorithm(stockSpan);
registerAlgorithm(largestRectangleHistogram);
registerAlgorithm(validStackSequences);

// ============ QUEUES ============
// Tier 1: Core Operations
registerAlgorithm(queueOperations);
// Tier 2: Queue Variants
registerAlgorithm(circularQueue);
registerAlgorithm(deque);
registerAlgorithm(priorityQueue);
// Tier 3: Implementations with Two Data Structures
registerAlgorithm(queueUsingTwoStacks);
registerAlgorithm(stackUsingTwoQueues);
// Tier 4: Advanced Applications
registerAlgorithm(lruCache);
registerAlgorithm(slidingWindowMaximum);
registerAlgorithm(firstNonRepeatingCharacter);
registerAlgorithm(generateBinaryNumbers);
registerAlgorithm(circularTour);

// ============ LINKED LISTS ============
// Tier 1: Core Data Structures
registerAlgorithm(singlyLinkedList);
registerAlgorithm(doublyLinkedList);
registerAlgorithm(circularLinkedList);
registerAlgorithm(circularDoublyLinkedList);
// Tier 2: Core Algorithms
registerAlgorithm(reverseLinkedList);
registerAlgorithm(findMiddle);
registerAlgorithm(mergeSortedLists);
registerAlgorithm(removeNthFromEnd);
// Tier 3: Cycle Detection
registerAlgorithm(detectCycle);
registerAlgorithm(findCycleStart);
// Tier 4: Advanced Algorithms
registerAlgorithm(palindromeLinkedList);
registerAlgorithm(intersectionPoint);
registerAlgorithm(rotateList);
registerAlgorithm(flattenMultilevelList);

// ============ RECURSION ============
registerAlgorithm(factorialInfo);
registerAlgorithm(fibonacciInfo);
registerAlgorithm(sumDigitsInfo);
registerAlgorithm(powerInfo);
registerAlgorithm(gcdInfo);
registerAlgorithm(hanoiInfo);
registerAlgorithm(binarySearchRecursiveInfo);

// ============ BACKTRACKING ============
registerAlgorithm(nQueensInfo);
registerAlgorithm(sudokuInfo);
registerAlgorithm(ratMazeInfo);
registerAlgorithm(permutationsInfo);

