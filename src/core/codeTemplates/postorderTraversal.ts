import { AlgorithmCodeTemplates } from './types';

export const postorderTraversalCode: AlgorithmCodeTemplates = {
  algorithmId: 'postorder-traversal',
  algorithmName: 'Postorder Traversal',
  category: 'trees',
  templates: {
    javascript: `// Postorder Traversal (Left, Right, Root) - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function postorderRecursive(root, result = [], depth = 0) {
  if (!root) return result;
  
  const indent = '  '.repeat(depth);
  
  // Visit left subtree
  postorderRecursive(root.left, result, depth + 1);
  
  // Visit right subtree
  postorderRecursive(root.right, result, depth + 1);
  
  // Visit root last
  visit(result.length);
  mark(result.length, 'current');
  result.push(root.val);
  log(\`\${indent}Visit: \${root.val}\`);
  
  return result;
}

function postorderIterative(root) {
  if (!root) return [];
  
  const result = [];
  const stack = [root];
  
  while (stack.length) {
    const node = stack.pop();
    result.unshift(node.val); // Add to front
    
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
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

log('Postorder Traversal (Left, Right, Root):');
const result = postorderRecursive(root);
log(\`Result: [\${result.join(', ')}]\`);
`,

    java: `// Postorder Traversal - Java
import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class PostorderTraversal {
    public List<Integer> postorderRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        postorder(root, result);
        return result;
    }
    
    void postorder(TreeNode node, List<Integer> result) {
        if (node == null) return;
        postorder(node.left, result);
        postorder(node.right, result);
        result.add(node.val);
    }
    
    public List<Integer> postorderIterative(TreeNode root) {
        LinkedList<Integer> result = new LinkedList<>();
        if (root == null) return result;
        
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            result.addFirst(node.val);
            if (node.left != null) stack.push(node.left);
            if (node.right != null) stack.push(node.right);
        }
        return result;
    }
}
`,

    python: `# Postorder Traversal - Python

class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

def postorder_recursive(root, result=None):
    if result is None:
        result = []
    if root:
        postorder_recursive(root.left, result)
        postorder_recursive(root.right, result)
        result.append(root.val)
    return result

def postorder_iterative(root):
    if not root:
        return []
    
    result, stack = [], [root]
    
    while stack:
        node = stack.pop()
        result.insert(0, node.val)
        if node.left:
            stack.append(node.left)
        if node.right:
            stack.append(node.right)
    
    return result


root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
print(f"Postorder: {postorder_recursive(root)}")
`,

    cpp: `// Postorder Traversal - C++
#include <iostream>
#include <vector>
#include <stack>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void postorderRecursive(TreeNode* root, vector<int>& result) {
    if (!root) return;
    postorderRecursive(root->left, result);
    postorderRecursive(root->right, result);
    result.push_back(root->val);
}

vector<int> postorderIterative(TreeNode* root) {
    vector<int> result;
    if (!root) return result;
    
    stack<TreeNode*> s;
    s.push(root);
    
    while (!s.empty()) {
        TreeNode* node = s.top(); s.pop();
        result.insert(result.begin(), node->val);
        if (node->left) s.push(node->left);
        if (node->right) s.push(node->right);
    }
    return result;
}

int main() {
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    
    vector<int> result;
    postorderRecursive(root, result);
    for (int v : result) cout << v << " ";
    cout << endl;
    return 0;
}
`,

    go: `// Postorder Traversal - Go
package main

import "fmt"

type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

func postorderRecursive(root *TreeNode) []int {
    var result []int
    var postorder func(node *TreeNode)
    postorder = func(node *TreeNode) {
        if node == nil { return }
        postorder(node.Left)
        postorder(node.Right)
        result = append(result, node.Val)
    }
    postorder(root)
    return result
}

func postorderIterative(root *TreeNode) []int {
    if root == nil { return nil }
    
    var result []int
    stack := []*TreeNode{root}
    
    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        result = append([]int{node.Val}, result...)
        if node.Left != nil { stack = append(stack, node.Left) }
        if node.Right != nil { stack = append(stack, node.Right) }
    }
    return result
}

func main() {
    root := &TreeNode{Val: 1}
    root.Left = &TreeNode{Val: 2}
    root.Right = &TreeNode{Val: 3}
    fmt.Println(postorderRecursive(root))
}
`,
  },
};
