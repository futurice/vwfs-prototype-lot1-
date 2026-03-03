// ============================================================================
// VWFS Performance Platform - Scorecard Mock Data
// ============================================================================

import type { Scorecard, ScorecardKPI, BrandCode, Department, RAGStatus, Trend } from '../types';

// --- Helper to generate realistic R12 trend data ---
function generateR12(base: number, volatility: number): number[] {
  const data: number[] = [];
  let current = base - volatility * 6;
  for (let i = 0; i < 12; i++) {
    current += (Math.random() - 0.4) * volatility;
    data.push(Math.round(current * 100) / 100);
  }
  return data;
}

function deriveRAG(score: number, target: number): RAGStatus {
  const pct = (score / target) * 100;
  if (pct >= 100) return 'Green';
  if (pct >= 75) return 'Amber';
  return 'Red';
}

function deriveTrend(r12: number[]): Trend {
  if (r12.length < 2) return 'stable';
  const last = r12[r12.length - 1];
  const prev = r12[r12.length - 2];
  if (last > prev * 1.02) return 'up';
  if (last < prev * 0.98) return 'down';
  return 'stable';
}

// --- KPI definitions per department ---
interface KPIDef {
  kpi_code: string;
  kpi_name: string;
  department: Department;
  unit: string;
  targetBase: number;
  resultRange: [number, number];
  weighting: number;
}

const kpiDefinitions: KPIDef[] = [
  // Sales
  { kpi_code: 'SAL-01', kpi_name: 'New Vehicle Sales vs Target', department: 'Sales', unit: '%', targetBase: 100, resultRange: [72, 115], weighting: 20 },
  { kpi_code: 'SAL-02', kpi_name: 'Finance Penetration', department: 'Sales', unit: '%', targetBase: 55, resultRange: [38, 68], weighting: 15 },
  { kpi_code: 'SAL-03', kpi_name: 'Customer Satisfaction Index', department: 'Sales', unit: 'score', targetBase: 85, resultRange: [70, 95], weighting: 10 },
  { kpi_code: 'SAL-04', kpi_name: 'Order Take Rate', department: 'Sales', unit: '%', targetBase: 90, resultRange: [65, 100], weighting: 10 },
  { kpi_code: 'SAL-05', kpi_name: 'Demonstrator Utilisation', department: 'Sales', unit: '%', targetBase: 80, resultRange: [55, 92], weighting: 5 },

  // Service
  { kpi_code: 'SER-01', kpi_name: 'Service Plan Penetration', department: 'Service', unit: '%', targetBase: 45, resultRange: [28, 58], weighting: 15 },
  { kpi_code: 'SER-02', kpi_name: 'Hours Per Job Card', department: 'Service', unit: 'hrs', targetBase: 2.5, resultRange: [1.8, 3.2], weighting: 10 },
  { kpi_code: 'SER-03', kpi_name: 'Service Retention Rate', department: 'Service', unit: '%', targetBase: 70, resultRange: [52, 82], weighting: 15 },
  { kpi_code: 'SER-04', kpi_name: 'Workshop Loading', department: 'Service', unit: '%', targetBase: 85, resultRange: [60, 98], weighting: 10 },
  { kpi_code: 'SER-05', kpi_name: 'Warranty Cost Recovery', department: 'Service', unit: '%', targetBase: 92, resultRange: [78, 100], weighting: 5 },

  // Used
  { kpi_code: 'USE-01', kpi_name: 'Used Vehicle Days in Stock', department: 'Used', unit: 'days', targetBase: 45, resultRange: [30, 75], weighting: 10 },
  { kpi_code: 'USE-02', kpi_name: 'Used Vehicle Margin', department: 'Used', unit: '£', targetBase: 1200, resultRange: [600, 1800], weighting: 10 },
  { kpi_code: 'USE-03', kpi_name: 'Used to New Ratio', department: 'Used', unit: 'ratio', targetBase: 1.5, resultRange: [0.8, 2.2], weighting: 10 },
  { kpi_code: 'USE-04', kpi_name: 'Used Vehicle Volume vs Target', department: 'Used', unit: '%', targetBase: 100, resultRange: [65, 120], weighting: 10 },
  { kpi_code: 'USE-05', kpi_name: 'Approved Used Penetration', department: 'Used', unit: '%', targetBase: 60, resultRange: [35, 78], weighting: 5 },
];

