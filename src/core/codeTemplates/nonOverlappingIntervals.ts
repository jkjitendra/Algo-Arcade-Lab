import { AlgorithmCodeTemplates } from './types';

export const nonOverlappingIntervalsCode: AlgorithmCodeTemplates = {
  algorithmId: 'non-overlapping-intervals',
  algorithmName: 'Non-Overlapping Intervals',
  category: 'greedy',
  templates: {
    javascript: `// Non-Overlapping Intervals - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Minimum intervals to remove for non-overlapping set

function eraseOverlapIntervals(intervals) {
  log(\`Intervals: \${intervals.length}\`);
  
  if (intervals.length <= 1) return 0;
  
  // Sort by end time (greedy: keep intervals that end earliest)
  intervals.sort((a, b) => a[1] - b[1]);
  
  log('Sorted by end time:');
  intervals.forEach((i, idx) => log(\`  [\${i[0]}, \${i[1]}]\`));
  
  let removals = 0;
  let lastEnd = intervals[0][1];
  mark(0, 'found');
  log(\`\\nKeep: [\${intervals[0][0]}, \${intervals[0][1]}]\`);
  
  for (let i = 1; i < intervals.length; i++) {
    visit(i);
    compare(i - 1, i);
    
    if (intervals[i][0] < lastEnd) {
      // Overlapping - remove this one
      removals++;
      mark(i, 'eliminated');
      log(\`Remove: [\${intervals[i][0]}, \${intervals[i][1]}] (overlaps)\`);
    } else {
      // Non-overlapping - keep
      lastEnd = intervals[i][1];
      mark(i, 'found');
      log(\`Keep: [\${intervals[i][0]}, \${intervals[i][1]}]\`);
    }
  }
  
  log(\`\\nRemovals needed: \${removals}\`);
  return removals;
}

// Demo
eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]);
eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]]);
`,

    java: `// Non-Overlapping Intervals - Java
import java.util.*;

public class NonOverlappingIntervals {
    public static int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length <= 1) return 0;
        
        Arrays.sort(intervals, (a, b) -> a[1] - b[1]);
        
        int removals = 0;
        int lastEnd = intervals[0][1];
        
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < lastEnd) {
                removals++;
            } else {
                lastEnd = intervals[i][1];
            }
        }
        return removals;
    }
    
    public static void main(String[] args) {
        int[][] intervals = {{1,2}, {2,3}, {3,4}, {1,3}};
        System.out.println("Removals: " + eraseOverlapIntervals(intervals));
    }
}
`,

    python: `# Non-Overlapping Intervals - Python

def erase_overlap_intervals(intervals):
    if len(intervals) <= 1:
        return 0
    
    intervals.sort(key=lambda x: x[1])
    
    removals = 0
    last_end = intervals[0][1]
    
    for i in range(1, len(intervals)):
        if intervals[i][0] < last_end:
            removals += 1
        else:
            last_end = intervals[i][1]
    
    return removals


print(f"Removals: {erase_overlap_intervals([[1,2], [2,3], [3,4], [1,3]])}")
`,

    cpp: `// Non-Overlapping Intervals - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int eraseOverlapIntervals(vector<vector<int>>& intervals) {
    if (intervals.size() <= 1) return 0;
    
    sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) { return a[1] < b[1]; });
    
    int removals = 0;
    int lastEnd = intervals[0][1];
    
    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] < lastEnd) {
            removals++;
        } else {
            lastEnd = intervals[i][1];
        }
    }
    return removals;
}

int main() {
    vector<vector<int>> intervals = {{1,2}, {2,3}, {3,4}, {1,3}};
    cout << "Removals: " << eraseOverlapIntervals(intervals) << endl;
    return 0;
}
`,

    go: `// Non-Overlapping Intervals - Go
package main

import (
    "fmt"
    "sort"
)

func eraseOverlapIntervals(intervals [][]int) int {
    if len(intervals) <= 1 { return 0 }
    
    sort.Slice(intervals, func(i, j int) bool { return intervals[i][1] < intervals[j][1] })
    
    removals := 0
    lastEnd := intervals[0][1]
    
    for i := 1; i < len(intervals); i++ {
        if intervals[i][0] < lastEnd {
            removals++
        } else {
            lastEnd = intervals[i][1]
        }
    }
    return removals
}

func main() {
    intervals := [][]int{{1,2}, {2,3}, {3,4}, {1,3}}
    fmt.Printf("Removals: %d\\n", eraseOverlapIntervals(intervals))
}
`,
  },
};
