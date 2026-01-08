/**
 * Circular Tour Info
 */
export const circularTourInfo = {
  id: 'circular-tour',
  name: 'Circular Tour (Gas Station)',
  description: 'Find the starting gas station from which you can complete a circular tour. Each station has petrol and a distance to the next station. You start with an empty tank.',
  howItWorks: 'Track running fuel balance. If it goes negative, the current start cannot work - reset to next station. If total fuel is non-negative, the final start point is valid.',
  example: `Problem: 4 gas stations in a circle. Can you complete the tour?

Station | Petrol | Distance | Net Gain (P-D)
--------|--------|----------|---------------
   0    |   4    |    6     |    -2  ❌
   1    |   6    |    5     |    +1  ✅
   2    |   7    |    3     |    +4  ✅
   3    |   4    |    5     |    -1  ❌

Step-by-Step (start=0):
Step | Station | Fuel Before | + Petrol | - Distance | Fuel After | Action
-----|---------|-------------|----------|------------|------------|--------
  1  |    0    |      0      |    +4    |     -6     |    -2 ❌   | Reset! start=1
  2  |    1    |      0      |    +6    |     -5     |    +1 ✅   | Continue
  3  |    2    |      1      |    +7    |     -3     |    +5 ✅   | Continue  
  4  |    3    |      5      |    +4    |     -5     |    +4 ✅   | Done!

Result: Start from Station 1 ✅

Why it works: Total gain = -2+1+4-1 = +2 ≥ 0, so solution exists!`,
  keyInsight: 'If total petrol ≥ total distance, a solution MUST exist. The greedy reset finds it in O(n) - no need to try every starting point!',
  bestFor: [
    'Route planning with refueling',
    'Resource allocation problems',
    'Circular dependency resolution',
    'Supply chain optimization',
  ],
  avoidWhen: [
    'Multiple starting points needed',
    'Non-circular routes',
    'Variable fuel consumption rates',
  ],
  funFact: 'This is LeetCode #134 "Gas Station" - a classic greedy algorithm problem that tricks people into thinking O(n²) is needed when O(n) is possible!',
  optimizationTips: [
    'Single pass is sufficient',
    'Track deficit separately for clarity',
    'Can be extended to find ALL valid starts',
  ],
  tags: ['Greedy', 'Circular', 'O(n)', 'Advanced', 'LeetCode Medium'],
};
