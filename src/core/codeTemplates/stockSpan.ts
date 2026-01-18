import { AlgorithmCodeTemplates } from './types';

export const stockSpanCode: AlgorithmCodeTemplates = {
  algorithmId: 'stock-span',
  algorithmName: 'Stock Span',
  category: 'stacks',
  templates: {
    javascript: `// Stock Span Problem - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Span = number of consecutive days before (including today) with price <= today's price

function stockSpan(prices) {
  log(\`Calculating stock spans for prices: [\${prices.join(', ')}]\`);
  
  const n = prices.length;
  const spans = new Array(n);
  const stack = []; // Stack of indices
  
  for (let i = 0; i < n; i++) {
    visit(i);
    compare(i, i);
    
    // Pop elements from stack while stack is not empty
    // and top of stack is smaller than or equal to current
    while (stack.length && prices[stack[stack.length - 1]] <= prices[i]) {
      stack.pop();
    }
    
    // If stack is empty, all previous prices were smaller
    // Otherwise, span = distance from previous greater element
    spans[i] = stack.length === 0 ? i + 1 : i - stack[stack.length - 1];
    
    mark(i, 'found');
    log(\`Day \${i}: price = \${prices[i]}, span = \${spans[i]}\`);
    
    stack.push(i);
  }
  
  log(\`Spans: [\${spans.join(', ')}]\`);
  return spans;
}

// Stock prices over days
stockSpan([100, 80, 60, 70, 60, 75, 85]);
`,

    java: `// Stock Span Problem - Java
import java.util.*;

public class StockSpan {
    public static int[] calculateSpan(int[] prices) {
        int n = prices.length;
        int[] spans = new int[n];
        Stack<Integer> stack = new Stack<>();
        
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && prices[stack.peek()] <= prices[i]) {
                stack.pop();
            }
            spans[i] = stack.isEmpty() ? i + 1 : i - stack.peek();
            stack.push(i);
        }
        
        return spans;
    }
    
    public static void main(String[] args) {
        int[] prices = {100, 80, 60, 70, 60, 75, 85};
        int[] spans = calculateSpan(prices);
        System.out.println("Spans: " + Arrays.toString(spans));
    }
}
`,

    python: `# Stock Span Problem - Python

def stock_span(prices):
    n = len(prices)
    spans = [0] * n
    stack = []  # Stack of indices
    
    for i in range(n):
        while stack and prices[stack[-1]] <= prices[i]:
            stack.pop()
        spans[i] = i + 1 if not stack else i - stack[-1]
        stack.append(i)
    
    return spans


prices = [100, 80, 60, 70, 60, 75, 85]
print(f"Spans: {stock_span(prices)}")
`,

    cpp: `// Stock Span Problem - C++
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

vector<int> stockSpan(vector<int>& prices) {
    int n = prices.size();
    vector<int> spans(n);
    stack<int> s;
    
    for (int i = 0; i < n; i++) {
        while (!s.empty() && prices[s.top()] <= prices[i]) {
            s.pop();
        }
        spans[i] = s.empty() ? i + 1 : i - s.top();
        s.push(i);
    }
    
    return spans;
}

int main() {
    vector<int> prices = {100, 80, 60, 70, 60, 75, 85};
    vector<int> spans = stockSpan(prices);
    cout << "Spans: ";
    for (int x : spans) cout << x << " ";
    cout << endl;
    return 0;
}
`,

    go: `// Stock Span Problem - Go
package main

import "fmt"

func stockSpan(prices []int) []int {
    n := len(prices)
    spans := make([]int, n)
    var stack []int
    
    for i := 0; i < n; i++ {
        for len(stack) > 0 && prices[stack[len(stack)-1]] <= prices[i] {
            stack = stack[:len(stack)-1]
        }
        if len(stack) == 0 {
            spans[i] = i + 1
        } else {
            spans[i] = i - stack[len(stack)-1]
        }
        stack = append(stack, i)
    }
    
    return spans
}

func main() {
    prices := []int{100, 80, 60, 70, 60, 75, 85}
    fmt.Printf("Spans: %v\\n", stockSpan(prices))
}
`,
  },
};
