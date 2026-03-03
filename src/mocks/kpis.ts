// ============================================================================
// VWFS Performance Platform - KPI Mock Data
// ============================================================================

import type { KPI, KPIHistoryPoint, BrandCode, Department, RAGStatus, Trend } from '../types';

// --- KPI definitions across categories ---

interface KPIDef {
  code: string;
  name: string;
  category: string;
  department: Department;
  unit: string;
  format: 'percentage' | 'currency' | 'number' | 'ratio';
  targetBase: number;
  range: [number, number];
  redBelow: number;
  amberBelow: number;
  greenAbove: number;
  description: string;
  dataSource: string;
}

const kpiDefinitions: KPIDef[] = [
  // --- Sales ---
  { code: 'SAL-01', name: 'Finance Penetration Rate', category: 'Sales', department: 'Sales', unit: '%', format: 'percentage', targetBase: 55, range: [35, 72], redBelow: 40, amberBelow: 50, greenAbove: 55, description: 'Percentage of new vehicle sales with finance agreements', dataSource: 'DMS / Finance System' },
  { code: 'SAL-02', name: 'New Vehicle Sales vs Target', category: 'Sales', department: 'Sales', unit: '%', format: 'percentage', targetBase: 100, range: [65, 125], redBelow: 75, amberBelow: 90, greenAbove: 100, description: 'New vehicle retail and fleet registrations against monthly target', dataSource: 'DVLA Registrations' },
  { code: 'SAL-03', name: 'Order Take Rate', category: 'Sales', department: 'Sales', unit: '%', format: 'percentage', targetBase: 90, range: [60, 105], redBelow: 70, amberBelow: 82, greenAbove: 90, description: 'Percentage of enquiries converted to confirmed orders', dataSource: 'DMS / Lead Management' },
  { code: 'SAL-04', name: 'Demonstrator Utilisation', category: 'Sales', department: 'Sales', unit: '%', format: 'percentage', targetBase: 80, range: [50, 95], redBelow: 55, amberBelow: 70, greenAbove: 80, description: 'Percentage of demo fleet actively utilised for test drives', dataSource: 'Demo Fleet System' },
  { code: 'SAL-05', name: 'Lost Sales Rate', category: 'Sales', department: 'Sales', unit: '%', format: 'percentage', targetBase: 15, range: [8, 30], redBelow: 25, amberBelow: 20, greenAbove: 15, description: 'Percentage of qualified leads lost to competitor brands', dataSource: 'Lead Management' },
  { code: 'SAL-06', name: 'Fleet Penetration Rate', category: 'Sales', department: 'Sales', unit: '%', format: 'percentage', targetBase: 30, range: [15, 45], redBelow: 18, amberBelow: 25, greenAbove: 30, description: 'Fleet sales as percentage of total volume', dataSource: 'DMS' },

  // --- Service ---
  { code: 'SER-01', name: 'Service Plan Attachment Rate', category: 'Service', department: 'Service', unit: '%', format: 'percentage', targetBase: 45, range: [22, 62], redBelow: 28, amberBelow: 38, greenAbove: 45, description: 'Percentage of new vehicle sales with service plan attached', dataSource: 'Warranty & Service System' },
  { code: 'SER-02', name: 'Customer Satisfaction Index', category: 'Service', department: 'Service', unit: 'score', format: 'number', targetBase: 85, range: [65, 98], redBelow: 70, amberBelow: 80, greenAbove: 85, description: 'Composite customer satisfaction score from post-service surveys', dataSource: 'Survey Platform' },
  { code: 'SER-03', name: 'Warranty Retention Rate', category: 'Service', department: 'Service', unit: '%', format: 'percentage', targetBase: 70, range: [48, 85], redBelow: 52, amberBelow: 62, greenAbove: 70, description: 'Percentage of vehicles returning to franchise for post-warranty service', dataSource: 'Service Booking System' },
  { code: 'SER-04', name: 'Hours Per Job Card', category: 'Service', department: 'Service', unit: 'hrs', format: 'number', targetBase: 2.5, range: [1.6, 3.4], redBelow: 1.8, amberBelow: 2.1, greenAbove: 2.5, description: 'Average labour hours billed per service visit', dataSource: 'Workshop System' },
  { code: 'SER-05', name: 'Workshop Loading', category: 'Service', department: 'Service', unit: '%', format: 'percentage', targetBase: 85, range: [55, 100], redBelow: 60, amberBelow: 75, greenAbove: 85, description: 'Percentage of available workshop capacity utilised', dataSource: 'Workshop Planner' },
  { code: 'SER-06', name: 'Service Recall Completion Rate', category: 'Service', department: 'Service', unit: '%', format: 'percentage', targetBase: 92, range: [70, 100], redBelow: 75, amberBelow: 85, greenAbove: 92, description: 'Percentage of outstanding recalls completed within target timeframe', dataSource: 'Recall Management' },

  // --- Finance ---
  { code: 'FIN-01', name: 'F&I Income per Unit', category: 'Finance', department: 'Sales', unit: '\u00A3', format: 'currency', targetBase: 850, range: [400, 1400], redBelow: 500, amberBelow: 700, greenAbove: 850, description: 'Average finance and insurance income per vehicle sold', dataSource: 'Finance System' },
  { code: 'FIN-02', name: 'Insurance Penetration', category: 'Finance', department: 'Sales', unit: '%', format: 'percentage', targetBase: 40, range: [18, 58], redBelow: 22, amberBelow: 32, greenAbove: 40, description: 'Percentage of new sales with insurance product attached', dataSource: 'Insurance Provider' },
  { code: 'FIN-03', name: 'GAP Penetration', category: 'Finance', department: 'Sales', unit: '%', format: 'percentage', targetBase: 35, range: [12, 52], redBelow: 18, amberBelow: 28, greenAbove: 35, description: 'Percentage of finance deals with GAP insurance attached', dataSource: 'Finance System' },
  { code: 'FIN-04', name: 'PCP Penetration', category: 'Finance', department: 'Sales', unit: '%', format: 'percentage', targetBase: 65, range: [40, 82], redBelow: 45, amberBelow: 55, greenAbove: 65, description: 'Percentage of financed sales on PCP agreements', dataSource: 'Finance System' },

  // --- Used ---
  { code: 'USE-01', name: 'Used Car Margin', category: 'Used', department: 'Used', unit: '\u00A3', format: 'currency', targetBase: 1200, range: [500, 2000], redBelow: 650, amberBelow: 950, greenAbove: 1200, description: 'Average gross margin per used vehicle sold', dataSource: 'DMS' },
  { code: 'USE-02', name: 'Used Vehicle Days in Stock', category: 'Used', department: 'Used', unit: 'days', format: 'number', targetBase: 45, range: [25, 80], redBelow: 65, amberBelow: 52, greenAbove: 45, description: 'Average number of days used vehicles remain in stock before sale', dataSource: 'Stock Management' },
  { code: 'USE-03', name: 'Used Car Volume', category: 'Used', department: 'Used', unit: 'units', format: 'number', targetBase: 55, range: [25, 90], redBelow: 30, amberBelow: 42, greenAbove: 55, description: 'Total used vehicle sales volume per month', dataSource: 'DMS' },
  { code: 'USE-04', name: 'Used to New Ratio', category: 'Used', department: 'Used', unit: 'ratio', format: 'ratio', targetBase: 1.5, range: [0.7, 2.5], redBelow: 0.9, amberBelow: 1.2, greenAbove: 1.5, description: 'Ratio of used vehicle sales to new vehicle sales', dataSource: 'DMS' },
  { code: 'USE-05', name: 'Approved Used Penetration', category: 'Used', department: 'Used', unit: '%', format: 'percentage', targetBase: 60, range: [30, 82], redBelow: 35, amberBelow: 48, greenAbove: 60, description: 'Percentage of used stock sold as manufacturer approved used', dataSource: 'Approved Used System' },
];

