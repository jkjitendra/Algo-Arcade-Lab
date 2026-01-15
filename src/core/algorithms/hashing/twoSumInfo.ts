/**
 * Two Sum (Hashing) Info
 * Educational content for Two Sum problem using hashing
 */
export const twoSumInfo = {
  id: 'two-sum-hashmap',
  name: 'Two Sum (Hashing)',
  description: 'Two Sum finds two numbers in an array that add up to a target value. Using a hash map provides O(n) time complexity by storing complements as we iterate.',
  about: `## The Two Sum Problem

The **Two Sum** problem is one of the most fundamental algorithmic challenges that demonstrates the power of hash-based data structures. Given an array of integers and a target sum, the goal is to find two numbers that add up to the target.

### Why It Matters

Two Sum is more than just an interview question—it represents a class of problems where **trading space for time** dramatically improves performance. The naive O(n²) nested loop approach checks every pair, but using a hash map reduces this to O(n) by enabling instant complement lookups.

### Real-World Applications

- **Financial Systems**: Finding transactions that balance to zero, detecting pairs of debits and credits
- **E-commerce**: Matching items within a budget, finding product combinations at target prices
- **Data Validation**: Verifying checksums and hash values in data integrity systems
- **Game Development**: Finding pairs of objects that satisfy distance or scoring constraints

### The Hash Map Pattern

The key insight is the **complement technique**: for each number \`x\`, we ask "Have I seen \`target - x\` before?" The hash map serves as our "memory" of previously encountered values, enabling O(1) lookup.

\`\`\`
For target = 9 and array [2, 7, 11, 15]:
- See 2: need 7, haven't seen it → store 2
- See 7: need 2, found it! → return [0, 1]
\`\`\`

### Historical Context

Two Sum gained fame as **LeetCode Problem #1**, becoming the gateway problem for millions of developers preparing for technical interviews. Its elegant solution using hash maps has made it a teaching cornerstone for understanding time-space tradeoffs.

### Variations & Extensions

- **3Sum**: Find three numbers that sum to target (uses sorting + two pointers)
- **4Sum**: Find four numbers with target sum
- **Two Sum II**: Input array is sorted (use two pointers instead)
- **Two Sum III**: Design a data structure for add/find operations`,
  howItWorks: 'For each number, calculate its complement (target - number). Check if complement exists in hash map. If yes, we found the pair. If no, add current number to hash map and continue.',
  keyInsight: 'The hash map stores "what we\'ve seen" and enables O(1) complement lookup, turning a O(n²) nested loop into O(n).',
  bestFor: [
    'Finding pairs with specific sum',
    'When array is unsorted',
    'Single-pass solutions needed',
    'Interview questions!',
  ],
  avoidWhen: [
    'Array is already sorted (two pointers is simpler)',
    'Memory is extremely limited',
    'Need to find all pairs, not just one',
  ],
  funFact: 'Two Sum is LeetCode Problem #1 and is often the first problem people solve on the platform. It\'s deceptively simple but teaches a powerful pattern!',
  optimizationTips: [
    'Hash map needs to handle duplicate values correctly',
    'For sorted arrays, two-pointer approach uses O(1) space',
    'Can be extended to 3Sum, 4Sum, kSum problems',
  ],
  tags: ['Hashing', 'Array', 'Hash Map', 'O(n)', 'Beginner'],
};
