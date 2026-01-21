import { AlgorithmCodeTemplates } from './types';

export const rehashingCode: AlgorithmCodeTemplates = {
  algorithmId: 'rehashing',
  algorithmName: 'Rehashing (Dynamic Resize)',
  category: 'hashing',
  templates: {
    javascript: `// Rehashing / Dynamic Resize - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class DynamicHashTable {
  constructor(initialSize = 4, loadFactorThreshold = 0.75) {
    this.size = initialSize;
    this.loadFactorThreshold = loadFactorThreshold;
    this.keys = Array(initialSize).fill(null);
    this.values = Array(initialSize).fill(null);
    this.count = 0;
  }
  
  hash(key, size = this.size) {
    let hash = 0;
    const str = String(key);
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) % size;
    }
    return hash;
  }
  
  loadFactor() {
    return this.count / this.size;
  }
  
  rehash() {
    const oldKeys = this.keys;
    const oldValues = this.values;
    const newSize = this.size * 2;
    
    log(\`Rehashing: \${this.size} -> \${newSize} (load factor: \${this.loadFactor().toFixed(2)})\`);
    
    this.size = newSize;
    this.keys = Array(newSize).fill(null);
    this.values = Array(newSize).fill(null);
    this.count = 0;
    
    // Reinsert all elements
    for (let i = 0; i < oldKeys.length; i++) {
      if (oldKeys[i] !== null) {
        visit(i);
        this.insertInternal(oldKeys[i], oldValues[i]);
        log(\`  Rehashed '\${oldKeys[i]}' to new position\`);
      }
    }
    
    log(\`Rehashing complete. New size: \${this.size}\`);
  }
  
  insertInternal(key, value) {
    let index = this.hash(key);
    while (this.keys[index] !== null && this.keys[index] !== key) {
      index = (index + 1) % this.size;
    }
    if (this.keys[index] === null) this.count++;
    this.keys[index] = key;
    this.values[index] = value;
  }
  
  set(key, value) {
    // Check if rehash needed
    if (this.loadFactor() >= this.loadFactorThreshold) {
      this.rehash();
    }
    
    const index = this.hash(key);
    log(\`Insert (\${key}: \${value})\`);
    
    let i = 0;
    let probeIndex = index;
    while (this.keys[probeIndex] !== null && this.keys[probeIndex] !== key) {
      visit(probeIndex);
      mark(probeIndex, 'current');
      probeIndex = (probeIndex + 1) % this.size;
      i++;
    }
    
    if (this.keys[probeIndex] === null) this.count++;
    this.keys[probeIndex] = key;
    this.values[probeIndex] = value;
    mark(probeIndex, 'found');
    log(\`  Placed at index \${probeIndex}. Load factor: \${this.loadFactor().toFixed(2)}\`);
  }
  
  get(key) {
    let index = this.hash(key);
    while (this.keys[index] !== null) {
      if (this.keys[index] === key) return this.values[index];
      index = (index + 1) % this.size;
    }
    return undefined;
  }
}

// Demo
const ht = new DynamicHashTable(4, 0.75);
log('Inserting elements (will trigger rehash):');
['a', 'b', 'c', 'd', 'e', 'f'].forEach(k => ht.set(k, k.charCodeAt(0)));

log(\`\\nFinal table size: \${ht.size}, elements: \${ht.count}\`);
`,

    java: `// Rehashing / Dynamic Resize - Java
import java.util.*;

public class DynamicHashTable<K, V> {
    private Object[] keys;
    private Object[] values;
    private int size, capacity;
    private double loadFactorThreshold = 0.75;
    
    public DynamicHashTable(int cap) {
        capacity = cap;
        keys = new Object[cap];
        values = new Object[cap];
    }
    
    private int hash(K key) {
        return Math.abs(key.hashCode() % capacity);
    }
    
    private void rehash() {
        Object[] oldKeys = keys;
        Object[] oldValues = values;
        capacity *= 2;
        keys = new Object[capacity];
        values = new Object[capacity];
        size = 0;
        
        for (int i = 0; i < oldKeys.length; i++) {
            if (oldKeys[i] != null) {
                put((K) oldKeys[i], (V) oldValues[i]);
            }
        }
    }
    
    public void put(K key, V value) {
        if ((double) size / capacity >= loadFactorThreshold) {
            rehash();
        }
        
        int index = hash(key);
        while (keys[index] != null && !keys[index].equals(key)) {
            index = (index + 1) % capacity;
        }
        if (keys[index] == null) size++;
        keys[index] = key;
        values[index] = value;
    }
    
    public static void main(String[] args) {
        DynamicHashTable<String, Integer> ht = new DynamicHashTable<>(4);
        for (char c = 'a'; c <= 'f'; c++) ht.put(String.valueOf(c), (int) c);
        System.out.println("Size: " + ht.size + ", Capacity: " + ht.capacity);
    }
}
`,

    python: `# Rehashing / Dynamic Resize - Python

class DynamicHashTable:
    def __init__(self, initial_capacity=4, load_factor=0.75):
        self.capacity = initial_capacity
        self.load_factor = load_factor
        self.keys = [None] * initial_capacity
        self.values = [None] * initial_capacity
        self.size = 0
    
    def _hash(self, key):
        return hash(key) % self.capacity
    
    def _rehash(self):
        old_keys, old_values = self.keys, self.values
        self.capacity *= 2
        self.keys = [None] * self.capacity
        self.values = [None] * self.capacity
        self.size = 0
        
        for k, v in zip(old_keys, old_values):
            if k is not None:
                self.put(k, v)
    
    def put(self, key, value):
        if self.size / self.capacity >= self.load_factor:
            self._rehash()
        
        index = self._hash(key)
        while self.keys[index] is not None and self.keys[index] != key:
            index = (index + 1) % self.capacity
        
        if self.keys[index] is None:
            self.size += 1
        self.keys[index] = key
        self.values[index] = value


ht = DynamicHashTable(4)
for c in 'abcdef':
    ht.put(c, ord(c))
print(f"Size: {ht.size}, Capacity: {ht.capacity}")
`,

    cpp: `// Rehashing / Dynamic Resize - C++
#include <iostream>
#include <vector>
#include <optional>
using namespace std;

template<typename K, typename V>
class DynamicHashTable {
    vector<optional<pair<K, V>>> table;
    int size = 0, capacity;
    double loadFactor = 0.75;
    
    int hash(const K& key) { return std::hash<K>{}(key) % capacity; }
    
    void rehash() {
        auto old = table;
        capacity *= 2;
        table = vector<optional<pair<K, V>>>(capacity);
        size = 0;
        for (auto& entry : old)
            if (entry) put(entry->first, entry->second);
    }
public:
    DynamicHashTable(int cap = 4) : capacity(cap), table(cap) {}
    
    void put(const K& key, const V& value) {
        if ((double)size / capacity >= loadFactor) rehash();
        int index = hash(key);
        while (table[index] && table[index]->first != key)
            index = (index + 1) % capacity;
        if (!table[index]) size++;
        table[index] = {key, value};
    }
};

int main() {
    DynamicHashTable<string, int> ht(4);
    for (char c = 'a'; c <= 'f'; c++) ht.put(string(1, c), c);
    cout << "Inserted 6 elements" << endl;
    return 0;
}
`,

    go: `// Rehashing / Dynamic Resize - Go
package main

import "fmt"

type DynamicHashTable struct {
    keys       []string
    values     []int
    used       []bool
    size, cap  int
    loadFactor float64
}

func NewDynamicHT(cap int) *DynamicHashTable {
    return &DynamicHashTable{
        keys: make([]string, cap), values: make([]int, cap),
        used: make([]bool, cap), cap: cap, loadFactor: 0.75,
    }
}

func (ht *DynamicHashTable) hash(key string) int {
    h := 0
    for _, c := range key { h = (h*31 + int(c)) % ht.cap }
    return h
}

func (ht *DynamicHashTable) rehash() {
    old := struct{ keys []string; values []int; used []bool }{ht.keys, ht.values, ht.used}
    ht.cap *= 2
    ht.keys, ht.values, ht.used = make([]string, ht.cap), make([]int, ht.cap), make([]bool, ht.cap)
    ht.size = 0
    for i, k := range old.keys {
        if old.used[i] { ht.Put(k, old.values[i]) }
    }
}

func (ht *DynamicHashTable) Put(key string, value int) {
    if float64(ht.size)/float64(ht.cap) >= ht.loadFactor { ht.rehash() }
    index := ht.hash(key)
    for ht.used[index] && ht.keys[index] != key {
        index = (index + 1) % ht.cap
    }
    if !ht.used[index] { ht.size++ }
    ht.keys[index], ht.values[index], ht.used[index] = key, value, true
}

func main() {
    ht := NewDynamicHT(4)
    for c := 'a'; c <= 'f'; c++ { ht.Put(string(c), int(c)) }
    fmt.Printf("Size: %d, Capacity: %d\\n", ht.size, ht.cap)
}
`,
  },
};
