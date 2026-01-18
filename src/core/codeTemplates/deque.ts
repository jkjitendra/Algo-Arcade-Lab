import { AlgorithmCodeTemplates } from './types';

export const dequeCode: AlgorithmCodeTemplates = {
  algorithmId: 'deque',
  algorithmName: 'Deque (Double-ended Queue)',
  category: 'queues',
  templates: {
    javascript: `// Deque (Double-ended Queue) - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class Deque {
  constructor() {
    this.items = [];
  }
  
  addFront(element) {
    this.items.unshift(element);
    log(\`Add front: \${element}\`);
    visit(0);
    mark(0, 'current');
  }
  
  addRear(element) {
    this.items.push(element);
    log(\`Add rear: \${element}\`);
    visit(this.items.length - 1);
    mark(this.items.length - 1, 'current');
  }
  
  removeFront() {
    if (this.isEmpty()) return undefined;
    const item = this.items.shift();
    log(\`Remove front: \${item}\`);
    return item;
  }
  
  removeRear() {
    if (this.isEmpty()) return undefined;
    const item = this.items.pop();
    log(\`Remove rear: \${item}\`);
    return item;
  }
  
  peekFront() {
    return this.isEmpty() ? undefined : this.items[0];
  }
  
  peekRear() {
    return this.isEmpty() ? undefined : this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
  
  print() {
    log(\`Deque: [\${this.items.join(', ')}]\`);
  }
}

// Demo
const dq = new Deque();
dq.addRear(10);
dq.addRear(20);
dq.addFront(5);
dq.addFront(1);
dq.print();

log(\`Front: \${dq.peekFront()}, Rear: \${dq.peekRear()}\`);

dq.removeFront();
dq.removeRear();
dq.print();
`,

    java: `// Deque (Double-ended Queue) - Java
import java.util.*;

public class DequeDemo {
    public static void main(String[] args) {
        Deque<Integer> deque = new ArrayDeque<>();
        
        // Add elements
        deque.addFirst(10);
        deque.addLast(20);
        deque.addFirst(5);
        deque.addLast(30);
        
        System.out.println("Deque: " + deque);
        System.out.println("Front: " + deque.peekFirst());
        System.out.println("Rear: " + deque.peekLast());
        
        // Remove elements
        System.out.println("Remove front: " + deque.removeFirst());
        System.out.println("Remove rear: " + deque.removeLast());
        
        System.out.println("Deque: " + deque);
    }
}
`,

    python: `# Deque (Double-ended Queue) - Python
from collections import deque

# Create deque
dq = deque()

# Add elements
dq.append(10)       # Add to rear
dq.append(20)
dq.appendleft(5)    # Add to front
dq.appendleft(1)

print(f"Deque: {list(dq)}")
print(f"Front: {dq[0]}, Rear: {dq[-1]}")

# Remove elements
print(f"Remove front: {dq.popleft()}")
print(f"Remove rear: {dq.pop()}")

print(f"Deque: {list(dq)}")
`,

    cpp: `// Deque (Double-ended Queue) - C++
#include <iostream>
#include <deque>
using namespace std;

int main() {
    deque<int> dq;
    
    // Add elements
    dq.push_back(10);
    dq.push_back(20);
    dq.push_front(5);
    dq.push_front(1);
    
    cout << "Deque: ";
    for (int x : dq) cout << x << " ";
    cout << endl;
    
    cout << "Front: " << dq.front() << ", Rear: " << dq.back() << endl;
    
    // Remove elements
    dq.pop_front();
    dq.pop_back();
    
    cout << "After removals: ";
    for (int x : dq) cout << x << " ";
    cout << endl;
    
    return 0;
}
`,

    go: `// Deque (Double-ended Queue) - Go
package main

import "fmt"

type Deque struct {
    items []int
}

func (d *Deque) AddFront(item int) {
    d.items = append([]int{item}, d.items...)
}

func (d *Deque) AddRear(item int) {
    d.items = append(d.items, item)
}

func (d *Deque) RemoveFront() (int, bool) {
    if d.IsEmpty() { return 0, false }
    item := d.items[0]
    d.items = d.items[1:]
    return item, true
}

func (d *Deque) RemoveRear() (int, bool) {
    if d.IsEmpty() { return 0, false }
    item := d.items[len(d.items)-1]
    d.items = d.items[:len(d.items)-1]
    return item, true
}

func (d *Deque) PeekFront() (int, bool) {
    if d.IsEmpty() { return 0, false }
    return d.items[0], true
}

func (d *Deque) PeekRear() (int, bool) {
    if d.IsEmpty() { return 0, false }
    return d.items[len(d.items)-1], true
}

func (d *Deque) IsEmpty() bool { return len(d.items) == 0 }

func main() {
    dq := &Deque{}
    dq.AddRear(10)
    dq.AddRear(20)
    dq.AddFront(5)
    dq.AddFront(1)
    fmt.Printf("Deque: %v\\n", dq.items)
    
    dq.RemoveFront()
    dq.RemoveRear()
    fmt.Printf("After removals: %v\\n", dq.items)
}
`,
  },
};
