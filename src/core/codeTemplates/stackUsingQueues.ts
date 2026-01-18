import { AlgorithmCodeTemplates } from './types';

export const stackUsingQueuesCode: AlgorithmCodeTemplates = {
  algorithmId: 'stack-using-queues',
  algorithmName: 'Stack Using Two Queues',
  category: 'queues',
  templates: {
    javascript: `// Stack Using Two Queues - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class StackUsingQueues {
  constructor() {
    this.queue1 = [];
    this.queue2 = [];
  }
  
  push(x) {
    // Add to queue2
    this.queue2.push(x);
    log(\`Push \${x} to queue2\`);
    
    // Move all from queue1 to queue2
    while (this.queue1.length > 0) {
      this.queue2.push(this.queue1.shift());
    }
    
    // Swap queues
    [this.queue1, this.queue2] = [this.queue2, this.queue1];
    
    visit(0);
    mark(0, 'current');
    log(\`Stack (queue1): [\${this.queue1.join(', ')}]\`);
  }
  
  pop() {
    if (this.queue1.length === 0) {
      log('Stack is empty');
      return undefined;
    }
    const item = this.queue1.shift();
    log(\`Pop: \${item}\`);
    mark(0, 'found');
    return item;
  }
  
  top() {
    return this.queue1.length > 0 ? this.queue1[0] : undefined;
  }
  
  isEmpty() {
    return this.queue1.length === 0;
  }
}

// Demo
const stack = new StackUsingQueues();
stack.push(1);
stack.push(2);
stack.push(3);
log(\`Top: \${stack.top()}\`);
log(\`Pop: \${stack.pop()}\`);
log(\`Pop: \${stack.pop()}\`);
log(\`Top: \${stack.top()}\`);
`,

    java: `// Stack Using Two Queues - Java
import java.util.*;

public class StackUsingQueues {
    Queue<Integer> queue1 = new LinkedList<>();
    Queue<Integer> queue2 = new LinkedList<>();
    
    public void push(int x) {
        queue2.offer(x);
        while (!queue1.isEmpty()) {
            queue2.offer(queue1.poll());
        }
        Queue<Integer> temp = queue1;
        queue1 = queue2;
        queue2 = temp;
    }
    
    public int pop() {
        return queue1.isEmpty() ? -1 : queue1.poll();
    }
    
    public int top() {
        return queue1.isEmpty() ? -1 : queue1.peek();
    }
    
    public boolean isEmpty() {
        return queue1.isEmpty();
    }
    
    public static void main(String[] args) {
        StackUsingQueues s = new StackUsingQueues();
        s.push(1);
        s.push(2);
        s.push(3);
        System.out.println("Top: " + s.top());
        System.out.println("Pop: " + s.pop());
    }
}
`,

    python: `# Stack Using Two Queues - Python
from collections import deque

class StackUsingQueues:
    def __init__(self):
        self.queue1 = deque()
        self.queue2 = deque()
    
    def push(self, x):
        self.queue2.append(x)
        while self.queue1:
            self.queue2.append(self.queue1.popleft())
        self.queue1, self.queue2 = self.queue2, self.queue1
    
    def pop(self):
        return self.queue1.popleft() if self.queue1 else None
    
    def top(self):
        return self.queue1[0] if self.queue1 else None
    
    def is_empty(self):
        return len(self.queue1) == 0


s = StackUsingQueues()
s.push(1)
s.push(2)
s.push(3)
print(f"Top: {s.top()}")
print(f"Pop: {s.pop()}")
`,

    cpp: `// Stack Using Two Queues - C++
#include <iostream>
#include <queue>
using namespace std;

class StackUsingQueues {
    queue<int> queue1, queue2;
public:
    void push(int x) {
        queue2.push(x);
        while (!queue1.empty()) {
            queue2.push(queue1.front());
            queue1.pop();
        }
        swap(queue1, queue2);
    }
    
    int pop() {
        if (queue1.empty()) return -1;
        int item = queue1.front();
        queue1.pop();
        return item;
    }
    
    int top() {
        return queue1.empty() ? -1 : queue1.front();
    }
    
    bool isEmpty() {
        return queue1.empty();
    }
};

int main() {
    StackUsingQueues s;
    s.push(1);
    s.push(2);
    s.push(3);
    cout << "Top: " << s.top() << endl;
    cout << "Pop: " << s.pop() << endl;
    return 0;
}
`,

    go: `// Stack Using Two Queues - Go
package main

import "fmt"

type StackUsingQueues struct {
    queue1, queue2 []int
}

func (s *StackUsingQueues) Push(x int) {
    s.queue2 = append(s.queue2, x)
    for len(s.queue1) > 0 {
        s.queue2 = append(s.queue2, s.queue1[0])
        s.queue1 = s.queue1[1:]
    }
    s.queue1, s.queue2 = s.queue2, s.queue1
}

func (s *StackUsingQueues) Pop() int {
    if len(s.queue1) == 0 { return -1 }
    item := s.queue1[0]
    s.queue1 = s.queue1[1:]
    return item
}

func (s *StackUsingQueues) Top() int {
    if len(s.queue1) == 0 { return -1 }
    return s.queue1[0]
}

func main() {
    s := &StackUsingQueues{}
    s.Push(1)
    s.Push(2)
    s.Push(3)
    fmt.Printf("Top: %d\\n", s.Top())
    fmt.Printf("Pop: %d\\n", s.Pop())
}
`,
  },
};
