import { AlgorithmCodeTemplates } from './types';

export const detectCycleCode: AlgorithmCodeTemplates = {
  algorithmId: 'detect-cycle',
  algorithmName: 'Detect Cycle in Linked List',
  category: 'linked-lists',
  templates: {
    javascript: `// Detect Cycle in Linked List - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Floyd's Cycle Detection (Tortoise and Hare)

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

function hasCycle(head) {
  log('Detecting cycle using Floyd\\'s algorithm...');
  
  if (!head || !head.next) {
    log('No cycle: list too short');
    return false;
  }
  
  let slow = head;
  let fast = head;
  let step = 0;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    step++;
    
    visit(step);
    log(\`Step \${step}: slow at \${slow.data}, fast at \${fast ? fast.data : 'null'}\`);
    
    if (slow === fast) {
      mark(step, 'found');
      log(\`Cycle detected! Pointers met at node \${slow.data}\`);
      return true;
    }
  }
  
  log('No cycle detected');
  return false;
}

// Demo - Creating a cycle
const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = head.next; // Cycle back to node 2

hasCycle(head);
`,

    java: `// Detect Cycle in Linked List - Java
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class DetectCycle {
    public static boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) return false;
        
        ListNode slow = head, fast = head;
        
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        
        return false;
    }
    
    public static void main(String[] args) {
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        head.next.next.next = head.next; // Cycle
        
        System.out.println("Has cycle: " + hasCycle(head));
    }
}
`,

    python: `# Detect Cycle in Linked List - Python

class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None

def has_cycle(head):
    if not head or not head.next:
        return False
    
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    
    return False


# Demo with cycle
head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)
head.next.next.next = head.next  # Cycle

print(f"Has cycle: {has_cycle(head)}")
`,

    cpp: `// Detect Cycle in Linked List - C++
#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

bool hasCycle(ListNode* head) {
    if (!head || !head->next) return false;
    
    ListNode* slow = head;
    ListNode* fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    
    return false;
}

int main() {
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(3);
    head->next->next->next = head->next; // Cycle
    
    cout << "Has cycle: " << (hasCycle(head) ? "true" : "false") << endl;
    return 0;
}
`,

    go: `// Detect Cycle in Linked List - Go
package main

import "fmt"

type ListNode struct {
    Val  int
    Next *ListNode
}

func hasCycle(head *ListNode) bool {
    if head == nil || head.Next == nil {
        return false
    }
    
    slow, fast := head, head
    
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
        if slow == fast {
            return true
        }
    }
    
    return false
}

func main() {
    head := &ListNode{Val: 1}
    head.Next = &ListNode{Val: 2}
    head.Next.Next = &ListNode{Val: 3}
    head.Next.Next.Next = head.Next // Cycle
    
    fmt.Printf("Has cycle: %v\\n", hasCycle(head))
}
`,
  },
};
