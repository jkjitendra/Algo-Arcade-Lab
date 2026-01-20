import { AlgorithmCodeTemplates } from './types';

export const reverseLinkedListCode: AlgorithmCodeTemplates = {
  algorithmId: 'reverse-linked-list',
  algorithmName: 'Reverse Linked List',
  category: 'linked-lists',
  templates: {
    javascript: `// Reverse Linked List - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

function createList(arr) {
  const dummy = new Node(0);
  let current = dummy;
  for (const val of arr) {
    current.next = new Node(val);
    current = current.next;
  }
  return dummy.next;
}

function printList(head, msg = 'List') {
  const values = [];
  let current = head;
  while (current) {
    values.push(current.data);
    current = current.next;
  }
  log(\`\${msg}: \${values.join(' -> ')} -> null\`);
}

function reverseIterative(head) {
  log('Reversing list iteratively...');
  let prev = null;
  let current = head;
  let idx = 0;
  
  while (current) {
    visit(idx);
    mark(idx, 'current');
    
    const next = current.next;
    current.next = prev;
    log(\`Reversed: \${current.data} now points to \${prev ? prev.data : 'null'}\`);
    
    prev = current;
    current = next;
    idx++;
  }
  
  return prev;
}

function reverseRecursive(head) {
  if (!head || !head.next) return head;
  
  const newHead = reverseRecursive(head.next);
  head.next.next = head;
  head.next = null;
  
  return newHead;
}

// Demo
const list = createList([1, 2, 3, 4, 5]);
printList(list, 'Original');
const reversed = reverseIterative(list);
printList(reversed, 'Reversed');
`,

    java: `// Reverse Linked List - Java
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class ReverseLinkedList {
    public static ListNode reverseIterative(ListNode head) {
        ListNode prev = null;
        ListNode current = head;
        
        while (current != null) {
            ListNode next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        return prev;
    }
    
    public static ListNode reverseRecursive(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode newHead = reverseRecursive(head.next);
        head.next.next = head;
        head.next = null;
        return newHead;
    }
    
    public static void main(String[] args) {
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        
        head = reverseIterative(head);
        while (head != null) {
            System.out.print(head.val + " -> ");
            head = head.next;
        }
        System.out.println("null");
    }
}
`,

    python: `# Reverse Linked List - Python

class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None

def reverse_iterative(head):
    prev = None
    current = head
    
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    
    return prev

def reverse_recursive(head):
    if not head or not head.next:
        return head
    
    new_head = reverse_recursive(head.next)
    head.next.next = head
    head.next = None
    
    return new_head

# Create list
head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)

reversed_head = reverse_iterative(head)
while reversed_head:
    print(reversed_head.val, end=" -> ")
    reversed_head = reversed_head.next
print("None")
`,

    cpp: `// Reverse Linked List - C++
#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseIterative(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* current = head;
    
    while (current) {
        ListNode* next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    return prev;
}

ListNode* reverseRecursive(ListNode* head) {
    if (!head || !head->next) return head;
    ListNode* newHead = reverseRecursive(head->next);
    head->next->next = head;
    head->next = nullptr;
    return newHead;
}

int main() {
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(3);
    
    head = reverseIterative(head);
    while (head) {
        cout << head->val << " -> ";
        head = head->next;
    }
    cout << "null" << endl;
    return 0;
}
`,

    go: `// Reverse Linked List - Go
package main

import "fmt"

type ListNode struct {
    Val  int
    Next *ListNode
}

func reverseIterative(head *ListNode) *ListNode {
    var prev *ListNode
    current := head
    
    for current != nil {
        next := current.Next
        current.Next = prev
        prev = current
        current = next
    }
    return prev
}

func reverseRecursive(head *ListNode) *ListNode {
    if head == nil || head.Next == nil {
        return head
    }
    newHead := reverseRecursive(head.Next)
    head.Next.Next = head
    head.Next = nil
    return newHead
}

func main() {
    head := &ListNode{Val: 1}
    head.Next = &ListNode{Val: 2}
    head.Next.Next = &ListNode{Val: 3}
    
    head = reverseIterative(head)
    for head != nil {
        fmt.Printf("%d -> ", head.Val)
        head = head.Next
    }
    fmt.Println("nil")
}
`,
  },
};
