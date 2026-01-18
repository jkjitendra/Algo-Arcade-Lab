import { AlgorithmCodeTemplates } from './types';

export const lruCacheCode: AlgorithmCodeTemplates = {
  algorithmId: 'lru-cache',
  algorithmName: 'LRU Cache',
  category: 'queues',
  templates: {
    javascript: `// LRU Cache - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Least Recently Used cache with O(1) get and put

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // Maintains insertion order
  }
  
  get(key) {
    if (!this.cache.has(key)) {
      log(\`Get \${key}: -1 (not found)\`);
      return -1;
    }
    
    // Move to end (most recently used)
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    
    log(\`Get \${key}: \${value}\`);
    mark(0, 'found');
    this.print();
    return value;
  }
  
  put(key, value) {
    // If exists, delete first
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    
    // If at capacity, remove least recently used (first item)
    if (this.cache.size >= this.capacity) {
      const lruKey = this.cache.keys().next().value;
      this.cache.delete(lruKey);
      log(\`Evicted LRU key: \${lruKey}\`);
      mark(0, 'eliminated');
    }
    
    this.cache.set(key, value);
    log(\`Put \${key}: \${value}\`);
    visit(this.cache.size - 1);
    mark(this.cache.size - 1, 'current');
    this.print();
  }
  
  print() {
    const entries = [...this.cache.entries()].map(([k, v]) => \`\${k}:\${v}\`);
    log(\`Cache: {\${entries.join(', ')}}\`);
  }
}

// Demo
const cache = new LRUCache(3);
cache.put(1, 'A');
cache.put(2, 'B');
cache.put(3, 'C');
cache.get(1);      // Access 1, moves to end
cache.put(4, 'D'); // Evicts 2 (LRU)
cache.get(2);      // Returns -1
`,

    java: `// LRU Cache - Java
import java.util.*;

public class LRUCache extends LinkedHashMap<Integer, Integer> {
    private int capacity;
    
    public LRUCache(int capacity) {
        super(capacity, 0.75f, true); // accessOrder = true
        this.capacity = capacity;
    }
    
    public int get(int key) {
        return super.getOrDefault(key, -1);
    }
    
    public void put(int key, int value) {
        super.put(key, value);
    }
    
    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
    
    public static void main(String[] args) {
        LRUCache cache = new LRUCache(2);
        cache.put(1, 1);
        cache.put(2, 2);
        System.out.println("Get 1: " + cache.get(1));
        cache.put(3, 3); // Evicts 2
        System.out.println("Get 2: " + cache.get(2)); // -1
    }
}
`,

    python: `# LRU Cache - Python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()
    
    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]
    
    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)


cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
print(f"Get 1: {cache.get(1)}")
cache.put(3, 3)
print(f"Get 2: {cache.get(2)}")  # -1
`,

    cpp: `// LRU Cache - C++
#include <iostream>
#include <list>
#include <unordered_map>
using namespace std;

class LRUCache {
    int capacity;
    list<pair<int, int>> cache; // front = LRU
    unordered_map<int, list<pair<int, int>>::iterator> map;
    
public:
    LRUCache(int cap) : capacity(cap) {}
    
    int get(int key) {
        if (map.find(key) == map.end()) return -1;
        cache.splice(cache.end(), cache, map[key]);
        return map[key]->second;
    }
    
    void put(int key, int value) {
        if (map.find(key) != map.end()) {
            map[key]->second = value;
            cache.splice(cache.end(), cache, map[key]);
        } else {
            if (cache.size() >= capacity) {
                map.erase(cache.front().first);
                cache.pop_front();
            }
            cache.push_back({key, value});
            map[key] = prev(cache.end());
        }
    }
};

int main() {
    LRUCache cache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cout << "Get 1: " << cache.get(1) << endl;
    cache.put(3, 3);
    cout << "Get 2: " << cache.get(2) << endl; // -1
    return 0;
}
`,

    go: `// LRU Cache - Go
package main

import (
    "container/list"
    "fmt"
)

type LRUCache struct {
    capacity int
    cache    map[int]*list.Element
    list     *list.List
}

type entry struct {
    key, value int
}

func NewLRUCache(capacity int) *LRUCache {
    return &LRUCache{
        capacity: capacity,
        cache:    make(map[int]*list.Element),
        list:     list.New(),
    }
}

func (c *LRUCache) Get(key int) int {
    if elem, ok := c.cache[key]; ok {
        c.list.MoveToFront(elem)
        return elem.Value.(*entry).value
    }
    return -1
}

func (c *LRUCache) Put(key, value int) {
    if elem, ok := c.cache[key]; ok {
        elem.Value.(*entry).value = value
        c.list.MoveToFront(elem)
    } else {
        if c.list.Len() >= c.capacity {
            oldest := c.list.Back()
            delete(c.cache, oldest.Value.(*entry).key)
            c.list.Remove(oldest)
        }
        elem := c.list.PushFront(&entry{key, value})
        c.cache[key] = elem
    }
}

func main() {
    cache := NewLRUCache(2)
    cache.Put(1, 1)
    cache.Put(2, 2)
    fmt.Printf("Get 1: %d\\n", cache.Get(1))
    cache.Put(3, 3)
    fmt.Printf("Get 2: %d\\n", cache.Get(2)) // -1
}
`,
  },
};
