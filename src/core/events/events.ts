/**
 * Event types emitted by algorithms during execution.
 * These events are consumed by the player and visualizers.
 */

export type AlgoEventType =
  | 'compare'
  | 'swap'
  | 'set'
  | 'visit'
  | 'mark'
  | 'unmark'
  | 'message'
  | 'highlight'
  | 'metric'
  | 'push'
  | 'pop'
  | 'enqueue'
  | 'dequeue'
  | 'pointer'
  | 'auxiliary'
  | 'result';

/**
 * Auxiliary state for algorithm-specific visualizations
 */
export interface BucketData {
  id: number;
  label: string;
  values: number[];
  highlight?: boolean;
}

export interface HeapNode {
  value: number;
  index: number;
  highlight?: boolean;
  isRemoving?: boolean;
  swapWith?: number;  // Value being swapped with
  reason?: string;    // Why swap is happening
  left?: number;
  right?: number;
}

export interface CountArrayItem {
  index: number;
  count: number;
  highlight?: boolean;
}

export interface MergeData {
  leftArr: number[];
  rightArr: number[];
  leftIdx: number;
  rightIdx: number;
  leftStart: number;
  rightStart: number;
}

export interface GapData {
  gap: number;
  gaps: number[];  // Sequence so far
  currentIdx: number;
  comparingIdx: number;
}

export interface PartitionData {
  low: number;
  high: number;
  pivotIdx: number;
  pivotValue: number;
  i: number;  // Boundary of elements less than pivot
}

export interface RunData {
  runs: { start: number; end: number }[];
  currentRun?: number;
  phase: 'detecting' | 'sorting' | 'merging';
}

export interface ModeData {
  mode: 'quicksort' | 'heapsort' | 'insertion';
  depth: number;
  maxDepth: number;
  range: { lo: number; hi: number };
}

export interface VotingData {
  candidate: number | null;
  count: number;
  phase: 'finding' | 'verifying' | 'result';
  verifyCount?: number;
  threshold?: number;
  isMajority?: boolean;
}

// ============ String Visualization Data ============

export interface StringCharacterData {
  char: string;
  index: number;
  highlight?: 'match' | 'mismatch' | 'current' | 'pattern' | 'found';
  isPattern?: boolean;
}

export interface StringCharsState {
  text: StringCharacterData[];
  pattern?: StringCharacterData[];
  patternOffset?: number;  // Where pattern is aligned in text
  matchPositions?: number[];  // Found match positions
}

export interface FrequencyData {
  char: string;
  count: number;
  highlight?: boolean;
}

export interface FrequencyState {
  frequencies: FrequencyData[];
  frequencies2?: FrequencyData[];  // For comparison (anagram)
  isMatch?: boolean;
}

export interface LPSData {
  index: number;
  value: number;
  highlight?: boolean;
  prefixEnd?: number;  // For showing prefix-suffix relationship
  suffixStart?: number;
}

export interface LPSState {
  array: LPSData[];
  arrayType: 'lps' | 'z';  // LPS for KMP, Z for Z-algorithm
  currentBuildIndex?: number;
}

export interface HashState {
  textHash: number;
  patternHash: number;
  windowStart: number;
  windowEnd: number;
  base?: number;
  modulo?: number;
  isMatch?: boolean;
}

export interface DPCell {
  row: number;
  col: number;
  value: number;
  highlight?: 'current' | 'path' | 'max';
}

export interface DPTableState {
  rows: string[];  // Row labels (chars of string 1)
  cols: string[];  // Col labels (chars of string 2)
  cells: DPCell[];
  maxValue?: number;
  maxCell?: { row: number; col: number };
}

// Matrix visualization for 2D search algorithms
export interface MatrixCell {
  row: number;
  col: number;
  value: number;
  highlight?: 'current' | 'found' | 'eliminated' | 'search-range';
}

export interface MatrixSearchState {
  matrix: number[][];
  rows: number;
  cols: number;
  currentRow?: number;
  currentCol?: number;
  searchRegion?: {
    rowStart: number;
    rowEnd: number;
    colStart: number;
    colEnd: number;
  };
  foundCell?: { row: number; col: number };
  eliminatedCells?: { row: number; col: number }[];
}

