import { AlgorithmCodeTemplates } from './types';

export const jobSequencingCode: AlgorithmCodeTemplates = {
  algorithmId: 'job-sequencing',
  algorithmName: 'Job Sequencing with Deadlines',
  category: 'greedy',
  templates: {
    javascript: `// Job Sequencing with Deadlines - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Maximize profit with deadline constraints

function jobSequencing(jobs) {
  // jobs: [{id, deadline, profit}, ...]
  log(\`Jobs: \${jobs.length}\`);
  jobs.forEach(j => log(\`  Job \${j.id}: deadline=\${j.deadline}, profit=\${j.profit}\`));
  
  // Sort by profit (descending)
  jobs.sort((a, b) => b.profit - a.profit);
  log('\\nSorted by profit:');
  
  const maxDeadline = Math.max(...jobs.map(j => j.deadline));
  const slots = Array(maxDeadline + 1).fill(null);
  
  let totalProfit = 0;
  const scheduled = [];
  
  for (const job of jobs) {
    visit(job.id);
    log(\`\\nTrying Job \${job.id} (profit: \${job.profit}, deadline: \${job.deadline})\`);
    
    // Find a free slot before or at deadline
    for (let t = job.deadline; t > 0; t--) {
      compare(job.id, t);
      if (slots[t] === null) {
        slots[t] = job.id;
        totalProfit += job.profit;
        scheduled.push({ ...job, slot: t });
        mark(job.id, 'found');
        log(\`  Scheduled at slot \${t}\`);
        break;
      }
    }
  }
  
  log(\`\\nScheduled jobs: \${scheduled.map(j => j.id).join(', ')}\`);
  log(\`Total profit: \${totalProfit}\`);
  return { scheduled, totalProfit };
}

// Demo
const jobs = [
  { id: 1, deadline: 4, profit: 20 },
  { id: 2, deadline: 1, profit: 10 },
  { id: 3, deadline: 1, profit: 40 },
  { id: 4, deadline: 1, profit: 30 }
];
jobSequencing(jobs);
`,

    java: `// Job Sequencing - Java
import java.util.*;

public class JobSequencing {
    static class Job {
        int id, deadline, profit;
        Job(int i, int d, int p) { id = i; deadline = d; profit = p; }
    }
    
    public static int jobSequencing(Job[] jobs) {
        Arrays.sort(jobs, (a, b) -> b.profit - a.profit);
        
        int maxDeadline = 0;
        for (Job j : jobs) maxDeadline = Math.max(maxDeadline, j.deadline);
        
        int[] slots = new int[maxDeadline + 1];
        Arrays.fill(slots, -1);
        
        int profit = 0, count = 0;
        for (Job job : jobs) {
            for (int t = job.deadline; t > 0; t--) {
                if (slots[t] == -1) {
                    slots[t] = job.id;
                    profit += job.profit;
                    count++;
                    break;
                }
            }
        }
        return profit;
    }
    
    public static void main(String[] args) {
        Job[] jobs = { new Job(1,4,20), new Job(2,1,10), new Job(3,1,40), new Job(4,1,30) };
        System.out.println("Max profit: " + jobSequencing(jobs));
    }
}
`,

    python: `# Job Sequencing - Python

def job_sequencing(jobs):
    # jobs: [(id, deadline, profit), ...]
    jobs = sorted(jobs, key=lambda x: -x[2])  # Sort by profit desc
    
    max_deadline = max(j[1] for j in jobs)
    slots = [None] * (max_deadline + 1)
    
    total_profit = 0
    scheduled = []
    
    for job_id, deadline, profit in jobs:
        for t in range(deadline, 0, -1):
            if slots[t] is None:
                slots[t] = job_id
                total_profit += profit
                scheduled.append((job_id, t))
                break
    
    return scheduled, total_profit


jobs = [(1, 4, 20), (2, 1, 10), (3, 1, 40), (4, 1, 30)]
scheduled, profit = job_sequencing(jobs)
print(f"Scheduled: {scheduled}, Profit: {profit}")
`,

    cpp: `// Job Sequencing - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Job { int id, deadline, profit; };

int jobSequencing(vector<Job>& jobs) {
    sort(jobs.begin(), jobs.end(), [](auto& a, auto& b) { return a.profit > b.profit; });
    
    int maxD = 0;
    for (auto& j : jobs) maxD = max(maxD, j.deadline);
    
    vector<int> slots(maxD + 1, -1);
    int profit = 0;
    
    for (auto& job : jobs) {
        for (int t = job.deadline; t > 0; t--) {
            if (slots[t] == -1) {
                slots[t] = job.id;
                profit += job.profit;
                break;
            }
        }
    }
    return profit;
}

int main() {
    vector<Job> jobs = {{1,4,20}, {2,1,10}, {3,1,40}, {4,1,30}};
    cout << "Max profit: " << jobSequencing(jobs) << endl;
    return 0;
}
`,

    go: `// Job Sequencing - Go
package main

import (
    "fmt"
    "sort"
)

type Job struct { id, deadline, profit int }

func jobSequencing(jobs []Job) int {
    sort.Slice(jobs, func(i, j int) bool { return jobs[i].profit > jobs[j].profit })
    
    maxD := 0
    for _, j := range jobs { if j.deadline > maxD { maxD = j.deadline } }
    
    slots := make([]int, maxD+1)
    for i := range slots { slots[i] = -1 }
    
    profit := 0
    for _, job := range jobs {
        for t := job.deadline; t > 0; t-- {
            if slots[t] == -1 {
                slots[t] = job.id
                profit += job.profit
                break
            }
        }
    }
    return profit
}

func main() {
    jobs := []Job{{1,4,20}, {2,1,10}, {3,1,40}, {4,1,30}}
    fmt.Printf("Max profit: %d\\n", jobSequencing(jobs))
}
`,
  },
};
