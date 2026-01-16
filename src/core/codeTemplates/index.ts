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
