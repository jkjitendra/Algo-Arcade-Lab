import { AlgorithmCodeTemplates } from './types';

export const levelOrderTraversalCode: AlgorithmCodeTemplates = {
  algorithmId: 'level-order-traversal',
  algorithmName: 'Level Order Traversal',
  category: 'trees',
  templates: {
    javascript: `// Level Order Traversal (BFS) - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function levelOrder(root) {
  if (!root) return [];
  
  log('Level Order Traversal (BFS):');
  
  const result = [];
  const queue = [root];
  let level = 0;
  let idx = 0;
  
  while (queue.length) {
    const levelSize = queue.length;
    const currentLevel = [];
    
    log(\`Level \${level}:\`);
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      visit(idx);
      mark(idx, 'current');
      currentLevel.push(node.val);
      log(\`  Visit: \${node.val}\`);
      idx++;
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(currentLevel);
    level++;
  }
  
  log(\`Result: [\${result.map(l => '[' + l.join(', ') + ']').join(', ')}]\`);
  return result;
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

levelOrder(root);
`,

    java: `// Level Order Traversal - Java
import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class LevelOrderTraversal {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> level = new ArrayList<>();
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(level);
        }
        return result;
    }
    
    public static void main(String[] args) {
        TreeNode root = new TreeNode(3);
        root.left = new TreeNode(9);
        root.right = new TreeNode(20);
        System.out.println(new LevelOrderTraversal().levelOrder(root));
    }
}
`,

    python: `# Level Order Traversal - Python
from collections import deque

class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

def level_order(root):
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        level = []
        
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(level)
    
    return result


root = TreeNode(3)
root.left = TreeNode(9)
root.right = TreeNode(20)
print(f"Level Order: {level_order(root)}")
`,

    cpp: `// Level Order Traversal - C++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;
    
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        int levelSize = q.size();
        vector<int> level;
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(level);
    }
    return result;
}

int main() {
    TreeNode* root = new TreeNode(3);
    root->left = new TreeNode(9);
    root->right = new TreeNode(20);
    
    auto result = levelOrder(root);
    for (auto& level : result) {
        for (int v : level) cout << v << " ";
        cout << endl;
    }
    return 0;
}
`,

    go: `// Level Order Traversal - Go
package main

import "fmt"

type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

func levelOrder(root *TreeNode) [][]int {
    if root == nil { return nil }
    
    var result [][]int
    queue := []*TreeNode{root}
    
    for len(queue) > 0 {
        levelSize := len(queue)
        var level []int
        
        for i := 0; i < levelSize; i++ {
            node := queue[0]
            queue = queue[1:]
            level = append(level, node.Val)
            if node.Left != nil { queue = append(queue, node.Left) }
            if node.Right != nil { queue = append(queue, node.Right) }
        }
        result = append(result, level)
    }
    return result
}

func main() {
    root := &TreeNode{Val: 3}
    root.Left = &TreeNode{Val: 9}
    root.Right = &TreeNode{Val: 20}
    fmt.Println(levelOrder(root))
}
`,
  },
};
