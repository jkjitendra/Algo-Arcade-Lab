"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePlayerStore } from "@/core/player";
import { getAlgorithm, getAllAlgorithms } from "@/core/algorithms/registry";
import { ArrayBars } from "@/ui/visualizers/ArrayBars";
import { StringBars } from "@/ui/visualizers/StringBars";
import { PlayerControls } from "@/ui/components/PlayerControls";
import { CodePanel } from "@/ui/components/CodePanel";
import { ArrayInputEditor } from "@/ui/components/ArrayInputEditor";
import { StringInputEditor } from "@/ui/components/StringInputEditor";
import { GraphInputEditor } from "@/ui/components/GraphInputEditor";
import { ParenthesesInputEditor } from "@/ui/components/ParenthesesInputEditor";
import { ExpressionInputEditor } from "@/ui/components/ExpressionInputEditor";
import { VariablesPanel } from "@/ui/components/VariablesPanel";
import { CurrentOperation } from "@/ui/components/CurrentOperation";
import { AlgorithmInfoCard } from "@/ui/components/AlgorithmInfoCard";
import { AlgorithmView } from "@/ui/visualizers/views/AlgorithmView";
import { AlgorithmParams } from "@/ui/components/AlgorithmParams";
import { bubbleSortInfo } from "@/core/algorithms/sorting/bubbleSortInfo";
import { selectionSortInfo } from "@/core/algorithms/sorting/selectionSortInfo";
import { insertionSortInfo } from "@/core/algorithms/sorting/insertionSortInfo";
import { cocktailShakerSortInfo } from "@/core/algorithms/sorting/cocktailShakerSortInfo";
import { shellSortInfo } from "@/core/algorithms/sorting/shellSortInfo";
import { cycleSortInfo } from "@/core/algorithms/sorting/cycleSortInfo";
import { mergeSortInfo } from "@/core/algorithms/sorting/mergeSortInfo";
import { quickSortInfo } from "@/core/algorithms/sorting/quickSortInfo";
import { heapSortInfo } from "@/core/algorithms/sorting/heapSortInfo";
// ... (existing imports, assuming line 28 is safe to insert after)
import { GraphView } from "@/ui/visualizers/views/GraphView";
import { GraphInput } from "@/core/models";
import { countingSortInfo } from "@/core/algorithms/sorting/countingSortInfo";
import { radixSortInfo } from "@/core/algorithms/sorting/radixSortInfo";
import { bucketSortInfo } from "@/core/algorithms/sorting/bucketSortInfo";
import { pigeonholeSortInfo } from "@/core/algorithms/sorting/pigeonholeSortInfo";
import { timSortInfo } from "@/core/algorithms/sorting/timSortInfo";
import { introSortInfo } from "@/core/algorithms/sorting/introSortInfo";
// Heap algorithm info
import { maxHeapInfo } from "@/core/algorithms/heaps/maxHeapInfo";
import { minHeapInfo } from "@/core/algorithms/heaps/minHeapInfo";
import { buildHeapInfo } from "@/core/algorithms/heaps/buildHeapInfo";
import { kthLargestInfo } from "@/core/algorithms/heaps/kthLargestInfo";
import { kthSmallestInfo } from "@/core/algorithms/heaps/kthSmallestInfo";
import { mergeKSortedListsInfo } from "@/core/algorithms/heaps/mergeKSortedListsInfo";
import { topKFrequentInfo } from "@/core/algorithms/heaps/topKFrequentInfo";
import { medianOfStreamInfo } from "@/core/algorithms/heaps/medianOfStreamInfo";
// Arrays algorithm info
import { arrayOperationsInfo } from "@/core/algorithms/arrays/arrayOperationsInfo";
import { twoPointersInfo } from "@/core/algorithms/arrays/twoPointersInfo";
import { slidingWindowInfo } from "@/core/algorithms/arrays/slidingWindowInfo";
import { prefixSumInfo } from "@/core/algorithms/arrays/prefixSumInfo";
import { kadanesInfo } from "@/core/algorithms/arrays/kadanesInfo";
import { dutchNationalFlagInfo } from "@/core/algorithms/arrays/dutchNationalFlagInfo";
import { mooresVotingInfo } from "@/core/algorithms/arrays/mooresVotingInfo";
import { mergeSortedArraysInfo } from "@/core/algorithms/arrays/mergeSortedArraysInfo";
import { rotateArrayInfo } from "@/core/algorithms/arrays/rotateArrayInfo";
import { arrayRearrangementInfo } from "@/core/algorithms/arrays/arrayRearrangementInfo";
import { nextPermutationInfo } from "@/core/algorithms/arrays/nextPermutationInfo";
// String algorithm info
import { stringOperationsInfo } from "@/core/algorithms/strings/stringOperationsInfo";
import { characterFrequencyInfo } from "@/core/algorithms/strings/characterFrequencyInfo";
import { bruteForceSearchInfo } from "@/core/algorithms/strings/bruteForceSearchInfo";
import { kmpAlgorithmInfo } from "@/core/algorithms/strings/kmpAlgorithmInfo";
import { rabinKarpInfo } from "@/core/algorithms/strings/rabinKarpInfo";
import { zAlgorithmInfo } from "@/core/algorithms/strings/zAlgorithmInfo";
import { boyerMooreInfo } from "@/core/algorithms/strings/boyerMooreInfo";
import { anagramDetectionInfo } from "@/core/algorithms/strings/anagramDetectionInfo";
import { longestPalindromicSubstringInfo } from "@/core/algorithms/strings/longestPalindromicSubstringInfo";
import { longestCommonSubstringInfo } from "@/core/algorithms/strings/longestCommonSubstringInfo";
import { stringRotationInfo } from "@/core/algorithms/strings/stringRotationInfo";
import { removeDuplicatesInfo } from "@/core/algorithms/strings/removeDuplicatesInfo";
// Searching algorithm info
import { linearSearchInfo } from "@/core/algorithms/searching/linearSearchInfo";
import { sentinelLinearSearchInfo } from "@/core/algorithms/searching/sentinelLinearSearchInfo";
import { bidirectionalSearchInfo } from "@/core/algorithms/searching/bidirectionalSearchInfo";
import { binarySearchInfo } from "@/core/algorithms/searching/binarySearchInfo";
import { lowerBoundInfo } from "@/core/algorithms/searching/lowerBoundInfo";
import { upperBoundInfo } from "@/core/algorithms/searching/upperBoundInfo";
import { searchInsertPositionInfo } from "@/core/algorithms/searching/searchInsertPositionInfo";
import { peakElementInfo } from "@/core/algorithms/searching/peakElementInfo";
import { rotatedArraySearchInfo } from "@/core/algorithms/searching/rotatedArraySearchInfo";
import { rotatedArrayMinInfo } from "@/core/algorithms/searching/rotatedArrayMinInfo";
import { jumpSearchInfo } from "@/core/algorithms/searching/jumpSearchInfo";
import { interpolationSearchInfo } from "@/core/algorithms/searching/interpolationSearchInfo";
import { exponentialSearchInfo } from "@/core/algorithms/searching/exponentialSearchInfo";
import { fibonacciSearchInfo } from "@/core/algorithms/searching/fibonacciSearchInfo";
import { ternarySearchInfo } from "@/core/algorithms/searching/ternarySearchInfo";
import { matrixBinarySearchInfo } from "@/core/algorithms/searching/matrixBinarySearchInfo";
// Stack algorithm info
import { stackOperationsInfo } from "@/core/algorithms/stacks/stackOperationsInfo";
import { balancedParenthesesInfo } from "@/core/algorithms/stacks/balancedParenthesesInfo";
import { infixToPostfixInfo } from "@/core/algorithms/stacks/infixToPostfixInfo";
import { infixToPrefixInfo } from "@/core/algorithms/stacks/infixToPrefixInfo";
import { postfixEvaluationInfo } from "@/core/algorithms/stacks/postfixEvaluationInfo";
import { prefixEvaluationInfo } from "@/core/algorithms/stacks/prefixEvaluationInfo";
import { nextGreaterElementInfo } from "@/core/algorithms/stacks/nextGreaterElementInfo";
import { nextSmallerElementInfo } from "@/core/algorithms/stacks/nextSmallerElementInfo";
import { stockSpanInfo } from "@/core/algorithms/stacks/stockSpanInfo";
import { largestRectangleHistogramInfo } from "@/core/algorithms/stacks/largestRectangleHistogramInfo";
import { validStackSequencesInfo } from "@/core/algorithms/stacks/validStackSequencesInfo";
// Queue algorithm info
import { queueOperationsInfo } from "@/core/algorithms/queues/queueOperationsInfo";
import { circularQueueInfo } from "@/core/algorithms/queues/circularQueueInfo";
import { dequeInfo } from "@/core/algorithms/queues/dequeInfo";
import { priorityQueueInfo } from "@/core/algorithms/queues/priorityQueueInfo";
import { queueUsingTwoStacksInfo } from "@/core/algorithms/queues/queueUsingTwoStacksInfo";
import { stackUsingTwoQueuesInfo } from "@/core/algorithms/queues/stackUsingTwoQueuesInfo";
import { lruCacheInfo } from "@/core/algorithms/queues/lruCacheInfo";
import { slidingWindowMaximumInfo } from "@/core/algorithms/queues/slidingWindowMaximumInfo";
import { firstNonRepeatingCharacterInfo } from "@/core/algorithms/queues/firstNonRepeatingCharacterInfo";
import { generateBinaryNumbersInfo } from "@/core/algorithms/queues/generateBinaryNumbersInfo";
import { circularTourInfo } from "@/core/algorithms/queues/circularTourInfo";
// Linked List algorithm info
import { singlyLinkedListInfo } from "@/core/algorithms/linkedlists/singlyLinkedListInfo";
import { doublyLinkedListInfo } from "@/core/algorithms/linkedlists/doublyLinkedListInfo";
import { circularLinkedListInfo } from "@/core/algorithms/linkedlists/circularLinkedListInfo";
import { circularDoublyLinkedListInfo } from "@/core/algorithms/linkedlists/circularDoublyLinkedListInfo";
import { reverseLinkedListInfo } from "@/core/algorithms/linkedlists/reverseLinkedListInfo";
import { detectCycleInfo } from "@/core/algorithms/linkedlists/detectCycleInfo";
import { findCycleStartInfo } from "@/core/algorithms/linkedlists/findCycleStartInfo";
import { findMiddleInfo } from "@/core/algorithms/linkedlists/findMiddleInfo";
import { mergeSortedListsInfo } from "@/core/algorithms/linkedlists/mergeSortedListsInfo";
import { removeNthFromEndInfo } from "@/core/algorithms/linkedlists/removeNthFromEndInfo";
import { palindromeLinkedListInfo } from "@/core/algorithms/linkedlists/palindromeLinkedListInfo";
import { intersectionPointInfo } from "@/core/algorithms/linkedlists/intersectionPointInfo";
import { rotateListInfo } from "@/core/algorithms/linkedlists/rotateListInfo";
import { flattenMultilevelListInfo } from "@/core/algorithms/linkedlists/flattenMultilevelListInfo";
// Recursion algorithm info
import { factorialAbout as factorialInfo } from "@/core/algorithms/recursion/factorialInfo";
import { fibonacciAbout as fibonacciInfo } from "@/core/algorithms/recursion/fibonacciInfo";
import { sumDigitsAbout as sumDigitsInfo } from "@/core/algorithms/recursion/sumDigitsInfo";
import { powerAbout as powerInfo } from "@/core/algorithms/recursion/powerInfo";
import { gcdAbout as gcdInfo } from "@/core/algorithms/recursion/gcdInfo";
import { hanoiAbout as hanoiInfo } from "@/core/algorithms/recursion/hanoiInfo";
import { binarySearchRecursiveAbout as binarySearchRecursiveInfo } from "@/core/algorithms/recursion/binarySearchRecursiveInfo";
// Backtracking algorithm info
import { nQueensAbout as nQueensInfo } from "@/core/algorithms/backtracking/nQueensInfo";
import { sudokuAbout as sudokuInfo } from "@/core/algorithms/backtracking/sudokuInfo";
import { ratMazeAbout as ratMazeInfo } from "@/core/algorithms/backtracking/ratMazeInfo";
import { permutationsAbout as permutationsInfo } from "@/core/algorithms/backtracking/permutationsInfo";
// Tree algorithm info
import { inorderTraversalInfo } from "@/core/algorithms/trees/inorderTraversalInfo";
import { preorderTraversalInfo } from "@/core/algorithms/trees/preorderTraversalInfo";
import { postorderTraversalInfo } from "@/core/algorithms/trees/postorderTraversalInfo";
import { levelOrderTraversalInfo } from "@/core/algorithms/trees/levelOrderTraversalInfo";
import { treeHeightInfo } from "@/core/algorithms/trees/treeHeightInfo";
import { isBalancedInfo } from "@/core/algorithms/trees/isBalancedInfo";
import { isBSTInfo } from "@/core/algorithms/trees/isBSTInfo";
import { bstOperationsInfo } from "@/core/algorithms/trees/bstOperationsInfo";
import { lowestCommonAncestorInfo } from "@/core/algorithms/trees/lowestCommonAncestorInfo";
// Graph algorithm info
import { bfsInfo } from "@/core/algorithms/graphs/traversals/bfsInfo";
import { dfsInfo } from "@/core/algorithms/graphs/traversals/dfsInfo";
import { dijkstraInfo } from "@/core/algorithms/graphs/shortestPaths/dijkstraInfo";
import { bellmanFordInfo } from "@/core/algorithms/graphs/shortestPaths/bellmanFordInfo";
import { floydWarshallInfo } from "@/core/algorithms/graphs/shortestPaths/floydWarshallInfo";
import { astarInfo } from "@/core/algorithms/graphs/shortestPaths/astarInfo";
import { kruskalInfo } from "@/core/algorithms/graphs/mst/kruskalInfo";
import { primInfo } from "@/core/algorithms/graphs/mst/primInfo";
import { kahnsInfo } from "@/core/algorithms/graphs/topologicalSort/kahnsInfo";
import { dfsTopoSortInfo } from "@/core/algorithms/graphs/topologicalSort/dfsTopoSortInfo";
import { connectedComponentsInfo } from "@/core/algorithms/graphs/connectivity/connectedComponentsInfo";
import { kosarajuInfo } from "@/core/algorithms/graphs/connectivity/kosarajuInfo";
import { tarjanInfo } from "@/core/algorithms/graphs/connectivity/tarjanInfo";
import { cycleUndirectedInfo } from "@/core/algorithms/graphs/connectivity/cycleUndirectedInfo";
import { cycleDirectedInfo } from "@/core/algorithms/graphs/connectivity/cycleDirectedInfo";
import { adjacencyMatrixInfo } from "@/core/algorithms/graphs/representations/adjacencyMatrixInfo";
import { adjacencyListInfo } from "@/core/algorithms/graphs/representations/adjacencyListInfo";
// Hashing algorithm info
import { hashFunctionsInfo } from "@/core/algorithms/hashing/hashFunctionsInfo";
import { chainingHashTableInfo } from "@/core/algorithms/hashing/chainingHashTableInfo";
import { openAddressingHashTableInfo } from "@/core/algorithms/hashing/openAddressingHashTableInfo";
import { rehashingInfo } from "@/core/algorithms/hashing/rehashingInfo";
import { twoSumInfo as twoSumHashingInfo } from "@/core/algorithms/hashing/twoSumInfo";
import { groupAnagramsInfo } from "@/core/algorithms/hashing/groupAnagramsInfo";
import { longestConsecutiveSequenceInfo } from "@/core/algorithms/hashing/longestConsecutiveSequenceInfo";
import { subarrayZeroSumInfo } from "@/core/algorithms/hashing/subarrayZeroSumInfo";
import { countDistinctWindowInfo } from "@/core/algorithms/hashing/countDistinctWindowInfo";
// Dynamic Programming algorithm info
import { fibonacciDPInfo } from "@/core/algorithms/dp/fibonacciInfo";
import { climbingStairsInfo } from "@/core/algorithms/dp/climbingStairsInfo";
import { houseRobberInfo } from "@/core/algorithms/dp/houseRobberInfo";
import { lisInfo } from "@/core/algorithms/dp/lisInfo";
import { coinChangeInfo } from "@/core/algorithms/dp/coinChangeInfo";
import { knapsackInfo } from "@/core/algorithms/dp/knapsackInfo";
import { lcsInfo } from "@/core/algorithms/dp/lcsInfo";
import { editDistanceInfo } from "@/core/algorithms/dp/editDistanceInfo";
import { matrixChainMultiplicationInfo } from "@/core/algorithms/dp/matrixChainMultiplicationInfo";
import { uniquePathsInfo } from "@/core/algorithms/dp/uniquePathsInfo";
import { minPathSumInfo } from "@/core/algorithms/dp/minPathSumInfo";
import { subsetSumInfo } from "@/core/algorithms/dp/subsetSumInfo";
import { partitionEqualSubsetSumInfo } from "@/core/algorithms/dp/partitionEqualSubsetSumInfo";
import { rodCuttingInfo } from "@/core/algorithms/dp/rodCuttingInfo";
import { wordBreakInfo } from "@/core/algorithms/dp/wordBreakInfo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ArrowDownUp, BarChart3, Play } from "lucide-react";
import { activitySelectionInfo } from "@/core/algorithms/greedy/activitySelectionInfo";
import { fractionalKnapsackInfo } from "@/core/algorithms/greedy/fractionalKnapsackInfo";
import { huffmanCodingInfo } from "@/core/algorithms/greedy/huffmanCodingInfo";
import { insertIntervalInfo } from "@/core/algorithms/greedy/insertIntervalInfo";
import { jobSequencingInfo } from "@/core/algorithms/greedy/jobSequencingInfo";
import { meetingRoomsInfo } from "@/core/algorithms/greedy/meetingRoomsInfo";
import { mergeIntervalsInfo } from "@/core/algorithms/greedy/mergeIntervalsInfo";
import { minimumPlatformsInfo } from "@/core/algorithms/greedy/minimumPlatformsInfo";
import { nonOverlappingIntervalsInfo } from "@/core/algorithms/greedy/nonOverlappingIntervalsInfo";

