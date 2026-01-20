import { AlgorithmCodeTemplates } from './types';

export const meetingRoomsCode: AlgorithmCodeTemplates = {
  algorithmId: 'meeting-rooms',
  algorithmName: 'Meeting Rooms',
  category: 'greedy',
  templates: {
    javascript: `// Meeting Rooms - JavaScript
// Visualization hooks: compare(i, j), mark(i, type), visit(i), log(msg)
// Minimum meeting rooms required

function canAttendMeetings(intervals) {
  // Check if one person can attend all meetings
  log('Can attend all meetings?');
  
  intervals.sort((a, b) => a[0] - b[0]);
  
  for (let i = 1; i < intervals.length; i++) {
    compare(i - 1, i);
    if (intervals[i - 1][1] > intervals[i][0]) {
      log(\`Overlap: [\${intervals[i-1]}] and [\${intervals[i]}]\`);
      return false;
    }
  }
  
  log('No overlaps - can attend all!');
  return true;
}

function minMeetingRooms(intervals) {
  log(\`Meetings: \${intervals.length}\`);
  intervals.forEach((m, i) => log(\`  Meeting \${i}: [\${m[0]}, \${m[1]})\`));
  
  if (intervals.length === 0) return 0;
  
  // Separate start and end times
  const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
  const ends = intervals.map(i => i[1]).sort((a, b) => a - b);
  
  let rooms = 0, maxRooms = 0;
  let s = 0, e = 0;
  
  while (s < intervals.length) {
    if (starts[s] < ends[e]) {
      rooms++;
      maxRooms = Math.max(maxRooms, rooms);
      visit(s);
      mark(s, 'current');
      log(\`Time \${starts[s]}: Meeting starts, rooms = \${rooms}\`);
      s++;
    } else {
      rooms--;
      log(\`Time \${ends[e]}: Meeting ends, rooms = \${rooms}\`);
      e++;
    }
  }
  
  mark(maxRooms - 1, 'found');
  log(\`\\nMinimum rooms required: \${maxRooms}\`);
  return maxRooms;
}

// Demo
const meetings = [[0, 30], [5, 10], [15, 20]];
minMeetingRooms(meetings);
log(\`\\nCan attend all: \${canAttendMeetings([[0, 5], [5, 10], [10, 15]])}\`);
`,

    java: `// Meeting Rooms - Java
import java.util.*;

public class MeetingRooms {
    // Can attend all meetings?
    public static boolean canAttend(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i-1][1] > intervals[i][0]) return false;
        }
        return true;
    }
    
    // Minimum rooms required
    public static int minMeetingRooms(int[][] intervals) {
        int n = intervals.length;
        if (n == 0) return 0;
        
        int[] starts = new int[n], ends = new int[n];
        for (int i = 0; i < n; i++) {
            starts[i] = intervals[i][0];
            ends[i] = intervals[i][1];
        }
        Arrays.sort(starts);
        Arrays.sort(ends);
        
        int rooms = 0, maxRooms = 0, s = 0, e = 0;
        while (s < n) {
            if (starts[s] < ends[e]) { rooms++; maxRooms = Math.max(maxRooms, rooms); s++; }
            else { rooms--; e++; }
        }
        return maxRooms;
    }
}
`,

    python: `# Meeting Rooms - Python

def can_attend_all(intervals):
    intervals.sort()
    for i in range(1, len(intervals)):
        if intervals[i-1][1] > intervals[i][0]:
            return False
    return True

def min_meeting_rooms(intervals):
    if not intervals:
        return 0
    
    starts = sorted(i[0] for i in intervals)
    ends = sorted(i[1] for i in intervals)
    
    rooms = max_rooms = 0
    s = e = 0
    
    while s < len(intervals):
        if starts[s] < ends[e]:
            rooms += 1
            max_rooms = max(max_rooms, rooms)
            s += 1
        else:
            rooms -= 1
            e += 1
    
    return max_rooms


meetings = [[0, 30], [5, 10], [15, 20]]
print(f"Min rooms: {min_meeting_rooms(meetings)}")
print(f"Can attend all: {can_attend_all([[0, 5], [5, 10]])}")
`,

    cpp: `// Meeting Rooms - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool canAttend(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i-1][1] > intervals[i][0]) return false;
    }
    return true;
}

int minMeetingRooms(vector<vector<int>>& intervals) {
    if (intervals.empty()) return 0;
    
    vector<int> starts, ends;
    for (auto& i : intervals) { starts.push_back(i[0]); ends.push_back(i[1]); }
    sort(starts.begin(), starts.end());
    sort(ends.begin(), ends.end());
    
    int rooms = 0, maxRooms = 0, s = 0, e = 0;
    while (s < intervals.size()) {
        if (starts[s] < ends[e]) { rooms++; maxRooms = max(maxRooms, rooms); s++; }
        else { rooms--; e++; }
    }
    return maxRooms;
}
`,

    go: `// Meeting Rooms - Go
package main

import (
    "fmt"
    "sort"
)

func canAttend(intervals [][]int) bool {
    sort.Slice(intervals, func(i, j int) bool { return intervals[i][0] < intervals[j][0] })
    for i := 1; i < len(intervals); i++ {
        if intervals[i-1][1] > intervals[i][0] { return false }
    }
    return true
}

func minMeetingRooms(intervals [][]int) int {
    if len(intervals) == 0 { return 0 }
    
    starts, ends := make([]int, len(intervals)), make([]int, len(intervals))
    for i, v := range intervals { starts[i], ends[i] = v[0], v[1] }
    sort.Ints(starts); sort.Ints(ends)
    
    rooms, maxRooms, s, e := 0, 0, 0, 0
    for s < len(intervals) {
        if starts[s] < ends[e] { rooms++; if rooms > maxRooms { maxRooms = rooms }; s++ 
        } else { rooms--; e++ }
    }
    return maxRooms
}

func main() {
    meetings := [][]int{{0, 30}, {5, 10}, {15, 20}}
    fmt.Printf("Min rooms: %d\\n", minMeetingRooms(meetings))
}
`,
  },
};
