import { AlgorithmCodeTemplates } from './types';

export const openAddressingCode: AlgorithmCodeTemplates = {
  algorithmId: 'open-addressing',
  algorithmName: 'Hash Table Open Addressing',
  category: 'hashing',
  templates: {
    javascript: `// Hash Table with Open Addressing - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Linear Probing, Quadratic Probing, Double Hashing

class HashTableOpenAddressing {
  constructor(size = 10) {
    this.size = size;
    this.keys = Array(size).fill(null);
    this.values = Array(size).fill(null);
    this.count = 0;
    this.DELETED = Symbol('DELETED');
  }
  
  hash(key) {
    let hash = 0;
    const str = String(key);
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) % this.size;
    }
    return hash;
  }
  
  // Linear Probing: (h + i) mod size
  linearProbe(index, i) {
    return (index + i) % this.size;
  }
  
  // Quadratic Probing: (h + i²) mod size
  quadraticProbe(index, i) {
    return (index + i * i) % this.size;
  }
  
  set(key, value) {
    if (this.count >= this.size * 0.7) {
      log('Load factor high, should resize');
    }
    
    const index = this.hash(key);
    log(\`Insert (\${key}: \${value}), hash = \${index}\`);
    
    let i = 0;
    while (i < this.size) {
      const probeIndex = this.linearProbe(index, i);
      visit(probeIndex);
      
      if (this.keys[probeIndex] === null || 
          this.keys[probeIndex] === this.DELETED ||
          this.keys[probeIndex] === key) {
        this.keys[probeIndex] = key;
        this.values[probeIndex] = value;
        this.count++;
        mark(probeIndex, 'found');
        log(\`  Placed at index \${probeIndex} after \${i} probes\`);
        return;
      }
      
      mark(probeIndex, 'eliminated');
      log(\`  Index \${probeIndex} occupied, probe \${i + 1}\`);
      i++;
    }
    
    log('  Table full!');
  }
  
  get(key) {
    const index = this.hash(key);
    log(\`Search for '\${key}', hash = \${index}\`);
    
    let i = 0;
    while (i < this.size) {
      const probeIndex = this.linearProbe(index, i);
      visit(probeIndex);
      
      if (this.keys[probeIndex] === null) {
        mark(probeIndex, 'eliminated');
        log(\`  Not found (empty slot at \${probeIndex})\`);
        return undefined;
      }
      
      if (this.keys[probeIndex] === key) {
        mark(probeIndex, 'found');
        log(\`  Found at index \${probeIndex}\`);
        return this.values[probeIndex];
      }
      
      i++;
    }
    
    return undefined;
  }
  
  delete(key) {
    const index = this.hash(key);
    let i = 0;
    
    while (i < this.size) {
      const probeIndex = this.linearProbe(index, i);
      if (this.keys[probeIndex] === null) return false;
      if (this.keys[probeIndex] === key) {
        this.keys[probeIndex] = this.DELETED;
        this.values[probeIndex] = null;
        this.count--;
        log(\`Deleted '\${key}' from index \${probeIndex}\`);
        return true;
      }
      i++;
    }
    return false;
  }
}

// Demo
const ht = new HashTableOpenAddressing(7);
ht.set('apple', 1);
ht.set('banana', 2);
ht.set('grape', 3);

ht.get('banana');
ht.get('orange');
`,

    java: `// Hash Table Open Addressing - Java
public class HashTableOpenAddressing<K, V> {
    private Object[] keys;
    private Object[] values;
    private int size, capacity;
    private static final Object DELETED = new Object();
    
    public HashTableOpenAddressing(int cap) {
        capacity = cap;
        keys = new Object[cap];
        values = new Object[cap];
    }
    
    private int hash(K key) {
        return Math.abs(key.hashCode() % capacity);
    }
    
    public void put(K key, V value) {
        int index = hash(key);
        for (int i = 0; i < capacity; i++) {
            int probe = (index + i) % capacity;
            if (keys[probe] == null || keys[probe] == DELETED || keys[probe].equals(key)) {
                keys[probe] = key;
                values[probe] = value;
                size++;
                return;
            }
        }
    }
    
    @SuppressWarnings("unchecked")
    public V get(K key) {
        int index = hash(key);
        for (int i = 0; i < capacity; i++) {
            int probe = (index + i) % capacity;
            if (keys[probe] == null) return null;
            if (keys[probe].equals(key)) return (V) values[probe];
        }
        return null;
    }
    
    public static void main(String[] args) {
        HashTableOpenAddressing<String, Integer> ht = new HashTableOpenAddressing<>(7);
        ht.put("apple", 1);
        ht.put("banana", 2);
        System.out.println("banana: " + ht.get("banana"));
    }
}
`,

    python: `# Hash Table Open Addressing - Python

class HashTableOpenAddressing:
    DELETED = object()
    
    def __init__(self, capacity=10):
        self.capacity = capacity
        self.keys = [None] * capacity
        self.values = [None] * capacity
        self.size = 0
    
    def _hash(self, key):
        return hash(key) % self.capacity
    
    def put(self, key, value):
        index = self._hash(key)
        for i in range(self.capacity):
            probe = (index + i) % self.capacity
            if self.keys[probe] is None or self.keys[probe] is self.DELETED or self.keys[probe] == key:
                self.keys[probe] = key
                self.values[probe] = value
                self.size += 1
                return
    
    def get(self, key):
        index = self._hash(key)
        for i in range(self.capacity):
            probe = (index + i) % self.capacity
            if self.keys[probe] is None:
                return None
            if self.keys[probe] == key:
                return self.values[probe]
        return None


ht = HashTableOpenAddressing(7)
ht.put("apple", 1)
ht.put("banana", 2)
print(f"banana: {ht.get('banana')}")
`,

    cpp: `// Hash Table Open Addressing - C++
#include <iostream>
#include <vector>
#include <optional>
using namespace std;

template<typename K, typename V>
class HashTableOpenAddressing {
    struct Entry { K key; V value; bool occupied = false; bool deleted = false; };
    vector<Entry> table;
    int capacity;
    
    int hash(const K& key) { return std::hash<K>{}(key) % capacity; }
public:
    HashTableOpenAddressing(int cap) : capacity(cap), table(cap) {}
    
    void put(const K& key, const V& value) {
        int index = hash(key);
        for (int i = 0; i < capacity; i++) {
            int probe = (index + i) % capacity;
            if (!table[probe].occupied || table[probe].deleted || table[probe].key == key) {
                table[probe] = {key, value, true, false};
                return;
            }
        }
    }
    
    optional<V> get(const K& key) {
        int index = hash(key);
        for (int i = 0; i < capacity; i++) {
            int probe = (index + i) % capacity;
            if (!table[probe].occupied) return nullopt;
            if (!table[probe].deleted && table[probe].key == key)
                return table[probe].value;
        }
        return nullopt;
    }
};

int main() {
    HashTableOpenAddressing<string, int> ht(7);
    ht.put("apple", 1);
    ht.put("banana", 2);
    if (auto v = ht.get("banana")) cout << "banana: " << *v << endl;
    return 0;
}
`,

    go: `// Hash Table Open Addressing - Go
package main

import "fmt"

type Entry struct {
    key     string
    value   int
    used    bool
    deleted bool
}

type HashTableOA struct {
    table    []Entry
    capacity int
}

func NewHashTableOA(cap int) *HashTableOA {
    return &HashTableOA{table: make([]Entry, cap), capacity: cap}
}

func (ht *HashTableOA) hash(key string) int {
    h := 0
    for _, c := range key { h = (h*31 + int(c)) % ht.capacity }
    return h
}

func (ht *HashTableOA) Put(key string, value int) {
    index := ht.hash(key)
    for i := 0; i < ht.capacity; i++ {
        probe := (index + i) % ht.capacity
        if !ht.table[probe].used || ht.table[probe].deleted || ht.table[probe].key == key {
            ht.table[probe] = Entry{key, value, true, false}
            return
        }
    }
}

func (ht *HashTableOA) Get(key string) (int, bool) {
    index := ht.hash(key)
    for i := 0; i < ht.capacity; i++ {
        probe := (index + i) % ht.capacity
        if !ht.table[probe].used { return 0, false }
        if !ht.table[probe].deleted && ht.table[probe].key == key {
            return ht.table[probe].value, true
        }
    }
    return 0, false
}

func main() {
    ht := NewHashTableOA(7)
    ht.Put("apple", 1)
    ht.Put("banana", 2)
    if v, ok := ht.Get("banana"); ok { fmt.Printf("banana: %d\\n", v) }
}
`,
  },
};
