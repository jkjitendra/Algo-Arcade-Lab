import { AlgorithmCodeTemplates } from './types';

export const isBalancedCode: AlgorithmCodeTemplates = {
  algorithmId: 'is-balanced',
  algorithmName: 'Check Balanced Tree',
  category: 'trees',
  templates: {
    javascript: `// Check if Tree is Balanced - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// A balanced tree has height difference <= 1 at every node

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function isBalanced(root) {
  log('Checking if tree is balanced...');
  
  function checkHeight(node, depth = 0) {
    if (!node) return 0;
    
    const indent = '  '.repeat(depth);
    visit(depth);
    
    const leftHeight = checkHeight(node.left, depth + 1);
    if (leftHeight === -1) return -1;
    
    const rightHeight = checkHeight(node.right, depth + 1);
    if (rightHeight === -1) return -1;
    
    const diff = Math.abs(leftHeight - rightHeight);
    log(\`\${indent}Node \${node.val}: left=\${leftHeight}, right=\${rightHeight}, diff=\${diff}\`);
    
    if (diff > 1) {
      mark(depth, 'eliminated');
      log(\`\${indent}NOT balanced at node \${node.val}!\`);
      return -1;
    }
    
    mark(depth, 'found');
    return 1 + Math.max(leftHeight, rightHeight);
  }
  
  const result = checkHeight(root) !== -1;
  log(\`Tree is \${result ? 'balanced' : 'NOT balanced'}\`);
  return result;
}

// Balanced tree
const balanced = new TreeNode(1);
balanced.left = new TreeNode(2);
balanced.right = new TreeNode(3);
balanced.left.left = new TreeNode(4);

log('Testing balanced tree:');
isBalanced(balanced);
`,

    java: `// Check if Tree is Balanced - Java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class IsBalanced {
    public boolean isBalanced(TreeNode root) {
        return checkHeight(root) != -1;
    }
    
    int checkHeight(TreeNode node) {
        if (node == null) return 0;
        
        int leftHeight = checkHeight(node.left);
        if (leftHeight == -1) return -1;
        
        int rightHeight = checkHeight(node.right);
        if (rightHeight == -1) return -1;
        
        if (Math.abs(leftHeight - rightHeight) > 1) return -1;
        
        return 1 + Math.max(leftHeight, rightHeight);
    }
    
    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        System.out.println("Balanced: " + new IsBalanced().isBalanced(root));
    }
}
`,

    python: `# Check if Tree is Balanced - Python

class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

def is_balanced(root):
    def check_height(node):
        if not node:
            return 0
        
        left = check_height(node.left)
        if left == -1:
            return -1
        
        right = check_height(node.right)
        if right == -1:
            return -1
        
        if abs(left - right) > 1:
            return -1
        
        return 1 + max(left, right)
    
    return check_height(root) != -1


root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
print(f"Balanced: {is_balanced(root)}")
`,

    cpp: `// Check if Tree is Balanced - C++
#include <iostream>
#include <cstdlib>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

int checkHeight(TreeNode* node) {
    if (!node) return 0;
    
    int left = checkHeight(node->left);
    if (left == -1) return -1;
    
    int right = checkHeight(node->right);
    if (right == -1) return -1;
    
    if (abs(left - right) > 1) return -1;
    
    return 1 + max(left, right);
}

bool isBalanced(TreeNode* root) {
    return checkHeight(root) != -1;
}

int main() {
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    cout << "Balanced: " << (isBalanced(root) ? "true" : "false") << endl;
    return 0;
}
`,

    go: `// Check if Tree is Balanced - Go
package main

import "fmt"

type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

func isBalanced(root *TreeNode) bool {
    return checkHeight(root) != -1
}

func checkHeight(node *TreeNode) int {
    if node == nil {
        return 0
    }
    
    left := checkHeight(node.Left)
    if left == -1 {
        return -1
    }
    
    right := checkHeight(node.Right)
    if right == -1 {
        return -1
    }
    
    diff := left - right
    if diff < 0 {
        diff = -diff
    }
    if diff > 1 {
        return -1
    }
    
    if left > right {
        return 1 + left
    }
    return 1 + right
}

func main() {
    root := &TreeNode{Val: 1}
    root.Left = &TreeNode{Val: 2}
    root.Right = &TreeNode{Val: 3}
    fmt.Printf("Balanced: %v\\n", isBalanced(root))
}
`,
  },
};
