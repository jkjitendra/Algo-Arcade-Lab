import { AlgorithmCodeTemplates } from './types';

export const isBSTCode: AlgorithmCodeTemplates = {
  algorithmId: 'is-bst',
  algorithmName: 'Validate BST',
  category: 'trees',
  templates: {
    javascript: `// Validate Binary Search Tree - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function isValidBST(root) {
  log('Validating Binary Search Tree...');
  
  function validate(node, min, max, depth = 0) {
    if (!node) return true;
    
    const indent = '  '.repeat(depth);
    visit(depth);
    mark(depth, 'current');
    
    log(\`\${indent}Node \${node.val}: must be in range (\${min}, \${max})\`);
    
    if (node.val <= min || node.val >= max) {
      mark(depth, 'eliminated');
      log(\`\${indent}INVALID: \${node.val} violates BST property!\`);
      return false;
    }
    
    const leftValid = validate(node.left, min, node.val, depth + 1);
    const rightValid = validate(node.right, node.val, max, depth + 1);
    
    if (leftValid && rightValid) {
      mark(depth, 'found');
      return true;
    }
    return false;
  }
  
  const result = validate(root, -Infinity, Infinity);
  log(\`Tree is \${result ? 'a valid BST' : 'NOT a valid BST'}\`);
  return result;
}

// Valid BST:     5
//               / \\
//              3   7
//             / \\
//            2   4
const validBST = new TreeNode(5);
validBST.left = new TreeNode(3);
validBST.right = new TreeNode(7);
validBST.left.left = new TreeNode(2);
validBST.left.right = new TreeNode(4);

isValidBST(validBST);
`,

    java: `// Validate Binary Search Tree - Java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class IsBST {
    public boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    
    boolean validate(TreeNode node, long min, long max) {
        if (node == null) return true;
        if (node.val <= min || node.val >= max) return false;
        return validate(node.left, min, node.val) && 
               validate(node.right, node.val, max);
    }
    
    public static void main(String[] args) {
        TreeNode root = new TreeNode(5);
        root.left = new TreeNode(3);
        root.right = new TreeNode(7);
        System.out.println("Valid BST: " + new IsBST().isValidBST(root));
    }
}
`,

    python: `# Validate Binary Search Tree - Python

class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

def is_valid_bst(root):
    def validate(node, low=float('-inf'), high=float('inf')):
        if not node:
            return True
        if node.val <= low or node.val >= high:
            return False
        return (validate(node.left, low, node.val) and 
                validate(node.right, node.val, high))
    
    return validate(root)


root = TreeNode(5)
root.left = TreeNode(3)
root.right = TreeNode(7)
print(f"Valid BST: {is_valid_bst(root)}")
`,

    cpp: `// Validate Binary Search Tree - C++
#include <iostream>
#include <climits>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

bool validate(TreeNode* node, long min, long max) {
    if (!node) return true;
    if (node->val <= min || node->val >= max) return false;
    return validate(node->left, min, node->val) && 
           validate(node->right, node->val, max);
}

bool isValidBST(TreeNode* root) {
    return validate(root, LONG_MIN, LONG_MAX);
}

int main() {
    TreeNode* root = new TreeNode(5);
    root->left = new TreeNode(3);
    root->right = new TreeNode(7);
    cout << "Valid BST: " << (isValidBST(root) ? "true" : "false") << endl;
    return 0;
}
`,

    go: `// Validate Binary Search Tree - Go
package main

import (
    "fmt"
    "math"
)

type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

func isValidBST(root *TreeNode) bool {
    return validate(root, math.MinInt64, math.MaxInt64)
}

func validate(node *TreeNode, min, max int64) bool {
    if node == nil {
        return true
    }
    val := int64(node.Val)
    if val <= min || val >= max {
        return false
    }
    return validate(node.Left, min, val) && validate(node.Right, val, max)
}

func main() {
    root := &TreeNode{Val: 5}
    root.Left = &TreeNode{Val: 3}
    root.Right = &TreeNode{Val: 7}
    fmt.Printf("Valid BST: %v\\n", isValidBST(root))
}
`,
  },
};
