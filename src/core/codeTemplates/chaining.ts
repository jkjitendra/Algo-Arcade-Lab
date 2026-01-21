import { AlgorithmCodeTemplates } from './types';

export const chainingCode: AlgorithmCodeTemplates = {
  algorithmId: 'chaining',
  algorithmName: 'Hash Table with Chaining',
  category: 'hashing',
  templates: {
    javascript: `// Hash Table with Chaining - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

class HashTableChaining {
  constructor(size = 10) {
    this.size = size;
    this.buckets = Array(size).fill(null).map(() => []);
    this.count = 0;
  }
  
  hash(key) {
    let hash = 0;
    const str = String(key);
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) % this.size;
    }
    return hash;
  }
  
  set(key, value) {
    const index = this.hash(key);
    visit(index);
    mark(index, 'current');
    log(\`Insert (\${key}: \${value}) at bucket \${index}\`);
    
    const bucket = this.buckets[index];
    
    // Check if key exists
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        mark(index, 'found');
        log(\`  Updated existing key\`);
        return;
      }
    }
    
    // Add new entry to chain
    bucket.push([key, value]);
    this.count++;
    mark(index, 'found');
    log(\`  Added to chain (length: \${bucket.length})\`);
  }
  
  get(key) {
    const index = this.hash(key);
    visit(index);
    mark(index, 'current');
    log(\`Search for '\${key}' in bucket \${index}\`);
    
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      compare(index, i);
      if (bucket[i][0] === key) {
        mark(index, 'found');
        log(\`  Found: \${bucket[i][1]}\`);
        return bucket[i][1];
      }
    }
    
    mark(index, 'eliminated');
    log(\`  Not found\`);
    return undefined;
  }
  
  delete(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.count--;
        log(\`Deleted '\${key}' from bucket \${index}\`);
        return true;
      }
    }
    return false;
  }
}

// Demo
const ht = new HashTableChaining(5);
ht.set('apple', 1);
ht.set('banana', 2);
ht.set('grape', 3);
ht.set('melon', 4);

ht.get('banana');
ht.get('orange');
`,

    java: `// Hash Table with Chaining - Java
import java.util.*;

public class HashTableChaining<K, V> {
    private LinkedList<Entry<K, V>>[] buckets;
    private int size;
    
    static class Entry<K, V> {
        K key;
        V value;
        Entry(K k, V v) { key = k; value = v; }
    }
    
    @SuppressWarnings("unchecked")
    public HashTableChaining(int capacity) {
        buckets = new LinkedList[capacity];
        for (int i = 0; i < capacity; i++) {
            buckets[i] = new LinkedList<>();
        }
    }
    
    private int hash(K key) {
        return Math.abs(key.hashCode() % buckets.length);
    }
    
    public void put(K key, V value) {
        int index = hash(key);
        for (Entry<K, V> entry : buckets[index]) {
            if (entry.key.equals(key)) {
                entry.value = value;
                return;
            }
        }
        buckets[index].add(new Entry<>(key, value));
        size++;
    }
    
    public V get(K key) {
        int index = hash(key);
        for (Entry<K, V> entry : buckets[index]) {
            if (entry.key.equals(key)) return entry.value;
        }
        return null;
    }
    
    public static void main(String[] args) {
        HashTableChaining<String, Integer> ht = new HashTableChaining<>(5);
        ht.put("apple", 1);
        ht.put("banana", 2);
        System.out.println("banana: " + ht.get("banana"));
    }
}
`,

    python: `# Hash Table with Chaining - Python

class HashTableChaining:
    def __init__(self, capacity=10):
        self.capacity = capacity
        self.buckets = [[] for _ in range(capacity)]
        self.size = 0
    
    def _hash(self, key):
        return hash(key) % self.capacity
    
    def put(self, key, value):
        index = self._hash(key)
        bucket = self.buckets[index]
        
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        
        bucket.append((key, value))
        self.size += 1
    
    def get(self, key):
        index = self._hash(key)
        for k, v in self.buckets[index]:
            if k == key:
                return v
        return None
    
    def delete(self, key):
        index = self._hash(key)
        bucket = self.buckets[index]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                del bucket[i]
                self.size -= 1
                return True
        return False


ht = HashTableChaining(5)
ht.put("apple", 1)
ht.put("banana", 2)
print(f"banana: {ht.get('banana')}")
`,

    cpp: `// Hash Table with Chaining - C++
#include <iostream>
#include <list>
#include <vector>
#include <string>
using namespace std;

template<typename K, typename V>
class HashTableChaining {
    vector<list<pair<K, V>>> buckets;
    int capacity;
    
    int hash(const K& key) {
        return std::hash<K>{}(key) % capacity;
    }
public:
    HashTableChaining(int cap = 10) : capacity(cap), buckets(cap) {}
    
    void put(const K& key, const V& value) {
        int index = hash(key);
        for (auto& p : buckets[index]) {
            if (p.first == key) { p.second = value; return; }
        }
        buckets[index].emplace_back(key, value);
    }
    
    V* get(const K& key) {
        int index = hash(key);
        for (auto& p : buckets[index]) {
            if (p.first == key) return &p.second;
        }
        return nullptr;
    }
};

int main() {
    HashTableChaining<string, int> ht(5);
    ht.put("apple", 1);
    ht.put("banana", 2);
    cout << "banana: " << *ht.get("banana") << endl;
    return 0;
}
`,

    go: `// Hash Table with Chaining - Go
package main

import "fmt"

type Entry struct {
    key   string
    value int
}

type HashTableChaining struct {
    buckets [][]Entry
    size    int
}

func NewHashTable(capacity int) *HashTableChaining {
    return &HashTableChaining{buckets: make([][]Entry, capacity)}
}

func (ht *HashTableChaining) hash(key string) int {
    h := 0
    for _, c := range key {
        h = (h*31 + int(c)) % len(ht.buckets)
    }
    return h
}

func (ht *HashTableChaining) Put(key string, value int) {
    index := ht.hash(key)
    for i, entry := range ht.buckets[index] {
        if entry.key == key {
            ht.buckets[index][i].value = value
            return
        }
    }
    ht.buckets[index] = append(ht.buckets[index], Entry{key, value})
    ht.size++
}

func (ht *HashTableChaining) Get(key string) (int, bool) {
    index := ht.hash(key)
    for _, entry := range ht.buckets[index] {
        if entry.key == key {
            return entry.value, true
        }
    }
    return 0, false
}

func main() {
    ht := NewHashTable(5)
    ht.Put("apple", 1)
    ht.Put("banana", 2)
    if v, ok := ht.Get("banana"); ok {
        fmt.Printf("banana: %d\\n", v)
    }
}
`,
  },
};
