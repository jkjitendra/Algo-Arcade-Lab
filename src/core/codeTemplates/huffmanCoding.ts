import { AlgorithmCodeTemplates } from './types';

export const huffmanCodingCode: AlgorithmCodeTemplates = {
  algorithmId: 'huffman-coding',
  algorithmName: 'Huffman Coding',
  category: 'greedy',
  templates: {
    javascript: `// Huffman Coding - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Optimal prefix-free binary codes

class HuffmanNode {
  constructor(char, freq) {
    this.char = char;
    this.freq = freq;
    this.left = null;
    this.right = null;
  }
}

function huffmanCoding(chars, freqs) {
  log('Building Huffman Tree');
  log(\`Characters: [\${chars.join(', ')}]\`);
  log(\`Frequencies: [\${freqs.join(', ')}]\`);
  
  // Create leaf nodes
  let nodes = chars.map((c, i) => new HuffmanNode(c, freqs[i]));
  
  // Build tree (using array as simple priority queue)
  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);
    
    const left = nodes.shift();
    const right = nodes.shift();
    
    log(\`Merge: '\${left.char || 'internal'}' (\${left.freq}) + '\${right.char || 'internal'}' (\${right.freq})\`);
    
    const parent = new HuffmanNode(null, left.freq + right.freq);
    parent.left = left;
    parent.right = right;
    
    nodes.push(parent);
  }
  
  const root = nodes[0];
  
  // Generate codes
  const codes = {};
  
  function generateCodes(node, code = '') {
    if (!node) return;
    
    if (node.char !== null) {
      codes[node.char] = code || '0';
      mark(chars.indexOf(node.char), 'found');
      log(\`'\${node.char}' -> \${code || '0'}\`);
      return;
    }
    
    generateCodes(node.left, code + '0');
    generateCodes(node.right, code + '1');
  }
  
  log('\\nHuffman Codes:');
  generateCodes(root);
  
  return codes;
}

// Demo
const chars = ['a', 'b', 'c', 'd', 'e', 'f'];
const freqs = [5, 9, 12, 13, 16, 45];
huffmanCoding(chars, freqs);
`,

    java: `// Huffman Coding - Java
import java.util.*;

public class HuffmanCoding {
    static class Node implements Comparable<Node> {
        char ch; int freq; Node left, right;
        Node(char c, int f) { ch = c; freq = f; }
        public int compareTo(Node o) { return freq - o.freq; }
    }
    
    public static Map<Character, String> huffman(char[] chars, int[] freqs) {
        PriorityQueue<Node> pq = new PriorityQueue<>();
        for (int i = 0; i < chars.length; i++)
            pq.offer(new Node(chars[i], freqs[i]));
        
        while (pq.size() > 1) {
            Node left = pq.poll(), right = pq.poll();
            Node parent = new Node('\\0', left.freq + right.freq);
            parent.left = left; parent.right = right;
            pq.offer(parent);
        }
        
        Map<Character, String> codes = new HashMap<>();
        buildCodes(pq.poll(), "", codes);
        return codes;
    }
    
    static void buildCodes(Node n, String code, Map<Character, String> codes) {
        if (n == null) return;
        if (n.ch != '\\0') { codes.put(n.ch, code.isEmpty() ? "0" : code); return; }
        buildCodes(n.left, code + "0", codes);
        buildCodes(n.right, code + "1", codes);
    }
}
`,

    python: `# Huffman Coding - Python
import heapq
from collections import defaultdict

class HuffmanNode:
    def __init__(self, char, freq):
        self.char = char
        self.freq = freq
        self.left = self.right = None
    
    def __lt__(self, other):
        return self.freq < other.freq

def huffman_coding(chars, freqs):
    heap = [HuffmanNode(c, f) for c, f in zip(chars, freqs)]
    heapq.heapify(heap)
    
    while len(heap) > 1:
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)
        parent = HuffmanNode(None, left.freq + right.freq)
        parent.left, parent.right = left, right
        heapq.heappush(heap, parent)
    
    codes = {}
    def build_codes(node, code=""):
        if node.char is not None:
            codes[node.char] = code or "0"
            return
        build_codes(node.left, code + "0")
        build_codes(node.right, code + "1")
    
    build_codes(heap[0])
    return codes


chars = ['a', 'b', 'c', 'd', 'e', 'f']
freqs = [5, 9, 12, 13, 16, 45]
print(huffman_coding(chars, freqs))
`,

    cpp: `// Huffman Coding - C++
#include <iostream>
#include <queue>
#include <unordered_map>
using namespace std;

struct Node {
    char ch; int freq; Node *left, *right;
    Node(char c, int f) : ch(c), freq(f), left(nullptr), right(nullptr) {}
};

struct Compare { bool operator()(Node* a, Node* b) { return a->freq > b->freq; } };

void buildCodes(Node* n, string code, unordered_map<char, string>& codes) {
    if (!n) return;
    if (n->ch != '\\0') { codes[n->ch] = code.empty() ? "0" : code; return; }
    buildCodes(n->left, code + "0", codes);
    buildCodes(n->right, code + "1", codes);
}

unordered_map<char, string> huffman(string chars, vector<int>& freqs) {
    priority_queue<Node*, vector<Node*>, Compare> pq;
    for (int i = 0; i < chars.size(); i++)
        pq.push(new Node(chars[i], freqs[i]));
    
    while (pq.size() > 1) {
        Node *l = pq.top(); pq.pop();
        Node *r = pq.top(); pq.pop();
        Node *p = new Node('\\0', l->freq + r->freq);
        p->left = l; p->right = r;
        pq.push(p);
    }
    
    unordered_map<char, string> codes;
    buildCodes(pq.top(), "", codes);
    return codes;
}
`,

    go: `// Huffman Coding - Go
package main

import (
    "container/heap"
    "fmt"
)

type Node struct { ch rune; freq int; left, right *Node }
type PQ []*Node
func (pq PQ) Len() int { return len(pq) }
func (pq PQ) Less(i, j int) bool { return pq[i].freq < pq[j].freq }
func (pq PQ) Swap(i, j int) { pq[i], pq[j] = pq[j], pq[i] }
func (pq *PQ) Push(x interface{}) { *pq = append(*pq, x.(*Node)) }
func (pq *PQ) Pop() interface{} { old := *pq; x := old[len(old)-1]; *pq = old[:len(old)-1]; return x }

func huffman(chars []rune, freqs []int) map[rune]string {
    pq := &PQ{}
    for i, c := range chars { heap.Push(pq, &Node{ch: c, freq: freqs[i]}) }
    heap.Init(pq)
    
    for pq.Len() > 1 {
        l, r := heap.Pop(pq).(*Node), heap.Pop(pq).(*Node)
        heap.Push(pq, &Node{freq: l.freq + r.freq, left: l, right: r})
    }
    
    codes := make(map[rune]string)
    var build func(*Node, string)
    build = func(n *Node, code string) {
        if n.ch != 0 { codes[n.ch] = code; if code == "" { codes[n.ch] = "0" }; return }
        build(n.left, code+"0"); build(n.right, code+"1")
    }
    build(heap.Pop(pq).(*Node), "")
    return codes
}

func main() { fmt.Println(huffman([]rune{'a','b','c'}, []int{5,9,12})) }
`,
  },
};
