import { AlgorithmCodeTemplates } from './types';

export const hashFunctionsCode: AlgorithmCodeTemplates = {
  algorithmId: 'hash-functions',
  algorithmName: 'Hash Functions',
  category: 'hashing',
  templates: {
    javascript: `// Hash Functions - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

// Division Method: h(k) = k mod m
function divisionHash(key, tableSize) {
  const hash = key % tableSize;
  log(\`Division hash: \${key} mod \${tableSize} = \${hash}\`);
  return hash;
}

// Multiplication Method: h(k) = floor(m * (k * A mod 1))
function multiplicationHash(key, tableSize, A = 0.6180339887) {
  const hash = Math.floor(tableSize * ((key * A) % 1));
  log(\`Multiplication hash: floor(\${tableSize} * (\${key} * A mod 1)) = \${hash}\`);
  return hash;
}

// String Hash (polynomial rolling hash)
function stringHash(str, tableSize) {
  const prime = 31;
  let hash = 0;
  
  for (let i = 0; i < str.length; i++) {
    visit(i);
    hash = (hash * prime + str.charCodeAt(i)) % tableSize;
    mark(i, 'current');
    log(\`After char '\${str[i]}': hash = \${hash}\`);
  }
  
  mark(str.length - 1, 'found');
  return hash;
}

// DJB2 Hash (popular string hash)
function djb2Hash(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// FNV-1a Hash
function fnv1aHash(str) {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = (hash * 16777619) >>> 0;
  }
  return hash;
}

// Demo
log('Integer hashing:');
divisionHash(123, 10);
multiplicationHash(123, 10);

log('\\nString hashing:');
stringHash("hello", 100);
log(\`DJB2: \${djb2Hash("hello")}\`);
log(\`FNV-1a: \${fnv1aHash("hello")}\`);
`,

    java: `// Hash Functions - Java
public class HashFunctions {
    // Division Method
    public static int divisionHash(int key, int tableSize) {
        return Math.abs(key % tableSize);
    }
    
    // Multiplication Method
    public static int multiplicationHash(int key, int tableSize) {
        double A = 0.6180339887;
        return (int) (tableSize * ((key * A) % 1));
    }
    
    // Polynomial String Hash
    public static int stringHash(String str, int tableSize) {
        int hash = 0, prime = 31;
        for (char c : str.toCharArray()) {
            hash = (hash * prime + c) % tableSize;
        }
        return hash;
    }
    
    // Java's default hashCode uses similar approach
    public static void main(String[] args) {
        System.out.println("Division: " + divisionHash(123, 10));
        System.out.println("String hash: " + stringHash("hello", 100));
        System.out.println("Java hashCode: " + "hello".hashCode());
    }
}
`,

    python: `# Hash Functions - Python

def division_hash(key, table_size):
    return key % table_size

def multiplication_hash(key, table_size, A=0.6180339887):
    return int(table_size * ((key * A) % 1))

def string_hash(s, table_size, prime=31):
    hash_val = 0
    for char in s:
        hash_val = (hash_val * prime + ord(char)) % table_size
    return hash_val

def djb2_hash(s):
    hash_val = 5381
    for char in s:
        hash_val = ((hash_val << 5) + hash_val) + ord(char)
    return hash_val & 0xFFFFFFFF

# Demo
print(f"Division: {division_hash(123, 10)}")
print(f"String hash: {string_hash('hello', 100)}")
print(f"Python hash: {hash('hello')}")
`,

    cpp: `// Hash Functions - C++
#include <iostream>
#include <string>
#include <functional>
using namespace std;

int divisionHash(int key, int tableSize) {
    return abs(key % tableSize);
}

int multiplicationHash(int key, int tableSize) {
    double A = 0.6180339887;
    return int(tableSize * fmod(key * A, 1.0));
}

int stringHash(const string& str, int tableSize) {
    int hash = 0, prime = 31;
    for (char c : str) {
        hash = (hash * prime + c) % tableSize;
    }
    return hash;
}

int main() {
    cout << "Division: " << divisionHash(123, 10) << endl;
    cout << "String hash: " << stringHash("hello", 100) << endl;
    cout << "STL hash: " << hash<string>{}("hello") << endl;
    return 0;
}
`,

    go: `// Hash Functions - Go
package main

import (
    "fmt"
    "hash/fnv"
)

func divisionHash(key, tableSize int) int {
    if key < 0 { key = -key }
    return key % tableSize
}

func multiplicationHash(key, tableSize int) int {
    A := 0.6180339887
    return int(float64(tableSize) * (float64(key)*A - float64(int(float64(key)*A))))
}

func stringHash(s string, tableSize int) int {
    hash := 0
    prime := 31
    for _, c := range s {
        hash = (hash*prime + int(c)) % tableSize
    }
    return hash
}

func fnvHash(s string) uint32 {
    h := fnv.New32a()
    h.Write([]byte(s))
    return h.Sum32()
}

func main() {
    fmt.Printf("Division: %d\\n", divisionHash(123, 10))
    fmt.Printf("String hash: %d\\n", stringHash("hello", 100))
    fmt.Printf("FNV hash: %d\\n", fnvHash("hello"))
}
`,
  },
};
