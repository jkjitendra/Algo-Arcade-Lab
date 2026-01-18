import { AlgorithmCodeTemplates } from './types';

export const prefixSumCode: AlgorithmCodeTemplates = {
  algorithmId: 'prefix-sum',
  algorithmName: 'Prefix Sum',
  category: 'arrays',
  templates: {
    javascript: `// Prefix Sum Technique - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Build prefix sum array for O(1) range sum queries

function buildPrefixSum(arr) {
  log(\`Building prefix sum array for \${arr.length} elements\`);
  
  const prefix = new Array(arr.length + 1).fill(0);
  
  for (let i = 0; i < arr.length; i++) {
    visit(i);
    prefix[i + 1] = prefix[i] + arr[i];
    log(\`prefix[\${i + 1}] = \${prefix[i + 1]}\`);
    mark(i, 'sorted');
  }
  
  return prefix;
}

function rangeSum(prefix, left, right) {
  // Sum of elements from index left to right (inclusive)
  return prefix[right + 1] - prefix[left];
}

// Build prefix sum
const prefix = buildPrefixSum(inputArray);

// Demo range queries
const left = 0;
const right = Math.min(3, inputArray.length - 1);
const sum = rangeSum(prefix, left, right);
log(\`Sum of elements [\${left}...\${right}] = \${sum}\`);

// Mark the queried range
for (let i = left; i <= right; i++) {
  mark(i, 'found');
}
`,

    java: `// Prefix Sum Technique - Java
public class PrefixSum {
    private int[] prefix;
    
    public PrefixSum(int[] arr) {
        prefix = new int[arr.length + 1];
        for (int i = 0; i < arr.length; i++) {
            prefix[i + 1] = prefix[i] + arr[i];
        }
    }
    
    public int rangeSum(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        PrefixSum ps = new PrefixSum(arr);
        
        System.out.println("Sum[0..4]: " + ps.rangeSum(0, 4));
        System.out.println("Sum[3..7]: " + ps.rangeSum(3, 7));
    }
}
`,

    python: `# Prefix Sum Technique - Python
from itertools import accumulate

class PrefixSum:
    def __init__(self, arr):
        self.prefix = [0] + list(accumulate(arr))
    
    def range_sum(self, left, right):
        return self.prefix[right + 1] - self.prefix[left]


arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
ps = PrefixSum(arr)

print(f"Sum[0..4]: {ps.range_sum(0, 4)}")
print(f"Sum[3..7]: {ps.range_sum(3, 7)}")
`,

    cpp: `// Prefix Sum Technique - C++
#include <iostream>
#include <vector>
using namespace std;

class PrefixSum {
private:
    vector<int> prefix;
    
public:
    PrefixSum(vector<int>& arr) {
        prefix.resize(arr.size() + 1, 0);
        for (int i = 0; i < arr.size(); i++) {
            prefix[i + 1] = prefix[i] + arr[i];
        }
    }
    
    int rangeSum(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
};

int main() {
    vector<int> arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    PrefixSum ps(arr);
    
    cout << "Sum[0..4]: " << ps.rangeSum(0, 4) << endl;
    cout << "Sum[3..7]: " << ps.rangeSum(3, 7) << endl;
    return 0;
}
`,

    go: `// Prefix Sum Technique - Go
package main

import "fmt"

type PrefixSum struct {
    prefix []int
}

func NewPrefixSum(arr []int) *PrefixSum {
    prefix := make([]int, len(arr)+1)
    for i := 0; i < len(arr); i++ {
        prefix[i+1] = prefix[i] + arr[i]
    }
    return &PrefixSum{prefix: prefix}
}

func (ps *PrefixSum) RangeSum(left, right int) int {
    return ps.prefix[right+1] - ps.prefix[left]
}

func main() {
    arr := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    ps := NewPrefixSum(arr)
    
    fmt.Printf("Sum[0..4]: %d\\n", ps.RangeSum(0, 4))
    fmt.Printf("Sum[3..7]: %d\\n", ps.RangeSum(3, 7))
}
`,
  },
};
