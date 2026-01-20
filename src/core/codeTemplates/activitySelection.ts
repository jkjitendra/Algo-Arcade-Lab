import { AlgorithmCodeTemplates } from './types';

export const activitySelectionCode: AlgorithmCodeTemplates = {
  algorithmId: 'activity-selection',
  algorithmName: 'Activity Selection',
  category: 'greedy',
  templates: {
    javascript: `// Activity Selection Problem - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Select maximum number of non-overlapping activities

function activitySelection(start, end) {
  const n = start.length;
  log(\`Activities: \${n}\`);
  
  // Create activities with indices and sort by end time
  const activities = start.map((s, i) => ({ start: s, end: end[i], idx: i }));
  activities.sort((a, b) => a.end - b.end);
  
  log('Sorted by end time:');
  activities.forEach(a => log(\`  Activity \${a.idx}: [\${a.start}, \${a.end})\`));
  
  const selected = [];
  let lastEnd = -Infinity;
  
  for (let i = 0; i < n; i++) {
    const activity = activities[i];
    visit(activity.idx);
    compare(activity.idx, selected.length > 0 ? selected[selected.length - 1] : 0);
    
    if (activity.start >= lastEnd) {
      selected.push(activity.idx);
      lastEnd = activity.end;
      mark(activity.idx, 'found');
      log(\`Select activity \${activity.idx}: [\${activity.start}, \${activity.end})\`);
    } else {
      mark(activity.idx, 'eliminated');
      log(\`Skip activity \${activity.idx} (overlaps)\`);
    }
  }
  
  log(\`\\nMax activities: \${selected.length}\`);
  log(\`Selected: [\${selected.join(', ')}]\`);
  return selected;
}

// Demo
const start = [1, 3, 0, 5, 8, 5];
const end = [2, 4, 6, 7, 9, 9];
activitySelection(start, end);
`,

    java: `// Activity Selection - Java
import java.util.*;

public class ActivitySelection {
    public static List<Integer> activitySelection(int[] start, int[] end) {
        int n = start.length;
        Integer[] indices = new Integer[n];
        for (int i = 0; i < n; i++) indices[i] = i;
        
        // Sort by end time
        Arrays.sort(indices, (a, b) -> end[a] - end[b]);
        
        List<Integer> selected = new ArrayList<>();
        int lastEnd = Integer.MIN_VALUE;
        
        for (int i : indices) {
            if (start[i] >= lastEnd) {
                selected.add(i);
                lastEnd = end[i];
            }
        }
        return selected;
    }
    
    public static void main(String[] args) {
        int[] start = {1, 3, 0, 5, 8, 5};
        int[] end = {2, 4, 6, 7, 9, 9};
        System.out.println("Selected: " + activitySelection(start, end));
    }
}
`,

    python: `# Activity Selection - Python

def activity_selection(start, end):
    n = len(start)
    # Create list of (end, start, index) and sort by end time
    activities = sorted(zip(end, start, range(n)))
    
    selected = []
    last_end = float('-inf')
    
    for e, s, idx in activities:
        if s >= last_end:
            selected.append(idx)
            last_end = e
    
    return selected


start = [1, 3, 0, 5, 8, 5]
end = [2, 4, 6, 7, 9, 9]
print(f"Selected activities: {activity_selection(start, end)}")
`,

    cpp: `// Activity Selection - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<int> activitySelection(vector<int>& start, vector<int>& end) {
    int n = start.size();
    vector<pair<int, int>> activities(n); // (end, index)
    for (int i = 0; i < n; i++) activities[i] = {end[i], i};
    sort(activities.begin(), activities.end());
    
    vector<int> selected;
    int lastEnd = INT_MIN;
    
    for (auto& [e, i] : activities) {
        if (start[i] >= lastEnd) {
            selected.push_back(i);
            lastEnd = e;
        }
    }
    return selected;
}

int main() {
    vector<int> start = {1, 3, 0, 5, 8, 5};
    vector<int> end = {2, 4, 6, 7, 9, 9};
    auto sel = activitySelection(start, end);
    for (int i : sel) cout << i << " ";
    return 0;
}
`,

    go: `// Activity Selection - Go
package main

import (
    "fmt"
    "sort"
)

type Activity struct { start, end, idx int }

func activitySelection(start, end []int) []int {
    n := len(start)
    activities := make([]Activity, n)
    for i := 0; i < n; i++ {
        activities[i] = Activity{start[i], end[i], i}
    }
    sort.Slice(activities, func(i, j int) bool {
        return activities[i].end < activities[j].end
    })
    
    selected := []int{}
    lastEnd := -1 << 31
    
    for _, a := range activities {
        if a.start >= lastEnd {
            selected = append(selected, a.idx)
            lastEnd = a.end
        }
    }
    return selected
}

func main() {
    start := []int{1, 3, 0, 5, 8, 5}
    end := []int{2, 4, 6, 7, 9, 9}
    fmt.Println("Selected:", activitySelection(start, end))
}
`,
  },
};
