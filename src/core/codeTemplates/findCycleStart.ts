import { AlgorithmCodeTemplates } from './types';

export const findCycleStartCode: AlgorithmCodeTemplates = {
  algorithmId: 'find-cycle-start',
  algorithmName: 'Find Cycle Start',
  category: 'linked-lists',
  templates: {
    javascript: `// Find Cycle Start in Linked List - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

function detectCycleStart(head) {
  log('Finding cycle start node...');
  
  if (!head || !head.next) return null;
  
  let slow = head;
  let fast = head;
  
  // Phase 1: Find meeting point
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    
    if (slow === fast) {
      log(\`Phase 1: Met at node \${slow.data}\`);
      
      // Phase 2: Find cycle start
      slow = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      
      log(\`Cycle starts at node: \${slow.data}\`);
      mark(0, 'found');
      return slow;
    }
  }
  
  log('No cycle found');
  return null;
}

// Demo
const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = head.next; // Cycle starts at 2

detectCycleStart(head);
`,

    java: `// Find Cycle Start - Java
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class FindCycleStart {
    public static ListNode detectCycle(ListNode head) {
        if (head == null || head.next == null) return null;
        
        ListNode slow = head, fast = head;
        
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            
            if (slow == fast) {
                slow = head;
                while (slow != fast) {
                    slow = slow.next;
                    fast = fast.next;
                }
                return slow;
            }
        }
        return null;
    }
    
    public static void main(String[] args) {
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        head.next.next.next = head.next;
        
        ListNode start = detectCycle(head);
        System.out.println("Cycle starts at: " + (start != null ? start.val : "null"));
    }
}
`,

    python: `# Find Cycle Start - Python

class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None

def detect_cycle_start(head):
    if not head or not head.next:
        return None
    
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        if slow == fast:
            slow = head
            while slow != fast:
                slow = slow.next
                fast = fast.next
            return slow
    
    return None


# Demo
head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)
head.next.next.next = head.next  # Cycle starts at 2

start = detect_cycle_start(head)
print(f"Cycle starts at: {start.val if start else 'None'}")
`,

    cpp: `// Find Cycle Start - C++
#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* detectCycle(ListNode* head) {
    if (!head || !head->next) return nullptr;
    
    ListNode* slow = head;
    ListNode* fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        
        if (slow == fast) {
            slow = head;
            while (slow != fast) {
                slow = slow->next;
                fast = fast->next;
            }
            return slow;
        }
    }
    return nullptr;
}

int main() {
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(3);
    head->next->next->next = head->next;
    
    ListNode* start = detectCycle(head);
    cout << "Cycle starts at: " << (start ? to_string(start->val) : "null") << endl;
    return 0;
}
`,

    go: `// Find Cycle Start - Go
package main

import "fmt"

type ListNode struct {
    Val  int
    Next *ListNode
}

func detectCycle(head *ListNode) *ListNode {
    if head == nil || head.Next == nil {
        return nil
    }
    
    slow, fast := head, head
    
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
        
        if slow == fast {
            slow = head
            for slow != fast {
                slow = slow.Next
                fast = fast.Next
            }
            return slow
        }
    }
    return nil
}

func main() {
    head := &ListNode{Val: 1}
    head.Next = &ListNode{Val: 2}
    head.Next.Next = &ListNode{Val: 3}
    head.Next.Next.Next = head.Next
    
    start := detectCycle(head)
    if start != nil {
        fmt.Printf("Cycle starts at: %d\\n", start.Val)
    } else {
        fmt.Println("No cycle")
    }
}
`,
  },
};
