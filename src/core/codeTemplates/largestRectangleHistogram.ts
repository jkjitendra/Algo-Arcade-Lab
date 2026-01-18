import { AlgorithmCodeTemplates } from './types';

export const largestRectangleHistogramCode: AlgorithmCodeTemplates = {
  algorithmId: 'largest-rectangle-histogram',
  algorithmName: 'Largest Rectangle Histogram',
  category: 'stacks',
  templates: {
    javascript: `// Largest Rectangle in Histogram - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Find the largest rectangular area in a histogram

function largestRectangleArea(heights) {
  log(\`Finding largest rectangle in histogram: [\${heights.join(', ')}]\`);
  
  const n = heights.length;
  const stack = []; // Stack of indices
  let maxArea = 0;
  let maxStart = 0, maxEnd = 0, maxHeight = 0;
  
  for (let i = 0; i <= n; i++) {
    const h = i === n ? 0 : heights[i];
    
    if (i < n) {
      visit(i);
      mark(i, 'current');
    }
    
    while (stack.length && heights[stack[stack.length - 1]] > h) {
      const height = heights[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      const area = height * width;
      
      log(\`Bar height \${height}, width \${width}, area = \${area}\`);
      
      if (area > maxArea) {
        maxArea = area;
        maxHeight = height;
        maxStart = stack.length === 0 ? 0 : stack[stack.length - 1] + 1;
        maxEnd = i - 1;
      }
    }
    
    stack.push(i);
  }
  
  // Mark the largest rectangle
  for (let i = maxStart; i <= maxEnd && i < n; i++) {
    if (heights[i] >= maxHeight) {
      mark(i, 'found');
    }
  }
  
  log(\`Largest rectangle area: \${maxArea}\`);
  return maxArea;
}

largestRectangleArea([2, 1, 5, 6, 2, 3]);
`,

    java: `// Largest Rectangle in Histogram - Java
import java.util.*;

public class LargestRectangleHistogram {
    public static int largestRectangleArea(int[] heights) {
        Stack<Integer> stack = new Stack<>();
        int maxArea = 0;
        int n = heights.length;
        
        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            
            while (!stack.isEmpty() && heights[stack.peek()] > h) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        
        return maxArea;
    }
    
    public static void main(String[] args) {
        int[] heights = {2, 1, 5, 6, 2, 3};
        System.out.println("Largest area: " + largestRectangleArea(heights));
    }
}
`,

    python: `# Largest Rectangle in Histogram - Python

def largest_rectangle_area(heights):
    stack = []
    max_area = 0
    n = len(heights)
    
    for i in range(n + 1):
        h = 0 if i == n else heights[i]
        
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        
        stack.append(i)
    
    return max_area


heights = [2, 1, 5, 6, 2, 3]
print(f"Largest area: {largest_rectangle_area(heights)}")
`,

    cpp: `// Largest Rectangle in Histogram - C++
#include <iostream>
#include <vector>
#include <stack>
#include <algorithm>
using namespace std;

int largestRectangleArea(vector<int>& heights) {
    stack<int> s;
    int maxArea = 0;
    int n = heights.size();
    
    for (int i = 0; i <= n; i++) {
        int h = (i == n) ? 0 : heights[i];
        
        while (!s.empty() && heights[s.top()] > h) {
            int height = heights[s.top()];
            s.pop();
            int width = s.empty() ? i : i - s.top() - 1;
            maxArea = max(maxArea, height * width);
        }
        s.push(i);
    }
    
    return maxArea;
}

int main() {
    vector<int> heights = {2, 1, 5, 6, 2, 3};
    cout << "Largest area: " << largestRectangleArea(heights) << endl;
    return 0;
}
`,

    go: `// Largest Rectangle in Histogram - Go
package main

import "fmt"

func largestRectangleArea(heights []int) int {
    var stack []int
    maxArea := 0
    n := len(heights)
    
    for i := 0; i <= n; i++ {
        h := 0
        if i < n {
            h = heights[i]
        }
        
        for len(stack) > 0 && heights[stack[len(stack)-1]] > h {
            height := heights[stack[len(stack)-1]]
            stack = stack[:len(stack)-1]
            width := i
            if len(stack) > 0 {
                width = i - stack[len(stack)-1] - 1
            }
            area := height * width
            if area > maxArea {
                maxArea = area
            }
        }
        stack = append(stack, i)
    }
    
    return maxArea
}

func main() {
    heights := []int{2, 1, 5, 6, 2, 3}
    fmt.Printf("Largest area: %d\\n", largestRectangleArea(heights))
}
`,
  },
};
