import { AlgorithmCodeTemplates } from './types';

export const subarrayZeroSumCode: AlgorithmCodeTemplates = {
  algorithmId: 'subarray-zero-sum',
  algorithmName: 'Subarray with Zero Sum',
  category: 'hashing',
  templates: {
    javascript: `// Subarray with Zero Sum - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Find if there exists a subarray with sum = 0

function hasZeroSumSubarray(arr) {
  log(\`Checking for zero sum subarray in [\${arr.join(', ')}]\`);
  
  const prefixSums = new Set();
  let sum = 0;
  
  for (let i = 0; i < arr.length; i++) {
    visit(i);
    sum += arr[i];
    log(\`Index \${i}: arr[i]=\${arr[i]}, prefixSum=\${sum}\`);
    
    // Zero sum found if:
    // 1. Current prefix sum is 0
    // 2. Same prefix sum seen before (means subarray between has sum 0)
    if (sum === 0 || prefixSums.has(sum)) {
      mark(i, 'found');
      log(\`Found! Zero sum subarray exists ending at index \${i}\`);
      return true;
    }
    
    prefixSums.add(sum);
    mark(i, 'current');
  }
  
  log('No zero sum subarray found');
  return false;
}

// Find actual subarray with zero sum
function findZeroSumSubarray(arr) {
  log(\`Finding zero sum subarray in [\${arr.join(', ')}]\`);
  
  const prefixSumMap = new Map(); // prefixSum -> index
  let sum = 0;
  
  for (let i = 0; i < arr.length; i++) {
    visit(i);
    sum += arr[i];
    
    if (sum === 0) {
      mark(i, 'found');
      log(\`Subarray [0...\${i}] has sum 0\`);
      return arr.slice(0, i + 1);
    }
    
    if (prefixSumMap.has(sum)) {
      const start = prefixSumMap.get(sum) + 1;
      mark(i, 'found');
      log(\`Subarray [\${start}...\${i}] has sum 0\`);
      return arr.slice(start, i + 1);
    }
    
    prefixSumMap.set(sum, i);
  }
  
  return null;
}

// Demo
hasZeroSumSubarray([4, 2, -3, 1, 6]); // true (subarray: [2, -3, 1])
hasZeroSumSubarray([4, 2, 0, 1, 6]);  // true (subarray: [0])
hasZeroSumSubarray([1, 2, 3]);        // false
log('');
findZeroSumSubarray([4, 2, -3, 1, 6]);
`,

    java: `// Subarray with Zero Sum - Java
import java.util.*;

public class SubarrayZeroSum {
    public static boolean hasZeroSumSubarray(int[] arr) {
        Set<Integer> prefixSums = new HashSet<>();
        int sum = 0;
        
        for (int num : arr) {
            sum += num;
            if (sum == 0 || prefixSums.contains(sum)) {
                return true;
            }
            prefixSums.add(sum);
        }
        
        return false;
    }
    
    public static int[] findZeroSumSubarray(int[] arr) {
        Map<Integer, Integer> prefixSumMap = new HashMap<>();
        int sum = 0;
        
        for (int i = 0; i < arr.length; i++) {
            sum += arr[i];
            if (sum == 0) return Arrays.copyOfRange(arr, 0, i + 1);
            if (prefixSumMap.containsKey(sum)) {
                return Arrays.copyOfRange(arr, prefixSumMap.get(sum) + 1, i + 1);
            }
            prefixSumMap.put(sum, i);
        }
        return null;
    }
    
    public static void main(String[] args) {
        System.out.println(hasZeroSumSubarray(new int[]{4, 2, -3, 1, 6}));
    }
}
`,

    python: `# Subarray with Zero Sum - Python

def has_zero_sum_subarray(arr):
    prefix_sums = set()
    total = 0
    
    for num in arr:
        total += num
        if total == 0 or total in prefix_sums:
            return True
        prefix_sums.add(total)
    
    return False

def find_zero_sum_subarray(arr):
    prefix_map = {}
    total = 0
    
    for i, num in enumerate(arr):
        total += num
        if total == 0:
            return arr[:i+1]
        if total in prefix_map:
            return arr[prefix_map[total]+1:i+1]
        prefix_map[total] = i
    
    return None


print(has_zero_sum_subarray([4, 2, -3, 1, 6]))  # True
print(find_zero_sum_subarray([4, 2, -3, 1, 6]))  # [2, -3, 1]
`,

    cpp: `// Subarray with Zero Sum - C++
#include <iostream>
#include <vector>
#include <unordered_set>
#include <unordered_map>
using namespace std;

bool hasZeroSumSubarray(vector<int>& arr) {
    unordered_set<int> prefixSums;
    int sum = 0;
    
    for (int num : arr) {
        sum += num;
        if (sum == 0 || prefixSums.count(sum)) return true;
        prefixSums.insert(sum);
    }
    return false;
}

vector<int> findZeroSumSubarray(vector<int>& arr) {
    unordered_map<int, int> prefixMap;
    int sum = 0;
    
    for (int i = 0; i < arr.size(); i++) {
        sum += arr[i];
        if (sum == 0) return vector<int>(arr.begin(), arr.begin() + i + 1);
        if (prefixMap.count(sum)) {
            return vector<int>(arr.begin() + prefixMap[sum] + 1, arr.begin() + i + 1);
        }
        prefixMap[sum] = i;
    }
    return {};
}

int main() {
    vector<int> arr = {4, 2, -3, 1, 6};
    cout << boolalpha << hasZeroSumSubarray(arr) << endl;
    return 0;
}
`,

    go: `// Subarray with Zero Sum - Go
package main

import "fmt"

func hasZeroSumSubarray(arr []int) bool {
    prefixSums := make(map[int]bool)
    sum := 0
    
    for _, num := range arr {
        sum += num
        if sum == 0 || prefixSums[sum] {
            return true
        }
        prefixSums[sum] = true
    }
    return false
}

func findZeroSumSubarray(arr []int) []int {
    prefixMap := make(map[int]int)
    sum := 0
    
    for i, num := range arr {
        sum += num
        if sum == 0 {
            return arr[:i+1]
        }
        if j, ok := prefixMap[sum]; ok {
            return arr[j+1 : i+1]
        }
        prefixMap[sum] = i
    }
    return nil
}

func main() {
    arr := []int{4, 2, -3, 1, 6}
    fmt.Println(hasZeroSumSubarray(arr))
    fmt.Println(findZeroSumSubarray(arr))
}
`,
  },
};
