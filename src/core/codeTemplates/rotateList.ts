import { AlgorithmCodeTemplates } from './types';

export const rotateListCode: AlgorithmCodeTemplates = {
  algorithmId: 'rotate-list',
  algorithmName: 'Rotate Linked List',
  category: 'linked-lists',
  templates: {
    javascript: `// Rotate Linked List - JavaScript
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

function printList(head, msg) {
  const values = [];
  while (head) {
    values.push(head.data);
    head = head.next;
  }
  log(\`\${msg}: \${values.join(' -> ')} -> null\`);
}

function rotateRight(head, k) {
  if (!head || !head.next || k === 0) return head;
  
  // Find length and make circular
  let length = 1;
  let tail = head;
  while (tail.next) {
    tail = tail.next;
    length++;
  }
  tail.next = head; // Make circular
  log(\`Length: \${length}, made circular\`);
  
  // Find new tail (length - k % length - 1 steps from head)
  k = k % length;
  if (k === 0) {
    tail.next = null;
    return head;
  }
  
  let stepsToNewTail = length - k;
  let newTail = head;
  for (let i = 1; i < stepsToNewTail; i++) {
    newTail = newTail.next;
    visit(i);
  }
  
  const newHead = newTail.next;
  newTail.next = null;
  
  log(\`Rotated by \${k} positions\`);
  mark(0, 'found');
  
  return newHead;
}

// Demo
const list = createList([1, 2, 3, 4, 5]);
printList(list, 'Original');
const rotated = rotateRight(list, 2);
printList(rotated, 'Rotated by 2');
`,

    java: `// Rotate Linked List - Java
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class RotateList {
    public static ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null || k == 0) return head;
        
        int length = 1;
        ListNode tail = head;
        while (tail.next != null) {
            tail = tail.next;
            length++;
        }
        tail.next = head;
        
        k = k % length;
        int stepsToNewTail = length - k;
        ListNode newTail = head;
        for (int i = 1; i < stepsToNewTail; i++) {
            newTail = newTail.next;
        }
        
        ListNode newHead = newTail.next;
        newTail.next = null;
        return newHead;
    }
    
    public static void main(String[] args) {
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        head.next.next.next = new ListNode(4);
        head.next.next.next.next = new ListNode(5);
        
        head = rotateRight(head, 2);
        while (head != null) {
            System.out.print(head.val + " -> ");
            head = head.next;
        }
        System.out.println("null");
    }
}
`,

    python: `# Rotate Linked List - Python

class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None

def rotate_right(head, k):
    if not head or not head.next or k == 0:
        return head
    
    length = 1
    tail = head
    while tail.next:
        tail = tail.next
        length += 1
    tail.next = head
    
    k = k % length
    steps_to_new_tail = length - k
    new_tail = head
    for _ in range(steps_to_new_tail - 1):
        new_tail = new_tail.next
    
    new_head = new_tail.next
    new_tail.next = None
    return new_head


# Demo
head = ListNode(1)
curr = head
for i in range(2, 6):
    curr.next = ListNode(i)
    curr = curr.next

rotated = rotate_right(head, 2)
while rotated:
    print(rotated.val, end=" -> ")
    rotated = rotated.next
print("None")
`,

    cpp: `// Rotate Linked List - C++
#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* rotateRight(ListNode* head, int k) {
    if (!head || !head->next || k == 0) return head;
    
    int length = 1;
    ListNode* tail = head;
    while (tail->next) {
        tail = tail->next;
        length++;
    }
    tail->next = head;
    
    k = k % length;
    int stepsToNewTail = length - k;
    ListNode* newTail = head;
    for (int i = 1; i < stepsToNewTail; i++) {
        newTail = newTail->next;
    }
    
    ListNode* newHead = newTail->next;
    newTail->next = nullptr;
    return newHead;
}

int main() {
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(3);
    head->next->next->next = new ListNode(4);
    head->next->next->next->next = new ListNode(5);
    
    head = rotateRight(head, 2);
    while (head) {
        cout << head->val << " -> ";
        head = head->next;
    }
    cout << "null" << endl;
    return 0;
}
`,

    go: `// Rotate Linked List - Go
package main

import "fmt"

type ListNode struct {
    Val  int
    Next *ListNode
}

func rotateRight(head *ListNode, k int) *ListNode {
    if head == nil || head.Next == nil || k == 0 {
        return head
    }
    
    length := 1
    tail := head
    for tail.Next != nil {
        tail = tail.Next
        length++
    }
    tail.Next = head
    
    k = k % length
    stepsToNewTail := length - k
    newTail := head
    for i := 1; i < stepsToNewTail; i++ {
        newTail = newTail.Next
    }
    
    newHead := newTail.Next
    newTail.Next = nil
    return newHead
}

func main() {
    head := &ListNode{Val: 1}
    curr := head
    for i := 2; i <= 5; i++ {
        curr.Next = &ListNode{Val: i}
        curr = curr.Next
    }
    
    rotated := rotateRight(head, 2)
    for rotated != nil {
        fmt.Printf("%d -> ", rotated.Val)
        rotated = rotated.Next
    }
    fmt.Println("nil")
}
`,
  },
};
