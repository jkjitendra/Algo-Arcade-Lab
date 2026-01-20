import { AlgorithmCodeTemplates } from './types';

export const minimumPlatformsCode: AlgorithmCodeTemplates = {
  algorithmId: 'minimum-platforms',
  algorithmName: 'Minimum Platforms',
  category: 'greedy',
  templates: {
    javascript: `// Minimum Platforms - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Minimum platforms needed at railway station

function minimumPlatforms(arrivals, departures) {
  const n = arrivals.length;
  log(\`Trains: \${n}\`);
  
  // Sort both arrays
  const arr = [...arrivals].sort((a, b) => a - b);
  const dep = [...departures].sort((a, b) => a - b);
  
  log('Arrivals: ' + arr.join(', '));
  log('Departures: ' + dep.join(', '));
  
  let platforms = 0, maxPlatforms = 0;
  let i = 0, j = 0;
  
  while (i < n && j < n) {
    if (arr[i] <= dep[j]) {
      platforms++;
      visit(i);
      log(\`Time \${arr[i]}: Train arrives, platforms = \${platforms}\`);
      
      if (platforms > maxPlatforms) {
        maxPlatforms = platforms;
        mark(i, 'found');
      }
      i++;
    } else {
      platforms--;
      log(\`Time \${dep[j]}: Train departs, platforms = \${platforms}\`);
      j++;
    }
  }
  
  log(\`\\nMinimum platforms required: \${maxPlatforms}\`);
  return maxPlatforms;
}

// Demo
const arrivals = [900, 940, 950, 1100, 1500, 1800];
const departures = [910, 1200, 1120, 1130, 1900, 2000];
minimumPlatforms(arrivals, departures);
`,

    java: `// Minimum Platforms - Java
import java.util.*;

public class MinimumPlatforms {
    public static int findPlatforms(int[] arr, int[] dep) {
        int n = arr.length;
        int[] arrivals = arr.clone();
        int[] departures = dep.clone();
        Arrays.sort(arrivals);
        Arrays.sort(departures);
        
        int platforms = 0, maxPlatforms = 0;
        int i = 0, j = 0;
        
        while (i < n && j < n) {
            if (arrivals[i] <= departures[j]) {
                platforms++;
                maxPlatforms = Math.max(maxPlatforms, platforms);
                i++;
            } else {
                platforms--;
                j++;
            }
        }
        return maxPlatforms;
    }
    
    public static void main(String[] args) {
        int[] arr = {900, 940, 950, 1100, 1500, 1800};
        int[] dep = {910, 1200, 1120, 1130, 1900, 2000};
        System.out.println("Platforms: " + findPlatforms(arr, dep));
    }
}
`,

    python: `# Minimum Platforms - Python

def minimum_platforms(arrivals, departures):
    arr = sorted(arrivals)
    dep = sorted(departures)
    n = len(arrivals)
    
    platforms = max_platforms = 0
    i = j = 0
    
    while i < n and j < n:
        if arr[i] <= dep[j]:
            platforms += 1
            max_platforms = max(max_platforms, platforms)
            i += 1
        else:
            platforms -= 1
            j += 1
    
    return max_platforms


arrivals = [900, 940, 950, 1100, 1500, 1800]
departures = [910, 1200, 1120, 1130, 1900, 2000]
print(f"Platforms needed: {minimum_platforms(arrivals, departures)}")
`,

    cpp: `// Minimum Platforms - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int minimumPlatforms(vector<int>& arr, vector<int>& dep) {
    int n = arr.size();
    vector<int> arrivals = arr, departures = dep;
    sort(arrivals.begin(), arrivals.end());
    sort(departures.begin(), departures.end());
    
    int platforms = 0, maxP = 0, i = 0, j = 0;
    
    while (i < n && j < n) {
        if (arrivals[i] <= departures[j]) {
            platforms++;
            maxP = max(maxP, platforms);
            i++;
        } else {
            platforms--;
            j++;
        }
    }
    return maxP;
}

int main() {
    vector<int> arr = {900, 940, 950, 1100, 1500, 1800};
    vector<int> dep = {910, 1200, 1120, 1130, 1900, 2000};
    cout << "Platforms: " << minimumPlatforms(arr, dep) << endl;
    return 0;
}
`,

    go: `// Minimum Platforms - Go
package main

import (
    "fmt"
    "sort"
)

func minimumPlatforms(arrivals, departures []int) int {
    arr := append([]int{}, arrivals...)
    dep := append([]int{}, departures...)
    sort.Ints(arr); sort.Ints(dep)
    
    n := len(arrivals)
    platforms, maxP := 0, 0
    i, j := 0, 0
    
    for i < n && j < n {
        if arr[i] <= dep[j] {
            platforms++
            if platforms > maxP { maxP = platforms }
            i++
        } else {
            platforms--
            j++
        }
    }
    return maxP
}

func main() {
    arr := []int{900, 940, 950, 1100, 1500, 1800}
    dep := []int{910, 1200, 1120, 1130, 1900, 2000}
    fmt.Printf("Platforms: %d\\n", minimumPlatforms(arr, dep))
}
`,
  },
};
