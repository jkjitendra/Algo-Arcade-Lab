import { AlgorithmCodeTemplates } from './types';

export const ratInMazeCode: AlgorithmCodeTemplates = {
  algorithmId: 'rat-in-maze',
  algorithmName: 'Rat in a Maze',
  category: 'recursion',
  templates: {
    javascript: `// Rat in a Maze - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function solveMaze(maze) {
  const n = maze.length;
  const solution = Array(n).fill().map(() => Array(n).fill(0));
  
  log('Solving Maze (1 = open path, 0 = wall):');
  maze.forEach((row, i) => log(\`Row \${i}: [\${row.join(', ')}]\`));
  
  function isSafe(x, y) {
    return x >= 0 && x < n && y >= 0 && y < n && maze[x][y] === 1;
  }
  
  function solve(x, y) {
    // Reached destination
    if (x === n - 1 && y === n - 1) {
      solution[x][y] = 1;
      mark(x * n + y, 'found');
      log(\`Reached destination (\${x}, \${y})\`);
      return true;
    }
    
    if (isSafe(x, y)) {
      // Check if already part of solution
      if (solution[x][y] === 1) return false;
      
      solution[x][y] = 1;
      visit(x * n + y);
      mark(x * n + y, 'current');
      log(\`Visit (\${x}, \${y})\`);
      
      // Move right
      if (solve(x, y + 1)) return true;
      
      // Move down
      if (solve(x + 1, y)) return true;
      
      // Backtrack
      solution[x][y] = 0;
      mark(x * n + y, 'eliminated');
      log(\`Backtrack from (\${x}, \${y})\`);
      return false;
    }
    
    return false;
  }
  
  if (solve(0, 0)) {
    log('Solution path:');
    solution.forEach((row, i) => log(\`Row \${i}: [\${row.join(', ')}]\`));
    return solution;
  } else {
    log('No solution exists');
    return null;
  }
}

// Demo
const maze = [
  [1, 0, 0, 0],
  [1, 1, 0, 1],
  [0, 1, 0, 0],
  [1, 1, 1, 1]
];

solveMaze(maze);
`,

    java: `// Rat in a Maze - Java
public class RatInMaze {
    static int N;
    
    static boolean isSafe(int[][] maze, int x, int y) {
        return x >= 0 && x < N && y >= 0 && y < N && maze[x][y] == 1;
    }
    
    static boolean solveMaze(int[][] maze, int[][] sol, int x, int y) {
        if (x == N - 1 && y == N - 1) {
            sol[x][y] = 1;
            return true;
        }
        
        if (isSafe(maze, x, y)) {
            if (sol[x][y] == 1) return false;
            sol[x][y] = 1;
            
            if (solveMaze(maze, sol, x + 1, y)) return true;
            if (solveMaze(maze, sol, x, y + 1)) return true;
            
            sol[x][y] = 0;
            return false;
        }
        return false;
    }
    
    public static void main(String[] args) {
        int[][] maze = {
            {1, 0, 0, 0},
            {1, 1, 0, 1},
            {0, 1, 0, 0},
            {1, 1, 1, 1}
        };
        N = maze.length;
        int[][] sol = new int[N][N];
        
        if (solveMaze(maze, sol, 0, 0)) {
            for (int[] row : sol) {
                for (int cell : row) System.out.print(cell + " ");
                System.out.println();
            }
        }
    }
}
`,

    python: `# Rat in a Maze - Python

def solve_maze(maze):
    n = len(maze)
    solution = [[0] * n for _ in range(n)]
    
    def is_safe(x, y):
        return 0 <= x < n and 0 <= y < n and maze[x][y] == 1
    
    def solve(x, y):
        if x == n - 1 and y == n - 1:
            solution[x][y] = 1
            return True
        
        if is_safe(x, y) and solution[x][y] == 0:
            solution[x][y] = 1
            
            if solve(x + 1, y) or solve(x, y + 1):
                return True
            
            solution[x][y] = 0
            return False
        
        return False
    
    if solve(0, 0):
        return solution
    return None


maze = [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 1, 0, 0],
    [1, 1, 1, 1]
]

solution = solve_maze(maze)
if solution:
    for row in solution:
        print(row)
`,

    cpp: `// Rat in a Maze - C++
#include <iostream>
#include <vector>
using namespace std;

int N;

bool isSafe(vector<vector<int>>& maze, int x, int y) {
    return x >= 0 && x < N && y >= 0 && y < N && maze[x][y] == 1;
}

bool solve(vector<vector<int>>& maze, vector<vector<int>>& sol, int x, int y) {
    if (x == N - 1 && y == N - 1) {
        sol[x][y] = 1;
        return true;
    }
    
    if (isSafe(maze, x, y) && sol[x][y] == 0) {
        sol[x][y] = 1;
        if (solve(maze, sol, x + 1, y)) return true;
        if (solve(maze, sol, x, y + 1)) return true;
        sol[x][y] = 0;
        return false;
    }
    return false;
}

int main() {
    vector<vector<int>> maze = {{1,0,0,0}, {1,1,0,1}, {0,1,0,0}, {1,1,1,1}};
    N = maze.size();
    vector<vector<int>> sol(N, vector<int>(N, 0));
    
    if (solve(maze, sol, 0, 0)) {
        for (auto& row : sol) {
            for (int c : row) cout << c << " ";
            cout << endl;
        }
    }
    return 0;
}
`,

    go: `// Rat in a Maze - Go
package main

import "fmt"

var N int

func isSafe(maze [][]int, x, y int) bool {
    return x >= 0 && x < N && y >= 0 && y < N && maze[x][y] == 1
}

func solve(maze, sol [][]int, x, y int) bool {
    if x == N-1 && y == N-1 {
        sol[x][y] = 1
        return true
    }
    
    if isSafe(maze, x, y) && sol[x][y] == 0 {
        sol[x][y] = 1
        if solve(maze, sol, x+1, y) { return true }
        if solve(maze, sol, x, y+1) { return true }
        sol[x][y] = 0
        return false
    }
    return false
}

func main() {
    maze := [][]int{{1,0,0,0}, {1,1,0,1}, {0,1,0,0}, {1,1,1,1}}
    N = len(maze)
    sol := make([][]int, N)
    for i := range sol {
        sol[i] = make([]int, N)
    }
    
    if solve(maze, sol, 0, 0) {
        for _, row := range sol {
            fmt.Println(row)
        }
    }
}
`,
  },
};
