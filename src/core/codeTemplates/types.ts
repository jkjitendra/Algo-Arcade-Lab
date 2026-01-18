/**
 * Code Templates and Execution Types
 */

// Supported programming languages
export type SupportedLanguage = 'javascript' | 'java' | 'python' | 'cpp' | 'go';

// Language metadata
export interface LanguageInfo {
  id: SupportedLanguage;
  name: string;
  extension: string;
  monacoLanguage: string;
  executable: boolean;
  comingSoon?: boolean;
}

// All supported languages with metadata
export const LANGUAGES: Record<SupportedLanguage, LanguageInfo> = {
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    extension: '.js',
    monacoLanguage: 'javascript',
    executable: true,
  },
  java: {
    id: 'java',
    name: 'Java',
    extension: '.java',
    monacoLanguage: 'java',
    executable: false,
    comingSoon: true,
  },
  python: {
    id: 'python',
    name: 'Python',
    extension: '.py',
    monacoLanguage: 'python',
    executable: false,
    comingSoon: true,
  },
  cpp: {
    id: 'cpp',
    name: 'C++',
    extension: '.cpp',
    monacoLanguage: 'cpp',
    executable: false,
    comingSoon: true,
  },
  go: {
    id: 'go',
    name: 'Go',
    extension: '.go',
    monacoLanguage: 'go',
    executable: false,
    comingSoon: true,
  },
};

// Algorithm categories
export type AlgorithmCategory =
  | 'sorting'
  | 'searching'
  | 'arrays'
  | 'strings'
  | 'stacks'
  | 'queues'
  | 'linked-lists'
  | 'recursion'
  | 'backtracking'
  | 'trees'
  | 'heaps'
  | 'hashing'
  | 'graphs'
  | 'dp'
  | 'greedy';

// Category metadata
export interface CategoryInfo {
  id: AlgorithmCategory;
  name: string;
  icon: string;
  description: string;
}

// All algorithm categories
export const CATEGORIES: Record<AlgorithmCategory, CategoryInfo> = {
  sorting: {
    id: 'sorting',
    name: 'Sorting',
    icon: '📊',
    description: 'Algorithms that arrange elements in order',
  },
  searching: {
    id: 'searching',
    name: 'Searching',
    icon: '🔍',
    description: 'Algorithms that find elements in data structures',
  },
  arrays: {
    id: 'arrays',
    name: 'Arrays',
    icon: '📋',
    description: 'Array manipulation and pattern algorithms',
  },
  strings: {
    id: 'strings',
    name: 'Strings',
    icon: '📝',
    description: 'String processing and pattern matching',
  },
  stacks: {
    id: 'stacks',
    name: 'Stacks',
    icon: '📚',
    description: 'Stack operations and applications',
  },
  queues: {
    id: 'queues',
    name: 'Queues',
    icon: '📬',
    description: 'Queue operations and applications',
  },
  'linked-lists': {
    id: 'linked-lists',
    name: 'Linked Lists',
    icon: '🔗',
    description: 'Linked list operations and algorithms',
  },
  recursion: {
    id: 'recursion',
    name: 'Recursion',
    icon: '🔄',
    description: 'Recursive problem solving techniques',
  },
  backtracking: {
    id: 'backtracking',
    name: 'Backtracking',
    icon: '🧩',
    description: 'Constraint satisfaction and puzzle solving',
  },
  trees: {
    id: 'trees',
    name: 'Trees',
    icon: '🌳',
    description: 'Tree traversal and manipulation algorithms',
  },
  heaps: {
    id: 'heaps',
    name: 'Heaps',
    icon: '⛰️',
    description: 'Heap data structure and priority queues',
  },
  hashing: {
    id: 'hashing',
    name: 'Hashing',
    icon: '#️⃣',
    description: 'Hash tables and hash-based algorithms',
  },
  graphs: {
    id: 'graphs',
    name: 'Graphs',
    icon: '🕸️',
    description: 'Graph traversal and pathfinding algorithms',
  },
  dp: {
    id: 'dp',
    name: 'Dynamic Programming',
    icon: '📈',
    description: 'Optimization through subproblem decomposition',
  },
  greedy: {
    id: 'greedy',
    name: 'Greedy',
    icon: '🎯',
    description: 'Locally optimal choice algorithms',
  },
};

// Code template for an algorithm in all languages
export interface AlgorithmCodeTemplates {
  algorithmId: string;
  algorithmName: string;
  category: AlgorithmCategory;
  templates: Record<SupportedLanguage, string>;
  /** If true, this algorithm requires a sorted input array */
  requiresSortedArray?: boolean;
}

// Visualization event types (emitted by user code)
export type VisEventType =
  | 'compare'
  | 'swap'
  | 'set'
  | 'mark'
  | 'visit'
  | 'highlight'
  | 'message'
  | 'log';

// Visualization event from user code
export interface VisEvent {
  type: VisEventType;
  indices?: number[];
  value?: number;
  message?: string;
  markType?: string;
  timestamp: number;
}

// Execution result
export interface ExecutionResult {
  success: boolean;
  events: VisEvent[];
  logs: string[];
  error?: {
    message: string;
    line?: number;
    column?: number;
  };
  executionTime: number;
  finalArray: number[];
}

// Execution context passed to user code
export interface ExecutionContext {
  inputArray: number[];
  events: VisEvent[];
  logs: string[];
}
