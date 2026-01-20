import { AlgorithmCodeTemplates } from './types';

export const mergeSortedListsCode: AlgorithmCodeTemplates = {
  algorithmId: 'merge-sorted-lists',
  algorithmName: 'Merge Sorted Linked Lists',
  category: 'linked-lists',
  templates: {
    javascript: `// Merge Two Sorted Linked Lists - JavaScript
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

function mergeTwoLists(l1, l2) {
  log('Merging two sorted lists...');
  
  const dummy = new Node(0);
  let current = dummy;
  let idx = 0;
  
  while (l1 && l2) {
    compare(0, 0);
    
    if (l1.data <= l2.data) {
      current.next = l1;
      l1 = l1.next;
      log(\`Picked \${current.next.data} from list 1\`);
    } else {
      current.next = l2;
      l2 = l2.next;
      log(\`Picked \${current.next.data} from list 2\`);
    }
    
    visit(idx);
    mark(idx, 'current');
    current = current.next;
    idx++;
  }
  
  current.next = l1 || l2;
  
  return dummy.next;
}

// Demo
const list1 = createList([1, 3, 5, 7]);
const list2 = createList([2, 4, 6, 8]);
printList(list1, 'List 1');
printList(list2, 'List 2');
const merged = mergeTwoLists(list1, list2);
printList(merged, 'Merged');
`,

    java: `// Merge Two Sorted Linked Lists - Java
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class MergeSortedLists {
    public static ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }
        
        current.next = (l1 != null) ? l1 : l2;
        return dummy.next;
    }
    
    public static void main(String[] args) {
        ListNode l1 = new ListNode(1);
        l1.next = new ListNode(3);
        l1.next.next = new ListNode(5);
        
        ListNode l2 = new ListNode(2);
        l2.next = new ListNode(4);
        
        ListNode merged = mergeTwoLists(l1, l2);
        while (merged != null) {
            System.out.print(merged.val + " -> ");
            merged = merged.next;
        }
        System.out.println("null");
    }
}
`,

    python: `# Merge Two Sorted Linked Lists - Python

class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None

def merge_two_lists(l1, l2):
    dummy = ListNode(0)
    current = dummy
    
    while l1 and l2:
        if l1.val <= l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    
    current.next = l1 or l2
    return dummy.next


# Demo
l1 = ListNode(1)
l1.next = ListNode(3)
l1.next.next = ListNode(5)

l2 = ListNode(2)
l2.next = ListNode(4)

merged = merge_two_lists(l1, l2)
while merged:
    print(merged.val, end=" -> ")
    merged = merged.next
print("None")
`,

    cpp: `// Merge Two Sorted Linked Lists - C++
#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* current = &dummy;
    
    while (l1 && l2) {
        if (l1->val <= l2->val) {
            current->next = l1;
            l1 = l1->next;
        } else {
            current->next = l2;
            l2 = l2->next;
        }
        current = current->next;
    }
    
    current->next = l1 ? l1 : l2;
    return dummy.next;
}

int main() {
    ListNode* l1 = new ListNode(1);
    l1->next = new ListNode(3);
    
    ListNode* l2 = new ListNode(2);
    l2->next = new ListNode(4);
    
    ListNode* merged = mergeTwoLists(l1, l2);
    while (merged) {
        cout << merged->val << " -> ";
        merged = merged->next;
    }
    cout << "null" << endl;
    return 0;
}
`,

    go: `// Merge Two Sorted Linked Lists - Go
package main

import "fmt"

type ListNode struct {
    Val  int
    Next *ListNode
}

func mergeTwoLists(l1, l2 *ListNode) *ListNode {
    dummy := &ListNode{}
    current := dummy
    
    for l1 != nil && l2 != nil {
        if l1.Val <= l2.Val {
            current.Next = l1
            l1 = l1.Next
        } else {
            current.Next = l2
            l2 = l2.Next
        }
        current = current.Next
    }
    
    if l1 != nil {
        current.Next = l1
    } else {
        current.Next = l2
    }
    
    return dummy.Next
}

func main() {
    l1 := &ListNode{Val: 1, Next: &ListNode{Val: 3}}
    l2 := &ListNode{Val: 2, Next: &ListNode{Val: 4}}
    
    merged := mergeTwoLists(l1, l2)
    for merged != nil {
        fmt.Printf("%d -> ", merged.Val)
        merged = merged.Next
    }
    fmt.Println("nil")
}
`,
  },
};
