import { AlgorithmCodeTemplates } from './types';

export const findMiddleCode: AlgorithmCodeTemplates = {
  algorithmId: 'find-middle',
  algorithmName: 'Find Middle of Linked List',
  category: 'linked-lists',
  templates: {
    javascript: `// Find Middle of Linked List - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Using slow and fast pointer technique

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

function findMiddle(head) {
  log('Finding middle using slow and fast pointers...');
  
  let slow = head;
  let fast = head;
  let slowIdx = 0;
  let fastIdx = 0;
  
  while (fast && fast.next) {
    visit(slowIdx);
    mark(slowIdx, 'comparing');
    
    slow = slow.next;
    fast = fast.next.next;
    
    slowIdx++;
    fastIdx += 2;
    
    log(\`Slow at index \${slowIdx} (value: \${slow.data}), Fast at index \${fastIdx}\`);
  }
  
  mark(slowIdx, 'found');
  log(\`Middle element: \${slow.data} at index \${slowIdx}\`);
  
  return slow;
}

// Demo
const list = createList([1, 2, 3, 4, 5, 6, 7]);
findMiddle(list);
`,

    java: `// Find Middle of Linked List - Java
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class FindMiddle {
    public static ListNode findMiddle(ListNode head) {
        ListNode slow = head, fast = head;
        
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        return slow;
    }
    
    public static void main(String[] args) {
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        head.next.next.next = new ListNode(4);
        head.next.next.next.next = new ListNode(5);
        
        System.out.println("Middle: " + findMiddle(head).val);
    }
}
`,

    python: `# Find Middle of Linked List - Python

class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None

def find_middle(head):
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    return slow


# Create list [1, 2, 3, 4, 5]
head = ListNode(1)
curr = head
for i in range(2, 6):
    curr.next = ListNode(i)
    curr = curr.next

print(f"Middle: {find_middle(head).val}")
`,

    cpp: `// Find Middle of Linked List - C++
#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* findMiddle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    
    return slow;
}

int main() {
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(3);
    head->next->next->next = new ListNode(4);
    head->next->next->next->next = new ListNode(5);
    
    cout << "Middle: " << findMiddle(head)->val << endl;
    return 0;
}
`,

    go: `// Find Middle of Linked List - Go
package main

import "fmt"

type ListNode struct {
    Val  int
    Next *ListNode
}

func findMiddle(head *ListNode) *ListNode {
    slow, fast := head, head
    
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
    }
    
    return slow
}

func main() {
    head := &ListNode{Val: 1}
    head.Next = &ListNode{Val: 2}
    head.Next.Next = &ListNode{Val: 3}
    head.Next.Next.Next = &ListNode{Val: 4}
    head.Next.Next.Next.Next = &ListNode{Val: 5}
    
    fmt.Printf("Middle: %d\\n", findMiddle(head).Val)
}
`,
  },
};
