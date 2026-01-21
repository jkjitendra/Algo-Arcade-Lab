import { AlgorithmCodeTemplates } from './types';

export const lowestCommonAncestorCode: AlgorithmCodeTemplates = {
  algorithmId: 'lowest-common-ancestor',
  algorithmName: 'Lowest Common Ancestor',
  category: 'trees',
  templates: {
    javascript: `// Lowest Common Ancestor - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// LCA for Binary Tree (general)
function lowestCommonAncestor(root, p, q) {
  log(\`Finding LCA of \${p.val} and \${q.val}\`);
  
  function findLCA(node, depth = 0) {
    if (!node) return null;
    
    const indent = '  '.repeat(depth);
    visit(depth);
    mark(depth, 'current');
    log(\`\${indent}Visiting node \${node.val}\`);
    
    // If current node is p or q, return it
    if (node === p || node === q) {
      mark(depth, 'found');
      log(\`\${indent}Found target: \${node.val}\`);
      return node;
    }
    
    const left = findLCA(node.left, depth + 1);
    const right = findLCA(node.right, depth + 1);
    
    // If both sides found something, current is LCA
    if (left && right) {
      mark(depth, 'found');
      log(\`\${indent}LCA found at \${node.val}\`);
      return node;
    }
    
    return left || right;
  }
  
  const lca = findLCA(root);
  log(\`LCA of \${p.val} and \${q.val} is \${lca ? lca.val : 'not found'}\`);
  return lca;
}

// Build tree:      3
//                 / \\
//                5   1
//               / \\  / \\
//              6  2 0   8
const root = new TreeNode(3);
root.left = new TreeNode(5);
root.right = new TreeNode(1);
root.left.left = new TreeNode(6);
root.left.right = new TreeNode(2);
root.right.left = new TreeNode(0);
root.right.right = new TreeNode(8);

lowestCommonAncestor(root, root.left, root.right);
lowestCommonAncestor(root, root.left, root.left.right);
`,

    java: `// Lowest Common Ancestor - Java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class LowestCommonAncestor {
    // LCA for Binary Tree
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
    
    // LCA for BST (more efficient)
    public TreeNode lcaBST(TreeNode root, TreeNode p, TreeNode q) {
        while (root != null) {
            if (p.val < root.val && q.val < root.val) {
                root = root.left;
            } else if (p.val > root.val && q.val > root.val) {
                root = root.right;
            } else {
                return root;
            }
        }
        return null;
    }
}
`,

    python: `# Lowest Common Ancestor - Python

class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

def lowest_common_ancestor(root, p, q):
    if not root or root == p or root == q:
        return root
    
    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)
    
    if left and right:
        return root
    return left or right

# LCA for BST
def lca_bst(root, p, q):
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root
    return None


root = TreeNode(3)
root.left = TreeNode(5)
root.right = TreeNode(1)
lca = lowest_common_ancestor(root, root.left, root.right)
print(f"LCA: {lca.val if lca else None}")
`,

    cpp: `// Lowest Common Ancestor - C++
#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// LCA for Binary Tree
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    
    if (left && right) return root;
    return left ? left : right;
}

// LCA for BST
TreeNode* lcaBST(TreeNode* root, TreeNode* p, TreeNode* q) {
    while (root) {
        if (p->val < root->val && q->val < root->val) root = root->left;
        else if (p->val > root->val && q->val > root->val) root = root->right;
        else return root;
    }
    return nullptr;
}

int main() {
    TreeNode* root = new TreeNode(3);
    root->left = new TreeNode(5);
    root->right = new TreeNode(1);
    auto lca = lowestCommonAncestor(root, root->left, root->right);
    cout << "LCA: " << (lca ? to_string(lca->val) : "null") << endl;
    return 0;
}
`,

    go: `// Lowest Common Ancestor - Go
package main

import "fmt"

type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
    if root == nil || root == p || root == q {
        return root
    }
    
    left := lowestCommonAncestor(root.Left, p, q)
    right := lowestCommonAncestor(root.Right, p, q)
    
    if left != nil && right != nil {
        return root
    }
    if left != nil {
        return left
    }
    return right
}

func lcaBST(root, p, q *TreeNode) *TreeNode {
    for root != nil {
        if p.Val < root.Val && q.Val < root.Val {
            root = root.Left
        } else if p.Val > root.Val && q.Val > root.Val {
            root = root.Right
        } else {
            return root
        }
    }
    return nil
}

func main() {
    root := &TreeNode{Val: 3}
    root.Left = &TreeNode{Val: 5}
    root.Right = &TreeNode{Val: 1}
    lca := lowestCommonAncestor(root, root.Left, root.Right)
    if lca != nil {
        fmt.Printf("LCA: %d\\n", lca.Val)
    }
}
`,
  },
};
