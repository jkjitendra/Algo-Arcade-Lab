import { AlgorithmCodeTemplates } from './types';

export const fractionalKnapsackCode: AlgorithmCodeTemplates = {
  algorithmId: 'fractional-knapsack',
  algorithmName: 'Fractional Knapsack',
  category: 'greedy',
  templates: {
    javascript: `// Fractional Knapsack - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Unlike 0/1, can take fractions of items

function fractionalKnapsack(weights, values, capacity) {
  const n = weights.length;
  log(\`Items: \${n}, Capacity: \${capacity}\`);
  
  // Create items with value/weight ratio
  const items = weights.map((w, i) => ({
    idx: i,
    weight: w,
    value: values[i],
    ratio: values[i] / w
  }));
  
  // Sort by ratio (descending)
  items.sort((a, b) => b.ratio - a.ratio);
  
  log('Sorted by value/weight ratio:');
  items.forEach(i => log(\`  Item \${i.idx}: w=\${i.weight}, v=\${i.value}, ratio=\${i.ratio.toFixed(2)}\`));
  
  let totalValue = 0;
  let remainingCapacity = capacity;
  const taken = [];
  
  for (const item of items) {
    visit(item.idx);
    
    if (remainingCapacity === 0) break;
    
    if (item.weight <= remainingCapacity) {
      // Take whole item
      remainingCapacity -= item.weight;
      totalValue += item.value;
      taken.push({ ...item, fraction: 1 });
      mark(item.idx, 'found');
      log(\`Take 100% of item \${item.idx}, value = \${item.value}\`);
    } else {
      // Take fraction
      const fraction = remainingCapacity / item.weight;
      totalValue += item.value * fraction;
      taken.push({ ...item, fraction });
      mark(item.idx, 'current');
      log(\`Take \${(fraction * 100).toFixed(1)}% of item \${item.idx}, value = \${(item.value * fraction).toFixed(2)}\`);
      remainingCapacity = 0;
    }
  }
  
  log(\`\\nTotal value: \${totalValue.toFixed(2)}\`);
  return totalValue;
}

// Demo
const weights = [10, 40, 20, 30];
const values = [60, 40, 100, 120];
fractionalKnapsack(weights, values, 50);
`,

    java: `// Fractional Knapsack - Java
import java.util.*;

public class FractionalKnapsack {
    public static double fractionalKnapsack(int[] weights, int[] values, int capacity) {
        int n = weights.length;
        double[][] items = new double[n][3]; // [idx, ratio, weight]
        for (int i = 0; i < n; i++) {
            items[i] = new double[]{i, (double) values[i] / weights[i], weights[i]};
        }
        Arrays.sort(items, (a, b) -> Double.compare(b[1], a[1]));
        
        double totalValue = 0;
        int remaining = capacity;
        
        for (double[] item : items) {
            int idx = (int) item[0];
            if (remaining == 0) break;
            if (weights[idx] <= remaining) {
                remaining -= weights[idx];
                totalValue += values[idx];
            } else {
                totalValue += values[idx] * ((double) remaining / weights[idx]);
                remaining = 0;
            }
        }
        return totalValue;
    }
    
    public static void main(String[] args) {
        int[] w = {10, 40, 20, 30}, v = {60, 40, 100, 120};
        System.out.printf("Max value: %.2f%n", fractionalKnapsack(w, v, 50));
    }
}
`,

    python: `# Fractional Knapsack - Python

def fractional_knapsack(weights, values, capacity):
    n = len(weights)
    items = sorted(
        range(n),
        key=lambda i: values[i] / weights[i],
        reverse=True
    )
    
    total_value = 0
    remaining = capacity
    
    for i in items:
        if remaining == 0:
            break
        if weights[i] <= remaining:
            remaining -= weights[i]
            total_value += values[i]
        else:
            total_value += values[i] * (remaining / weights[i])
            remaining = 0
    
    return total_value


weights = [10, 40, 20, 30]
values = [60, 40, 100, 120]
print(f"Max value: {fractional_knapsack(weights, values, 50):.2f}")
`,

    cpp: `// Fractional Knapsack - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

double fractionalKnapsack(vector<int>& w, vector<int>& v, int cap) {
    int n = w.size();
    vector<pair<double, int>> items(n);
    for (int i = 0; i < n; i++) items[i] = {(double)v[i] / w[i], i};
    sort(items.rbegin(), items.rend());
    
    double total = 0;
    int remaining = cap;
    
    for (auto& [ratio, i] : items) {
        if (remaining == 0) break;
        if (w[i] <= remaining) {
            remaining -= w[i];
            total += v[i];
        } else {
            total += v[i] * ((double)remaining / w[i]);
            remaining = 0;
        }
    }
    return total;
}

int main() {
    vector<int> w = {10, 40, 20, 30}, v = {60, 40, 100, 120};
    cout << "Max value: " << fractionalKnapsack(w, v, 50) << endl;
    return 0;
}
`,

    go: `// Fractional Knapsack - Go
package main

import (
    "fmt"
    "sort"
)

type Item struct { idx int; ratio float64; weight, value int }

func fractionalKnapsack(weights, values []int, capacity int) float64 {
    n := len(weights)
    items := make([]Item, n)
    for i := 0; i < n; i++ {
        items[i] = Item{i, float64(values[i]) / float64(weights[i]), weights[i], values[i]}
    }
    sort.Slice(items, func(i, j int) bool { return items[i].ratio > items[j].ratio })
    
    total, remaining := 0.0, float64(capacity)
    for _, item := range items {
        if remaining == 0 { break }
        if float64(item.weight) <= remaining {
            remaining -= float64(item.weight)
            total += float64(item.value)
        } else {
            total += float64(item.value) * (remaining / float64(item.weight))
            remaining = 0
        }
    }
    return total
}

func main() {
    w, v := []int{10, 40, 20, 30}, []int{60, 40, 100, 120}
    fmt.Printf("Max value: %.2f\\n", fractionalKnapsack(w, v, 50))
}
`,
  },
};
