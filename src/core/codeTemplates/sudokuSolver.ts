import { AlgorithmCodeTemplates } from './types';

export const sudokuSolverCode: AlgorithmCodeTemplates = {
  algorithmId: 'sudoku-solver',
  algorithmName: 'Sudoku Solver',
  category: 'recursion',
  templates: {
    javascript: `// Sudoku Solver - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)

function solveSudoku(board) {
  log('Solving Sudoku puzzle...');
  
  function isValid(board, row, col, num) {
    const char = String(num);
    
    // Check row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === char) return false;
    }
    
    // Check column
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === char) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === char) return false;
      }
    }
    
    return true;
  }
  
  function solve() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === '.') {
          visit(row * 9 + col);
          
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = String(num);
              mark(row * 9 + col, 'current');
              log(\`Place \${num} at (\${row}, \${col})\`);
              
              if (solve()) {
                mark(row * 9 + col, 'found');
                return true;
              }
              
              board[row][col] = '.';
              mark(row * 9 + col, 'eliminated');
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  
  solve();
  log('Sudoku solved!');
  return board;
}

// Demo - a sample puzzle
const puzzle = [
  ['5','3','.','.','7','.','.','.','.'],
  ['6','.','.','1','9','5','.','.','.'],
  ['.','9','8','.','.','.','.','6','.'],
  ['8','.','.','.','6','.','.','.','3'],
  ['4','.','.','8','.','3','.','.','1'],
  ['7','.','.','.','2','.','.','.','6'],
  ['.','6','.','.','.','.','2','8','.'],
  ['.','.','.','4','1','9','.','.','5'],
  ['.','.','.','.','8','.','.','7','9']
];

solveSudoku(puzzle);
log('Solved board:');
puzzle.forEach(row => log(row.join(' ')));
`,

    java: `// Sudoku Solver - Java
public class SudokuSolver {
    public void solveSudoku(char[][] board) {
        solve(board);
    }
    
    boolean isValid(char[][] board, int row, int col, char c) {
        for (int i = 0; i < 9; i++) {
            if (board[row][i] == c) return false;
            if (board[i][col] == c) return false;
            if (board[3*(row/3)+i/3][3*(col/3)+i%3] == c) return false;
        }
        return true;
    }
    
    boolean solve(char[][] board) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') {
                    for (char c = '1'; c <= '9'; c++) {
                        if (isValid(board, i, j, c)) {
                            board[i][j] = c;
                            if (solve(board)) return true;
                            board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
}
`,

    python: `# Sudoku Solver - Python

def solve_sudoku(board):
    def is_valid(row, col, num):
        c = str(num)
        for i in range(9):
            if board[row][i] == c: return False
            if board[i][col] == c: return False
            if board[3*(row//3)+i//3][3*(col//3)+i%3] == c: return False
        return True
    
    def solve():
        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':
                    for num in range(1, 10):
                        if is_valid(i, j, num):
                            board[i][j] = str(num)
                            if solve(): return True
                            board[i][j] = '.'
                    return False
        return True
    
    solve()
    return board


# Demo
puzzle = [["5","3",".",".","7",".",".",".","."],
          ["6",".",".","1","9","5",".",".","."],
          [".","9","8",".",".",".",".","6","."],
          ["8",".",".",".","6",".",".",".","3"],
          ["4",".",".","8",".","3",".",".","1"],
          ["7",".",".",".","2",".",".",".","6"],
          [".","6",".",".",".",".","2","8","."],
          [".",".",".","4","1","9",".",".","5"],
          [".",".",".",".","8",".",".","7","9"]]
solve_sudoku(puzzle)
for row in puzzle:
    print(' '.join(row))
`,

    cpp: `// Sudoku Solver - C++
#include <iostream>
#include <vector>
using namespace std;

class SudokuSolver {
    bool isValid(vector<vector<char>>& board, int row, int col, char c) {
        for (int i = 0; i < 9; i++) {
            if (board[row][i] == c) return false;
            if (board[i][col] == c) return false;
            if (board[3*(row/3)+i/3][3*(col/3)+i%3] == c) return false;
        }
        return true;
    }
    
    bool solve(vector<vector<char>>& board) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') {
                    for (char c = '1'; c <= '9'; c++) {
                        if (isValid(board, i, j, c)) {
                            board[i][j] = c;
                            if (solve(board)) return true;
                            board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
public:
    void solveSudoku(vector<vector<char>>& board) {
        solve(board);
    }
};
`,

    go: `// Sudoku Solver - Go
package main

import "fmt"

func solveSudoku(board [][]byte) {
    solve(board)
}

func isValid(board [][]byte, row, col int, c byte) bool {
    for i := 0; i < 9; i++ {
        if board[row][i] == c { return false }
        if board[i][col] == c { return false }
        if board[3*(row/3)+i/3][3*(col/3)+i%3] == c { return false }
    }
    return true
}

func solve(board [][]byte) bool {
    for i := 0; i < 9; i++ {
        for j := 0; j < 9; j++ {
            if board[i][j] == '.' {
                for c := byte('1'); c <= '9'; c++ {
                    if isValid(board, i, j, c) {
                        board[i][j] = c
                        if solve(board) { return true }
                        board[i][j] = '.'
                    }
                }
                return false
            }
        }
    }
    return true
}

func main() {
    fmt.Println("Sudoku Solver")
}
`,
  },
};