// Search algorithm visualization state
export interface SearchRangeData {
  arrayLength: number;
  low: number;
  high: number;
  mid?: number;
  mid1?: number;  // For ternary search
  mid2?: number;  // For ternary search
  target: number;
  currentValue?: number;
  eliminated?: { start: number; end: number }[];
  algorithm?: string;
  comparisons?: number;
  // Algorithm-specific data
  jumpBlock?: number;  // For jump search
  probePosition?: number;  // For interpolation search
  fibNumbers?: number[];  // For fibonacci search
  exponentialRange?: number[];  // For exponential search
}

// Stack visualization data
export interface StackData {
  elements: (number | string)[];
  capacity?: number;
  topIndex: number;
  highlight?: number[];
  animating?: 'push' | 'pop';
  animatingValue?: number | string;
  outputQueue?: (number | string)[];  // For expression conversions
  message?: string;  // Reason/explanation for current operation
}

// Queue visualization data
export interface QueueData {
  elements: (number | string)[];
  capacity?: number;
  frontIndex: number;
  rearIndex: number;
  highlight?: number[];
  animating?: 'enqueue' | 'dequeue' | 'dequeueRear';
  animatingValue?: number | string;
  // For circular queue visualization
  isCircular?: boolean;
  // For priority queue
  priorities?: number[];
  // For deque (double-ended queue)
  isDeque?: boolean;
  // For dual-structure visualizations (queue using stacks, stack using queues)
  secondaryStack1?: (number | string)[];
  secondaryStack2?: (number | string)[];
  transferringElement?: number | string;
  transferDirection?: 'stack1ToStack2' | 'stack2ToStack1';
  secondaryQueue1?: (number | string)[];
  secondaryQueue2?: (number | string)[];
  queueTransferElement?: number | string;
  queueTransferDirection?: 'queue1ToQueue2' | 'queue2ToQueue1' | 'enqueueQueue2';
  // For LRU Cache
  cacheMap?: { key: number; value: number }[];
  lruAnimating?: 'insert' | 'access' | 'evict';
  lruAnimatingKey?: number;
  lruPreviousAccessOrder?: (number | string)[];
  // For sliding window maximum
  windowStart?: number;
  windowEnd?: number;
  maxDeque?: number[];
  // For binary number generation
  generatedNumbers?: string[];
  binaryTreeNodes?: { value: string; level: number; processed: boolean }[];
  // For circular tour / gas station
  stations?: { petrol: number; distance: number }[];
  currentStation?: number;
  fuel?: number;
  startStation?: number;
  // For first non-repeating character - stream visualization
  streamChars?: { char: string; index: number; highlight?: 'current' | 'found' }[];
  // General message
  message?: string;
}

// ============ Linked List Visualization Data ============

export interface LinkedListNode {
  id: number;
  value: number;
  highlight?: 'current' | 'slow' | 'fast' | 'match' | 'visited' | 'prev' | 'next' | 'head' | 'tail' | 'middle' | 'target' | 'cycle';
  isHead?: boolean;
  isTail?: boolean;
  nextId?: number | null;
  prevId?: number | null;  // For doubly linked list
  childId?: number | null; // For multilevel list
  level?: number;  // For multilevel list depth
}

export interface LinkedListData {
  nodes: LinkedListNode[];
  listType: 'singly' | 'doubly' | 'circular' | 'circular-doubly' | 'multilevel';
  headId?: number | null;
  tailId?: number | null;
  // For two-pointer algorithms
  pointers?: { nodeId: number; label: string; color?: string }[];
  // For merge operations - second list
  secondList?: LinkedListNode[];
  secondHeadId?: number | null;
  // For result/merged list
  resultList?: LinkedListNode[];
  resultHeadId?: number | null;
  // Animation states
  animating?: 'insert' | 'delete' | 'reverse' | 'merge' | 'traverse' | 'pending-insert';
  animatingNodeId?: number;
  // Pending insert visualization (node shown below the list before insertion)
  pendingNode?: LinkedListNode;
  pendingInsertAfterNodeId?: number | null; // Node after which the pending node will be inserted (Prev)
  pendingNextNodeId?: number | null;        // Node which the pending node will replace/point to (Next)
  // Cycle detection
  cycleStartId?: number | null;
  hasCycle?: boolean;
  meetingPointId?: number | null;
  // For intersection
  intersectionId?: number | null;
  // Message
  message?: string;
}


