import { AlgorithmCodeTemplates } from './types';

export const treeHeightCode: AlgorithmCodeTemplates = {
  algorithmId: 'tree-height',
  algorithmName: 'Tree Height / Depth',
  category: 'trees',
  templates: {
    javascript: `// Tree Height / Maximum Depth - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function maxDepth(root, depth = 0) {
  if (!root) {
    return 0;
  }
  
  const indent = '  '.repeat(depth);
  visit(depth);
  mark(depth, 'current');
  log(\`\${indent}At node \${root.val}, depth = \${depth + 1}\`);
  
  const leftHeight = maxDepth(root.left, depth + 1);
  const rightHeight = maxDepth(root.right, depth + 1);
  
  const height = 1 + Math.max(leftHeight, rightHeight);
  log(\`\${indent}Node \${root.val}: left=\${leftHeight}, right=\${rightHeight}, max=\${height}\`);
  mark(depth, 'found');
  
  return height;
}

// Build sample tree:    3
//                      / \\
//                     9  20
//                       /  \\
//                      15   7
const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

log('Computing tree height:');
const height = maxDepth(root);
log(\`Maximum depth: \${height}\`);
`,

    java: `// Tree Height - Java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class TreeHeight {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
    
    // Iterative using BFS
    public int maxDepthBFS(TreeNode root) {
        if (root == null) return 0;
        java.util.Queue<TreeNode> queue = new java.util.LinkedList<>();
        queue.offer(root);
        int depth = 0;
        
        while (!queue.isEmpty()) {
            int size = queue.size();
            depth++;
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
        }
        return depth;
    }
    
    public static void main(String[] args) {
        TreeNode root = new TreeNode(3);
        root.left = new TreeNode(9);
        root.right = new TreeNode(20);
        System.out.println("Height: " + new TreeHeight().maxDepth(root));
    }
}
`,

    python: `# Tree Height - Python

class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

def max_depth_iterative(root):
    if not root:
        return 0
    
    from collections import deque
    queue = deque([root])
    depth = 0
    
    while queue:
        depth += 1
        for _ in range(len(queue)):
            node = queue.popleft()
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    
    return depth


root = TreeNode(3)
root.left = TreeNode(9)
root.right = TreeNode(20)
print(f"Height: {max_depth(root)}")
`,

    cpp: `// Tree Height - C++
#include <iostream>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}

int main() {
    TreeNode* root = new TreeNode(3);
    root->left = new TreeNode(9);
    root->right = new TreeNode(20);
    cout << "Height: " << maxDepth(root) << endl;
    return 0;
}
`,

    go: `// Tree Height - Go
package main

import "fmt"

type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

func maxDepth(root *TreeNode) int {
    if root == nil {
        return 0
    }
    left := maxDepth(root.Left)
    right := maxDepth(root.Right)
    if left > right {
        return 1 + left
    }
    return 1 + right
}

func main() {
    root := &TreeNode{Val: 3}
    root.Left = &TreeNode{Val: 9}
    root.Right = &TreeNode{Val: 20}
    fmt.Printf("Height: %d\\n", maxDepth(root))
}
`,
  },
};
