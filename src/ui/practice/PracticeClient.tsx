"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Play, RotateCcw, Code2, ChevronDown, Shuffle, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CodeEditor } from "@/ui/components/CodeEditor";
import { ExecutionConsole } from "@/ui/components/ExecutionConsole";
import { ArrayBars } from "@/ui/visualizers/ArrayBars";
import {
  getCodeTemplate,
  getAlgorithmsByCategory,
  LANGUAGES,
  CATEGORIES,
  SupportedLanguage,
  AlgorithmCategory
} from "@/core/codeTemplates";
import { executeJavaScript } from "@/core/execution/jsRunner";
import { VisEvent } from "@/core/codeTemplates/types";

interface PracticeClientProps {
  initialAlgorithm?: string;
}

export function PracticeClient({ initialAlgorithm }: PracticeClientProps) {
  const t = useTranslations();

  // Get available algorithms grouped by category
  const algorithmsByCategory = useMemo(() => getAlgorithmsByCategory(), []);
  const availableCategories = useMemo(() => Object.keys(algorithmsByCategory) as AlgorithmCategory[], [algorithmsByCategory]);

  // State
  const [selectedCategory, setSelectedCategory] = useState<AlgorithmCategory>("sorting");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(
    initialAlgorithm || "bubble-sort"
  );
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>("javascript");
  const [inputArray, setInputArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);
  const [inputText, setInputText] = useState("64, 34, 25, 12, 22, 11, 90");
  const [code, setCode] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<{ message: string; line?: number } | undefined>();

  // Visualization state
  const [events, setEvents] = useState<VisEvent[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [displayArray, setDisplayArray] = useState<number[]>([]);
  const [markedIndices, setMarkedIndices] = useState<Map<number, string>>(new Map());

  // Get current template
  const template = useMemo(() => {
    return getCodeTemplate(selectedAlgorithm);
  }, [selectedAlgorithm]);

  // Get algorithms for current category
  const algorithmsInCategory = useMemo(() => {
    return algorithmsByCategory[selectedCategory] || [];
  }, [algorithmsByCategory, selectedCategory]);

  // Load code when algorithm or language changes
  useEffect(() => {
    if (template) {
      setCode(template.templates[selectedLanguage] || "// Code not available for this language");

      // Auto-sort input array if algorithm requires sorted array
      if (template.requiresSortedArray) {
        const sortedArray = [...inputArray].sort((a, b) => a - b);
        setInputArray(sortedArray);
        setInputText(sortedArray.join(", "));
      }
    }
    // Reset visualization state
    setEvents([]);
    setCurrentEventIndex(0);
    setDisplayArray([...inputArray]);
    setMarkedIndices(new Map());
    setLogs([]);
    setError(undefined);
  }, [selectedAlgorithm, selectedLanguage, template]);

  // Update display array when input changes
  useEffect(() => {
    setDisplayArray([...inputArray]);
    setMarkedIndices(new Map());
  }, [inputArray]);

  // Handle category change
  const handleCategoryChange = useCallback((category: AlgorithmCategory) => {
    setSelectedCategory(category);
    // Select first algorithm in new category
    const algos = algorithmsByCategory[category] || [];
    if (algos.length > 0) {
      setSelectedAlgorithm(algos[0].id);
    }
  }, [algorithmsByCategory]);

  // Handle algorithm change
  const handleAlgorithmChange = useCallback((algoId: string) => {
    setSelectedAlgorithm(algoId);
  }, []);

  // Handle language change
  const handleLanguageChange = useCallback((lang: SupportedLanguage) => {
    setSelectedLanguage(lang);
  }, []);

  // Handle input text change
  const handleInputTextChange = useCallback((text: string) => {
    setInputText(text);
  }, []);

  // Apply input array from text
  const handleApplyInput = useCallback(() => {
    try {
      let parsed = inputText
        .split(/[,\s]+/)
        .filter(s => s.trim() !== "")
        .map(s => {
          const num = parseInt(s.trim());
          if (isNaN(num)) throw new Error(`Invalid number: ${s}`);
          return num;
        });

      if (parsed.length < 2) {
        setError({ message: "Array must have at least 2 elements" });
        return;
      }
      if (parsed.length > 20) {
        setError({ message: "Array can have at most 20 elements" });
        return;
      }

      // Auto-sort if algorithm requires sorted array
      if (template?.requiresSortedArray) {
        parsed = [...parsed].sort((a, b) => a - b);
        setInputText(parsed.join(", "));
      }

      setInputArray(parsed);
      setError(undefined);
    } catch (err) {
      setError({ message: err instanceof Error ? err.message : "Invalid input format" });
    }
  }, [inputText, template]);

  // Reset code to template
  const handleReset = useCallback(() => {
    if (template) {
      setCode(template.templates[selectedLanguage] || "");
    }
    setEvents([]);
    setCurrentEventIndex(0);
    setDisplayArray([...inputArray]);
    setMarkedIndices(new Map());
    setLogs([]);
    setError(undefined);
  }, [template, selectedLanguage, inputArray]);

  // Generate random array
  const handleRandomize = useCallback(() => {
    let newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10);

    // Sort if algorithm requires sorted array
    if (template?.requiresSortedArray) {
      newArray = newArray.sort((a, b) => a - b);
    }

    setInputArray(newArray);
    setInputText(newArray.join(", "));
    setDisplayArray(newArray);
    setMarkedIndices(new Map());
    setEvents([]);
    setCurrentEventIndex(0);
  }, [template]);

  // Run code
  const handleRun = useCallback(async () => {
    if (selectedLanguage !== "javascript") {
      setError({ message: "Only JavaScript execution is supported currently" });
      return;
    }

    setIsRunning(true);
    setLogs([]);
    setError(undefined);
    setEvents([]);
    setCurrentEventIndex(0);
    setDisplayArray([...inputArray]);
    setMarkedIndices(new Map());

    try {
      const result = await executeJavaScript(code, inputArray);

      if (result.success) {
        setEvents(result.events);
        setLogs(result.logs);
        // Animate through events
        animateEvents(result.events, [...inputArray]);
      } else {
        setError(result.error);
        setLogs(result.logs);
      }
    } catch (err) {
      setError({ message: err instanceof Error ? err.message : "Unknown error" });
    } finally {
      setIsRunning(false);
    }
  }, [code, inputArray, selectedLanguage]);

  // Animate through events
  const animateEvents = useCallback((allEvents: VisEvent[], startArray: number[]) => {
    let arr = [...startArray];
    let marked = new Map<number, string>();
    let eventIdx = 0;

    const processNextEvent = () => {
      if (eventIdx >= allEvents.length) {
        return;
      }

      const event = allEvents[eventIdx];

      switch (event.type) {
        case "compare":
          marked = new Map(marked);
          if (event.indices) {
            event.indices.forEach(i => marked.set(i, "comparing"));
          }
          break;

        case "swap":
          if (event.indices && event.indices.length >= 2) {
            const [i, j] = event.indices;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            marked = new Map(marked);
            marked.set(i, "swapping");
            marked.set(j, "swapping");
          }
          break;

        case "mark":
          if (event.indices) {
            marked = new Map(marked);
            event.indices.forEach(i => {
              marked.set(i, event.markType || "sorted");
            });
          }
          break;

        case "set":
          if (event.indices && event.value !== undefined) {
            arr[event.indices[0]] = event.value;
          }
          break;
      }

      setDisplayArray([...arr]);
      setMarkedIndices(marked);
      setCurrentEventIndex(eventIdx);

      eventIdx++;

      if (eventIdx < allEvents.length) {
        setTimeout(processNextEvent, 80);
      }
    };

    processNextEvent();
  }, []);

  const languageInfo = LANGUAGES[selectedLanguage];
  const categoryInfo = CATEGORIES[selectedCategory];
  const algorithmName = algorithmsInCategory.find(a => a.id === selectedAlgorithm)?.name || selectedAlgorithm;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-6 h-6 text-[var(--color-primary-500)]" />
          <h1 className="text-xl font-bold text-[var(--text-primary)]">
            Code Playground
          </h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <span>{categoryInfo?.icon}</span>
                {categoryInfo?.name || "Category"}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {availableCategories.map((cat) => {
                const info = CATEGORIES[cat];
                return (
                  <DropdownMenuItem
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={selectedCategory === cat ? "bg-[var(--color-primary-500)]/10" : ""}
                  >
                    <span className="mr-2">{info?.icon}</span>
                    {info?.name}
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs text-[var(--text-tertiary)]">
                More categories coming soon...
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Algorithm Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                {algorithmName}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-64 overflow-y-auto">
              {algorithmsInCategory.map((algo) => (
                <DropdownMenuItem
                  key={algo.id}
                  onClick={() => handleAlgorithmChange(algo.id)}
                  className={selectedAlgorithm === algo.id ? "bg-[var(--color-primary-500)]/10" : ""}
                >
                  {algo.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                {languageInfo.name}
                {!languageInfo.executable && (
                  <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-1 rounded">
                    View
                  </span>
                )}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Object.values(LANGUAGES).map((lang) => (
                <DropdownMenuItem
                  key={lang.id}
                  onClick={() => handleLanguageChange(lang.id)}
                  className={selectedLanguage === lang.id ? "bg-[var(--color-primary-500)]/10" : ""}
                >
                  <span className="flex-1">{lang.name}</span>
                  {!lang.executable && (
                    <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-1 rounded ml-2">
                      View only
                    </span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Code Editor */}
        <div className="space-y-4">
          <CodeEditor
            code={code}
            language={selectedLanguage}
            onChange={setCode}
            height="400px"
          />

          {/* Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              onClick={handleRun}
              disabled={isRunning || !languageInfo.executable}
              className="gap-2 bg-green-600 hover:bg-green-700"
            >
              <Play className="w-4 h-4" />
              {isRunning ? "Running..." : "Run Code"}
            </Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button variant="outline" onClick={handleRandomize} className="gap-2">
              <Shuffle className="w-4 h-4" />
              Random
            </Button>
          </div>

          {/* Console */}
          <ExecutionConsole logs={logs} error={error} isRunning={isRunning} />
        </div>

        {/* Right: Visualization */}
        <div className="space-y-4">
          {/* Input Array Editor */}
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                Input Array
              </h3>
              <span className="text-xs text-[var(--text-tertiary)]">
                {inputArray.length} elements
              </span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => handleInputTextChange(e.target.value)}
                className="flex-1 font-mono text-sm bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                placeholder="Enter numbers separated by commas"
              />
              <Button size="sm" onClick={handleApplyInput}>
                Apply
              </Button>
            </div>
            <p className="text-xs text-[var(--text-tertiary)] mt-2">
              Enter numbers separated by commas or spaces (2-20 elements)
            </p>
            {template?.requiresSortedArray && (
              <div className="mt-2 p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <p className="text-xs text-yellow-400 flex items-center gap-1">
                  ⚠️ This algorithm requires a sorted array. Input will be automatically sorted.
                </p>
              </div>
            )}
          </div>

          {/* Array Visualization */}
          <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
            <div className="h-[280px] p-4">
              <ArrayBars values={displayArray} markedIndices={markedIndices} pointers={[]} />
            </div>
          </div>

          {/* Execution Info */}
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--text-secondary)]">
                Events processed
              </span>
              <span className="font-mono text-sm text-[var(--color-primary-400)]">
                {currentEventIndex} / {events.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