// ============ Recursion Visualization Data ============

export interface RecursionNode {
  id: string;
  label: string;
  args: string;
  value?: string | number;
  children?: string[]; // IDs of children
  status: 'active' | 'completed' | 'pending' | 'pruned';
  depth: number;
  parentId?: string;
  result?: string;
}

export interface RecursionData {
  nodes: RecursionNode[];
  rootId?: string;
  currentId?: string;
  message?: string;
}

// ============ Backtracking Visualization Data ============

export interface BacktrackingCell {
  row: number;
  col: number;
  value: string | number;
  status: 'empty' | 'placed' | 'conflict' | 'tentative' | 'solution' | 'visited' | 'blocked' | 'start' | 'end';
}

export interface BacktrackingData {
  grid: BacktrackingCell[][];
  rows: number;
  cols: number;
  message?: string;
  // For specific problems like N-Queens
  conflicts?: { row: number; col: number }[];
  currentCell?: { row: number; col: number };
}

// ============ Tower of Hanoi Visualization Data ============

export interface HanoiDisk {
  size: number;
  color: string;
}

export interface HanoiData {
  pegs: HanoiDisk[][]; // 3 pegs, each has a stack of disks
  moveCount: number;
  message?: string;
  animatingDisk?: { disk: HanoiDisk; fromPeg: number; toPeg: number; progress: number };
}

export interface AuxiliaryState {
  type: 'buckets' | 'heap' | 'count' | 'merge' | 'insertion' | 'gap' | 'partition' | 'runs' | 'mode' | 'voting' | 'string-chars' | 'frequency' | 'lps' | 'hash' | 'dp-table' | 'matrix' | 'search-range' | 'stack' | 'queue' | 'linkedlist' | 'recursion' | 'backtracking' | 'hanoi';
  phase?: string;
  buckets?: BucketData[];
  heap?: { nodes: HeapNode[]; heapSize: number };
  countArray?: CountArrayItem[];
  outputArray?: number[];
  sortedPortion?: number;
  currentDigit?: number;
  maxDigit?: number;
  mergeData?: MergeData;
  gapData?: GapData;
  partitionData?: PartitionData;
  runData?: RunData;
  modeData?: ModeData;
  votingData?: VotingData;
  // String visualization states
  stringChars?: StringCharsState;
  frequencyState?: FrequencyState;
  lpsState?: LPSState;
  hashState?: HashState;
  dpTableState?: DPTableState;
  matrixSearchState?: MatrixSearchState;
  // Search range state for search algorithms
  searchRangeData?: SearchRangeData;
  // Stack visualization state
  stackData?: StackData;
  // Queue visualization state
  queueData?: QueueData;
  // Linked list visualization state
  linkedListData?: LinkedListData;
  // Recursion visualization state
  recursionData?: RecursionData;
  // Backtracking visualization state
  backtrackingData?: BacktrackingData;
  // Hanoi visualization state
  hanoiData?: HanoiData;
}

export interface BaseEvent {
  type: AlgoEventType;
  timestamp?: number;
}

export interface CompareEvent extends BaseEvent {
  type: 'compare';
  indices: [number, number];
  result?: 'lt' | 'gt' | 'eq';
}

export interface SwapEvent extends BaseEvent {
  type: 'swap';
  indices: [number, number];
}

export interface SetEvent extends BaseEvent {
  type: 'set';
  index: number;
  value: number | string;
  previousValue?: number | string;
}

export interface VisitEvent extends BaseEvent {
  type: 'visit';
  nodeId: string | number;
  from?: string | number;
}

export interface MarkEvent extends BaseEvent {
  type: 'mark';
  indices: number[];
  markType: 'sorted' | 'pivot' | 'current' | 'minimum' | 'maximum' | 'selected' | 'window';
}

export interface UnmarkEvent extends BaseEvent {
  type: 'unmark';
  indices: number[];
}

