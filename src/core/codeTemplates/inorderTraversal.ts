import { AlgorithmCodeTemplates } from './types';

export const inorderTraversalCode: AlgorithmCodeTemplates = {
  algorithmId: 'inorder-traversal',
  algorithmName: 'Inorder Traversal',
  category: 'trees',
  templates: {
    javascript: `// Inorder Traversal (Left, Root, Right) - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function inorderRecursive(root, result = [], depth = 0) {
  if (!root) return result;
  
  const indent = '  '.repeat(depth);
  
  // Visit left subtree
  inorderRecursive(root.left, result, depth + 1);
  
  // Visit root
  visit(result.length);
  mark(result.length, 'current');
  result.push(root.val);
  log(\`\${indent}Visit: \${root.val}\`);
  
  // Visit right subtree
  inorderRecursive(root.right, result, depth + 1);
  
  return result;
}

function inorderIterative(root) {
  const result = [];
  const stack = [];
  let current = root;
  
  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }
  
  return result;
}

// Build sample tree:    1
//                      / \\
//                     2   3
//                    / \\
//                   4   5
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

log('Inorder Traversal (Left, Root, Right):');
const result = inorderRecursive(root);
log(\`Result: [\${result.join(', ')}]\`);
`,

    java: `// Inorder Traversal - Java
import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class InorderTraversal {
    public List<Integer> inorderRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        inorder(root, result);
        return result;
    }
    
    void inorder(TreeNode node, List<Integer> result) {
        if (node == null) return;
        inorder(node.left, result);
        result.add(node.val);
        inorder(node.right, result);
    }
    
    public List<Integer> inorderIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;
        
        while (current != null || !stack.isEmpty()) {
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            result.add(current.val);
            current = current.right;
        }
        return result;
    }
}
`,

    python: `# Inorder Traversal - Python

class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

def inorder_recursive(root, result=None):
    if result is None:
        result = []
    if root:
        inorder_recursive(root.left, result)
        result.append(root.val)
        inorder_recursive(root.right, result)
    return result

def inorder_iterative(root):
    result, stack = [], []
    current = root
    
    while current or stack:
        while current:
            stack.append(current)
            current = current.left
        current = stack.pop()
        result.append(current.val)
        current = current.right
    
    return result


# Demo
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)

print(f"Inorder: {inorder_recursive(root)}")
`,

    cpp: `// Inorder Traversal - C++
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void inorderRecursive(TreeNode* root, vector<int>& result) {
    if (!root) return;
    inorderRecursive(root->left, result);
    result.push_back(root->val);
    inorderRecursive(root->right, result);
}

vector<int> inorderIterative(TreeNode* root) {
    vector<int> result;
    stack<TreeNode*> s;
    TreeNode* current = root;
    
    while (current || !s.empty()) {
        while (current) {
            s.push(current);
            current = current->left;
        }
        current = s.top(); s.pop();
        result.push_back(current->val);
        current = current->right;
    }
    return result;
}

int main() {
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    
    vector<int> result;
    inorderRecursive(root, result);
    for (int v : result) cout << v << " ";
    cout << endl;
    return 0;
}
`,

    go: `// Inorder Traversal - Go
package main

import "fmt"

type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

func inorderRecursive(root *TreeNode) []int {
    var result []int
    var inorder func(node *TreeNode)
    inorder = func(node *TreeNode) {
        if node == nil { return }
        inorder(node.Left)
        result = append(result, node.Val)
        inorder(node.Right)
    }
    inorder(root)
    return result
}

func inorderIterative(root *TreeNode) []int {
    var result []int
    var stack []*TreeNode
    current := root
    
    for current != nil || len(stack) > 0 {
        for current != nil {
            stack = append(stack, current)
            current = current.Left
        }
        current = stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        result = append(result, current.Val)
        current = current.Right
    }
    return result
}

func main() {
    root := &TreeNode{Val: 1}
    root.Left = &TreeNode{Val: 2}
    root.Right = &TreeNode{Val: 3}
    fmt.Println(inorderRecursive(root))
}
`,
  },
};
