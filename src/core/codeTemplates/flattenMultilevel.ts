import { AlgorithmCodeTemplates } from './types';

export const flattenMultilevelCode: AlgorithmCodeTemplates = {
  algorithmId: 'flatten-multilevel',
  algorithmName: 'Flatten Multilevel Linked List',
  category: 'linked-lists',
  templates: {
    javascript: `// Flatten Multilevel Doubly Linked List - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
    this.child = null;
  }
}

function flatten(head) {
  log('Flattening multilevel list...');
  
  if (!head) return null;
  
  let current = head;
  let idx = 0;
  
  while (current) {
    visit(idx);
    mark(idx, 'current');
    
    if (current.child) {
      log(\`Node \${current.val} has child, flattening...\`);
      
      const next = current.next;
      const child = flatten(current.child);
      
      // Connect current to child
      current.next = child;
      child.prev = current;
      current.child = null;
      
      // Find tail of child list
      let tail = child;
      while (tail.next) {
        tail = tail.next;
      }
      
      // Connect tail to next
      if (next) {
        tail.next = next;
        next.prev = tail;
      }
      
      mark(idx, 'found');
    }
    
    current = current.next;
    idx++;
  }
  
  return head;
}

function printList(head) {
  const values = [];
  while (head) {
    values.push(head.val);
    head = head.next;
  }
  log(\`Flattened: \${values.join(' <-> ')}\`);
}

// Demo
const head = new Node(1);
head.next = new Node(2);
head.next.prev = head;
head.next.next = new Node(3);
head.next.next.prev = head.next;
head.next.child = new Node(4);
head.next.child.next = new Node(5);
head.next.child.next.prev = head.next.child;

log('Multilevel list: 1 - 2 - 3');
log('                     |');
log('                     4 - 5');

const result = flatten(head);
printList(result);
`,

    java: `// Flatten Multilevel Doubly Linked List - Java
class Node {
    int val;
    Node prev, next, child;
    Node(int val) { this.val = val; }
}

public class FlattenMultilevel {
    public static Node flatten(Node head) {
        if (head == null) return null;
        
        Node current = head;
        while (current != null) {
            if (current.child != null) {
                Node next = current.next;
                Node child = flatten(current.child);
                
                current.next = child;
                child.prev = current;
                current.child = null;
                
                Node tail = child;
                while (tail.next != null) tail = tail.next;
                
                if (next != null) {
                    tail.next = next;
                    next.prev = tail;
                }
            }
            current = current.next;
        }
        return head;
    }
    
    public static void main(String[] args) {
        Node head = new Node(1);
        head.next = new Node(2);
        head.next.child = new Node(3);
        
        head = flatten(head);
        while (head != null) {
            System.out.print(head.val + " <-> ");
            head = head.next;
        }
        System.out.println("null");
    }
}
`,

    python: `# Flatten Multilevel Doubly Linked List - Python

class Node:
    def __init__(self, val):
        self.val = val
        self.prev = None
        self.next = None
        self.child = None

def flatten(head):
    if not head:
        return None
    
    current = head
    while current:
        if current.child:
            next_node = current.next
            child = flatten(current.child)
            
            current.next = child
            child.prev = current
            current.child = None
            
            tail = child
            while tail.next:
                tail = tail.next
            
            if next_node:
                tail.next = next_node
                next_node.prev = tail
        
        current = current.next
    
    return head


# Demo
head = Node(1)
head.next = Node(2)
head.next.prev = head
head.next.child = Node(3)
head.next.child.next = Node(4)

result = flatten(head)
while result:
    print(result.val, end=" <-> ")
    result = result.next
print("None")
`,

    cpp: `// Flatten Multilevel Doubly Linked List - C++
#include <iostream>
using namespace std;

struct Node {
    int val;
    Node *prev, *next, *child;
    Node(int v) : val(v), prev(nullptr), next(nullptr), child(nullptr) {}
};

Node* flatten(Node* head) {
    if (!head) return nullptr;
    
    Node* current = head;
    while (current) {
        if (current->child) {
            Node* next = current->next;
            Node* child = flatten(current->child);
            
            current->next = child;
            child->prev = current;
            current->child = nullptr;
            
            Node* tail = child;
            while (tail->next) tail = tail->next;
            
            if (next) {
                tail->next = next;
                next->prev = tail;
            }
        }
        current = current->next;
    }
    return head;
}

int main() {
    Node* head = new Node(1);
    head->next = new Node(2);
    head->next->child = new Node(3);
    
    head = flatten(head);
    while (head) {
        cout << head->val << " <-> ";
        head = head->next;
    }
    cout << "null" << endl;
    return 0;
}
`,

    go: `// Flatten Multilevel Doubly Linked List - Go
package main

import "fmt"

type Node struct {
    Val   int
    Prev  *Node
    Next  *Node
    Child *Node
}

func flatten(head *Node) *Node {
    if head == nil {
        return nil
    }
    
    current := head
    for current != nil {
        if current.Child != nil {
            next := current.Next
            child := flatten(current.Child)
            
            current.Next = child
            child.Prev = current
            current.Child = nil
            
            tail := child
            for tail.Next != nil {
                tail = tail.Next
            }
            
            if next != nil {
                tail.Next = next
                next.Prev = tail
            }
        }
        current = current.Next
    }
    return head
}

func main() {
    head := &Node{Val: 1}
    head.Next = &Node{Val: 2}
    head.Next.Child = &Node{Val: 3}
    
    result := flatten(head)
    for result != nil {
        fmt.Printf("%d <-> ", result.Val)
        result = result.Next
    }
    fmt.Println("nil")
}
`,
  },
};
