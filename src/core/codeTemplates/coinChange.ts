import { AlgorithmCodeTemplates } from './types';

export const coinChangeCode: AlgorithmCodeTemplates = {
  algorithmId: 'coin-change',
  algorithmName: 'Coin Change',
  category: 'dp',
  templates: {
    javascript: `// Coin Change - Dynamic Programming - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Minimum coins to make amount

function coinChange(coins, amount) {
  log(\`Coins: [\${coins.join(', ')}], Amount: \${amount}\`);
  
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    visit(i);
    
    for (const coin of coins) {
      compare(i, coin);
      if (coin <= i && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
    
    mark(i, dp[i] === Infinity ? 'eliminated' : 'current');
    log(\`dp[\${i}] = \${dp[i] === Infinity ? '∞' : dp[i]}\`);
  }
  
  const result = dp[amount] === Infinity ? -1 : dp[amount];
  if (result !== -1) mark(amount, 'found');
  log(\`\\nMinimum coins: \${result}\`);
  return result;
}

// Count ways to make amount
function coinChangeWays(coins, amount) {
  log(\`\\nCounting ways to make \${amount}:\`);
  
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1;
  
  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin];
    }
    log(\`After coin \${coin}: [\${dp.join(', ')}]\`);
  }
  
  log(\`Total ways: \${dp[amount]}\`);
  return dp[amount];
}

// Demo
coinChange([1, 2, 5], 11);
coinChangeWays([1, 2, 5], 5);
`,

    java: `// Coin Change - Java
import java.util.*;

public class CoinChange {
    // Minimum coins
    public static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
    
    // Count ways
    public static int coinChangeWays(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] += dp[i - coin];
            }
        }
        return dp[amount];
    }
    
    public static void main(String[] args) {
        int[] coins = {1, 2, 5};
        System.out.println("Min coins: " + coinChange(coins, 11));
    }
}
`,

    python: `# Coin Change - Python

def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i and dp[i - coin] != float('inf'):
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1

def coin_change_ways(coins, amount):
    dp = [0] * (amount + 1)
    dp[0] = 1
    
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] += dp[i - coin]
    
    return dp[amount]


coins = [1, 2, 5]
print(f"Min coins for 11: {coin_change(coins, 11)}")
print(f"Ways to make 5: {coin_change_ways(coins, 5)}")
`,

    cpp: `// Coin Change - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}

int coinChangeWays(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, 0);
    dp[0] = 1;
    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }
    return dp[amount];
}

int main() {
    vector<int> coins = {1, 2, 5};
    cout << "Min coins: " << coinChange(coins, 11) << endl;
    return 0;
}
`,

    go: `// Coin Change - Go
package main

import "fmt"

func coinChange(coins []int, amount int) int {
    dp := make([]int, amount+1)
    for i := range dp { dp[i] = amount + 1 }
    dp[0] = 0
    
    for i := 1; i <= amount; i++ {
        for _, coin := range coins {
            if coin <= i && dp[i-coin]+1 < dp[i] {
                dp[i] = dp[i-coin] + 1
            }
        }
    }
    if dp[amount] > amount { return -1 }
    return dp[amount]
}

func coinChangeWays(coins []int, amount int) int {
    dp := make([]int, amount+1)
    dp[0] = 1
    for _, coin := range coins {
        for i := coin; i <= amount; i++ {
            dp[i] += dp[i-coin]
        }
    }
    return dp[amount]
}

func main() {
    coins := []int{1, 2, 5}
    fmt.Printf("Min coins: %d\\n", coinChange(coins, 11))
}
`,
  },
};
