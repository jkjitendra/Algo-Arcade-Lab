import { AlgorithmCodeTemplates } from './types';

export const stackOperationsCode: AlgorithmCodeTemplates = {
  algorithmId: 'stack-operations',
  algorithmName: 'Stack Operations',
  category: 'stacks',
  templates: {
    javascript: `// Stack Operations - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
    log(\`Push: \${element}\`);
    visit(this.items.length - 1);
    mark(this.items.length - 1, 'current');
  }
  
  pop() {
    if (this.isEmpty()) {
      log('Stack is empty, cannot pop');
      return undefined;
    }
    const item = this.items.pop();
    log(\`Pop: \${item}\`);
    return item;
  }
  
  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
  
  print() {
    log(\`Stack: [\${this.items.join(', ')}]\`);
  }
}

// Demo
const stack = new Stack();
log('Stack Operations Demo');

// Push elements
stack.push(10);
stack.push(20);
stack.push(30);
stack.print();

log(\`Peek: \${stack.peek()}\`);
log(\`Size: \${stack.size()}\`);

// Pop elements
stack.pop();
stack.pop();
stack.print();

log(\`Is Empty: \${stack.isEmpty()}\`);
`,

    java: `// Stack Operations - Java
import java.util.*;

public class StackOperations {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        
        // Push
        stack.push(10);
        stack.push(20);
        stack.push(30);
        System.out.println("Stack: " + stack);
        
        // Peek
        System.out.println("Peek: " + stack.peek());
        
        // Pop
        System.out.println("Pop: " + stack.pop());
        System.out.println("Pop: " + stack.pop());
        
        System.out.println("Stack: " + stack);
        System.out.println("Is Empty: " + stack.isEmpty());
    }
}
`,

    python: `# Stack Operations - Python

class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        self.items.append(item)
    
    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        return None
    
    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        return None
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)


# Demo
stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)
print(f"Stack: {stack.items}")
print(f"Peek: {stack.peek()}")
print(f"Pop: {stack.pop()}")
print(f"Stack: {stack.items}")
`,

    cpp: `// Stack Operations - C++
#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> s;
    
    // Push
    s.push(10);
    s.push(20);
    s.push(30);
    
    cout << "Top: " << s.top() << endl;
    cout << "Size: " << s.size() << endl;
    
    // Pop
    s.pop();
    cout << "After pop, Top: " << s.top() << endl;
    
    s.pop();
    s.pop();
    cout << "Is Empty: " << (s.empty() ? "true" : "false") << endl;
    
    return 0;
}
`,

    go: `// Stack Operations - Go
package main

import "fmt"

type Stack struct {
    items []int
}

func (s *Stack) Push(item int) {
    s.items = append(s.items, item)
}

func (s *Stack) Pop() (int, bool) {
    if s.IsEmpty() {
        return 0, false
    }
    item := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return item, true
}

func (s *Stack) Peek() (int, bool) {
    if s.IsEmpty() {
        return 0, false
    }
    return s.items[len(s.items)-1], true
}

func (s *Stack) IsEmpty() bool {
    return len(s.items) == 0
}

func main() {
    stack := &Stack{}
    stack.Push(10)
    stack.Push(20)
    stack.Push(30)
    fmt.Printf("Stack: %v\\n", stack.items)
    
    if val, ok := stack.Peek(); ok {
        fmt.Printf("Peek: %d\\n", val)
    }
    
    stack.Pop()
    fmt.Printf("After pop: %v\\n", stack.items)
}
`,
  },
};
