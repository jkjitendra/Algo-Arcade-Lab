"use client";

import { AuxiliaryState } from "@/core/events/events";
import { BucketView } from "./BucketView";
import { CountArrayView } from "./CountArrayView";
import { HeapTreeView } from "./HeapTreeView";
import { MergeView } from "./MergeView";
import { GapView } from "./GapView";
import { PartitionView } from "./PartitionView";
import { RunView } from "./RunView";
import { ModeView } from "./ModeView";
import { VotingView } from "./VotingView";
import { StringCharacterView } from "./StringCharacterView";
import { FrequencyHistogramView } from "./FrequencyHistogramView";
import { LPSArrayView } from "./LPSArrayView";
import { HashView } from "./HashView";
import { DPTableView } from "./DPTableView";
import { SearchVisualizationView } from "./SearchVisualizationView";
import { StackView } from "./StackView";
import { QueueView } from "./QueueView";

interface AlgorithmViewProps {
  auxiliaryState?: AuxiliaryState;
}

export function AlgorithmView({ auxiliaryState }: AlgorithmViewProps) {
  if (!auxiliaryState) return null;

  switch (auxiliaryState.type) {
    case "buckets":
      return auxiliaryState.buckets ? (
        <BucketView
          buckets={auxiliaryState.buckets}
          title={
            auxiliaryState.currentDigit !== undefined
              ? `Digit Buckets (0-9)`
              : "Buckets Distribution"
          }
          currentDigit={auxiliaryState.currentDigit}
          maxDigit={auxiliaryState.maxDigit}
          phase={auxiliaryState.phase}
        />
      ) : null;

    case "count":
      return auxiliaryState.countArray ? (
        <CountArrayView
          countArray={auxiliaryState.countArray}
          outputArray={auxiliaryState.outputArray}
          phase={auxiliaryState.phase}
        />
      ) : null;

    case "heap":
      return auxiliaryState.heap ? (
        <HeapTreeView
          nodes={auxiliaryState.heap.nodes}
          heapSize={auxiliaryState.heap.heapSize}
          phase={auxiliaryState.phase}
        />
      ) : null;

    case "merge":
      return auxiliaryState.mergeData ? (
        <MergeView
          mergeData={auxiliaryState.mergeData}
          phase={auxiliaryState.phase}
        />
      ) : null;

    case "gap":
      return auxiliaryState.gapData ? (
        <GapView
          gapData={auxiliaryState.gapData}
          phase={auxiliaryState.phase}
        />
      ) : null;

    case "partition":
      return auxiliaryState.partitionData ? (
        <PartitionView
          partitionData={auxiliaryState.partitionData}
          phase={auxiliaryState.phase}
        />
      ) : null;

    case "runs":
      return auxiliaryState.runData ? (
        <RunView
          runData={auxiliaryState.runData}
          phase={auxiliaryState.phase}
        />
      ) : null;

    case "mode":
      return auxiliaryState.modeData ? (
        <ModeView
          modeData={auxiliaryState.modeData}
          phase={auxiliaryState.phase}
        />
      ) : null;

    case "voting":
      return auxiliaryState.votingData ? (
        <VotingView
          votingData={auxiliaryState.votingData}
          phase={auxiliaryState.phase}
        />
      ) : null;

    case "string-chars":
      return auxiliaryState.stringChars ? (
        <StringCharacterView stringChars={auxiliaryState.stringChars} />
      ) : null;

    case "frequency":
      return auxiliaryState.frequencyState ? (
        <FrequencyHistogramView frequencyState={auxiliaryState.frequencyState} />
      ) : null;

    case "lps":
      return auxiliaryState.lpsState ? (
        <LPSArrayView lpsState={auxiliaryState.lpsState} />
      ) : null;

    case "hash":
      return auxiliaryState.hashState ? (
        <HashView hashState={auxiliaryState.hashState} />
      ) : null;

    case "dp-table":
      return auxiliaryState.dpTableState ? (
        <DPTableView dpTableState={auxiliaryState.dpTableState} />
      ) : null;

    case "search-range":
      return auxiliaryState.searchRangeData ? (
        <SearchVisualizationView searchData={auxiliaryState.searchRangeData} />
      ) : null;

    case "stack":
      return auxiliaryState.stackData ? (
        <StackView
          stackData={auxiliaryState.stackData}
          phase={auxiliaryState.phase}
        />
      ) : null;

    case "queue":
      return auxiliaryState.queueData ? (
        <QueueView
          queueData={auxiliaryState.queueData}
          phase={auxiliaryState.phase}
        />
      ) : null;

    case "matrix":
      // Matrix visualization - placeholder for now
      return null;

    case "insertion":
      return null;

    default:
      return null;
  }
}


