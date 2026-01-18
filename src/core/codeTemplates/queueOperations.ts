import { AlgorithmCodeTemplates } from './types';

export const queueOperationsCode: AlgorithmCodeTemplates = {
  algorithmId: 'queue-operations',
  algorithmName: 'Queue Operations',
  category: 'queues',
  templates: {
    javascript: `// Queue Operations - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element) {
    this.items.push(element);
    log(\`Enqueue: \${element}\`);
    visit(this.items.length - 1);
    mark(this.items.length - 1, 'current');
  }
  
  dequeue() {
    if (this.isEmpty()) {
      log('Queue is empty, cannot dequeue');
      return undefined;
    }
    const item = this.items.shift();
    log(\`Dequeue: \${item}\`);
    return item;
  }
  
  front() {
    if (this.isEmpty()) return undefined;
    return this.items[0];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
  
  print() {
    log(\`Queue: [\${this.items.join(' <- ')}]\`);
  }
}

// Demo
const queue = new Queue();
log('Queue Operations Demo (FIFO)');

queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.print();

log(\`Front: \${queue.front()}\`);
log(\`Size: \${queue.size()}\`);

queue.dequeue();
queue.dequeue();
queue.print();

log(\`Is Empty: \${queue.isEmpty()}\`);
`,

    java: `// Queue Operations - Java
import java.util.*;

public class QueueOperations {
    public static void main(String[] args) {
        Queue<Integer> queue = new LinkedList<>();
        
        // Enqueue
        queue.offer(10);
        queue.offer(20);
        queue.offer(30);
        System.out.println("Queue: " + queue);
        
        // Front (peek)
        System.out.println("Front: " + queue.peek());
        
        // Dequeue
        System.out.println("Dequeue: " + queue.poll());
        System.out.println("Dequeue: " + queue.poll());
        
        System.out.println("Queue: " + queue);
        System.out.println("Is Empty: " + queue.isEmpty());
    }
}
`,

    python: `# Queue Operations - Python
from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()
    
    def enqueue(self, item):
        self.items.append(item)
    
    def dequeue(self):
        if not self.is_empty():
            return self.items.popleft()
        return None
    
    def front(self):
        if not self.is_empty():
            return self.items[0]
        return None
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)


# Demo
queue = Queue()
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)
print(f"Queue: {list(queue.items)}")
print(f"Front: {queue.front()}")
print(f"Dequeue: {queue.dequeue()}")
print(f"Queue: {list(queue.items)}")
`,

    cpp: `// Queue Operations - C++
#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    
    // Enqueue
    q.push(10);
    q.push(20);
    q.push(30);
    
    cout << "Front: " << q.front() << endl;
    cout << "Back: " << q.back() << endl;
    cout << "Size: " << q.size() << endl;
    
    // Dequeue
    q.pop();
    cout << "After pop, Front: " << q.front() << endl;
    
    q.pop();
    q.pop();
    cout << "Is Empty: " << (q.empty() ? "true" : "false") << endl;
    
    return 0;
}
`,

    go: `// Queue Operations - Go
package main

import "fmt"

type Queue struct {
    items []int
}

func (q *Queue) Enqueue(item int) {
    q.items = append(q.items, item)
}

func (q *Queue) Dequeue() (int, bool) {
    if q.IsEmpty() {
        return 0, false
    }
    item := q.items[0]
    q.items = q.items[1:]
    return item, true
}

func (q *Queue) Front() (int, bool) {
    if q.IsEmpty() {
        return 0, false
    }
    return q.items[0], true
}

func (q *Queue) IsEmpty() bool {
    return len(q.items) == 0
}

func main() {
    queue := &Queue{}
    queue.Enqueue(10)
    queue.Enqueue(20)
    queue.Enqueue(30)
    fmt.Printf("Queue: %v\\n", queue.items)
    
    if val, ok := queue.Front(); ok {
        fmt.Printf("Front: %d\\n", val)
    }
    
    queue.Dequeue()
    fmt.Printf("After dequeue: %v\\n", queue.items)
}
`,
  },
};