const defaultArray = [64, 34, 25, 12, 22, 11, 90];

// Algorithm-specific default arrays for better visualization
const algorithmDefaultArrays: Record<string, number[]> = {
  // Arrays topic
  "array-operations": [5, 12, 8, 3, 15, 7, 1, 10],
  "two-pointers": [1, 2, 3, 4, 5, 6, 7, 8, 9],  // Sorted for two-pointers
  "sliding-window": [2, 1, 5, 1, 3, 2, 8, 4, 6],
  "prefix-sum": [3, 1, 4, 1, 5, 9, 2, 6],
  "kadanes": [-2, 1, -3, 4, -1, 2, 1, -5, 4],
  "dutch-national-flag": [2, 0, 1, 2, 0, 1, 0, 2, 1],
  "moores-voting": [2, 2, 1, 1, 2, 2, 2],
  "merge-sorted-arrays": [1, 3, 5, 7, 2, 4, 6, 8],
  "rotate-array": [1, 2, 3, 4, 5, 6, 7],
  "array-rearrangement": [1, -1, 3, -2, 5, -4, 7, -6],
  "next-permutation": [1, 2, 3, 4],
  // Sorting topic
  "counting-sort": [5, 3, 8, 3, 9, 1, 0, 4, 7, 2],
  "radix-sort": [27, 14, 6, 37, 5, 30, 16, 42],
  "bucket-sort": [42, 7, 99, 15, 76, 38, 58, 12],
  "pigeonhole-sort": [8, 3, 6, 2, 7, 4, 5, 1],
  "heap-sort": [13, 44, 1, 22, 22, 4, 42, 8, 11],
  // Heaps topic
  "max-heap": [10, 20, 15, 30, 40],
  "min-heap": [40, 30, 15, 10, 20],
  "build-heap": [4, 1, 3, 2, 16, 9, 10, 14, 8, 7],
  "kth-largest": [3, 2, 1, 5, 6, 4],
  "kth-smallest": [7, 10, 4, 3, 20, 15],
  "merge-k-sorted-lists": [1, 4, 5, 1, 3, 4, 2, 6], // Will be split by algo
  "top-k-frequent": [1, 1, 1, 2, 2, 3],
  "median-of-stream": [5, 15, 1, 3],
  // Strings topic (character codes for "ABCABABCABC")
  "string-operations": [72, 69, 76, 76, 79, 87, 79, 82, 76, 68],  // "HELLOWORLD"
  "character-frequency": [65, 66, 82, 65, 67, 65, 68, 65, 66, 82, 65],  // "ABRACADABRA"
  "brute-force-search": [65, 66, 67, 65, 66, 65, 66, 67, 65, 66, 67],  // "ABCABABCABC"
  "kmp-algorithm": [65, 66, 65, 66, 65, 66, 67, 65, 66, 65, 66],  // "ABABABCABAB"
  "rabin-karp": [65, 66, 67, 68, 65, 66, 67, 69, 65, 66],  // "ABCDABCEAB"
  "z-algorithm": [65, 65, 66, 65, 65, 66, 65, 65, 66],  // "AABAABAAB"
  "boyer-moore": [65, 66, 67, 68, 69, 65, 66, 67, 68, 65, 66, 67],  // "ABCDEABCDABC"
  "anagram-detection": [76, 73, 83, 84, 69, 78],  // "LISTEN"
  "longest-palindromic-substring": [66, 65, 66, 65, 68],  // "BABAD"
  "longest-common-substring": [65, 66, 67, 68, 69, 70],  // "ABCDEF"
  "string-rotation": [65, 66, 67, 68, 69, 70],  // "ABCDEF"
  "remove-duplicates": [80, 82, 79, 71, 82, 65, 77, 77, 73, 78, 71],  // "PROGRAMMING"
  // Searching topic - sorted arrays for most
  "linear-search": [3, 8, 12, 15, 22, 31, 45, 56, 78, 89],
  "sentinel-linear-search": [3, 8, 12, 15, 22, 31, 45, 56, 78, 89],
  "bidirectional-search": [3, 8, 12, 15, 22, 31, 45, 56, 78, 89],
  "binary-search": [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
  "lower-bound": [1, 2, 2, 2, 3, 4, 5, 5, 6, 7],
  "upper-bound": [1, 2, 2, 2, 3, 4, 5, 5, 6, 7],
  "search-insert-position": [1, 3, 5, 6, 8, 10, 12],
  "peak-element": [1, 3, 8, 12, 4, 2],
  "rotated-array-search": [4, 5, 6, 7, 0, 1, 2],
  "rotated-array-min": [4, 5, 6, 7, 0, 1, 2, 3],
  "jump-search": [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
  "interpolation-search": [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  "exponential-search": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  "fibonacci-search": [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
  "ternary-search": [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
  "matrix-binary-search": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  // Stacks topic
  "stack-operations": [5, 3, 8, 2, 7],
  "balanced-parentheses": [40, 91, 123, 125, 93, 41],  // "([{}])"
  "infix-to-postfix": [65, 43, 66, 42, 67],  // "A+B*C"
  "infix-to-prefix": [65, 43, 66, 42, 67],  // "A+B*C"
  "postfix-evaluation": [50, 51, 52, 42, 43],  // "234*+"
  "prefix-evaluation": [43, 50, 42, 51, 52],  // "+2*34"
  "next-greater-element": [4, 5, 2, 10, 8],
  "next-smaller-element": [4, 8, 5, 2, 25],
  "stock-span": [100, 80, 60, 70, 60, 75, 85],
  "largest-rectangle-histogram": [2, 1, 5, 6, 2, 3],
  "valid-stack-sequences": [1, 2, 3, 4, 5],
  // Queues topic
  "queue-operations": [10, 20, 30, 40, 50],
  "circular-queue": [1, 2, 3, 4],
  "deque": [10, 20, 30, 40],
  "priority-queue": [30, 20, 50, 10, 40],
  "queue-using-two-stacks": [1, 2, 3, 4, 5],
  "stack-using-two-queues": [1, 2, 3, 4, 5],
  "lru-cache": [1, 2, 3, 4],
  "sliding-window-maximum": [1, 3, -1, -3, 5, 3, 6, 7],
  "first-non-repeating-character": [97, 98, 99, 97, 100, 99],  // "abcadc"
  "generate-binary-numbers": [],
  "circular-tour": [4, 6, 6, 5, 7, 3, 4, 5],  // petrol1, distance1, petrol2, distance2, ...
  // Linked Lists topic
  "singly-linked-list": [1, 2, 3, 4, 5],
  "doubly-linked-list": [1, 2, 3, 4, 5],
  "circular-linked-list": [1, 2, 3, 4, 5],
  "circular-doubly-linked-list": [1, 2, 3, 4, 5],
  "reverse-linked-list": [1, 2, 3, 4, 5],
  "detect-cycle": [1, 2, 3, 4, 5, 6],
  "find-cycle-start": [1, 2, 3, 4, 5, 6],
  "find-middle": [1, 2, 3, 4, 5, 6, 7],
  "merge-sorted-lists": [1, 3, 5, 2, 4, 6],
  "remove-nth-from-end": [1, 2, 3, 4, 5],
  "palindrome-linked-list": [1, 2, 3, 2, 1],
  "intersection-point": [1, 2, 3, 4, 5, 6, 7, 8],
  "rotate-list": [1, 2, 3, 4, 5],
  "flatten-multilevel-list": [1, 2, 3, 4, 5, 6, 7],
  // Recursion
  "factorial-recursion": [], // Uses params
  "fibonacci-recursion": [], // Uses params
  "sum-digits-recursion": [], // Uses params
  "power-recursion": [], // Uses params
  "gcd-recursion": [], // Uses params
  "hanoi-recursion": [], // Uses params
  "binary-search-recursion": [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
  // Backtracking
  "n-queens": [], // Uses params
  "sudoku-solver": [], // Uses default grid or params
  "rat-in-maze": [], // Uses default grid
  "generate-permutations": [65, 66, 67], // "ABC"
  // Trees (level-order array representation, -1 = null)
  "inorder-traversal": [1, 2, 3, 4, 5, 6, 7],  // Balanced BST
  "preorder-traversal": [1, 2, 3, 4, 5, 6, 7],
  "postorder-traversal": [1, 2, 3, 4, 5, 6, 7],
  "level-order-traversal": [1, 2, 3, 4, 5, 6, 7],
  "tree-height": [1, 2, 3, 4, 5, -1, 7, 8],  // Unbalanced
  "is-balanced": [1, 2, 3, 4, 5, 6, 7],  // Balanced
  "is-bst": [8, 3, 10, 1, 6, -1, 14, -1, -1, 4, 7],  // Valid BST
  "bst-operations": [50, 30, 70, 20, 40, 60, 80],  // BST
  "lowest-common-ancestor": [6, 2, 8, 0, 4, 7, 9, -1, -1, 3, 5],  // BST for LCA
  // Dynamic Programming
  "fibonacci-dp": [],  // Uses params
  "climbing-stairs": [],  // Uses params
  "house-robber": [2, 7, 9, 3, 1],  // House values
  "lis": [10, 22, 9, 33, 21, 50, 41, 60, 80],
  "coin-change": [1, 2, 5],  // Coin denominations
  "knapsack-01": [2, 3, 4, 5, 10, 40, 30, 50],  // weight1, value1, weight2, value2, ...
  "lcs": [],  // Uses params
  "edit-distance": [],  // Uses params
  "matrix-chain-multiplication": [10, 30, 5, 60],  // Matrix dimensions
  "unique-paths": [],  // Uses params
  "min-path-sum": [1, 3, 1, 1, 5, 1, 4, 2, 1],  // 3x3 grid
  "subset-sum": [3, 34, 4, 12, 5, 2],
  "partition-equal-subset-sum": [1, 5, 11, 5],
  "rod-cutting": [1, 5, 8, 9, 10, 17, 17, 20],  // Prices for lengths 1-8
  "word-break": [],  // Uses params
};

// Map algorithm IDs to their info
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const algorithmInfoMap: Record<string, any> = {
  // Arrays
  "array-operations": arrayOperationsInfo,
  "two-pointers": twoPointersInfo,
  "sliding-window": slidingWindowInfo,
  "prefix-sum": prefixSumInfo,
  "kadanes": kadanesInfo,
  "dutch-national-flag": dutchNationalFlagInfo,
  "moores-voting": mooresVotingInfo,
  "merge-sorted-arrays": mergeSortedArraysInfo,
  "rotate-array": rotateArrayInfo,
  "array-rearrangement": arrayRearrangementInfo,
  "next-permutation": nextPermutationInfo,
  // Sorting
  "bubble-sort": bubbleSortInfo,
  "selection-sort": selectionSortInfo,
  "insertion-sort": insertionSortInfo,
  "cocktail-shaker-sort": cocktailShakerSortInfo,
  "shell-sort": shellSortInfo,
  "cycle-sort": cycleSortInfo,
  "merge-sort": mergeSortInfo,
  "quick-sort": quickSortInfo,
  "heap-sort": heapSortInfo,
  "counting-sort": countingSortInfo,
  "radix-sort": radixSortInfo,
  "bucket-sort": bucketSortInfo,
  "pigeonhole-sort": pigeonholeSortInfo,
  "tim-sort": timSortInfo,
  "intro-sort": introSortInfo,
  // Heaps
  "max-heap": maxHeapInfo,
  "min-heap": minHeapInfo,
  "build-heap": buildHeapInfo,
  "kth-largest": kthLargestInfo,
  "kth-smallest": kthSmallestInfo,
  "merge-k-sorted-lists": mergeKSortedListsInfo,
  "top-k-frequent": topKFrequentInfo,
  "median-of-stream": medianOfStreamInfo,
  // Strings
  "string-operations": stringOperationsInfo,
  "character-frequency": characterFrequencyInfo,
  "brute-force-search": bruteForceSearchInfo,
  "kmp-algorithm": kmpAlgorithmInfo,
  "rabin-karp": rabinKarpInfo,
  "z-algorithm": zAlgorithmInfo,
  "boyer-moore": boyerMooreInfo,
  "anagram-detection": anagramDetectionInfo,
  "longest-palindromic-substring": longestPalindromicSubstringInfo,
  "longest-common-substring": longestCommonSubstringInfo,
  "string-rotation": stringRotationInfo,
  "remove-duplicates": removeDuplicatesInfo,
  // Searching
  "linear-search": linearSearchInfo,
  "sentinel-linear-search": sentinelLinearSearchInfo,
  "bidirectional-search": bidirectionalSearchInfo,
  "binary-search": binarySearchInfo,
  "lower-bound": lowerBoundInfo,
  "upper-bound": upperBoundInfo,
  "search-insert-position": searchInsertPositionInfo,
  "peak-element": peakElementInfo,
  "rotated-array-search": rotatedArraySearchInfo,
  "rotated-array-min": rotatedArrayMinInfo,
  "jump-search": jumpSearchInfo,
  "interpolation-search": interpolationSearchInfo,
  "exponential-search": exponentialSearchInfo,
  "fibonacci-search": fibonacciSearchInfo,
  "ternary-search": ternarySearchInfo,
  "matrix-binary-search": matrixBinarySearchInfo,
  // Stacks
  "stack-operations": stackOperationsInfo,
  "balanced-parentheses": balancedParenthesesInfo,
  "infix-to-postfix": infixToPostfixInfo,
  "infix-to-prefix": infixToPrefixInfo,
  "postfix-evaluation": postfixEvaluationInfo,
  "prefix-evaluation": prefixEvaluationInfo,
  "next-greater-element": nextGreaterElementInfo,
  "next-smaller-element": nextSmallerElementInfo,
  "stock-span": stockSpanInfo,
  "largest-rectangle-histogram": largestRectangleHistogramInfo,
  "valid-stack-sequences": validStackSequencesInfo,
  // Queues
  "queue-operations": queueOperationsInfo,
  "circular-queue": circularQueueInfo,
  "deque": dequeInfo,
  "priority-queue": priorityQueueInfo,
  "queue-using-two-stacks": queueUsingTwoStacksInfo,
  "stack-using-two-queues": stackUsingTwoQueuesInfo,
  "lru-cache": lruCacheInfo,
  "sliding-window-maximum": slidingWindowMaximumInfo,
  "first-non-repeating-character": firstNonRepeatingCharacterInfo,
  "generate-binary-numbers": generateBinaryNumbersInfo,
  "circular-tour": circularTourInfo,
  // Linked Lists
  "singly-linked-list": singlyLinkedListInfo,
  "doubly-linked-list": doublyLinkedListInfo,
  "circular-linked-list": circularLinkedListInfo,
  "circular-doubly-linked-list": circularDoublyLinkedListInfo,
  "reverse-linked-list": reverseLinkedListInfo,
  "detect-cycle": detectCycleInfo,
  "find-cycle-start": findCycleStartInfo,
  "find-middle": findMiddleInfo,
  "merge-sorted-lists": mergeSortedListsInfo,
  "remove-nth-from-end": removeNthFromEndInfo,
  "palindrome-linked-list": palindromeLinkedListInfo,
  "intersection-point": intersectionPointInfo,
  "rotate-list": rotateListInfo,
  "flatten-multilevel-list": flattenMultilevelListInfo,
  // Recursion
  "factorial-recursion": factorialInfo,
  "fibonacci-recursion": fibonacciInfo,
  "sum-digits-recursion": sumDigitsInfo,
  "power-recursion": powerInfo,
  "gcd-recursion": gcdInfo,
  "hanoi-recursion": hanoiInfo,
  "binary-search-recursion": binarySearchRecursiveInfo,
  // Backtracking
  "n-queens": nQueensInfo,
  "sudoku-solver": sudokuInfo,
  "rat-in-maze": ratMazeInfo,
  "generate-permutations": permutationsInfo,
  // Trees
  "inorder-traversal": inorderTraversalInfo,
  "preorder-traversal": preorderTraversalInfo,
  "postorder-traversal": postorderTraversalInfo,
  "level-order-traversal": levelOrderTraversalInfo,
  "tree-height": treeHeightInfo,
  "is-balanced": isBalancedInfo,
  "is-bst": isBSTInfo,
  "bst-operations": bstOperationsInfo,
  "lowest-common-ancestor": lowestCommonAncestorInfo,
  // Graphs
  "bfs": bfsInfo,
  "dfs": dfsInfo,
  "dijkstra": dijkstraInfo,
  "bellman-ford": bellmanFordInfo,
  "floyd-warshall": floydWarshallInfo,
  "astar": astarInfo,
  "kruskal": kruskalInfo,
  "prim": primInfo,
  "kahns": kahnsInfo,
  "dfs-topo-sort": dfsTopoSortInfo,
  "connected-components": connectedComponentsInfo,
  "kosaraju": kosarajuInfo,
  "tarjan": tarjanInfo,
  "cycle-undirected": cycleUndirectedInfo,
  "cycle-directed": cycleDirectedInfo,
  "adjacency-matrix": adjacencyMatrixInfo,
  "adjacency-list": adjacencyListInfo,
  // Hashing
  "hash-functions": hashFunctionsInfo,
  "chaining-hash-table": chainingHashTableInfo,
  "open-addressing-hash-table": openAddressingHashTableInfo,
  "rehashing": rehashingInfo,
  "two-sum-hashmap": twoSumHashingInfo,
  "group-anagrams": groupAnagramsInfo,
  "longest-consecutive-sequence": longestConsecutiveSequenceInfo,
  "subarray-zero-sum": subarrayZeroSumInfo,
  "count-distinct-window": countDistinctWindowInfo,
  // Dynamic Programming
  "fibonacci-dp": fibonacciDPInfo,
  "climbing-stairs": climbingStairsInfo,
  "house-robber": houseRobberInfo,
  "lis": lisInfo,
  "coin-change": coinChangeInfo,
  "knapsack-01": knapsackInfo,
  "lcs": lcsInfo,
  "edit-distance": editDistanceInfo,
  "matrix-chain-multiplication": matrixChainMultiplicationInfo,
  "unique-paths": uniquePathsInfo,
  "min-path-sum": minPathSumInfo,
  "subset-sum": subsetSumInfo,
  "partition-equal-subset-sum": partitionEqualSubsetSumInfo,
  "rod-cutting": rodCuttingInfo,
  "word-break": wordBreakInfo,
  //Greedy Algorithms
  "activity-selection": activitySelectionInfo,
  "job-sequencing": jobSequencingInfo,
  "meeting-rooms": meetingRoomsInfo,
  "fractional-knapsack": fractionalKnapsackInfo,
  "huffman-coding": huffmanCodingInfo,
  "minimum-platforms": minimumPlatformsInfo,
  "merge-intervals": mergeIntervalsInfo,
  "insert-interval": insertIntervalInfo,
  "non-overlapping-intervals": nonOverlappingIntervalsInfo,
};

// Map algorithm IDs to their category
const algorithmCategoryMap: Record<string, string> = {
  "array-operations": "arrays",
  "two-pointers": "arrays",
  "sliding-window": "arrays",
  "prefix-sum": "arrays",
  "kadanes": "arrays",
  "dutch-national-flag": "arrays",
  "moores-voting": "arrays",
  "merge-sorted-arrays": "arrays",
  "rotate-array": "arrays",
  "array-rearrangement": "arrays",
  "next-permutation": "arrays",
  "bubble-sort": "sorting",
  "selection-sort": "sorting",
  "insertion-sort": "sorting",
  "cocktail-shaker-sort": "sorting",
  "shell-sort": "sorting",
  "cycle-sort": "sorting",
  "merge-sort": "sorting",
  "quick-sort": "sorting",
  "heap-sort": "sorting",
  "counting-sort": "sorting",
  "radix-sort": "sorting",
  "bucket-sort": "sorting",
  "pigeonhole-sort": "sorting",
  "tim-sort": "sorting",
  "intro-sort": "sorting",
  // Heaps
  "max-heap": "heaps",
  "min-heap": "heaps",
  "build-heap": "heaps",
  "kth-largest": "heaps",
  "kth-smallest": "heaps",
  "merge-k-sorted-lists": "heaps",
  "top-k-frequent": "heaps",
  "median-of-stream": "heaps",
  // Strings
  "string-operations": "strings",
  "character-frequency": "strings",
  "brute-force-search": "strings",
  "kmp-algorithm": "strings",
  "rabin-karp": "strings",
  "z-algorithm": "strings",
  "boyer-moore": "strings",
  "anagram-detection": "strings",
  "longest-palindromic-substring": "strings",
  "longest-common-substring": "strings",
  "string-rotation": "strings",
  "remove-duplicates": "strings",
  // Searching
  "linear-search": "searching",
  "sentinel-linear-search": "searching",
  "bidirectional-search": "searching",
  "binary-search": "searching",
  "lower-bound": "searching",
  "upper-bound": "searching",
  "search-insert-position": "searching",
  "peak-element": "searching",
  "rotated-array-search": "searching",
  "rotated-array-min": "searching",
  "jump-search": "searching",
  "interpolation-search": "searching",
  "exponential-search": "searching",
  "fibonacci-search": "searching",
  "ternary-search": "searching",
  "matrix-binary-search": "searching",
  // Stacks
  "stack-operations": "stacks",
  "balanced-parentheses": "stacks",
  "infix-to-postfix": "stacks",
  "infix-to-prefix": "stacks",
  "postfix-evaluation": "stacks",
  "prefix-evaluation": "stacks",
  "next-greater-element": "stacks",
  "next-smaller-element": "stacks",
  "stock-span": "stacks",
  "largest-rectangle-histogram": "stacks",
  "valid-stack-sequences": "stacks",
  // Queues
  "queue-operations": "queues",
  "circular-queue": "queues",
  "deque": "queues",
  "priority-queue": "queues",
  "queue-using-two-stacks": "queues",
  "stack-using-two-queues": "queues",
  "lru-cache": "queues",
  "sliding-window-maximum": "queues",
  "first-non-repeating-character": "queues",
  "generate-binary-numbers": "queues",
  "circular-tour": "queues",
  // Linked Lists
  "singly-linked-list": "linkedlists",
  "doubly-linked-list": "linkedlists",
  "circular-linked-list": "linkedlists",
  "circular-doubly-linked-list": "linkedlists",
  "reverse-linked-list": "linkedlists",
  "detect-cycle": "linkedlists",
  "find-cycle-start": "linkedlists",
  "find-middle": "linkedlists",
  "merge-sorted-lists": "linkedlists",
  "remove-nth-from-end": "linkedlists",
  "palindrome-linked-list": "linkedlists",
  "intersection-point": "linkedlists",
  "rotate-list": "linkedlists",
  "flatten-multilevel-list": "linkedlists",
  // Recursion
  "factorial-recursion": "recursion",
  "fibonacci-recursion": "recursion",
  "sum-digits-recursion": "recursion",
  "power-recursion": "recursion",
  "gcd-recursion": "recursion",
  "hanoi-recursion": "recursion",
  "binary-search-recursion": "recursion",
  // Backtracking
  "n-queens": "backtracking",
  "sudoku-solver": "backtracking",
  "rat-in-maze": "backtracking",
  "generate-permutations": "backtracking",
  // Trees
  "inorder-traversal": "trees",
  "preorder-traversal": "trees",
  "postorder-traversal": "trees",
  "level-order-traversal": "trees",
  "tree-height": "trees",
  "is-balanced": "trees",
  "is-bst": "trees",
  "bst-operations": "trees",
  "lowest-common-ancestor": "trees",
  // Graphs
  "bfs": "graphs",
  "dfs": "graphs",
  "dijkstra": "graphs",
  "bellman-ford": "graphs",
  "floyd-warshall": "graphs",
  "astar": "graphs",
  "kruskal": "graphs",
  "prim": "graphs",
  "kahns": "graphs",
  "dfs-topo-sort": "graphs",
  "connected-components": "graphs",
  "kosaraju": "graphs",
  "tarjan": "graphs",
  "cycle-undirected": "graphs",
  "cycle-directed": "graphs",
  "adjacency-matrix": "graphs",
  "adjacency-list": "graphs",
  // Hashing
  "hash-functions": "hashing",
  "chaining-hash-table": "hashing",
  "open-addressing-hash-table": "hashing",
  "rehashing": "hashing",
  "two-sum-hashing": "hashing",
  "group-anagrams": "hashing",
  "longest-consecutive-sequence": "hashing",
  "subarray-zero-sum": "hashing",
  "count-distinct-window": "hashing",
  // Dynamic Programming
  "fibonacci-dp": "dp",
  "climbing-stairs": "dp",
  "house-robber": "dp",
  "lis": "dp",
  "coin-change": "dp",
  "knapsack-01": "dp",
  "lcs": "dp",
  "edit-distance": "dp",
  "matrix-chain-multiplication": "dp",
  "unique-paths": "dp",
  "min-path-sum": "dp",
  "subset-sum": "dp",
  "partition-equal-subset-sum": "dp",
  "rod-cutting": "dp",
  "word-break": "dp",
};

interface VisualizerClientProps {
  initialAlgorithm?: string;
  category?: string;
}

export function VisualizerClient({ initialAlgorithm, category }: VisualizerClientProps) {
  const t = useTranslations();

  const { currentSnapshot, loadAlgorithm, input, algorithmId, status, validationError } =
    usePlayerStore();

  // Algorithm parameters state
  const [algorithmParams, setAlgorithmParams] = useState<Record<string, number | string>>({});

  // Mounted state to fix hydration mismatch with Radix UI
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const getDefaultArray = (algoId: string) => algorithmDefaultArrays[algoId] || defaultArray;

  // Determine the default algorithm based on category
  const getDefaultAlgorithmForCategory = (cat?: string) => {
    if (cat === "graphs") return "bfs"; // Default for graphs
    if (cat === "arrays") return "array-operations";
    if (cat === "sorting") return "bubble-sort";
    if (cat === "strings") return "string-operations";
    if (cat === "searching") return "linear-search";
    if (cat === "stacks") return "stack-operations";
    if (cat === "queues") return "queue-operations";
    if (cat === "linkedlists") return "singly-linked-list";
    if (cat === "recursion") return "factorial-recursion";
    if (cat === "backtracking") return "n-queens";
    if (cat === "trees") return "inorder-traversal";
    if (cat === "heaps") return "max-heap";
    if (cat === "dp") return "fibonacci-dp";
    return "bubble-sort";
  };

  // Determine effective selected algorithm
  // If the store's algorithmId doesn't match the current category (e.g. valid graph page but store has 'bubble-sort'),
  // we ignore the store state and use the initialAlgorithm or default.
  const storeAlgoCategory = algorithmId ? algorithmCategoryMap[algorithmId] : null;
  const isCategoryMismatch = category && storeAlgoCategory && storeAlgoCategory !== category;

  const selectedAlgorithm = (!isCategoryMismatch && algorithmId) ? algorithmId : (initialAlgorithm || getDefaultAlgorithmForCategory(category));

  // Check if this is a stack or queue algorithm (allows empty arrays)
  const isStackOrQueueAlgorithm = algorithmCategoryMap[selectedAlgorithm] === 'stacks' || algorithmCategoryMap[selectedAlgorithm] === 'queues';

  // Safe cast for array input usage
  const inputArray = Array.isArray(input) ? input : [];

  // For stack/queue algorithms, allow empty arrays; for others, fall back to default
  // Only apply default if input is empty array AND we are not allow empty
  const currentInputArray = (inputArray.length > 0 || isStackOrQueueAlgorithm) ? inputArray : getDefaultArray(selectedAlgorithm);
  // Note: For Graphs, currentInputArray might be irrelevant or we need currentGraphInput

  const algorithm = getAlgorithm(selectedAlgorithm);
  const allAlgorithms = getAllAlgorithms();

  // ...

  // Filter algorithms by category if provided
  // Recursion category also includes backtracking algorithms (shown together in topics)
  const algorithms = category
    ? allAlgorithms.filter(algo => {
      if (category === 'recursion') {
        return algo.category === 'recursion' || algo.category === 'backtracking';
      }
      return algo.category === category;
    })
    : allAlgorithms;

  const algorithmInfo = algorithmInfoMap[selectedAlgorithm];

  // Load initial algorithm from URL param on mount
  useEffect(() => {
    if (initialAlgorithm) {
      // For graphs, we might need a default graph. For now, getDefaultArray returns array.
      // We will handle graph default in GraphInputEditor or below
      loadAlgorithm(initialAlgorithm, getDefaultArray(initialAlgorithm));
    }
    // eslint-disable-next-line react-hooks-exhaustive-deps
  }, [initialAlgorithm]);

  // Reset params when algorithm changes
  useEffect(() => {
    setAlgorithmParams({});
  }, [selectedAlgorithm]);

  const handleRun = () => {
    const state = usePlayerStore.getState();
    const algoId = state.algorithmId || "bubble-sort";
    const algoCategory = algorithmCategoryMap[algoId];

    // Check input type
    const currentInput = state.input; // Can be array or object

    if (algoCategory === 'graphs') {
      // Graph algos run with object input
      // If input is array (from default init), we might need to convert or fail
      // Ideally GraphInputEditor handles this
      if (currentInput && !Array.isArray(currentInput)) {
        loadAlgorithm(algoId, currentInput, algorithmParams);
      }
      return;
    }

    const isStackOrQueue = algoCategory === 'stacks' || algoCategory === 'queues';
    const isRecursionOrBacktracking = algoCategory === 'recursion' || algoCategory === 'backtracking';

    // For Array/String algos, use inputArray logic
    const inputArr = Array.isArray(currentInput) ? currentInput : getDefaultArray(algoId);

    const inputToUse = (inputArr.length > 0 || isStackOrQueue || isRecursionOrBacktracking) ? inputArr : getDefaultArray(algoId);

    // Stack/Queue and Recursion/Backtracking algorithms can have 0 elements, others need at least 2
    const minRequired = (isStackOrQueue || isRecursionOrBacktracking) ? 0 : 2;
    if (inputToUse.length >= minRequired) {
      loadAlgorithm(algoId, inputToUse, algorithmParams);
    }
  };

  const handleAlgorithmChange = (algoId: string) => {
    const algoCategory = algorithmCategoryMap[algoId];

    if (algoCategory === 'graphs') {
      // For graphs, we provide a valid default input to prevent validation crashes
      // We need a minimal valid graph that passes validation (must have nodes)
      const directedAlgos = ['kahns', 'dfs-topo-sort', 'cycle-directed', 'kosaraju'];
      const isDirected = directedAlgos.includes(algoId);

      const graphDefault: GraphInput = {
        isDirected: isDirected,
        isWeighted: false,
        nodes: [{ id: 'A', label: 'A', x: 100, y: 100 }],
        edges: []
      };
      usePlayerStore.setState({ input: graphDefault });
      loadAlgorithm(algoId, graphDefault);
    } else {
      // Always use the algorithm-specific default when switching
      const algoDefault = getDefaultArray(algoId);
      usePlayerStore.setState({ input: algoDefault });
      loadAlgorithm(algoId, algoDefault);
    }
  };

  const handleInputChange = (values: number[]) => {
    usePlayerStore.setState({ input: values });
  };

  useEffect(() => {
    handleRun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arrayState = currentSnapshot?.arrayState ?? currentInputArray;
  const markedIndices = currentSnapshot?.markedIndices ?? new Map();
  const highlightedLines = currentSnapshot?.highlightedLines ?? [];
  const message = currentSnapshot?.message ?? t("player.ready");
  const metrics = currentSnapshot?.metrics ?? { comparisons: 0, swaps: 0 };
  const pointers = currentSnapshot?.pointers ?? [];
  const variables = currentSnapshot?.variables ?? [];
  const expression = currentSnapshot?.expression;
  const auxiliaryState = currentSnapshot?.auxiliaryState;

  const getOperationType = () => {
    if (message?.toLowerCase().includes("swap")) return "swap" as const;
    if (message?.toLowerCase().includes("compar")) return "compare" as const;
    if (message?.toLowerCase().includes("sorted") || message?.toLowerCase().includes("final"))
      return "mark" as const;
    return "idle" as const;
  };

  // Get formatted operation title for array operations
  const getOperationTitle = () => {
    const operation = algorithmParams?.operation as string || 'traversal';
    const targetIndex = algorithmParams?.targetIndex ?? 2;
    const newValue = algorithmParams?.newValue ?? 99;
    const searchValue = algorithmParams?.searchValue ?? 5;

    const titles: Record<string, string> = {
      'traversal': 'Traversal',
      'access-index': `Access Index (${targetIndex})`,
      'linear-search': `Searching Element (${searchValue})`,
      'find-min': 'Find Minimum',
      'find-max': 'Find Maximum',
      'insert-beginning': `Insert at Beginning (${newValue})`,
      'insert-middle': `Insert at Middle (${newValue})`,
      'insert-index': `Insert at Index ${targetIndex} (${newValue})`,
      'insert-end': `Insert at End (${newValue})`,
      'delete-beginning': 'Delete from Beginning',
      'delete-middle': 'Delete from Middle',
      'delete-index': `Delete at Index (${targetIndex})`,
      'delete-end': 'Delete from End',
      'update-beginning': `Update Beginning → ${newValue}`,
      'update-middle': `Update Middle → ${newValue}`,
      'update-index': `Update Index ${targetIndex} → ${newValue}`,
      'update-end': `Update End → ${newValue}`,
      'reverse': 'Reverse Array',
    };

    return titles[operation] || 'Array Operation';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* LEFT SIDEBAR - Static Content (Desktop only) */}
      <div className="hidden lg:block lg:col-span-3 space-y-4 order-2 lg:order-1">
        {/* Pseudocode */}
        {algorithm && (
          <CodePanel
            lines={algorithm.pseudocodeLines}
            highlightedLines={highlightedLines}
          />
        )}

        {/* Complexity info */}
        {algorithm && (
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
            <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3">
              {t("visualizer.complexity")}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">{t("visualizer.timeBest")}</span>
                <span className="font-mono text-[var(--text-primary)]">{algorithm.timeComplexity.best}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">{t("visualizer.timeAvg")}</span>
                <span className="font-mono text-[var(--text-primary)]">{algorithm.timeComplexity.average}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">{t("visualizer.timeWorst")}</span>
                <span className="font-mono text-[var(--text-primary)]">{algorithm.timeComplexity.worst}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[var(--border-primary)]">
                <span className="text-[var(--text-secondary)]">{t("visualizer.space")}</span>
                <span className="font-mono text-[var(--text-primary)]">{algorithm.spaceComplexity}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CENTER - Main Visualization */}
      <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">

        {/* Header bar */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
          {/* Algorithm selector */}
          {mounted && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden xs:inline">{algorithm?.name ?? t("visualizer.selectAlgorithm")}</span>
                  <span className="xs:hidden">{algorithm?.name?.split(" ")[0] ?? "Select"}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {algorithms.map((algo) => (
                  <DropdownMenuItem
                    key={algo.id}
                    onClick={() => handleAlgorithmChange(algo.id)}
                    className={selectedAlgorithm === algo.id ? "bg-[var(--bg-tertiary)]" : ""}
                  >
                    {algo.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {!mounted && (
            <Button variant="outline" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden xs:inline">{algorithm?.name ?? "Select Algorithm"}</span>
              <span className="xs:hidden">{algorithm?.name?.split(" ")[0] ?? "Select"}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}

          {/* Legend - context-aware based on algorithm type */}
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs ml-auto">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm" style={{ background: "var(--color-accent-compare)" }} />
              <span className="text-[var(--text-secondary)]">{t("visualizer.comparing")}</span>
            </div>
            {/* Show Window legend for sliding window/prefix sum, Swapping for sorting */}
            {(selectedAlgorithm === 'sliding-window' || selectedAlgorithm === 'prefix-sum') ? (
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm" style={{ background: "var(--color-secondary-500)" }} />
                <span className="text-[var(--text-secondary)]">Window</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm" style={{ background: "var(--color-accent-swap)" }} />
                <span className="text-[var(--text-secondary)]">{t("visualizer.swapping")}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm" style={{ background: "var(--color-accent-sorted)" }} />
              <span className="text-[var(--text-secondary)]">{selectedAlgorithm === 'sliding-window' || selectedAlgorithm === 'prefix-sum' ? 'Result' : t("visualizer.sorted")}</span>
            </div>
          </div>

          {/* Metrics - left aligned when wrapped */}
          <div className="flex items-center gap-3 sm:gap-4 sm:ml-auto text-xs sm:text-sm ml-auto">
            <div className="flex items-center gap-1">
              <ArrowDownUp className="h-3 w-3 sm:h-4 sm:w-4 text-[var(--color-accent-compare)]" />
              <span className="text-[var(--text-secondary)]">{t("visualizer.comparisons")}:</span>
              <span className="font-semibold text-[var(--text-primary)]">{metrics.comparisons}</span>
            </div>
            <div className="flex items-center gap-1">
              <ArrowDownUp className="h-3 w-3 sm:h-4 sm:w-4 text-[var(--color-accent-swap)]" />
              <span className="text-[var(--text-secondary)]">{t("visualizer.swaps")}:</span>
              <span className="font-semibold text-[var(--text-primary)]">{metrics.swaps}</span>
            </div>
          </div>
        </div>

        {/* MOBILE: Input Array after algorithm selector (< 1024px) */}
        <div className="lg:hidden p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
          {selectedAlgorithm === 'balanced-parentheses' ? (
            <ParenthesesInputEditor
              value={currentInputArray}
              onChange={handleInputChange}
              onApply={() => handleRun()}
            />
          ) : ['infix-to-postfix', 'infix-to-prefix', 'postfix-evaluation', 'prefix-evaluation'].includes(selectedAlgorithm) ? (
            <ExpressionInputEditor
              value={currentInputArray}
              onChange={handleInputChange}
              onApply={() => handleRun()}
            />
          ) : category === 'strings' || algorithmCategoryMap[selectedAlgorithm] === 'strings' ? (
            <StringInputEditor
              value={currentInputArray}
              onChange={handleInputChange}
              onApply={() => handleRun()}
              algorithmParams={
                algorithm?.parameters && algorithm.parameters.length > 0 ? (
                  <AlgorithmParams
                    parameters={algorithm.parameters}
                    values={algorithmParams}
                    onChange={setAlgorithmParams}
                  />
                ) : undefined
              }
            />
          ) : selectedAlgorithm === 'generate-binary-numbers' ? (
            /* Params-only view for Generate Binary Numbers */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[var(--text-primary)]">
                  Binary Number Generation
                </label>
              </div>
              <div className="px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-sm text-[var(--text-secondary)]">
                Generates binary numbers 1 to N using a queue
              </div>
              {algorithm?.parameters && algorithm.parameters.length > 0 && (
                <AlgorithmParams
                  parameters={algorithm.parameters}
                  values={algorithmParams}
                  onChange={setAlgorithmParams}
                />
              )}
              <Button
                onClick={() => handleRun()}
                className="w-full gap-2 bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] hover:from-[var(--color-primary-600)] hover:to-[var(--color-secondary-600)]"
              >
                <Play className="h-4 w-4" />
                Generate
              </Button>
            </div>
          ) : (
            <ArrayInputEditor
              value={currentInputArray}
              onChange={handleInputChange}
              onApply={() => handleRun()}
              algorithmId={selectedAlgorithm}
              onParamsChange={(params) => setAlgorithmParams(prev => ({ ...prev, ...params }))}
              displayAsChars={selectedAlgorithm === 'first-non-repeating-character'}
              algorithmParams={
                algorithm?.parameters && algorithm.parameters.length > 0 ? (
                  <AlgorithmParams
                    parameters={algorithm.parameters}
                    values={algorithmParams}
                    onChange={setAlgorithmParams}
                  />
                ) : undefined
              }
            />
          )}

          {/* Validation Error Display */}
          {validationError && (
            <div className="mt-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-red-500 flex-shrink-0">⚠️</span>
                <span>{validationError}</span>
              </div>
            </div>
          )}
        </div>

        {/* Array Bars Visualization */}
        <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
          {/* Operation Display Header */}
          <div className="px-4 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-tertiary)]">
            {/* Operation Title - only for array-operations algorithm */}
            {selectedAlgorithm === 'array-operations' && (
              <div className="text-sm font-semibold text-[var(--color-primary-500)] mb-1">
                Operation: {getOperationTitle()}
              </div>
            )}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs text-[var(--text-secondary)] truncate">
                  {message || 'Ready'}
                </span>
              </div>
              {expression && (
                <span className="text-xs font-mono text-[var(--color-primary-500)] bg-[var(--bg-secondary)] px-2 py-0.5 rounded flex-shrink-0">
                  {expression}
                </span>
              )}
            </div>
            {/* Show current variables if any */}
            {variables.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {variables.map((v, i) => (
                  <span
                    key={i}
                    className={`text-xs font-mono px-1.5 py-0.5 rounded ${v.highlight
                      ? 'bg-[var(--color-primary-500)]/20 text-[var(--color-primary-500)]'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                      }`}
                  >
                    {v.name}={v.value}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="h-[280px] sm:h-[320px] p-2 sm:p-4">
            {category === 'strings' || algorithmCategoryMap[selectedAlgorithm] === 'strings' ||
              ['balanced-parentheses', 'infix-to-postfix', 'infix-to-prefix', 'postfix-evaluation', 'prefix-evaluation'].includes(selectedAlgorithm) ? (
              <StringBars values={arrayState} markedIndices={markedIndices} pointers={pointers} />
            ) : category === 'graphs' || algorithmCategoryMap[selectedAlgorithm] === 'graphs' ? (
              <GraphView
                graphState={{
                  nodes: ((input as any)?.nodes)?.map((n: any) => ({ ...n, state: 'default' })) || [],
                  edges: ((input as any)?.edges)?.map((e: any) => ({ ...e, state: 'default' })) || [],
                  isDirected: (input as any)?.isDirected || false,
                  isWeighted: (input as any)?.isWeighted || false,
                }}
              />
            ) : (
              <ArrayBars
                values={arrayState}
                markedIndices={markedIndices}
                pointers={pointers}
                displayAsChars={selectedAlgorithm === 'first-non-repeating-character'}
              />
            )}
          </div>
        </div>

        {/* Algorithm-Specific Visualization */}
        {auxiliaryState && (
          <AlgorithmView auxiliaryState={auxiliaryState} />
        )}

        {/* Player controls */}
        <div className="p-3 sm:p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
          <PlayerControls />
        </div>

        {/* MOBILE: Variables Panel (< 1024px) */}
        <div className="lg:hidden">
          <CurrentOperation message={message} operationType={getOperationType()} />
        </div>
        <div className="lg:hidden">
          <VariablesPanel variables={variables} expression={expression} />
        </div>

        {/* MOBILE: Pseudocode (< 1024px) */}
        <div className="lg:hidden">
          {algorithm && (
            <CodePanel lines={algorithm.pseudocodeLines} highlightedLines={highlightedLines} />
          )}
        </div>

        {/* MOBILE: Complexity (< 1024px) */}
        <div className="lg:hidden">
          {algorithm && (
            <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
              <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3">
                {t("visualizer.complexity")}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">{t("visualizer.timeBest")}</span>
                  <span className="font-mono text-[var(--text-primary)]">{algorithm.timeComplexity.best}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">{t("visualizer.timeAvg")}</span>
                  <span className="font-mono text-[var(--text-primary)]">{algorithm.timeComplexity.average}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">{t("visualizer.timeWorst")}</span>
                  <span className="font-mono text-[var(--text-primary)]">{algorithm.timeComplexity.worst}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[var(--border-primary)]">
                  <span className="text-[var(--text-secondary)]">{t("visualizer.space")}</span>
                  <span className="font-mono text-[var(--text-primary)]">{algorithm.spaceComplexity}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Algorithm Info Card */}
        {algorithmInfo && <AlgorithmInfoCard info={algorithmInfo} />}
      </div>

      {/* RIGHT SIDEBAR - Dynamic Content (Desktop only) */}
      <div className="hidden lg:block lg:col-span-3 space-y-4 order-3">
        {/* Input editor with Algorithm Parameters */}
        <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] space-y-4">
          {selectedAlgorithm === 'balanced-parentheses' ? (
            <ParenthesesInputEditor
              value={currentInputArray}
              onChange={handleInputChange}
              onApply={() => handleRun()}
            />
          ) : ['infix-to-postfix', 'infix-to-prefix', 'postfix-evaluation', 'prefix-evaluation'].includes(selectedAlgorithm) ? (
            <ExpressionInputEditor
              value={currentInputArray}
              onChange={handleInputChange}
              onApply={() => handleRun()}
            />
          ) : category === 'strings' || algorithmCategoryMap[selectedAlgorithm] === 'strings' ? (
            <StringInputEditor
              value={currentInputArray}
              onChange={handleInputChange}
              onApply={() => handleRun()}
              algorithmParams={
                algorithm?.parameters && algorithm.parameters.length > 0 ? (
                  <AlgorithmParams
                    parameters={algorithm.parameters}
                    values={algorithmParams}
                    onChange={setAlgorithmParams}
                  />
                ) : undefined
              }
            />
          ) : selectedAlgorithm === 'generate-binary-numbers' ? (
            /* Params-only view for Generate Binary Numbers */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[var(--text-primary)]">
                  Binary Number Generation
                </label>
              </div>
              <div className="px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-sm text-[var(--text-secondary)]">
                Generates binary numbers 1 to N using a queue
              </div>
              {algorithm?.parameters && algorithm.parameters.length > 0 && (
                <AlgorithmParams
                  parameters={algorithm.parameters}
                  values={algorithmParams}
                  onChange={setAlgorithmParams}
                />
              )}
              <Button
                onClick={() => handleRun()}
                className="w-full gap-2 bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] hover:from-[var(--color-primary-600)] hover:to-[var(--color-secondary-600)]"
              >
                <Play className="h-4 w-4" />
                Generate
              </Button>
            </div>
          ) : (category === 'graphs' || algorithmCategoryMap[selectedAlgorithm] === 'graphs') ? (
            <GraphInputEditor
              value={input}
              onChange={(val) => { usePlayerStore.setState({ input: val }); }}
              onApply={() => handleRun()}
              algorithmId={selectedAlgorithm}
              parameters={algorithm?.parameters}
              paramValues={algorithmParams}
              onParamsChange={setAlgorithmParams}
            />
          ) : (
            <ArrayInputEditor
              value={currentInputArray}
              onChange={handleInputChange}
              onApply={() => handleRun()}
              algorithmId={selectedAlgorithm}
              onParamsChange={(params) => setAlgorithmParams(prev => ({ ...prev, ...params }))}
              displayAsChars={selectedAlgorithm === 'first-non-repeating-character'}
              algorithmParams={
                algorithm?.parameters && algorithm.parameters.length > 0 ? (
                  <AlgorithmParams
                    parameters={algorithm.parameters}
                    values={algorithmParams}
                    onChange={setAlgorithmParams}
                  />
                ) : undefined
              }
            />
          )}
        </div>

        {/* Current Operation */}
        <CurrentOperation message={message} operationType={getOperationType()} />

        {/* Variables Panel */}
        <VariablesPanel variables={variables} expression={expression} />

        {/* Output Panel - Show when finished */}
        {status === 'finished' && (
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-green-500/50">
            <h3 className="text-sm font-medium text-[var(--text-primary)] mb-2 flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Result:
            </h3>

            {/* Display result based on type */}
            {currentSnapshot?.result ? (
              <div className="font-mono text-sm text-[var(--color-primary-500)] bg-[var(--bg-secondary)] rounded-lg p-2 break-all">
                {currentSnapshot.result.type === 'string' && (
                  <span>"{currentSnapshot.result.value as string}"</span>
                )}
                {currentSnapshot.result.type === 'indices' && (
                  <span>[{(currentSnapshot.result.value as number[]).join(', ')}]</span>
                )}
                {currentSnapshot.result.type === 'boolean' && (
                  <span className={currentSnapshot.result.value ? 'text-green-500' : 'text-red-500'}>
                    {currentSnapshot.result.value ? 'TRUE ✓' : 'FALSE ✗'}
                  </span>
                )}
                {currentSnapshot.result.type === 'frequency' && (
                  <span>{currentSnapshot.result.value as string}</span>
                )}
                {currentSnapshot.result.type === 'search' && (
                  <span className={typeof currentSnapshot.result.value === 'number' && currentSnapshot.result.value >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {currentSnapshot.result.label
                      ? `${currentSnapshot.result.label}: ${currentSnapshot.result.value}`
                      : (typeof currentSnapshot.result.value === 'number' && currentSnapshot.result.value >= 0
                        ? `Element Found at Index ${currentSnapshot.result.value}`
                        : 'Element Not Present')}
                  </span>
                )}
              </div>
            ) : (selectedAlgorithm === 'sliding-window' || selectedAlgorithm === 'prefix-sum') && auxiliaryState?.countArray ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--text-secondary)]">Indices:</span>
                    <span className="font-mono text-sm text-[var(--color-primary-500)] bg-[var(--bg-secondary)] rounded px-2 py-0.5">
                      [{auxiliaryState.countArray[0]?.index ?? 0}..{(auxiliaryState.countArray[0]?.index ?? 0) + auxiliaryState.countArray.length - 1}]
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--text-secondary)]">Elements:</span>
                    <span className="font-mono text-sm text-[var(--color-secondary-500)] bg-[var(--bg-secondary)] rounded px-2 py-0.5">
                      [{auxiliaryState.countArray.map(item => item.count).join(', ')}]
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--text-secondary)]">{selectedAlgorithm === 'sliding-window' ? 'Max Sum:' : 'Range Sum:'}</span>
                    <span className="font-mono text-sm font-bold text-[var(--color-accent-sorted)] bg-[var(--bg-secondary)] rounded px-2 py-0.5">
                      {auxiliaryState.countArray.map(item => item.count).join(' + ')} = {auxiliaryState.countArray.reduce((sum, item) => sum + item.count, 0)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-tertiary)] mt-2">
                  {auxiliaryState.countArray.length} elements in {selectedAlgorithm === 'sliding-window' ? 'window' : 'range'}
                </p>
              </>
            ) : (
              <>
                <div className="font-mono text-sm text-[var(--color-primary-500)] bg-[var(--bg-secondary)] rounded-lg p-2 break-all">
                  {category === 'strings' || algorithmCategoryMap[selectedAlgorithm] === 'strings' ? (
                    `"${arrayState.map(code => String.fromCharCode(code)).join('')}"`
                  ) : (
                    `[${arrayState.join(', ')}]`
                  )}
                </div>
                <p className="text-xs text-[var(--text-tertiary)] mt-2">
                  {category === 'strings' || algorithmCategoryMap[selectedAlgorithm] === 'strings'
                    ? `${arrayState.length} characters`
                    : `${arrayState.length} elements`
                  }
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
