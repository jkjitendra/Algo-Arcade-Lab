import { AlgorithmCodeTemplates } from './types';

export const dutchNationalFlagCode: AlgorithmCodeTemplates = {
  algorithmId: 'dutch-national-flag',
  algorithmName: 'Dutch National Flag',
  category: 'arrays',
  templates: {
    javascript: `// Dutch National Flag Algorithm - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), mark(i, type), visit(i), log(msg)
// Sort array containing only 0s, 1s, and 2s in O(n) time

function dutchNationalFlag(arr) {
  log(\`Sorting array with 0s, 1s, and 2s using Dutch National Flag\`);
  
  let low = 0;      // Boundary for 0s
  let mid = 0;      // Current element
  let high = arr.length - 1;  // Boundary for 2s
  
  while (mid <= high) {
    visit(mid);
    compare(mid, mid);
    
    if (arr[mid] === 0) {
      // Swap with low pointer and move both forward
      log(\`Found 0 at \${mid}, swapping with \${low}\`);
      swap(low, mid);
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      mark(low, 'sorted');
      low++;
      mid++;
    } else if (arr[mid] === 1) {
      // 1 is in correct position, just move mid
      log(\`Found 1 at \${mid}, already in place\`);
      mark(mid, 'current');
      mid++;
    } else {
      // Swap with high pointer and move high back
      log(\`Found 2 at \${mid}, swapping with \${high}\`);
      swap(mid, high);
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      mark(high, 'sorted');
      high--;
    }
  }
  
  // Mark all as sorted
  for (let i = 0; i < arr.length; i++) {
    mark(i, 'sorted');
  }
  
  log(\`Sorted: [\${arr.join(', ')}]\`);
  return arr;
}

// Create test array with 0s, 1s, 2s
const testArr = inputArray.map(x => x % 3);
dutchNationalFlag(testArr);
`,

    java: `// Dutch National Flag Algorithm - Java
public class DutchNationalFlag {
    public static void sort012(int[] arr) {
        int low = 0, mid = 0, high = arr.length - 1;
        
        while (mid <= high) {
            if (arr[mid] == 0) {
                int temp = arr[low];
                arr[low] = arr[mid];
                arr[mid] = temp;
                low++;
                mid++;
            } else if (arr[mid] == 1) {
                mid++;
            } else {
                int temp = arr[mid];
                arr[mid] = arr[high];
                arr[high] = temp;
                high--;
            }
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {0, 1, 2, 0, 1, 2, 1, 0, 2};
        sort012(arr);
        System.out.print("Sorted: ");
        for (int num : arr) System.out.print(num + " ");
    }
}
`,

    python: `# Dutch National Flag Algorithm - Python

def sort_012(arr):
    low, mid, high = 0, 0, len(arr) - 1
    
    while mid <= high:
        if arr[mid] == 0:
            arr[low], arr[mid] = arr[mid], arr[low]
            low += 1
            mid += 1
        elif arr[mid] == 1:
            mid += 1
        else:
            arr[mid], arr[high] = arr[high], arr[mid]
            high -= 1
    
    return arr


arr = [0, 1, 2, 0, 1, 2, 1, 0, 2]
print(f"Sorted: {sort_012(arr)}")
`,

    cpp: `// Dutch National Flag Algorithm - C++
#include <iostream>
#include <vector>
using namespace std;

void sort012(vector<int>& arr) {
    int low = 0, mid = 0, high = arr.size() - 1;
    
    while (mid <= high) {
        if (arr[mid] == 0) {
            swap(arr[low], arr[mid]);
            low++;
            mid++;
        } else if (arr[mid] == 1) {
            mid++;
        } else {
            swap(arr[mid], arr[high]);
            high--;
        }
    }
}

int main() {
    vector<int> arr = {0, 1, 2, 0, 1, 2, 1, 0, 2};
    sort012(arr);
    cout << "Sorted: ";
    for (int num : arr) cout << num << " ";
    cout << endl;
    return 0;
}
`,

    go: `// Dutch National Flag Algorithm - Go
package main

import "fmt"

func sort012(arr []int) {
    low, mid, high := 0, 0, len(arr)-1
    
    for mid <= high {
        if arr[mid] == 0 {
            arr[low], arr[mid] = arr[mid], arr[low]
            low++
            mid++
        } else if arr[mid] == 1 {
            mid++
        } else {
            arr[mid], arr[high] = arr[high], arr[mid]
            high--
        }
    }
}

func main() {
    arr := []int{0, 1, 2, 0, 1, 2, 1, 0, 2}
    sort012(arr)
    fmt.Printf("Sorted: %v\\n", arr)
}
`,
  },
};
