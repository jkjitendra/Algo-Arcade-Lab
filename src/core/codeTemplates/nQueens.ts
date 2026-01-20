import { AlgorithmCodeTemplates } from './types';

export const nQueensCode: AlgorithmCodeTemplates = {
  algorithmId: 'n-queens',
  algorithmName: 'N-Queens Problem',
  category: 'recursion',
  templates: {
    javascript: `// N-Queens Problem - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function solveNQueens(n) {
  log(\`Solving \${n}-Queens problem...\`);
  
  const solutions = [];
  const board = Array(n).fill().map(() => Array(n).fill('.'));
  
  function isSafe(row, col) {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }
    // Check upper left diagonal
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }
    // Check upper right diagonal
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }
    return true;
  }
  
  function solve(row) {
    if (row === n) {
      solutions.push(board.map(r => r.join('')));
      log(\`Found solution #\${solutions.length}\`);
      return;
    }
    
    for (let col = 0; col < n; col++) {
      visit(row * n + col);
      
      if (isSafe(row, col)) {
        board[row][col] = 'Q';
        mark(row * n + col, 'found');
        log(\`Place Q at (\${row}, \${col})\`);
        
        solve(row + 1);
        
        board[row][col] = '.';
        mark(row * n + col, 'eliminated');
      }
    }
  }
  
  solve(0);
  
  log(\`Total solutions for \${n}-Queens: \${solutions.length}\`);
  return solutions;
}

// Demo
const solutions = solveNQueens(4);
log('One solution:');
solutions[0]?.forEach(row => log(row));
`,

    java: `// N-Queens Problem - Java
import java.util.*;

public class NQueens {
    static List<List<String>> solutions = new ArrayList<>();
    
    public static List<List<String>> solveNQueens(int n) {
        char[][] board = new char[n][n];
        for (char[] row : board) Arrays.fill(row, '.');
        solve(board, 0, n);
        return solutions;
    }
    
    static boolean isSafe(char[][] board, int row, int col, int n) {
        for (int i = 0; i < row; i++) if (board[i][col] == 'Q') return false;
        for (int i = row-1, j = col-1; i >= 0 && j >= 0; i--, j--) 
            if (board[i][j] == 'Q') return false;
        for (int i = row-1, j = col+1; i >= 0 && j < n; i--, j++) 
            if (board[i][j] == 'Q') return false;
        return true;
    }
    
    static void solve(char[][] board, int row, int n) {
        if (row == n) {
            List<String> solution = new ArrayList<>();
            for (char[] r : board) solution.add(new String(r));
            solutions.add(solution);
            return;
        }
        for (int col = 0; col < n; col++) {
            if (isSafe(board, row, col, n)) {
                board[row][col] = 'Q';
                solve(board, row + 1, n);
                board[row][col] = '.';
            }
        }
    }
    
    public static void main(String[] args) {
        solutions.clear();
        System.out.println("4-Queens solutions: " + solveNQueens(4).size());
    }
}
`,

    python: `# N-Queens Problem - Python

def solve_n_queens(n):
    solutions = []
    board = [['.' for _ in range(n)] for _ in range(n)]
    
    def is_safe(row, col):
        for i in range(row):
            if board[i][col] == 'Q':
                return False
        for i, j in zip(range(row-1, -1, -1), range(col-1, -1, -1)):
            if board[i][j] == 'Q':
                return False
        for i, j in zip(range(row-1, -1, -1), range(col+1, n)):
            if board[i][j] == 'Q':
                return False
        return True
    
    def solve(row):
        if row == n:
            solutions.append([''.join(r) for r in board])
            return
        for col in range(n):
            if is_safe(row, col):
                board[row][col] = 'Q'
                solve(row + 1)
                board[row][col] = '.'
    
    solve(0)
    return solutions


solutions = solve_n_queens(4)
print(f"4-Queens has {len(solutions)} solutions")
for row in solutions[0]:
    print(row)
`,

    cpp: `// N-Queens Problem - C++
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class NQueens {
    vector<vector<string>> solutions;
    
    bool isSafe(vector<string>& board, int row, int col, int n) {
        for (int i = 0; i < row; i++) if (board[i][col] == 'Q') return false;
        for (int i = row-1, j = col-1; i >= 0 && j >= 0; i--, j--) 
            if (board[i][j] == 'Q') return false;
        for (int i = row-1, j = col+1; i >= 0 && j < n; i--, j++) 
            if (board[i][j] == 'Q') return false;
        return true;
    }
    
    void solve(vector<string>& board, int row, int n) {
        if (row == n) { solutions.push_back(board); return; }
        for (int col = 0; col < n; col++) {
            if (isSafe(board, row, col, n)) {
                board[row][col] = 'Q';
                solve(board, row + 1, n);
                board[row][col] = '.';
            }
        }
    }
    
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<string> board(n, string(n, '.'));
        solve(board, 0, n);
        return solutions;
    }
};

int main() {
    NQueens nq;
    auto solutions = nq.solveNQueens(4);
    cout << "4-Queens solutions: " << solutions.size() << endl;
    return 0;
}
`,

    go: `// N-Queens Problem - Go
package main

import "fmt"

func solveNQueens(n int) [][]string {
    var solutions [][]string
    board := make([][]byte, n)
    for i := range board {
        board[i] = make([]byte, n)
        for j := range board[i] {
            board[i][j] = '.'
        }
    }
    
    var isSafe func(row, col int) bool
    isSafe = func(row, col int) bool {
        for i := 0; i < row; i++ {
            if board[i][col] == 'Q' { return false }
        }
        for i, j := row-1, col-1; i >= 0 && j >= 0; i, j = i-1, j-1 {
            if board[i][j] == 'Q' { return false }
        }
        for i, j := row-1, col+1; i >= 0 && j < n; i, j = i-1, j+1 {
            if board[i][j] == 'Q' { return false }
        }
        return true
    }
    
    var solve func(row int)
    solve = func(row int) {
        if row == n {
            sol := make([]string, n)
            for i := range board {
                sol[i] = string(board[i])
            }
            solutions = append(solutions, sol)
            return
        }
        for col := 0; col < n; col++ {
            if isSafe(row, col) {
                board[row][col] = 'Q'
                solve(row + 1)
                board[row][col] = '.'
            }
        }
    }
    
    solve(0)
    return solutions
}

func main() {
    solutions := solveNQueens(4)
    fmt.Printf("4-Queens solutions: %d\\n", len(solutions))
}
`,
  },
};
