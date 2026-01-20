import { AlgorithmCodeTemplates } from './types';

export const intersectionPointCode: AlgorithmCodeTemplates = {
  algorithmId: 'intersection-point',
  algorithmName: 'Intersection Point of Two Lists',
  category: 'linked-lists',
  templates: {
    javascript: `// Intersection Point of Two Linked Lists - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

function getIntersectionNode(headA, headB) {
  log('Finding intersection point of two lists...');
  
  if (!headA || !headB) return null;
  
  let pA = headA;
  let pB = headB;
  let step = 0;
  
  while (pA !== pB) {
    step++;
    visit(step);
    
    log(\`Step \${step}: pA at \${pA ? pA.data : 'null'}, pB at \${pB ? pB.data : 'null'}\`);
    
    // When reaching end, switch to other list
    pA = pA ? pA.next : headB;
    pB = pB ? pB.next : headA;
  }
  
  if (pA) {
    mark(step, 'found');
    log(\`Intersection at node: \${pA.data}\`);
  } else {
    log('No intersection');
  }
  
  return pA;
}

// Demo
// List A: 1 -> 2 -> 3 -> 6 -> 7
// List B:      4 -> 5 -> 6 -> 7 (shares 6, 7)
const common = new Node(6);
common.next = new Node(7);

const headA = new Node(1);
headA.next = new Node(2);
headA.next.next = new Node(3);
headA.next.next.next = common;

const headB = new Node(4);
headB.next = new Node(5);
headB.next.next = common;

getIntersectionNode(headA, headB);
`,

    java: `// Intersection Point of Two Linked Lists - Java
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class IntersectionPoint {
    public static ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) return null;
        
        ListNode pA = headA, pB = headB;
        
        while (pA != pB) {
            pA = (pA != null) ? pA.next : headB;
            pB = (pB != null) ? pB.next : headA;
        }
        
        return pA;
    }
    
    public static void main(String[] args) {
        ListNode common = new ListNode(6);
        common.next = new ListNode(7);
        
        ListNode headA = new ListNode(1);
        headA.next = new ListNode(2);
        headA.next.next = common;
        
        ListNode headB = new ListNode(4);
        headB.next = common;
        
        ListNode result = getIntersectionNode(headA, headB);
        System.out.println("Intersection: " + (result != null ? result.val : "null"));
    }
}
`,

    python: `# Intersection Point of Two Linked Lists - Python

class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None

def get_intersection_node(headA, headB):
    if not headA or not headB:
        return None
    
    pA, pB = headA, headB
    
    while pA != pB:
        pA = pA.next if pA else headB
        pB = pB.next if pB else headA
    
    return pA


# Demo
common = ListNode(6)
common.next = ListNode(7)

headA = ListNode(1)
headA.next = ListNode(2)
headA.next.next = common

headB = ListNode(4)
headB.next = common

result = get_intersection_node(headA, headB)
print(f"Intersection: {result.val if result else 'None'}")
`,

    cpp: `// Intersection Point of Two Linked Lists - C++
#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
    if (!headA || !headB) return nullptr;
    
    ListNode *pA = headA, *pB = headB;
    
    while (pA != pB) {
        pA = pA ? pA->next : headB;
        pB = pB ? pB->next : headA;
    }
    
    return pA;
}

int main() {
    ListNode* common = new ListNode(6);
    common->next = new ListNode(7);
    
    ListNode* headA = new ListNode(1);
    headA->next = common;
    
    ListNode* headB = new ListNode(4);
    headB->next = common;
    
    ListNode* result = getIntersectionNode(headA, headB);
    cout << "Intersection: " << (result ? to_string(result->val) : "null") << endl;
    return 0;
}
`,

    go: `// Intersection Point of Two Linked Lists - Go
package main

import "fmt"

type ListNode struct {
    Val  int
    Next *ListNode
}

func getIntersectionNode(headA, headB *ListNode) *ListNode {
    if headA == nil || headB == nil {
        return nil
    }
    
    pA, pB := headA, headB
    
    for pA != pB {
        if pA != nil {
            pA = pA.Next
        } else {
            pA = headB
        }
        if pB != nil {
            pB = pB.Next
        } else {
            pB = headA
        }
    }
    
    return pA
}

func main() {
    common := &ListNode{Val: 6, Next: &ListNode{Val: 7}}
    headA := &ListNode{Val: 1, Next: common}
    headB := &ListNode{Val: 4, Next: common}
    
    result := getIntersectionNode(headA, headB)
    if result != nil {
        fmt.Printf("Intersection: %d\\n", result.Val)
    } else {
        fmt.Println("No intersection")
    }
}
`,
  },
};
