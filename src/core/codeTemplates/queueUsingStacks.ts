import { AlgorithmCodeTemplates } from './types';

export const queueUsingStacksCode: AlgorithmCodeTemplates = {
  algorithmId: 'queue-using-stacks',
  algorithmName: 'Queue Using Two Stacks',
  category: 'queues',
  templates: {
    javascript: `// Queue Using Two Stacks - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class QueueUsingStacks {
  constructor() {
    this.stack1 = []; // For enqueue
    this.stack2 = []; // For dequeue
  }
  
  enqueue(x) {
    this.stack1.push(x);
    log(\`Enqueue \${x}: stack1 = [\${this.stack1.join(', ')}]\`);
    visit(this.stack1.length - 1);
    mark(this.stack1.length - 1, 'current');
  }
  
  dequeue() {
    if (this.stack2.length === 0) {
      // Transfer all from stack1 to stack2
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
      log(\`Transferred to stack2: [\${this.stack2.join(', ')}]\`);
    }
    
    if (this.stack2.length === 0) {
      log('Queue is empty');
      return undefined;
    }
    
    const item = this.stack2.pop();
    log(\`Dequeue \${item}\`);
    mark(0, 'found');
    return item;
  }
  
  peek() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2[this.stack2.length - 1];
  }
  
  isEmpty() {
    return this.stack1.length === 0 && this.stack2.length === 0;
  }
}

// Demo
const queue = new QueueUsingStacks();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
log(\`Dequeue: \${queue.dequeue()}\`);
log(\`Peek: \${queue.peek()}\`);
queue.enqueue(4);
log(\`Dequeue: \${queue.dequeue()}\`);
`,

    java: `// Queue Using Two Stacks - Java
import java.util.*;

public class QueueUsingStacks {
    Stack<Integer> stack1 = new Stack<>();
    Stack<Integer> stack2 = new Stack<>();
    
    public void enqueue(int x) {
        stack1.push(x);
    }
    
    public int dequeue() {
        if (stack2.isEmpty()) {
            while (!stack1.isEmpty()) {
                stack2.push(stack1.pop());
            }
        }
        return stack2.isEmpty() ? -1 : stack2.pop();
    }
    
    public int peek() {
        if (stack2.isEmpty()) {
            while (!stack1.isEmpty()) {
                stack2.push(stack1.pop());
            }
        }
        return stack2.isEmpty() ? -1 : stack2.peek();
    }
    
    public boolean isEmpty() {
        return stack1.isEmpty() && stack2.isEmpty();
    }
    
    public static void main(String[] args) {
        QueueUsingStacks q = new QueueUsingStacks();
        q.enqueue(1);
        q.enqueue(2);
        q.enqueue(3);
        System.out.println("Dequeue: " + q.dequeue());
        System.out.println("Peek: " + q.peek());
    }
}
`,

    python: `# Queue Using Two Stacks - Python

class QueueUsingStacks:
    def __init__(self):
        self.stack1 = []  # For enqueue
        self.stack2 = []  # For dequeue
    
    def enqueue(self, x):
        self.stack1.append(x)
    
    def dequeue(self):
        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())
        return self.stack2.pop() if self.stack2 else None
    
    def peek(self):
        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())
        return self.stack2[-1] if self.stack2 else None
    
    def is_empty(self):
        return not self.stack1 and not self.stack2


q = QueueUsingStacks()
q.enqueue(1)
q.enqueue(2)
q.enqueue(3)
print(f"Dequeue: {q.dequeue()}")
print(f"Peek: {q.peek()}")
`,

    cpp: `// Queue Using Two Stacks - C++
#include <iostream>
#include <stack>
using namespace std;

class QueueUsingStacks {
    stack<int> stack1, stack2;
public:
    void enqueue(int x) {
        stack1.push(x);
    }
    
    int dequeue() {
        if (stack2.empty()) {
            while (!stack1.empty()) {
                stack2.push(stack1.top());
                stack1.pop();
            }
        }
        if (stack2.empty()) return -1;
        int item = stack2.top();
        stack2.pop();
        return item;
    }
    
    int peek() {
        if (stack2.empty()) {
            while (!stack1.empty()) {
                stack2.push(stack1.top());
                stack1.pop();
            }
        }
        return stack2.empty() ? -1 : stack2.top();
    }
    
    bool isEmpty() {
        return stack1.empty() && stack2.empty();
    }
};

int main() {
    QueueUsingStacks q;
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    cout << "Dequeue: " << q.dequeue() << endl;
    cout << "Peek: " << q.peek() << endl;
    return 0;
}
`,

    go: `// Queue Using Two Stacks - Go
package main

import "fmt"

type QueueUsingStacks struct {
    stack1, stack2 []int
}

func (q *QueueUsingStacks) Enqueue(x int) {
    q.stack1 = append(q.stack1, x)
}

func (q *QueueUsingStacks) Dequeue() int {
    if len(q.stack2) == 0 {
        for len(q.stack1) > 0 {
            q.stack2 = append(q.stack2, q.stack1[len(q.stack1)-1])
            q.stack1 = q.stack1[:len(q.stack1)-1]
        }
    }
    if len(q.stack2) == 0 { return -1 }
    item := q.stack2[len(q.stack2)-1]
    q.stack2 = q.stack2[:len(q.stack2)-1]
    return item
}

func (q *QueueUsingStacks) Peek() int {
    if len(q.stack2) == 0 {
        for len(q.stack1) > 0 {
            q.stack2 = append(q.stack2, q.stack1[len(q.stack1)-1])
            q.stack1 = q.stack1[:len(q.stack1)-1]
        }
    }
    if len(q.stack2) == 0 { return -1 }
    return q.stack2[len(q.stack2)-1]
}

func main() {
    q := &QueueUsingStacks{}
    q.Enqueue(1)
    q.Enqueue(2)
    q.Enqueue(3)
    fmt.Printf("Dequeue: %d\\n", q.Dequeue())
    fmt.Printf("Peek: %d\\n", q.Peek())
}
`,
  },
};
