import { AlgorithmCodeTemplates } from './types';

export const palindromeLinkedListCode: AlgorithmCodeTemplates = {
  algorithmId: 'palindrome-linked-list',
  algorithmName: 'Palindrome Linked List',
  category: 'linked-lists',
  templates: {
    javascript: `// Palindrome Linked List Check - JavaScript
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

function isPalindrome(head) {
  log('Checking if linked list is a palindrome...');
  
  if (!head || !head.next) return true;
  
  // Find middle
  let slow = head, fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  log(\`Middle found at: \${slow.data}\`);
  
  // Reverse second half
  let prev = null;
  let curr = slow.next;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  log('Second half reversed');
  
  // Compare first and second half
  let p1 = head;
  let p2 = prev;
  let idx = 0;
  
  while (p2) {
    visit(idx);
    compare(idx, idx);
    
    if (p1.data !== p2.data) {
      log(\`Mismatch at \${p1.data} != \${p2.data}\`);
      mark(idx, 'eliminated');
      return false;
    }
    
    mark(idx, 'found');
    log(\`Match: \${p1.data} == \${p2.data}\`);
    p1 = p1.next;
    p2 = p2.next;
    idx++;
  }
  
  log('List is a palindrome!');
  return true;
}

// Demo
const list = createList([1, 2, 3, 2, 1]);
isPalindrome(list);
`,

    java: `// Palindrome Linked List - Java
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class PalindromeLinkedList {
    public static boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) return true;
        
        // Find middle
        ListNode slow = head, fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // Reverse second half
        ListNode prev = null, curr = slow.next;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        
        // Compare
        ListNode p1 = head, p2 = prev;
        while (p2 != null) {
            if (p1.val != p2.val) return false;
            p1 = p1.next;
            p2 = p2.next;
        }
        return true;
    }
    
    public static void main(String[] args) {
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(2);
        head.next.next.next = new ListNode(1);
        System.out.println("Palindrome: " + isPalindrome(head));
    }
}
`,

    python: `# Palindrome Linked List - Python

class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None

def is_palindrome(head):
    if not head or not head.next:
        return True
    
    # Find middle
    slow = fast = head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next
    
    # Reverse second half
    prev, curr = None, slow.next
    while curr:
        curr.next, prev, curr = prev, curr, curr.next
    
    # Compare
    p1, p2 = head, prev
    while p2:
        if p1.val != p2.val:
            return False
        p1, p2 = p1.next, p2.next
    return True


# Demo
head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(2)
head.next.next.next = ListNode(1)
print(f"Palindrome: {is_palindrome(head)}")
`,

    cpp: `// Palindrome Linked List - C++
#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

bool isPalindrome(ListNode* head) {
    if (!head || !head->next) return true;
    
    ListNode *slow = head, *fast = head;
    while (fast->next && fast->next->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    
    ListNode *prev = nullptr, *curr = slow->next;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    
    ListNode *p1 = head, *p2 = prev;
    while (p2) {
        if (p1->val != p2->val) return false;
        p1 = p1->next;
        p2 = p2->next;
    }
    return true;
}

int main() {
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(2);
    head->next->next->next = new ListNode(1);
    cout << "Palindrome: " << (isPalindrome(head) ? "true" : "false") << endl;
    return 0;
}
`,

    go: `// Palindrome Linked List - Go
package main

import "fmt"

type ListNode struct {
    Val  int
    Next *ListNode
}

func isPalindrome(head *ListNode) bool {
    if head == nil || head.Next == nil {
        return true
    }
    
    slow, fast := head, head
    for fast.Next != nil && fast.Next.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
    }
    
    var prev *ListNode
    curr := slow.Next
    for curr != nil {
        next := curr.Next
        curr.Next = prev
        prev = curr
        curr = next
    }
    
    p1, p2 := head, prev
    for p2 != nil {
        if p1.Val != p2.Val {
            return false
        }
        p1 = p1.Next
        p2 = p2.Next
    }
    return true
}

func main() {
    head := &ListNode{Val: 1}
    head.Next = &ListNode{Val: 2}
    head.Next.Next = &ListNode{Val: 2}
    head.Next.Next.Next = &ListNode{Val: 1}
    fmt.Printf("Palindrome: %v\\n", isPalindrome(head))
}
`,
  },
};
