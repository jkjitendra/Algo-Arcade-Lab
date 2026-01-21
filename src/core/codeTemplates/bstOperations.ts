import { AlgorithmCodeTemplates } from './types';

export const bstOperationsCode: AlgorithmCodeTemplates = {
  algorithmId: 'bst-operations',
  algorithmName: 'BST Operations',
  category: 'trees',
  templates: {
    javascript: `// BST Operations (Insert, Search, Delete) - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  
  insert(val) {
    log(\`Inserting \${val}\`);
    this.root = this._insert(this.root, val, 0);
    return this;
  }
  
  _insert(node, val, depth) {
    if (!node) {
      mark(depth, 'found');
      log(\`  Created node with value \${val}\`);
      return new TreeNode(val);
    }
    
    visit(depth);
    compare(depth, depth);
    
    if (val < node.val) {
      log(\`  \${val} < \${node.val}, go left\`);
      node.left = this._insert(node.left, val, depth + 1);
    } else {
      log(\`  \${val} >= \${node.val}, go right\`);
      node.right = this._insert(node.right, val, depth + 1);
    }
    return node;
  }
  
  search(val) {
    log(\`Searching for \${val}\`);
    return this._search(this.root, val, 0);
  }
  
  _search(node, val, depth) {
    if (!node) {
      log(\`  Not found!\`);
      return null;
    }
    
    visit(depth);
    compare(depth, depth);
    
    if (val === node.val) {
      mark(depth, 'found');
      log(\`  Found \${val}!\`);
      return node;
    }
    
    if (val < node.val) {
      log(\`  \${val} < \${node.val}, search left\`);
      return this._search(node.left, val, depth + 1);
    } else {
      log(\`  \${val} > \${node.val}, search right\`);
      return this._search(node.right, val, depth + 1);
    }
  }
  
  inorder() {
    const result = [];
    this._inorder(this.root, result);
    return result;
  }
  
  _inorder(node, result) {
    if (node) {
      this._inorder(node.left, result);
      result.push(node.val);
      this._inorder(node.right, result);
    }
  }
}

// Demo
const bst = new BST();
[50, 30, 70, 20, 40, 60, 80].forEach(v => bst.insert(v));
log(\`Inorder: [\${bst.inorder().join(', ')}]\`);
bst.search(40);
bst.search(55);
`,

    java: `// BST Operations - Java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class BSTOperations {
    TreeNode root;
    
    public void insert(int val) {
        root = insertRec(root, val);
    }
    
    TreeNode insertRec(TreeNode node, int val) {
        if (node == null) return new TreeNode(val);
        if (val < node.val) node.left = insertRec(node.left, val);
        else node.right = insertRec(node.right, val);
        return node;
    }
    
    public TreeNode search(int val) {
        return searchRec(root, val);
    }
    
    TreeNode searchRec(TreeNode node, int val) {
        if (node == null || node.val == val) return node;
        if (val < node.val) return searchRec(node.left, val);
        return searchRec(node.right, val);
    }
    
    public static void main(String[] args) {
        BSTOperations bst = new BSTOperations();
        int[] vals = {50, 30, 70, 20, 40};
        for (int v : vals) bst.insert(v);
        System.out.println("Found 40: " + (bst.search(40) != null));
    }
}
`,

    python: `# BST Operations - Python

class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, val):
        self.root = self._insert(self.root, val)
    
    def _insert(self, node, val):
        if not node:
            return TreeNode(val)
        if val < node.val:
            node.left = self._insert(node.left, val)
        else:
            node.right = self._insert(node.right, val)
        return node
    
    def search(self, val):
        return self._search(self.root, val)
    
    def _search(self, node, val):
        if not node or node.val == val:
            return node
        if val < node.val:
            return self._search(node.left, val)
        return self._search(node.right, val)


bst = BST()
for v in [50, 30, 70, 20, 40]:
    bst.insert(v)
print(f"Found 40: {bst.search(40) is not None}")
`,

    cpp: `// BST Operations - C++
#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class BST {
public:
    TreeNode* root = nullptr;
    
    void insert(int val) {
        root = insertRec(root, val);
    }
    
    TreeNode* insertRec(TreeNode* node, int val) {
        if (!node) return new TreeNode(val);
        if (val < node->val) node->left = insertRec(node->left, val);
        else node->right = insertRec(node->right, val);
        return node;
    }
    
    TreeNode* search(int val) {
        return searchRec(root, val);
    }
    
    TreeNode* searchRec(TreeNode* node, int val) {
        if (!node || node->val == val) return node;
        if (val < node->val) return searchRec(node->left, val);
        return searchRec(node->right, val);
    }
};

int main() {
    BST bst;
    int vals[] = {50, 30, 70, 20, 40};
    for (int v : vals) bst.insert(v);
    cout << "Found 40: " << (bst.search(40) ? "true" : "false") << endl;
    return 0;
}
`,

    go: `// BST Operations - Go
package main

import "fmt"

type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

type BST struct {
    Root *TreeNode
}

func (b *BST) Insert(val int) {
    b.Root = b.insertRec(b.Root, val)
}

func (b *BST) insertRec(node *TreeNode, val int) *TreeNode {
    if node == nil {
        return &TreeNode{Val: val}
    }
    if val < node.Val {
        node.Left = b.insertRec(node.Left, val)
    } else {
        node.Right = b.insertRec(node.Right, val)
    }
    return node
}

func (b *BST) Search(val int) *TreeNode {
    return b.searchRec(b.Root, val)
}

func (b *BST) searchRec(node *TreeNode, val int) *TreeNode {
    if node == nil || node.Val == val {
        return node
    }
    if val < node.Val {
        return b.searchRec(node.Left, val)
    }
    return b.searchRec(node.Right, val)
}

func main() {
    bst := &BST{}
    for _, v := range []int{50, 30, 70, 20, 40} {
        bst.Insert(v)
    }
    fmt.Printf("Found 40: %v\\n", bst.Search(40) != nil)
}
`,
  },
};
