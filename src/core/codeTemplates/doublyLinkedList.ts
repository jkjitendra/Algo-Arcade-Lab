import { AlgorithmCodeTemplates } from './types';

export const doublyLinkedListCode: AlgorithmCodeTemplates = {
  algorithmId: 'doubly-linked-list',
  algorithmName: 'Doubly Linked List',
  category: 'linked-lists',
  templates: {
    javascript: `// Doubly Linked List - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
    log(\`Appended \${data}\`);
    this.print();
  }
  
  prepend(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
    log(\`Prepended \${data}\`);
    this.print();
  }
  
  delete(data) {
    let current = this.head;
    while (current) {
      if (current.data === data) {
        if (current.prev) current.prev.next = current.next;
        else this.head = current.next;
        
        if (current.next) current.next.prev = current.prev;
        else this.tail = current.prev;
        
        this.size--;
        log(\`Deleted \${data}\`);
        return;
      }
      current = current.next;
    }
  }
  
  printForward() {
    const values = [];
    let current = this.head;
    while (current) {
      values.push(current.data);
      current = current.next;
    }
    log(\`Forward: null <-> \${values.join(' <-> ')} <-> null\`);
  }
  
  printBackward() {
    const values = [];
    let current = this.tail;
    while (current) {
      values.push(current.data);
      current = current.prev;
    }
    log(\`Backward: \${values.join(' <-> ')}\`);
  }
  
  print() {
    this.printForward();
  }
}

// Demo
const list = new DoublyLinkedList();
list.append(10);
list.append(20);
list.append(30);
list.prepend(5);
list.printForward();
list.printBackward();
`,

    java: `// Doubly Linked List - Java
class DNode {
    int data;
    DNode prev, next;
    DNode(int data) { this.data = data; }
}

public class DoublyLinkedList {
    DNode head, tail;
    
    void append(int data) {
        DNode newNode = new DNode(data);
        if (head == null) { head = tail = newNode; return; }
        newNode.prev = tail;
        tail.next = newNode;
        tail = newNode;
    }
    
    void prepend(int data) {
        DNode newNode = new DNode(data);
        if (head == null) { head = tail = newNode; return; }
        newNode.next = head;
        head.prev = newNode;
        head = newNode;
    }
    
    void print() {
        DNode curr = head;
        while (curr != null) {
            System.out.print(curr.data + " <-> ");
            curr = curr.next;
        }
        System.out.println("null");
    }
    
    public static void main(String[] args) {
        DoublyLinkedList list = new DoublyLinkedList();
        list.append(10);
        list.append(20);
        list.prepend(5);
        list.print();
    }
}
`,

    python: `# Doubly Linked List - Python

class DNode:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
    
    def append(self, data):
        new_node = DNode(data)
        if not self.head:
            self.head = self.tail = new_node
            return
        new_node.prev = self.tail
        self.tail.next = new_node
        self.tail = new_node
    
    def prepend(self, data):
        new_node = DNode(data)
        if not self.head:
            self.head = self.tail = new_node
            return
        new_node.next = self.head
        self.head.prev = new_node
        self.head = new_node
    
    def print_list(self):
        values = []
        curr = self.head
        while curr:
            values.append(str(curr.data))
            curr = curr.next
        print("null <-> " + " <-> ".join(values) + " <-> null")


dll = DoublyLinkedList()
dll.append(10)
dll.append(20)
dll.prepend(5)
dll.print_list()
`,

    cpp: `// Doubly Linked List - C++
#include <iostream>
using namespace std;

struct DNode {
    int data;
    DNode *prev, *next;
    DNode(int d) : data(d), prev(nullptr), next(nullptr) {}
};

class DoublyLinkedList {
    DNode *head = nullptr, *tail = nullptr;
public:
    void append(int data) {
        DNode* newNode = new DNode(data);
        if (!head) { head = tail = newNode; return; }
        newNode->prev = tail;
        tail->next = newNode;
        tail = newNode;
    }
    
    void prepend(int data) {
        DNode* newNode = new DNode(data);
        if (!head) { head = tail = newNode; return; }
        newNode->next = head;
        head->prev = newNode;
        head = newNode;
    }
    
    void print() {
        DNode* curr = head;
        cout << "null <-> ";
        while (curr) {
            cout << curr->data << " <-> ";
            curr = curr->next;
        }
        cout << "null" << endl;
    }
};

int main() {
    DoublyLinkedList list;
    list.append(10);
    list.append(20);
    list.prepend(5);
    list.print();
    return 0;
}
`,

    go: `// Doubly Linked List - Go
package main

import "fmt"

type DNode struct {
    data int
    prev, next *DNode
}

type DoublyLinkedList struct {
    head, tail *DNode
}

func (l *DoublyLinkedList) Append(data int) {
    newNode := &DNode{data: data}
    if l.head == nil {
        l.head, l.tail = newNode, newNode
        return
    }
    newNode.prev = l.tail
    l.tail.next = newNode
    l.tail = newNode
}

func (l *DoublyLinkedList) Prepend(data int) {
    newNode := &DNode{data: data}
    if l.head == nil {
        l.head, l.tail = newNode, newNode
        return
    }
    newNode.next = l.head
    l.head.prev = newNode
    l.head = newNode
}

func (l *DoublyLinkedList) Print() {
    curr := l.head
    fmt.Print("nil <-> ")
    for curr != nil {
        fmt.Printf("%d <-> ", curr.data)
        curr = curr.next
    }
    fmt.Println("nil")
}

func main() {
    list := &DoublyLinkedList{}
    list.Append(10)
    list.Append(20)
    list.Prepend(5)
    list.Print()
}
`,
  },
};
