import { AlgorithmCodeTemplates } from './types';

export const insertIntervalCode: AlgorithmCodeTemplates = {
  algorithmId: 'insert-interval',
  algorithmName: 'Insert Interval',
  category: 'greedy',
  templates: {
    javascript: `// Insert Interval - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Insert new interval into sorted non-overlapping intervals

function insertInterval(intervals, newInterval) {
  log(\`Intervals: \${intervals.length}\`);
  log(\`New: [\${newInterval[0]}, \${newInterval[1]}]\`);
  
  const result = [];
  let i = 0;
  const n = intervals.length;
  
  // Add all intervals before new interval
  while (i < n && intervals[i][1] < newInterval[0]) {
    visit(i);
    result.push(intervals[i]);
    log(\`Before: [\${intervals[i][0]}, \${intervals[i][1]}]\`);
    i++;
  }
  
  // Merge overlapping intervals
  while (i < n && intervals[i][0] <= newInterval[1]) {
    visit(i);
    compare(i, newInterval[0]);
    mark(i, 'current');
    log(\`Merge [\${intervals[i][0]}, \${intervals[i][1]}] with new interval\`);
    
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  
  result.push(newInterval);
  mark(result.length - 1, 'found');
  log(\`Insert merged: [\${newInterval[0]}, \${newInterval[1]}]\`);
  
  // Add remaining intervals
  while (i < n) {
    visit(i);
    result.push(intervals[i]);
    log(\`After: [\${intervals[i][0]}, \${intervals[i][1]}]\`);
    i++;
  }
  
  log(\`\\nResult: \${result.length} intervals\`);
  return result;
}

// Demo
insertInterval([[1, 3], [6, 9]], [2, 5]);
insertInterval([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]);
`,

    java: `// Insert Interval - Java
import java.util.*;

public class InsertInterval {
    public static int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int i = 0, n = intervals.length;
        
        while (i < n && intervals[i][1] < newInterval[0]) {
            result.add(intervals[i++]);
        }
        
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.add(newInterval);
        
        while (i < n) {
            result.add(intervals[i++]);
        }
        
        return result.toArray(new int[result.size()][]);
    }
}
`,

    python: `# Insert Interval - Python

def insert_interval(intervals, new_interval):
    result = []
    i, n = 0, len(intervals)
    
    # Before new interval
    while i < n and intervals[i][1] < new_interval[0]:
        result.append(intervals[i])
        i += 1
    
    # Merge overlapping
    while i < n and intervals[i][0] <= new_interval[1]:
        new_interval[0] = min(new_interval[0], intervals[i][0])
        new_interval[1] = max(new_interval[1], intervals[i][1])
        i += 1
    result.append(new_interval)
    
    # After new interval
    while i < n:
        result.append(intervals[i])
        i += 1
    
    return result


print(insert_interval([[1,3], [6,9]], [2,5]))
`,

    cpp: `// Insert Interval - C++
#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInt) {
    vector<vector<int>> result;
    int i = 0, n = intervals.size();
    
    while (i < n && intervals[i][1] < newInt[0])
        result.push_back(intervals[i++]);
    
    while (i < n && intervals[i][0] <= newInt[1]) {
        newInt[0] = min(newInt[0], intervals[i][0]);
        newInt[1] = max(newInt[1], intervals[i][1]);
        i++;
    }
    result.push_back(newInt);
    
    while (i < n)
        result.push_back(intervals[i++]);
    
    return result;
}
`,

    go: `// Insert Interval - Go
package main

import "fmt"

func insertInterval(intervals [][]int, newInt []int) [][]int {
    result := [][]int{}
    i, n := 0, len(intervals)
    
    for i < n && intervals[i][1] < newInt[0] {
        result = append(result, intervals[i]); i++
    }
    
    for i < n && intervals[i][0] <= newInt[1] {
        if intervals[i][0] < newInt[0] { newInt[0] = intervals[i][0] }
        if intervals[i][1] > newInt[1] { newInt[1] = intervals[i][1] }
        i++
    }
    result = append(result, newInt)
    
    for i < n {
        result = append(result, intervals[i]); i++
    }
    
    return result
}

func main() {
    fmt.Println(insertInterval([][]int{{1,3}, {6,9}}, []int{2,5}))
}
`,
  },
};
