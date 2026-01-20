import { AlgorithmCodeTemplates } from './types';

export const circularLinkedListCode: AlgorithmCodeTemplates = {
  algorithmId: 'circular-linked-list',
  algorithmName: 'Circular Linked List',
  category: 'linked-lists',
  templates: {
    javascript: `// Circular Linked List - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class CircularLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head;
    } else {
      let current = this.head;
      while (current.next !== this.head) {
        current = current.next;
      }
      current.next = newNode;
      newNode.next = this.head;
    }
    this.size++;
    log(\`Appended \${data}\`);
    this.print();
  }
  
  delete(data) {
    if (!this.head) return;
    
    if (this.head.data === data) {
      if (this.head.next === this.head) {
        this.head = null;
      } else {
        let last = this.head;
        while (last.next !== this.head) last = last.next;
        last.next = this.head.next;
        this.head = this.head.next;
      }
      this.size--;
      log(\`Deleted \${data}\`);
      return;
    }
    
    let current = this.head;
    while (current.next !== this.head && current.next.data !== data) {
      current = current.next;
    }
    
    if (current.next.data === data) {
      current.next = current.next.next;
      this.size--;
      log(\`Deleted \${data}\`);
    }
  }
  
  print() {
    if (!this.head) {
      log('List is empty');
      return;
    }
    
    const values = [];
    let current = this.head;
    do {
      values.push(current.data);
      current = current.next;
    } while (current !== this.head);
    
    log(\`Circular List: \${values.join(' -> ')} -> (back to \${this.head.data})\`);
  }
}

// Demo
const cll = new CircularLinkedList();
cll.append(10);
cll.append(20);
cll.append(30);
cll.delete(20);
cll.print();
`,

    java: `// Circular Linked List - Java
class CNode {
    int data;
    CNode next;
    CNode(int data) { this.data = data; }
}

public class CircularLinkedList {
    CNode head;
    
    void append(int data) {
        CNode newNode = new CNode(data);
        if (head == null) {
            head = newNode;
            newNode.next = head;
            return;
        }
        CNode curr = head;
        while (curr.next != head) curr = curr.next;
        curr.next = newNode;
        newNode.next = head;
    }
    
    void print() {
        if (head == null) return;
        CNode curr = head;
        do {
            System.out.print(curr.data + " -> ");
            curr = curr.next;
        } while (curr != head);
        System.out.println("(back to " + head.data + ")");
    }
    
    public static void main(String[] args) {
        CircularLinkedList list = new CircularLinkedList();
        list.append(10);
        list.append(20);
        list.append(30);
        list.print();
    }
}
`,

    python: `# Circular Linked List - Python

class CNode:
    def __init__(self, data):
        self.data = data
        self.next = None

class CircularLinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, data):
        new_node = CNode(data)
        if not self.head:
            self.head = new_node
            new_node.next = self.head
            return
        curr = self.head
        while curr.next != self.head:
            curr = curr.next
        curr.next = new_node
        new_node.next = self.head
    
    def print_list(self):
        if not self.head:
            return
        values = []
        curr = self.head
        while True:
            values.append(str(curr.data))
            curr = curr.next
            if curr == self.head:
                break
        print(" -> ".join(values) + f" -> (back to {self.head.data})")


cll = CircularLinkedList()
cll.append(10)
cll.append(20)
cll.append(30)
cll.print_list()
`,

    cpp: `// Circular Linked List - C++
#include <iostream>
using namespace std;

struct CNode {
    int data;
    CNode* next;
    CNode(int d) : data(d), next(nullptr) {}
};

class CircularLinkedList {
    CNode* head = nullptr;
public:
    void append(int data) {
        CNode* newNode = new CNode(data);
        if (!head) {
            head = newNode;
            newNode->next = head;
            return;
        }
        CNode* curr = head;
        while (curr->next != head) curr = curr->next;
        curr->next = newNode;
        newNode->next = head;
    }
    
    void print() {
        if (!head) return;
        CNode* curr = head;
        do {
            cout << curr->data << " -> ";
            curr = curr->next;
        } while (curr != head);
        cout << "(back to " << head->data << ")" << endl;
    }
};

int main() {
    CircularLinkedList list;
    list.append(10);
    list.append(20);
    list.append(30);
    list.print();
    return 0;
}
`,

    go: `// Circular Linked List - Go
package main

import "fmt"

type CNode struct {
    data int
    next *CNode
}

type CircularLinkedList struct {
    head *CNode
}

func (l *CircularLinkedList) Append(data int) {
    newNode := &CNode{data: data}
    if l.head == nil {
        l.head = newNode
        newNode.next = l.head
        return
    }
    curr := l.head
    for curr.next != l.head {
        curr = curr.next
    }
    curr.next = newNode
    newNode.next = l.head
}

func (l *CircularLinkedList) Print() {
    if l.head == nil { return }
    curr := l.head
    for {
        fmt.Printf("%d -> ", curr.data)
        curr = curr.next
        if curr == l.head { break }
    }
    fmt.Printf("(back to %d)\\n", l.head.data)
}

func main() {
    list := &CircularLinkedList{}
    list.Append(10)
    list.Append(20)
    list.Append(30)
    list.Print()
}
`,
  },
};
