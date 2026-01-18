import { AlgorithmCodeTemplates } from './types';

export const mergeSortedArraysCode: AlgorithmCodeTemplates = {
  algorithmId: 'merge-sorted-arrays',
  algorithmName: 'Merge Sorted Arrays',
  category: 'arrays',
  templates: {
    javascript: `// Merge Two Sorted Arrays - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Merge two sorted arrays into one sorted array

function mergeSortedArrays(arr1, arr2) {
  log(\`Merging two sorted arrays of sizes \${arr1.length} and \${arr2.length}\`);
  
  const result = [];
  let i = 0, j = 0;
  
  while (i < arr1.length && j < arr2.length) {
    visit(i);
    compare(i, j);
    
    if (arr1[i] <= arr2[j]) {
      log(\`Taking \${arr1[i]} from arr1\`);
      mark(i, 'sorted');
      result.push(arr1[i]);
      i++;
    } else {
      log(\`Taking \${arr2[j]} from arr2\`);
      result.push(arr2[j]);
      j++;
    }
  }
  
  // Add remaining elements
  while (i < arr1.length) {
    visit(i);
    mark(i, 'sorted');
    result.push(arr1[i]);
    i++;
  }
  
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }
  
  log(\`Merged: [\${result.join(', ')}]\`);
  return result;
}

// Split input array and merge demonstration
const mid = Math.floor(inputArray.length / 2);
const arr1 = inputArray.slice(0, mid).sort((a, b) => a - b);
const arr2 = inputArray.slice(mid).sort((a, b) => a - b);
log(\`Arr1: [\${arr1.join(', ')}]\`);
log(\`Arr2: [\${arr2.join(', ')}]\`);
mergeSortedArrays(arr1, arr2);
`,

    java: `// Merge Two Sorted Arrays - Java
public class MergeSortedArrays {
    public static int[] merge(int[] nums1, int[] nums2) {
        int[] result = new int[nums1.length + nums2.length];
        int i = 0, j = 0, k = 0;
        
        while (i < nums1.length && j < nums2.length) {
            if (nums1[i] <= nums2[j]) {
                result[k++] = nums1[i++];
            } else {
                result[k++] = nums2[j++];
            }
        }
        
        while (i < nums1.length) result[k++] = nums1[i++];
        while (j < nums2.length) result[k++] = nums2[j++];
        
        return result;
    }
    
    public static void main(String[] args) {
        int[] nums1 = {1, 3, 5, 7};
        int[] nums2 = {2, 4, 6, 8};
        int[] merged = merge(nums1, nums2);
        System.out.print("Merged: ");
        for (int num : merged) System.out.print(num + " ");
    }
}
`,

    python: `# Merge Two Sorted Arrays - Python

def merge_sorted_arrays(nums1, nums2):
    result = []
    i, j = 0, 0
    
    while i < len(nums1) and j < len(nums2):
        if nums1[i] <= nums2[j]:
            result.append(nums1[i])
            i += 1
        else:
            result.append(nums2[j])
            j += 1
    
    result.extend(nums1[i:])
    result.extend(nums2[j:])
    
    return result


nums1 = [1, 3, 5, 7]
nums2 = [2, 4, 6, 8]
print(f"Merged: {merge_sorted_arrays(nums1, nums2)}")
`,

    cpp: `// Merge Two Sorted Arrays - C++
#include <iostream>
#include <vector>
using namespace std;

vector<int> merge(vector<int>& nums1, vector<int>& nums2) {
    vector<int> result;
    int i = 0, j = 0;
    
    while (i < nums1.size() && j < nums2.size()) {
        if (nums1[i] <= nums2[j]) {
            result.push_back(nums1[i++]);
        } else {
            result.push_back(nums2[j++]);
        }
    }
    
    while (i < nums1.size()) result.push_back(nums1[i++]);
    while (j < nums2.size()) result.push_back(nums2[j++]);
    
    return result;
}

int main() {
    vector<int> nums1 = {1, 3, 5, 7};
    vector<int> nums2 = {2, 4, 6, 8};
    vector<int> merged = merge(nums1, nums2);
    cout << "Merged: ";
    for (int num : merged) cout << num << " ";
    cout << endl;
    return 0;
}
`,

    go: `// Merge Two Sorted Arrays - Go
package main

import "fmt"

func merge(nums1, nums2 []int) []int {
    result := make([]int, 0, len(nums1)+len(nums2))
    i, j := 0, 0
    
    for i < len(nums1) && j < len(nums2) {
        if nums1[i] <= nums2[j] {
            result = append(result, nums1[i])
            i++
        } else {
            result = append(result, nums2[j])
            j++
        }
    }
    
    result = append(result, nums1[i:]...)
    result = append(result, nums2[j:]...)
    
    return result
}

func main() {
    nums1 := []int{1, 3, 5, 7}
    nums2 := []int{2, 4, 6, 8}
    fmt.Printf("Merged: %v\\n", merge(nums1, nums2))
}
`,
  },
};