export interface MessageEvent extends BaseEvent {
  type: 'message';
  text: string;
  level?: 'info' | 'step' | 'explanation';
  highlightLine?: number;
}

export interface HighlightEvent extends BaseEvent {
  type: 'highlight';
  lineNumbers: number[];
}

export interface MetricEvent extends BaseEvent {
  type: 'metric';
  name: 'comparisons' | 'swaps' | 'visits' | 'operations';
  value: number;
  delta?: number;
}

export interface PushEvent extends BaseEvent {
  type: 'push';
  value: number | string;
  structure: 'stack' | 'queue';
}

export interface PopEvent extends BaseEvent {
  type: 'pop';
  value: number | string;
  structure: 'stack' | 'queue';
}

export interface EnqueueEvent extends BaseEvent {
  type: 'enqueue';
  value: number | string;
}

export interface DequeueEvent extends BaseEvent {
  type: 'dequeue';
  value: number | string;
}

export interface PointerEvent extends BaseEvent {
  type: 'pointer';
  pointers: { index: number; label: string; color?: string }[];
  variables: { name: string; value: string | number; highlight?: boolean }[];
  expression?: string;
}

export interface AuxiliaryEvent extends BaseEvent {
  type: 'auxiliary';
  state: AuxiliaryState;
}

export interface ResultEvent extends BaseEvent {
  type: 'result';
  resultType: 'string' | 'indices' | 'boolean' | 'frequency' | 'search';
  value: string | number[] | boolean | number;
  label?: string;
}

export type AlgoEvent =
  | CompareEvent
  | SwapEvent
  | SetEvent
  | VisitEvent
  | MarkEvent
  | UnmarkEvent
  | MessageEvent
  | HighlightEvent
  | MetricEvent
  | PushEvent
  | PopEvent
  | EnqueueEvent
  | DequeueEvent
  | PointerEvent
  | AuxiliaryEvent
  | ResultEvent;

/**
 * Helper functions to create events
 */
export const createEvent = {
  compare: (indices: [number, number], result?: 'lt' | 'gt' | 'eq'): CompareEvent => ({
    type: 'compare',
    indices,
    result,
  }),

  swap: (indices: [number, number]): SwapEvent => ({
    type: 'swap',
    indices,
  }),

  set: (index: number, value: number | string, previousValue?: number | string): SetEvent => ({
    type: 'set',
    index,
    value,
    previousValue,
  }),

  visit: (nodeId: string | number, from?: string | number): VisitEvent => ({
    type: 'visit',
    nodeId,
    from,
  }),

  mark: (indices: number[], markType: MarkEvent['markType']): MarkEvent => ({
    type: 'mark',
    indices,
    markType,
  }),

  unmark: (indices: number[]): UnmarkEvent => ({
    type: 'unmark',
    indices,
  }),

  message: (text: string, level?: MessageEvent['level'], highlightLine?: number): MessageEvent => ({
    type: 'message',
    text,
    level,
    highlightLine,
  }),

  highlight: (lineNumbers: number[]): HighlightEvent => ({
    type: 'highlight',
    lineNumbers,
  }),

  metric: (name: MetricEvent['name'], value: number, delta?: number): MetricEvent => ({
    type: 'metric',
    name,
    value,
    delta,
  }),

  push: (value: number | string, structure: 'stack' | 'queue'): PushEvent => ({
    type: 'push',
    value,
    structure,
  }),

  pop: (value: number | string, structure: 'stack' | 'queue'): PopEvent => ({
    type: 'pop',
    value,
    structure,
  }),

  pointer: (
    pointers: { index: number; label: string; color?: string }[],
    variables: { name: string; value: string | number; highlight?: boolean }[],
    expression?: string
  ): PointerEvent => ({
    type: 'pointer',
    pointers,
    variables,
    expression,
  }),

  auxiliary: (state: AuxiliaryState): AuxiliaryEvent => ({
    type: 'auxiliary',
    state,
  }),

  result: (
    resultType: 'string' | 'indices' | 'boolean' | 'frequency' | 'search',
    value: string | number[] | boolean | number,
    label?: string
  ): ResultEvent => ({
    type: 'result',
    resultType,
    value,
    label,
  }),
};
