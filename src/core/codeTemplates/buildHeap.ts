import { AlgorithmCodeTemplates } from './types';

export const buildHeapCode: AlgorithmCodeTemplates = {
  algorithmId: 'build-heap',
  algorithmName: 'Build Heap (Heapify)',
  category: 'heaps',
  templates: {
    javascript: `// Build Heap / Heapify - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), mark(i, type), visit(i), log(msg)
// O(n) time complexity by building from bottom up

function buildMaxHeap(arr) {
  log(\`Building max heap from: [\${arr.join(', ')}]\`);
  const n = arr.length;
  
  // Start from last non-leaf node and heapify all nodes
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  log(\`Max heap built: [\${arr.join(', ')}]\`);
  return arr;
}

function heapify(arr, n, i) {
  visit(i);
  mark(i, 'current');
  
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n) {
    compare(largest, left);
    if (arr[left] > arr[largest]) {
      largest = left;
    }
  }
  
  if (right < n) {
    compare(largest, right);
    if (arr[right] > arr[largest]) {
      largest = right;
    }
  }
  
  if (largest !== i) {
    log(\`Swap \${arr[i]} with \${arr[largest]}\`);
    swap(i, largest);
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    mark(largest, 'found');
    heapify(arr, n, largest);
  }
}

function buildMinHeap(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    minHeapify(arr, n, i);
  }
  return arr;
}

function minHeapify(arr, n, i) {
  let smallest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] < arr[smallest]) smallest = left;
  if (right < n && arr[right] < arr[smallest]) smallest = right;
  
  if (smallest !== i) {
    [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
    minHeapify(arr, n, smallest);
  }
}

// Demo
const arr = [4, 10, 3, 5, 1, 8, 2];
buildMaxHeap([...arr]);
log('');
log(\`Min heap: [\${buildMinHeap([...arr]).join(', ')}]\`);
`,

    java: `// Build Heap - Java
import java.util.Arrays;

public class BuildHeap {
    public static void buildMaxHeap(int[] arr) {
        int n = arr.length;
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
    }
    
    static void heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;
        
        if (largest != i) {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            heapify(arr, n, largest);
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {4, 10, 3, 5, 1, 8, 2};
        buildMaxHeap(arr);
        System.out.println("Max heap: " + Arrays.toString(arr));
    }
}
`,

    python: `# Build Heap - Python
import heapq

def build_max_heap(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    return arr

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

# Demo
arr = [4, 10, 3, 5, 1, 8, 2]
print(f"Max heap: {build_max_heap(arr.copy())}")

# Using heapq for min heap
min_heap = arr.copy()
heapq.heapify(min_heap)
print(f"Min heap: {min_heap}")
`,

    cpp: `// Build Heap - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void heapify(vector<int>& arr, int n, int i) {
    int largest = i, left = 2*i+1, right = 2*i+2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void buildMaxHeap(vector<int>& arr) {
    for (int i = arr.size()/2 - 1; i >= 0; i--) {
        heapify(arr, arr.size(), i);
    }
}

int main() {
    vector<int> arr = {4, 10, 3, 5, 1, 8, 2};
    buildMaxHeap(arr);
    cout << "Max heap: ";
    for (int x : arr) cout << x << " ";
    
    // Using STL make_heap
    vector<int> arr2 = {4, 10, 3, 5, 1, 8, 2};
    make_heap(arr2.begin(), arr2.end());  // Max heap
    return 0;
}
`,

    go: `// Build Heap - Go
package main

import "fmt"

func buildMaxHeap(arr []int) {
    n := len(arr)
    for i := n/2 - 1; i >= 0; i-- {
        heapify(arr, n, i)
    }
}

func heapify(arr []int, n, i int) {
    largest := i
    left := 2*i + 1
    right := 2*i + 2
    
    if left < n && arr[left] > arr[largest] { largest = left }
    if right < n && arr[right] > arr[largest] { largest = right }
    
    if largest != i {
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
    }
}

func main() {
    arr := []int{4, 10, 3, 5, 1, 8, 2}
    buildMaxHeap(arr)
    fmt.Printf("Max heap: %v\\n", arr)
}
`,
  },
};
