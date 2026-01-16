export const partitionEqualSubsetSumInfo = {
  id: 'partition-equal-subset-sum',
  name: 'Partition Equal Subset Sum',
  category: 'dp',
  difficulty: 'intermediate',
  description: 'Determine if an array can be split into two subsets with equal sum. Reduces to subset sum problem with target = totalSum/2.',
  howItWorks: 'If total sum is odd, impossible. Otherwise, find if subset with sum = total/2 exists. Uses space-optimized 1D DP iterating backwards.',
  keyInsight: 'This elegantly reduces to subset sum! If we find subset with sum S/2, the remaining elements automatically sum to S/2.',
  bestFor: ['Equal division problems', 'Fair partitioning', 'Understanding problem reduction'],
  avoidWhen: ['Need actual partition (requires backtracking)', 'Sum is very large', 'More than 2 partitions needed'],
  funFact: 'This is LeetCode #416 and appears frequently in interviews as a twist on subset sum.',
  optimizationTips: ['Early termination when target reached', 'Bitset can speed up to O(n × sum / 64)', 'Sort array descending for faster pruning'],
  tags: ['DP', 'Advanced DP', 'Intermediate', 'Subset Sum', 'Partition'],
};
