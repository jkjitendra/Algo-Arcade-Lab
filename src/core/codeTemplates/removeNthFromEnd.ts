import { AlgorithmCodeTemplates } from './types';

export const removeNthFromEndCode: AlgorithmCodeTemplates = {
  algorithmId: 'remove-nth-from-end',
  algorithmName: 'Remove Nth From End',
  category: 'linked-lists',
  templates: {
    javascript: `// Remove Nth Node From End of List - JavaScript
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

function removeNthFromEnd(head, n) {
  log(\`Removing \${n}th node from end...\`);
  
  const dummy = new Node(0);
  dummy.next = head;
  
  let fast = dummy;
  let slow = dummy;
  
  // Move fast n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
    visit(i);
    log(\`Fast pointer at index \${i}\`);
  }
  
  // Move both until fast reaches end
  let slowIdx = 0;
  while (fast) {
    slow = slow.next;
    fast = fast.next;
    slowIdx++;
    mark(slowIdx, 'comparing');
  }
  
  log(\`Removing node with value \${slow.next.data}\`);
  mark(slowIdx, 'found');
  
  slow.next = slow.next.next;
  
  return dummy.next;
}

// Demo
const list = createList([1, 2, 3, 4, 5]);
printList(list, 'Original');
const result = removeNthFromEnd(list, 2);
printList(result, 'After removal');
`,

    java: `// Remove Nth Node From End - Java
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class RemoveNthFromEnd {
    public static ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode fast = dummy, slow = dummy;
        
        for (int i = 0; i <= n; i++) fast = fast.next;
        
        while (fast != null) {
            slow = slow.next;
            fast = fast.next;
        }
        
        slow.next = slow.next.next;
        return dummy.next;
    }
    
    public static void main(String[] args) {
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        head.next.next.next = new ListNode(4);
        head.next.next.next.next = new ListNode(5);
        
        head = removeNthFromEnd(head, 2);
        while (head != null) {
            System.out.print(head.val + " -> ");
            head = head.next;
        }
        System.out.println("null");
    }
}
`,

    python: `# Remove Nth Node From End - Python

class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None

def remove_nth_from_end(head, n):
    dummy = ListNode(0)
    dummy.next = head
    fast = slow = dummy
    
    for _ in range(n + 1):
        fast = fast.next
    
    while fast:
        slow = slow.next
        fast = fast.next
    
    slow.next = slow.next.next
    return dummy.next


# Demo
head = ListNode(1)
curr = head
for i in range(2, 6):
    curr.next = ListNode(i)
    curr = curr.next

result = remove_nth_from_end(head, 2)
while result:
    print(result.val, end=" -> ")
    result = result.next
print("None")
`,

    cpp: `// Remove Nth Node From End - C++
#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode* dummy = new ListNode(0);
    dummy->next = head;
    ListNode* fast = dummy;
    ListNode* slow = dummy;
    
    for (int i = 0; i <= n; i++) fast = fast->next;
    
    while (fast) {
        slow = slow->next;
        fast = fast->next;
    }
    
    slow->next = slow->next->next;
    return dummy->next;
}

int main() {
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(3);
    head->next->next->next = new ListNode(4);
    head->next->next->next->next = new ListNode(5);
    
    head = removeNthFromEnd(head, 2);
    while (head) {
        cout << head->val << " -> ";
        head = head->next;
    }
    cout << "null" << endl;
    return 0;
}
`,

    go: `// Remove Nth Node From End - Go
package main

import "fmt"

type ListNode struct {
    Val  int
    Next *ListNode
}

func removeNthFromEnd(head *ListNode, n int) *ListNode {
    dummy := &ListNode{Next: head}
    fast, slow := dummy, dummy
    
    for i := 0; i <= n; i++ {
        fast = fast.Next
    }
    
    for fast != nil {
        slow = slow.Next
        fast = fast.Next
    }
    
    slow.Next = slow.Next.Next
    return dummy.Next
}

func main() {
    head := &ListNode{Val: 1}
    curr := head
    for i := 2; i <= 5; i++ {
        curr.Next = &ListNode{Val: i}
        curr = curr.Next
    }
    
    result := removeNthFromEnd(head, 2)
    for result != nil {
        fmt.Printf("%d -> ", result.Val)
        result = result.Next
    }
    fmt.Println("nil")
}
`,
  },
};
