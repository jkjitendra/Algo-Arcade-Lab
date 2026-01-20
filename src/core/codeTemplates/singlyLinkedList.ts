import { AlgorithmCodeTemplates } from './types';

export const singlyLinkedListCode: AlgorithmCodeTemplates = {
  algorithmId: 'singly-linked-list',
  algorithmName: 'Singly Linked List',
  category: 'linked-lists',
  templates: {
    javascript: `// Singly Linked List - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  // Insert at end
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
    log(\`Appended \${data}\`);
    this.print();
  }
  
  // Insert at beginning
  prepend(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
    log(\`Prepended \${data}\`);
    this.print();
  }
  
  // Delete by value
  delete(data) {
    if (!this.head) return;
    
    if (this.head.data === data) {
      this.head = this.head.next;
      this.size--;
      log(\`Deleted \${data}\`);
      return;
    }
    
    let current = this.head;
    while (current.next && current.next.data !== data) {
      current = current.next;
    }
    
    if (current.next) {
      current.next = current.next.next;
      this.size--;
      log(\`Deleted \${data}\`);
    }
  }
  
  // Search
  search(data) {
    let current = this.head;
    let index = 0;
    while (current) {
      visit(index);
      if (current.data === data) {
        mark(index, 'found');
        log(\`Found \${data} at index \${index}\`);
        return index;
      }
      current = current.next;
      index++;
    }
    log(\`\${data} not found\`);
    return -1;
  }
  
  print() {
    const values = [];
    let current = this.head;
    while (current) {
      values.push(current.data);
      current = current.next;
    }
    log(\`List: \${values.join(' -> ')} -> null\`);
  }
}

// Demo
const list = new SinglyLinkedList();
list.append(10);
list.append(20);
list.append(30);
list.prepend(5);
list.search(20);
list.delete(20);
list.print();
`,

    java: `// Singly Linked List - Java
class Node {
    int data;
    Node next;
    Node(int data) { this.data = data; }
}

public class SinglyLinkedList {
    Node head;
    
    void append(int data) {
        Node newNode = new Node(data);
        if (head == null) { head = newNode; return; }
        Node current = head;
        while (current.next != null) current = current.next;
        current.next = newNode;
    }
    
    void prepend(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
    }
    
    void delete(int data) {
        if (head == null) return;
        if (head.data == data) { head = head.next; return; }
        Node current = head;
        while (current.next != null && current.next.data != data)
            current = current.next;
        if (current.next != null) current.next = current.next.next;
    }
    
    void print() {
        Node current = head;
        while (current != null) {
            System.out.print(current.data + " -> ");
            current = current.next;
        }
        System.out.println("null");
    }
    
    public static void main(String[] args) {
        SinglyLinkedList list = new SinglyLinkedList();
        list.append(10);
        list.append(20);
        list.prepend(5);
        list.print();
    }
}
`,

    python: `# Singly Linked List - Python

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class SinglyLinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
    
    def prepend(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
    
    def delete(self, data):
        if not self.head:
            return
        if self.head.data == data:
            self.head = self.head.next
            return
        current = self.head
        while current.next and current.next.data != data:
            current = current.next
        if current.next:
            current.next = current.next.next
    
    def print_list(self):
        values = []
        current = self.head
        while current:
            values.append(str(current.data))
            current = current.next
        print(" -> ".join(values) + " -> None")


ll = SinglyLinkedList()
ll.append(10)
ll.append(20)
ll.prepend(5)
ll.print_list()
`,

    cpp: `// Singly Linked List - C++
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int d) : data(d), next(nullptr) {}
};

class SinglyLinkedList {
    Node* head = nullptr;
public:
    void append(int data) {
        Node* newNode = new Node(data);
        if (!head) { head = newNode; return; }
        Node* curr = head;
        while (curr->next) curr = curr->next;
        curr->next = newNode;
    }
    
    void prepend(int data) {
        Node* newNode = new Node(data);
        newNode->next = head;
        head = newNode;
    }
    
    void deleteNode(int data) {
        if (!head) return;
        if (head->data == data) { head = head->next; return; }
        Node* curr = head;
        while (curr->next && curr->next->data != data)
            curr = curr->next;
        if (curr->next) curr->next = curr->next->next;
    }
    
    void print() {
        Node* curr = head;
        while (curr) {
            cout << curr->data << " -> ";
            curr = curr->next;
        }
        cout << "null" << endl;
    }
};

int main() {
    SinglyLinkedList list;
    list.append(10);
    list.append(20);
    list.prepend(5);
    list.print();
    return 0;
}
`,

    go: `// Singly Linked List - Go
package main

import "fmt"

type Node struct {
    data int
    next *Node
}

type SinglyLinkedList struct {
    head *Node
}

func (l *SinglyLinkedList) Append(data int) {
    newNode := &Node{data: data}
    if l.head == nil {
        l.head = newNode
        return
    }
    curr := l.head
    for curr.next != nil {
        curr = curr.next
    }
    curr.next = newNode
}

func (l *SinglyLinkedList) Prepend(data int) {
    newNode := &Node{data: data, next: l.head}
    l.head = newNode
}

func (l *SinglyLinkedList) Delete(data int) {
    if l.head == nil { return }
    if l.head.data == data {
        l.head = l.head.next
        return
    }
    curr := l.head
    for curr.next != nil && curr.next.data != data {
        curr = curr.next
    }
    if curr.next != nil {
        curr.next = curr.next.next
    }
}

func (l *SinglyLinkedList) Print() {
    curr := l.head
    for curr != nil {
        fmt.Printf("%d -> ", curr.data)
        curr = curr.next
    }
    fmt.Println("nil")
}

func main() {
    list := &SinglyLinkedList{}
    list.Append(10)
    list.Append(20)
    list.Prepend(5)
    list.Print()
}
`,
  },
};
