/**
 * Stock Span Info
 */
export const stockSpanInfo = {
  id: 'stock-span',
  name: 'Stock Span Problem',
  description: 'Calculate the span of each stock price - the number of consecutive previous days where the price was less than or equal to current.',
  howItWorks: 'Maintain a stack of indices with decreasing prices. For each day, pop days with smaller or equal prices. Span is the difference between current index and top of stack.',
  keyInsight: 'This is essentially finding the Previous Greater Element - span is distance to that element.',
  bestFor: [
    'Stock market technical analysis',
    'Trading strategy development',
    'Financial indicators',
  ],
  avoidWhen: [
    'Simple moving averages suffice',
    'Real-time streaming with limited memory',
  ],
  funFact: 'Stock span is a real technical indicator used by traders to identify trend strength!',
  optimizationTips: [
    'Stack stores indices, not prices',
    'Empty stack means span equals current index + 1',
  ],
  tags: ['Monotonic Stack', 'Finance', 'O(n)', 'Intermediate'],
};
