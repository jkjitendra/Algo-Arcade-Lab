import { AlgorithmCodeTemplates } from './types';

export const circularDoublyLinkedListCode: AlgorithmCodeTemplates = {
  algorithmId: 'circular-doubly-linked-list',
  algorithmName: 'Circular Doubly Linked List',
  category: 'linked-lists',
  templates: {
    javascript: `// Circular Doubly Linked List - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class CircularDoublyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      newNode.next = newNode;
      newNode.prev = newNode;
    } else {
      const tail = this.head.prev;
      tail.next = newNode;
      newNode.prev = tail;
      newNode.next = this.head;
      this.head.prev = newNode;
    }
    this.size++;
    log(\`Appended \${data}\`);
    this.print();
  }
  
  delete(data) {
    if (!this.head) return;
    
    let current = this.head;
    do {
      if (current.data === data) {
        if (this.size === 1) {
          this.head = null;
        } else {
          current.prev.next = current.next;
          current.next.prev = current.prev;
          if (current === this.head) {
            this.head = current.next;
          }
        }
        this.size--;
        log(\`Deleted \${data}\`);
        return;
      }
      current = current.next;
    } while (current !== this.head);
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
    
    log(\`Circular Doubly: <-> \${values.join(' <-> ')} <-> (circular)\`);
  }
}

// Demo
const cdll = new CircularDoublyLinkedList();
cdll.append(10);
cdll.append(20);
cdll.append(30);
cdll.delete(20);
cdll.print();
`,

    java: `// Circular Doubly Linked List - Java
class CDNode {
    int data;
    CDNode prev, next;
    CDNode(int data) { this.data = data; }
}

public class CircularDoublyLinkedList {
    CDNode head;
    
    void append(int data) {
        CDNode newNode = new CDNode(data);
        if (head == null) {
            head = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
        } else {
            CDNode tail = head.prev;
            tail.next = newNode;
            newNode.prev = tail;
            newNode.next = head;
            head.prev = newNode;
        }
    }
    
    void print() {
        if (head == null) return;
        CDNode curr = head;
        do {
            System.out.print(curr.data + " <-> ");
            curr = curr.next;
        } while (curr != head);
        System.out.println("(circular)");
    }
    
    public static void main(String[] args) {
        CircularDoublyLinkedList list = new CircularDoublyLinkedList();
        list.append(10);
        list.append(20);
        list.append(30);
        list.print();
    }
}
`,

    python: `# Circular Doubly Linked List - Python

class CDNode:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

class CircularDoublyLinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, data):
        new_node = CDNode(data)
        if not self.head:
            self.head = new_node
            new_node.next = new_node
            new_node.prev = new_node
        else:
            tail = self.head.prev
            tail.next = new_node
            new_node.prev = tail
            new_node.next = self.head
            self.head.prev = new_node
    
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
        print("<-> " + " <-> ".join(values) + " <-> (circular)")


cdll = CircularDoublyLinkedList()
cdll.append(10)
cdll.append(20)
cdll.append(30)
cdll.print_list()
`,

    cpp: `// Circular Doubly Linked List - C++
#include <iostream>
using namespace std;

struct CDNode {
    int data;
    CDNode *prev, *next;
    CDNode(int d) : data(d), prev(nullptr), next(nullptr) {}
};

class CircularDoublyLinkedList {
    CDNode* head = nullptr;
public:
    void append(int data) {
        CDNode* newNode = new CDNode(data);
        if (!head) {
            head = newNode;
            newNode->next = newNode;
            newNode->prev = newNode;
        } else {
            CDNode* tail = head->prev;
            tail->next = newNode;
            newNode->prev = tail;
            newNode->next = head;
            head->prev = newNode;
        }
    }
    
    void print() {
        if (!head) return;
        CDNode* curr = head;
        do {
            cout << curr->data << " <-> ";
            curr = curr->next;
        } while (curr != head);
        cout << "(circular)" << endl;
    }
};

int main() {
    CircularDoublyLinkedList list;
    list.append(10);
    list.append(20);
    list.append(30);
    list.print();
    return 0;
}
`,

    go: `// Circular Doubly Linked List - Go
package main

import "fmt"

type CDNode struct {
    data int
    prev, next *CDNode
}

type CircularDoublyLinkedList struct {
    head *CDNode
}

func (l *CircularDoublyLinkedList) Append(data int) {
    newNode := &CDNode{data: data}
    if l.head == nil {
        l.head = newNode
        newNode.next = newNode
        newNode.prev = newNode
    } else {
        tail := l.head.prev
        tail.next = newNode
        newNode.prev = tail
        newNode.next = l.head
        l.head.prev = newNode
    }
}

func (l *CircularDoublyLinkedList) Print() {
    if l.head == nil { return }
    curr := l.head
    for {
        fmt.Printf("%d <-> ", curr.data)
        curr = curr.next
        if curr == l.head { break }
    }
    fmt.Println("(circular)")
}

func main() {
    list := &CircularDoublyLinkedList{}
    list.Append(10)
    list.Append(20)
    list.Append(30)
    list.Print()
}
`,
  },
};
