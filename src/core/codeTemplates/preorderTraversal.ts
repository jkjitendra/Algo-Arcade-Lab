import { AlgorithmCodeTemplates } from './types';

export const preorderTraversalCode: AlgorithmCodeTemplates = {
  algorithmId: 'preorder-traversal',
  algorithmName: 'Preorder Traversal',
  category: 'trees',
  templates: {
    javascript: `// Preorder Traversal (Root, Left, Right) - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function preorderRecursive(root, result = [], depth = 0) {
  if (!root) return result;
  
  const indent = '  '.repeat(depth);
  
  // Visit root first
  visit(result.length);
  mark(result.length, 'current');
  result.push(root.val);
  log(\`\${indent}Visit: \${root.val}\`);
  
  // Then left subtree
  preorderRecursive(root.left, result, depth + 1);
  
  // Then right subtree
  preorderRecursive(root.right, result, depth + 1);
  
  return result;
}

function preorderIterative(root) {
  if (!root) return [];
  
  const result = [];
  const stack = [root];
  
  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);
    
    // Push right first so left is processed first
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
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

log('Preorder Traversal (Root, Left, Right):');
const result = preorderRecursive(root);
log(\`Result: [\${result.join(', ')}]\`);
`,

    java: `// Preorder Traversal - Java
import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class PreorderTraversal {
    public List<Integer> preorderRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        preorder(root, result);
        return result;
    }
    
    void preorder(TreeNode node, List<Integer> result) {
        if (node == null) return;
        result.add(node.val);
        preorder(node.left, result);
        preorder(node.right, result);
    }
    
    public List<Integer> preorderIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            result.add(node.val);
            if (node.right != null) stack.push(node.right);
            if (node.left != null) stack.push(node.left);
        }
        return result;
    }
}
`,

    python: `# Preorder Traversal - Python

class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

def preorder_recursive(root, result=None):
    if result is None:
        result = []
    if root:
        result.append(root.val)
        preorder_recursive(root.left, result)
        preorder_recursive(root.right, result)
    return result

def preorder_iterative(root):
    if not root:
        return []
    
    result, stack = [], [root]
    
    while stack:
        node = stack.pop()
        result.append(node.val)
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
    
    return result


root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
print(f"Preorder: {preorder_recursive(root)}")
`,

    cpp: `// Preorder Traversal - C++
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void preorderRecursive(TreeNode* root, vector<int>& result) {
    if (!root) return;
    result.push_back(root->val);
    preorderRecursive(root->left, result);
    preorderRecursive(root->right, result);
}

vector<int> preorderIterative(TreeNode* root) {
    vector<int> result;
    if (!root) return result;
    
    stack<TreeNode*> s;
    s.push(root);
    
    while (!s.empty()) {
        TreeNode* node = s.top(); s.pop();
        result.push_back(node->val);
        if (node->right) s.push(node->right);
        if (node->left) s.push(node->left);
    }
    return result;
}

int main() {
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    
    vector<int> result;
    preorderRecursive(root, result);
    for (int v : result) cout << v << " ";
    cout << endl;
    return 0;
}
`,

    go: `// Preorder Traversal - Go
package main

import "fmt"

type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

func preorderRecursive(root *TreeNode) []int {
    var result []int
    var preorder func(node *TreeNode)
    preorder = func(node *TreeNode) {
        if node == nil { return }
        result = append(result, node.Val)
        preorder(node.Left)
        preorder(node.Right)
    }
    preorder(root)
    return result
}

func preorderIterative(root *TreeNode) []int {
    if root == nil { return nil }
    
    var result []int
    stack := []*TreeNode{root}
    
    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        result = append(result, node.Val)
        if node.Right != nil { stack = append(stack, node.Right) }
        if node.Left != nil { stack = append(stack, node.Left) }
    }
    return result
}

func main() {
    root := &TreeNode{Val: 1}
    root.Left = &TreeNode{Val: 2}
    root.Right = &TreeNode{Val: 3}
    fmt.Println(preorderRecursive(root))
}
`,
  },
};
