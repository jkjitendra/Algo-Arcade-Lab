import { AlgorithmCodeTemplates } from './types';

export const mergeIntervalsCode: AlgorithmCodeTemplates = {
  algorithmId: 'merge-intervals',
  algorithmName: 'Merge Intervals',
  category: 'greedy',
  templates: {
    javascript: `// Merge Intervals - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function mergeIntervals(intervals) {
  log(\`Intervals: \${intervals.length}\`);
  intervals.forEach((i, idx) => log(\`  [\${i[0]}, \${i[1]}]\`));
  
  if (intervals.length <= 1) return intervals;
  
  // Sort by start time
  intervals.sort((a, b) => a[0] - b[0]);
  log('\\nSorted by start:');
  
  const merged = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    visit(i);
    const current = intervals[i];
    const last = merged[merged.length - 1];
    
    compare(i - 1, i);
    
    if (current[0] <= last[1]) {
      // Overlapping - merge
      last[1] = Math.max(last[1], current[1]);
      mark(i, 'found');
      log(\`Merge [\${current[0]}, \${current[1]}] into [\${last[0]}, \${last[1]}]\`);
    } else {
      // Non-overlapping - add new interval
      merged.push(current);
      mark(i, 'current');
      log(\`Add new: [\${current[0]}, \${current[1]}]\`);
    }
  }
  
  log(\`\\nMerged intervals: \${merged.length}\`);
  merged.forEach(i => log(\`  [\${i[0]}, \${i[1]}]\`));
  return merged;
}

// Demo
mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]]);
`,

    java: `// Merge Intervals - Java
import java.util.*;

public class MergeIntervals {
    public static int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;
        
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        
        List<int[]> merged = new ArrayList<>();
        merged.add(intervals[0]);
        
        for (int i = 1; i < intervals.length; i++) {
            int[] last = merged.get(merged.size() - 1);
            int[] curr = intervals[i];
            
            if (curr[0] <= last[1]) {
                last[1] = Math.max(last[1], curr[1]);
            } else {
                merged.add(curr);
            }
        }
        
        return merged.toArray(new int[merged.size()][]);
    }
    
    public static void main(String[] args) {
        int[][] intervals = {{1,3}, {2,6}, {8,10}, {15,18}};
        int[][] result = merge(intervals);
        for (int[] i : result) System.out.println(Arrays.toString(i));
    }
}
`,

    python: `# Merge Intervals - Python

def merge_intervals(intervals):
    if len(intervals) <= 1:
        return intervals
    
    intervals.sort(key=lambda x: x[0])
    
    merged = [intervals[0]]
    
    for current in intervals[1:]:
        last = merged[-1]
        if current[0] <= last[1]:
            last[1] = max(last[1], current[1])
        else:
            merged.append(current)
    
    return merged


intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
print(f"Merged: {merge_intervals(intervals)}")
`,

    cpp: `// Merge Intervals - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if (intervals.size() <= 1) return intervals;
    
    sort(intervals.begin(), intervals.end());
    
    vector<vector<int>> merged = {intervals[0]};
    
    for (int i = 1; i < intervals.size(); i++) {
        auto& last = merged.back();
        auto& curr = intervals[i];
        
        if (curr[0] <= last[1]) {
            last[1] = max(last[1], curr[1]);
        } else {
            merged.push_back(curr);
        }
    }
    
    return merged;
}

int main() {
    vector<vector<int>> intervals = {{1,3}, {2,6}, {8,10}, {15,18}};
    auto result = merge(intervals);
    for (auto& i : result) cout << "[" << i[0] << "," << i[1] << "] ";
    return 0;
}
`,

    go: `// Merge Intervals - Go
package main

import (
    "fmt"
    "sort"
)

func mergeIntervals(intervals [][]int) [][]int {
    if len(intervals) <= 1 { return intervals }
    
    sort.Slice(intervals, func(i, j int) bool { return intervals[i][0] < intervals[j][0] })
    
    merged := [][]int{intervals[0]}
    
    for i := 1; i < len(intervals); i++ {
        last := merged[len(merged)-1]
        curr := intervals[i]
        
        if curr[0] <= last[1] {
            if curr[1] > last[1] { last[1] = curr[1] }
        } else {
            merged = append(merged, curr)
        }
    }
    
    return merged
}

func main() {
    intervals := [][]int{{1,3}, {2,6}, {8,10}, {15,18}}
    fmt.Println(mergeIntervals(intervals))
}
`,
  },
};