// --- Brands to generate KPIs for ---

const brands: BrandCode[] = ['VWPC', 'VWCV', 'SEAT', 'SKODA', 'AUDI'];

// --- Deterministic pseudo-random helper ---
function seeded(seed: number): number {
  const x = Math.sin(seed * 12907 + 49297) * 49297;
  return x - Math.floor(x);
}

function deriveRAG(value: number, def: KPIDef): RAGStatus {
  // For "days in stock", lower is better
  if (def.code === 'USE-02' || def.code === 'SAL-05') {
    if (value <= def.greenAbove) return 'Green';
    if (value <= def.amberBelow) return 'Amber';
    return 'Red';
  }
  if (value >= def.greenAbove) return 'Green';
  if (value >= def.amberBelow) return 'Amber';
  return 'Red';
}

function deriveTrend(history: KPIHistoryPoint[]): Trend {
  if (history.length < 2) return 'stable';
  const last = history[history.length - 1].value;
  const prev = history[history.length - 2].value;
  if (last > prev * 1.015) return 'up';
  if (last < prev * 0.985) return 'down';
  return 'stable';
}

function generateHistory(base: number, target: number, seed: number, range: [number, number]): KPIHistoryPoint[] {
  const months = [
    '2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09',
    '2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03',
  ];
  const volatility = (range[1] - range[0]) * 0.06;
  let current = base - volatility * 3;

  return months.map((month, i) => {
    current += (seeded(seed * 100 + i) - 0.45) * volatility;
    current = Math.max(range[0], Math.min(range[1], current));
    return {
      month,
      value: Math.round(current * 100) / 100,
      target,
    };
  });
}

// --- Generate KPIs ---

function generateKPIs(): KPI[] {
  const result: KPI[] = [];
  let counter = 0;

  for (const brand of brands) {
    for (const def of kpiDefinitions) {
      counter++;
      const seed = counter * 7 + brand.charCodeAt(0);
      const sr = seeded(seed);
      const currentValue = Math.round((def.range[0] + (def.range[1] - def.range[0]) * sr) * 100) / 100;
      const previousValue = Math.round((currentValue + (seeded(seed + 1) - 0.5) * (def.range[1] - def.range[0]) * 0.1) * 100) / 100;
      const history = generateHistory(currentValue, def.targetBase, seed, def.range);
      const ragStatus = deriveRAG(currentValue, def);
      const totalRanked = brand === 'VWPC' ? 156 : brand === 'AUDI' ? 120 : brand === 'SKODA' ? 98 : brand === 'VWCV' ? 48 : 72;

      result.push({
        id: `kpi-${def.code}-${brand.toLowerCase()}`,
        kpi_code: def.code,
        kpi_name: def.name,
        brand,
        category: def.category,
        department: def.department,
        current_value: currentValue,
        target_value: def.targetBase,
        previous_value: previousValue,
        rag_status: ragStatus,
        trend: deriveTrend(history),
        unit: def.unit,
        format: def.format,
        history,
        benchmark_national: Math.round(def.targetBase * 0.88 * 100) / 100,
        benchmark_top25: Math.round(def.targetBase * 1.08 * 100) / 100,
        rank: Math.round(1 + sr * (totalRanked - 1)),
        total_ranked: totalRanked,
        rag_thresholds: {
          red_below: def.redBelow,
          amber_below: def.amberBelow,
          green_above: def.greenAbove,
        },
        description: def.description,
        data_source: def.dataSource,
      });
    }
  }

  return result;
}

export const kpis: KPI[] = generateKPIs();
