import { AlgorithmCodeTemplates } from './types';

export const towerOfHanoiCode: AlgorithmCodeTemplates = {
  algorithmId: 'tower-of-hanoi',
  algorithmName: 'Tower of Hanoi',
  category: 'recursion',
  templates: {
    javascript: `// Tower of Hanoi - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

let moveCount = 0;

function towerOfHanoi(n, source, auxiliary, destination, depth = 0) {
  const indent = '  '.repeat(depth);
  visit(depth);
  
  if (n === 1) {
    moveCount++;
    log(\`\${indent}Move disk 1 from \${source} to \${destination}\`);
    mark(depth, 'found');
    return;
  }
  
  mark(depth, 'current');
  log(\`\${indent}Moving \${n} disks from \${source} to \${destination}...\`);
  
  // Move n-1 disks from source to auxiliary
  towerOfHanoi(n - 1, source, destination, auxiliary, depth + 1);
  
  // Move the largest disk from source to destination
  moveCount++;
  log(\`\${indent}Move disk \${n} from \${source} to \${destination}\`);
  
  // Move n-1 disks from auxiliary to destination
  towerOfHanoi(n - 1, auxiliary, source, destination, depth + 1);
  
  mark(depth, 'found');
}

// Demo
const n = 3;
log(\`Tower of Hanoi with \${n} disks:\`);
log(\`Pegs: A (source), B (auxiliary), C (destination)\`);
log('');

moveCount = 0;
towerOfHanoi(n, 'A', 'B', 'C');

log('');
log(\`Total moves: \${moveCount} (minimum for \${n} disks: \${Math.pow(2, n) - 1})\`);
`,

    java: `// Tower of Hanoi - Java
public class TowerOfHanoi {
    static int moveCount = 0;
    
    public static void hanoi(int n, char source, char aux, char dest) {
        if (n == 1) {
            System.out.println("Move disk 1 from " + source + " to " + dest);
            moveCount++;
            return;
        }
        hanoi(n - 1, source, dest, aux);
        System.out.println("Move disk " + n + " from " + source + " to " + dest);
        moveCount++;
        hanoi(n - 1, aux, source, dest);
    }
    
    public static void main(String[] args) {
        int n = 3;
        hanoi(n, 'A', 'B', 'C');
        System.out.println("Total moves: " + moveCount);
    }
}
`,

    python: `# Tower of Hanoi - Python

def tower_of_hanoi(n, source, auxiliary, destination, moves=[]):
    if n == 1:
        moves.append(f"Move disk 1 from {source} to {destination}")
        return
    tower_of_hanoi(n - 1, source, destination, auxiliary, moves)
    moves.append(f"Move disk {n} from {source} to {destination}")
    tower_of_hanoi(n - 1, auxiliary, source, destination, moves)
    return moves


# Demo
n = 3
moves = tower_of_hanoi(n, 'A', 'B', 'C', [])
for move in moves:
    print(move)
print(f"Total moves: {len(moves)}")
`,

    cpp: `// Tower of Hanoi - C++
#include <iostream>
using namespace std;

int moveCount = 0;

void hanoi(int n, char source, char aux, char dest) {
    if (n == 1) {
        cout << "Move disk 1 from " << source << " to " << dest << endl;
        moveCount++;
        return;
    }
    hanoi(n - 1, source, dest, aux);
    cout << "Move disk " << n << " from " << source << " to " << dest << endl;
    moveCount++;
    hanoi(n - 1, aux, source, dest);
}

int main() {
    int n = 3;
    hanoi(n, 'A', 'B', 'C');
    cout << "Total moves: " << moveCount << endl;
    return 0;
}
`,

    go: `// Tower of Hanoi - Go
package main

import "fmt"

var moveCount = 0

func hanoi(n int, source, aux, dest rune) {
    if n == 1 {
        fmt.Printf("Move disk 1 from %c to %c\\n", source, dest)
        moveCount++
        return
    }
    hanoi(n-1, source, dest, aux)
    fmt.Printf("Move disk %d from %c to %c\\n", n, source, dest)
    moveCount++
    hanoi(n-1, aux, source, dest)
}

func main() {
    n := 3
    hanoi(n, 'A', 'B', 'C')
    fmt.Printf("Total moves: %d\\n", moveCount)
}
`,
  },
};
