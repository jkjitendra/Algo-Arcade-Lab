import { AlgorithmCodeTemplates } from './types';

export const circularTourCode: AlgorithmCodeTemplates = {
  algorithmId: 'circular-tour',
  algorithmName: 'Circular Tour (Gas Station)',
  category: 'queues',
  templates: {
    javascript: `// Circular Tour / Gas Station Problem - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Find starting station to complete circular tour

function canCompleteCircuit(gas, cost) {
  log('Gas: [' + gas.join(', ') + ']');
  log('Cost: [' + cost.join(', ') + ']');
  
  const n = gas.length;
  let totalTank = 0;
  let currentTank = 0;
  let startStation = 0;
  
  for (let i = 0; i < n; i++) {
    visit(i);
    const netGain = gas[i] - cost[i];
    totalTank += netGain;
    currentTank += netGain;
    
    log(\`Station \${i}: gas=\${gas[i]}, cost=\${cost[i]}, net=\${netGain}, tank=\${currentTank}\`);
    
    if (currentTank < 0) {
      // Cannot reach next station, restart from next station
      startStation = i + 1;
      currentTank = 0;
      mark(i, 'eliminated');
      log(\`Reset: new start = \${startStation}\`);
    } else {
      mark(i, 'current');
    }
  }
  
  if (totalTank >= 0) {
    log(\`Can complete tour starting from station \${startStation}\`);
    mark(startStation, 'found');
    return startStation;
  } else {
    log('Cannot complete tour');
    return -1;
  }
}

canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]);
`,

    java: `// Circular Tour / Gas Station Problem - Java
public class CircularTour {
    public static int canCompleteCircuit(int[] gas, int[] cost) {
        int totalTank = 0, currentTank = 0, startStation = 0;
        
        for (int i = 0; i < gas.length; i++) {
            int netGain = gas[i] - cost[i];
            totalTank += netGain;
            currentTank += netGain;
            
            if (currentTank < 0) {
                startStation = i + 1;
                currentTank = 0;
            }
        }
        
        return totalTank >= 0 ? startStation : -1;
    }
    
    public static void main(String[] args) {
        int[] gas = {1, 2, 3, 4, 5};
        int[] cost = {3, 4, 5, 1, 2};
        System.out.println("Start: " + canCompleteCircuit(gas, cost));
    }
}
`,

    python: `# Circular Tour / Gas Station Problem - Python

def can_complete_circuit(gas, cost):
    total_tank = 0
    current_tank = 0
    start_station = 0
    
    for i in range(len(gas)):
        net_gain = gas[i] - cost[i]
        total_tank += net_gain
        current_tank += net_gain
        
        if current_tank < 0:
            start_station = i + 1
            current_tank = 0
    
    return start_station if total_tank >= 0 else -1


gas = [1, 2, 3, 4, 5]
cost = [3, 4, 5, 1, 2]
print(f"Start: {can_complete_circuit(gas, cost)}")
`,

    cpp: `// Circular Tour / Gas Station Problem - C++
#include <iostream>
#include <vector>
using namespace std;

int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    int totalTank = 0, currentTank = 0, startStation = 0;
    
    for (int i = 0; i < gas.size(); i++) {
        int netGain = gas[i] - cost[i];
        totalTank += netGain;
        currentTank += netGain;
        
        if (currentTank < 0) {
            startStation = i + 1;
            currentTank = 0;
        }
    }
    
    return totalTank >= 0 ? startStation : -1;
}

int main() {
    vector<int> gas = {1, 2, 3, 4, 5};
    vector<int> cost = {3, 4, 5, 1, 2};
    cout << "Start: " << canCompleteCircuit(gas, cost) << endl;
    return 0;
}
`,

    go: `// Circular Tour / Gas Station Problem - Go
package main

import "fmt"

func canCompleteCircuit(gas, cost []int) int {
    totalTank, currentTank, startStation := 0, 0, 0
    
    for i := 0; i < len(gas); i++ {
        netGain := gas[i] - cost[i]
        totalTank += netGain
        currentTank += netGain
        
        if currentTank < 0 {
            startStation = i + 1
            currentTank = 0
        }
    }
    
    if totalTank >= 0 {
        return startStation
    }
    return -1
}

func main() {
    gas := []int{1, 2, 3, 4, 5}
    cost := []int{3, 4, 5, 1, 2}
    fmt.Printf("Start: %d\\n", canCompleteCircuit(gas, cost))
}
`,
  },
};
