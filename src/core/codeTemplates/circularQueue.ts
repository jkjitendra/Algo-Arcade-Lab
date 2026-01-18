import { AlgorithmCodeTemplates } from './types';

export const circularQueueCode: AlgorithmCodeTemplates = {
  algorithmId: 'circular-queue',
  algorithmName: 'Circular Queue',
  category: 'queues',
  templates: {
    javascript: `// Circular Queue - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class CircularQueue {
  constructor(capacity) {
    this.items = new Array(capacity);
    this.capacity = capacity;
    this.front = 0;
    this.rear = -1;
    this.size = 0;
  }
  
  enqueue(element) {
    if (this.isFull()) {
      log('Queue is full, cannot enqueue');
      return false;
    }
    this.rear = (this.rear + 1) % this.capacity;
    this.items[this.rear] = element;
    this.size++;
    visit(this.rear);
    mark(this.rear, 'current');
    log(\`Enqueue \${element} at index \${this.rear}\`);
    return true;
  }
  
  dequeue() {
    if (this.isEmpty()) {
      log('Queue is empty');
      return undefined;
    }
    const item = this.items[this.front];
    mark(this.front, 'eliminated');
    this.items[this.front] = undefined;
    this.front = (this.front + 1) % this.capacity;
    this.size--;
    log(\`Dequeue \${item}\`);
    return item;
  }
  
  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[this.front];
  }
  
  isEmpty() {
    return this.size === 0;
  }
  
  isFull() {
    return this.size === this.capacity;
  }
  
  print() {
    log(\`Circular Queue: [\${this.items.map(x => x ?? '_').join(', ')}] front=\${this.front} rear=\${this.rear}\`);
  }
}

// Demo
const cq = new CircularQueue(5);
cq.enqueue(1);
cq.enqueue(2);
cq.enqueue(3);
cq.print();
cq.dequeue();
cq.enqueue(4);
cq.enqueue(5);
cq.enqueue(6); // Wraps around
cq.print();
`,

    java: `// Circular Queue - Java
public class CircularQueue {
    private int[] items;
    private int front, rear, size, capacity;
    
    public CircularQueue(int k) {
        capacity = k;
        items = new int[k];
        front = 0;
        rear = -1;
        size = 0;
    }
    
    public boolean enqueue(int value) {
        if (isFull()) return false;
        rear = (rear + 1) % capacity;
        items[rear] = value;
        size++;
        return true;
    }
    
    public int dequeue() {
        if (isEmpty()) return -1;
        int item = items[front];
        front = (front + 1) % capacity;
        size--;
        return item;
    }
    
    public int front() { return isEmpty() ? -1 : items[front]; }
    public int rear() { return isEmpty() ? -1 : items[rear]; }
    public boolean isEmpty() { return size == 0; }
    public boolean isFull() { return size == capacity; }
    
    public static void main(String[] args) {
        CircularQueue q = new CircularQueue(3);
        q.enqueue(1);
        q.enqueue(2);
        q.enqueue(3);
        System.out.println("Enqueue 4: " + q.enqueue(4)); // false
        System.out.println("Rear: " + q.rear());
        System.out.println("Full: " + q.isFull());
        q.dequeue();
        System.out.println("Enqueue 4: " + q.enqueue(4)); // true
    }
}
`,

    python: `# Circular Queue - Python

class CircularQueue:
    def __init__(self, capacity):
        self.items = [None] * capacity
        self.capacity = capacity
        self.front = 0
        self.rear = -1
        self.size = 0
    
    def enqueue(self, value):
        if self.is_full():
            return False
        self.rear = (self.rear + 1) % self.capacity
        self.items[self.rear] = value
        self.size += 1
        return True
    
    def dequeue(self):
        if self.is_empty():
            return None
        item = self.items[self.front]
        self.items[self.front] = None
        self.front = (self.front + 1) % self.capacity
        self.size -= 1
        return item
    
    def peek(self):
        return None if self.is_empty() else self.items[self.front]
    
    def is_empty(self):
        return self.size == 0
    
    def is_full(self):
        return self.size == self.capacity


q = CircularQueue(3)
q.enqueue(1)
q.enqueue(2)
q.enqueue(3)
print(f"Full: {q.is_full()}")
print(f"Dequeue: {q.dequeue()}")
q.enqueue(4)
print(f"Queue: {q.items}")
`,

    cpp: `// Circular Queue - C++
#include <iostream>
#include <vector>
using namespace std;

class CircularQueue {
    vector<int> items;
    int front, rear, sz, capacity;
public:
    CircularQueue(int k) : capacity(k), items(k), front(0), rear(-1), sz(0) {}
    
    bool enqueue(int value) {
        if (isFull()) return false;
        rear = (rear + 1) % capacity;
        items[rear] = value;
        sz++;
        return true;
    }
    
    int dequeue() {
        if (isEmpty()) return -1;
        int item = items[front];
        front = (front + 1) % capacity;
        sz--;
        return item;
    }
    
    int Front() { return isEmpty() ? -1 : items[front]; }
    int Rear() { return isEmpty() ? -1 : items[rear]; }
    bool isEmpty() { return sz == 0; }
    bool isFull() { return sz == capacity; }
};

int main() {
    CircularQueue q(3);
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    cout << "Full: " << q.isFull() << endl;
    cout << "Dequeue: " << q.dequeue() << endl;
    q.enqueue(4);
    cout << "Front: " << q.Front() << endl;
    return 0;
}
`,

    go: `// Circular Queue - Go
package main

import "fmt"

type CircularQueue struct {
    items    []int
    front    int
    rear     int
    size     int
    capacity int
}

func NewCircularQueue(k int) *CircularQueue {
    return &CircularQueue{items: make([]int, k), capacity: k, front: 0, rear: -1}
}

func (q *CircularQueue) Enqueue(value int) bool {
    if q.IsFull() { return false }
    q.rear = (q.rear + 1) % q.capacity
    q.items[q.rear] = value
    q.size++
    return true
}

func (q *CircularQueue) Dequeue() int {
    if q.IsEmpty() { return -1 }
    item := q.items[q.front]
    q.front = (q.front + 1) % q.capacity
    q.size--
    return item
}

func (q *CircularQueue) Front() int { if q.IsEmpty() { return -1 }; return q.items[q.front] }
func (q *CircularQueue) Rear() int { if q.IsEmpty() { return -1 }; return q.items[q.rear] }
func (q *CircularQueue) IsEmpty() bool { return q.size == 0 }
func (q *CircularQueue) IsFull() bool { return q.size == q.capacity }

func main() {
    q := NewCircularQueue(3)
    q.Enqueue(1)
    q.Enqueue(2)
    q.Enqueue(3)
    fmt.Printf("Full: %v\\n", q.IsFull())
    fmt.Printf("Dequeue: %d\\n", q.Dequeue())
    q.Enqueue(4)
    fmt.Printf("Front: %d\\n", q.Front())
}
`,
  },
};