// --- Generate a scorecard for a brand/retailer ---
function generateScorecardKPIs(seed: number): ScorecardKPI[] {
  return kpiDefinitions.map((def, idx) => {
    const pseudoRandom = ((seed * 31 + idx * 17) % 100) / 100;
    const [min, max] = def.resultRange;
    const rawResult = Math.round((min + (max - min) * pseudoRandom) * 100) / 100;

    // For 'days' KPI, lower is better — invert scoring
    let scoreAchieved: number;
    if (def.unit === 'days') {
      scoreAchieved = Math.min(100, Math.round((def.targetBase / rawResult) * 100));
    } else {
      scoreAchieved = Math.min(100, Math.round((rawResult / def.targetBase) * 100));
    }

    const r12 = generateR12(rawResult, (max - min) * 0.08);
    const rank = Math.round(1 + pseudoRandom * 155);
    const benchNational = Math.round(def.targetBase * 0.85 * 100) / 100;
    const benchTop25 = Math.round(def.targetBase * 1.05 * 100) / 100;

    return {
      kpi_id: `kpi-sc-${def.kpi_code}-${seed}`,
      kpi_code: def.kpi_code,
      kpi_name: def.kpi_name,
      department: def.department,
      raw_result: rawResult,
      score_achieved: scoreAchieved,
      target: def.targetBase,
      rag_status: deriveRAG(scoreAchieved, 100),
      trend: deriveTrend(r12),
      r12_trend: r12,
      rank,
      total_ranked: 156,
      benchmark_national: benchNational,
      benchmark_top25: benchTop25,
      weighting: def.weighting,
      unit: def.unit,
    };
  });
}

const brandMeta: { code: BrandCode; retailerId: string; retailerName: string; retailerCode: string; seed: number }[] = [
  { code: 'VWPC', retailerId: 'ret-001', retailerName: 'Volkswagen Milton Keynes', retailerCode: 'RET001', seed: 42 },
  { code: 'VWCV', retailerId: 'ret-011', retailerName: 'Volkswagen Van Centre London', retailerCode: 'RET011', seed: 73 },
  { code: 'AUDI', retailerId: 'ret-031', retailerName: 'Audi Reading', retailerCode: 'RET031', seed: 19 },
  { code: 'SKODA', retailerId: 'ret-024', retailerName: 'SKODA Cheltenham', retailerCode: 'RET024', seed: 55 },
  { code: 'SEAT', retailerId: 'ret-015', retailerName: 'SEAT Maidstone', retailerCode: 'RET015', seed: 88 },
  { code: 'CUPRA', retailerId: 'ret-020', retailerName: 'CUPRA London City', retailerCode: 'RET020', seed: 37 },
];

export const scorecards: Scorecard[] = brandMeta.map((bm, idx) => {
  const kpis = generateScorecardKPIs(bm.seed);
  const totalWeight = kpis.reduce((s, k) => s + k.weighting, 0);
  const overallScore = Math.round(kpis.reduce((s, k) => s + k.score_achieved * k.weighting, 0) / totalWeight);
  const overallRank = Math.round(10 + idx * 22 + ((bm.seed % 10) * 3));

  return {
    id: `sc-${bm.code.toLowerCase()}-001`,
    brand: bm.code,
    period: 'Monthly' as const,
    period_label: 'February 2026',
    retailer_id: bm.retailerId,
    retailer_name: bm.retailerName,
    retailer_code: bm.retailerCode,
    department: 'Overall' as Department,
    kpi_results: kpis,
    overall_score: overallScore,
    overall_rank: overallRank,
    total_retailers: 156,
    rank_movement: [-3, 5, -1, 8, 2, -4][idx],
    benchmark_national: 72,
    benchmark_top25: 88,
    is_most_improved: idx === 3,
    published: idx < 4,
    published_date: idx < 4 ? '2026-02-28T10:00:00Z' : undefined,
  };
});

// --- Brand summary data for the list page ---
export interface BrandSummary {
  code: BrandCode;
  name: string;
  overallScore: number;
  rank: number;
  totalRetailers: number;
  kpisBelowTarget: number;
  greenCount: number;
  amberCount: number;
  redCount: number;
}

export const brandSummaries: BrandSummary[] = [
  { code: 'VWPC', name: 'Volkswagen Passenger Cars', overallScore: 78, rank: 23, totalRetailers: 156, kpisBelowTarget: 3, greenCount: 9, amberCount: 4, redCount: 2 },
  { code: 'VWCV', name: 'Volkswagen Commercial Vehicles', overallScore: 82, rank: 12, totalRetailers: 48, kpisBelowTarget: 2, greenCount: 10, amberCount: 3, redCount: 2 },
  { code: 'AUDI', name: 'Audi', overallScore: 85, rank: 8, totalRetailers: 120, kpisBelowTarget: 1, greenCount: 11, amberCount: 3, redCount: 1 },
  { code: 'SKODA', name: 'Skoda', overallScore: 71, rank: 45, totalRetailers: 98, kpisBelowTarget: 5, greenCount: 7, amberCount: 5, redCount: 3 },
  { code: 'SEAT', name: 'SEAT', overallScore: 76, rank: 34, totalRetailers: 72, kpisBelowTarget: 3, greenCount: 8, amberCount: 4, redCount: 3 },
  { code: 'CUPRA', name: 'CUPRA', overallScore: 88, rank: 5, totalRetailers: 40, kpisBelowTarget: 1, greenCount: 12, amberCount: 2, redCount: 1 },
];
