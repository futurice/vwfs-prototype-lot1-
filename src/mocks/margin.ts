// ============================================================================
// VWFS Performance Platform - Margin Tool Mock Data
// ============================================================================

import type {
  MarginRecord,
  GatewayCondition,
  MarginKPIResult,
  BonusCalculation,
  BrandCode,
  RAGStatus,
} from '../types';

// --- Reference data ---

const retailerRef = [
  { id: 'ret-001', name: 'Volkswagen Milton Keynes', code: 'RET001', brand: 'VWPC' as BrandCode },
  { id: 'ret-002', name: 'Volkswagen Watford', code: 'RET002', brand: 'VWPC' as BrandCode },
  { id: 'ret-003', name: 'Volkswagen Leeds', code: 'RET003', brand: 'VWPC' as BrandCode },
  { id: 'ret-004', name: 'Volkswagen Birmingham', code: 'RET004', brand: 'VWPC' as BrandCode },
  { id: 'ret-006', name: 'Volkswagen Manchester', code: 'RET006', brand: 'VWPC' as BrandCode },
  { id: 'ret-009', name: 'Volkswagen Edinburgh', code: 'RET009', brand: 'VWPC' as BrandCode },
  { id: 'ret-011', name: 'VW Van Centre London', code: 'RET011', brand: 'VWCV' as BrandCode },
  { id: 'ret-013', name: 'VW Van Centre Nottingham', code: 'RET013', brand: 'VWCV' as BrandCode },
  { id: 'ret-015', name: 'SEAT Maidstone', code: 'RET015', brand: 'SEAT' as BrandCode },
  { id: 'ret-017', name: 'SEAT Coventry', code: 'RET017', brand: 'SEAT' as BrandCode },
  { id: 'ret-020', name: 'CUPRA London City', code: 'RET020', brand: 'CUPRA' as BrandCode },
  { id: 'ret-021', name: 'CUPRA Manchester', code: 'RET021', brand: 'CUPRA' as BrandCode },
  { id: 'ret-024', name: 'SKODA Cheltenham', code: 'RET024', brand: 'SKODA' as BrandCode },
  { id: 'ret-025', name: 'SKODA Sheffield', code: 'RET025', brand: 'SKODA' as BrandCode },
  { id: 'ret-027', name: 'SKODA Newcastle', code: 'RET027', brand: 'SKODA' as BrandCode },
  { id: 'ret-031', name: 'Audi Reading', code: 'RET031', brand: 'AUDI' as BrandCode },
  { id: 'ret-032', name: 'Audi West London', code: 'RET032', brand: 'AUDI' as BrandCode },
  { id: 'ret-033', name: 'Audi Liverpool', code: 'RET033', brand: 'AUDI' as BrandCode },
  { id: 'ret-034', name: 'Audi Solihull', code: 'RET034', brand: 'AUDI' as BrandCode },
  { id: 'ret-037', name: 'Audi York', code: 'RET037', brand: 'AUDI' as BrandCode },
  { id: 'ret-039', name: 'Volkswagen Plymouth', code: 'RET039', brand: 'VWPC' as BrandCode },
  { id: 'ret-040', name: 'Volkswagen Stockport', code: 'RET040', brand: 'VWPC' as BrandCode },
  { id: 'ret-049', name: 'Volkswagen Croydon', code: 'RET049', brand: 'VWPC' as BrandCode },
  { id: 'ret-028', name: 'SKODA Leicester', code: 'RET028', brand: 'SKODA' as BrandCode },
  { id: 'ret-048', name: 'CUPRA Leeds', code: 'RET048', brand: 'CUPRA' as BrandCode },
  { id: 'ret-042', name: 'SKODA Oxford', code: 'RET042', brand: 'SKODA' as BrandCode },
  { id: 'ret-005', name: 'Volkswagen Bristol', code: 'RET005', brand: 'VWPC' as BrandCode },
  { id: 'ret-010', name: 'Volkswagen Cardiff', code: 'RET010', brand: 'VWPC' as BrandCode },
  { id: 'ret-035', name: 'Audi Brighton', code: 'RET035', brand: 'AUDI' as BrandCode },
  { id: 'ret-016', name: 'SEAT Bolton', code: 'RET016', brand: 'SEAT' as BrandCode },
  { id: 'ret-019', name: 'SEAT Southampton', code: 'RET019', brand: 'SEAT' as BrandCode },
  { id: 'ret-026', name: 'SKODA Exeter', code: 'RET026', brand: 'SKODA' as BrandCode },
  { id: 'ret-036', name: 'Audi Aberdeen', code: 'RET036', brand: 'AUDI' as BrandCode },
];

// --- Gateway condition templates ---

interface GatewayTemplate {
  name: string;
  description: string;
  target: string;
  category: string;
}

const gatewayTemplates: GatewayTemplate[] = [
  { name: 'Finance Penetration', description: 'Finance penetration rate must exceed minimum threshold', target: '> 50%', category: 'Finance' },
  { name: 'CSI Score', description: 'Customer Satisfaction Index must meet minimum standard', target: '> 80', category: 'Customer' },
  { name: 'Training Compliance', description: 'All mandatory manufacturer training must be completed', target: '100%', category: 'Training' },
  { name: 'Audit Compliance', description: 'Standards audit score must meet minimum threshold', target: '> 85%', category: 'Standards' },
  { name: 'Service Plan Attachment', description: 'Service plan attachment rate at point of sale', target: '> 40%', category: 'Service' },
  { name: 'Stock Turn Rate', description: 'Used vehicle average days in stock below threshold', target: '< 50 days', category: 'Used' },
  { name: 'Digital Compliance', description: 'Website and digital standards compliance score', target: '> 90%', category: 'Standards' },
  { name: 'DMS Data Quality', description: 'Data quality score for DMS records and customer data', target: '> 95%', category: 'Data' },
];

// --- KPI result templates ---

interface KPIResultTemplate {
  name: string;
  target: number;
  unit: string;
  range: [number, number];
}

const kpiResultTemplates: KPIResultTemplate[] = [
  { name: 'New Vehicle Volume', target: 100, unit: '%', range: [65, 120] },
  { name: 'Finance Penetration', target: 55, unit: '%', range: [35, 72] },
  { name: 'F&I Income per Unit', target: 850, unit: '\u00A3', range: [400, 1300] },
  { name: 'Service Retention', target: 70, unit: '%', range: [48, 85] },
  { name: 'Used Vehicle Margin', target: 1200, unit: '\u00A3', range: [500, 1800] },
  { name: 'CSI Score', target: 85, unit: 'score', range: [68, 96] },
  { name: 'Insurance Penetration', target: 40, unit: '%', range: [18, 55] },
  { name: 'Approved Used Percentage', target: 60, unit: '%', range: [30, 78] },
];

// --- Deterministic pseudo-random ---
function seeded(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function deriveRAG(actual: number, target: number): RAGStatus {
  const pct = (actual / target) * 100;
  if (pct >= 100) return 'Green';
  if (pct >= 75) return 'Amber';
  return 'Red';
}

// --- Generate margin records ---

function generateMarginRecords(): MarginRecord[] {
  const result: MarginRecord[] = [];
  const periods = ['Q3 2025', 'Q4 2025', 'Q1 2026'];

  for (let i = 0; i < 33; i++) {
    const retailer = retailerRef[i % retailerRef.length];
    const period = periods[i % periods.length];
    const seed = i * 13 + 7;

    // Generate 5-6 gateway conditions
    const conditionCount = 5 + (i % 2);
    const conditions: GatewayCondition[] = [];
    let passedCount = 0;

    for (let c = 0; c < conditionCount; c++) {
      const template = gatewayTemplates[c % gatewayTemplates.length];
      const sr = seeded(seed + c * 11);
      const passed = sr > 0.35; // ~65% pass rate
      if (passed) passedCount++;

      const actuals: Record<string, string[]> = {
        'Finance': ['52%', '48%', '55%', '61%', '44%', '38%'],
        'Customer': ['82', '78', '86', '91', '74', '69'],
        'Training': ['100%', '95%', '100%', '88%', '100%', '92%'],
        'Standards': ['88%', '82%', '91%', '79%', '94%', '76%'],
        'Service': ['43%', '38%', '47%', '52%', '34%', '29%'],
        'Used': ['42 days', '55 days', '38 days', '61 days', '47 days', '33 days'],
        'Data': ['97%', '93%', '96%', '89%', '98%', '91%'],
      };

      const categoryActuals = actuals[template.category] || ['85%'];

      conditions.push({
        id: `gw-${i}-${c}`,
        condition_name: template.name,
        description: template.description,
        target: template.target,
        actual: categoryActuals[(i + c) % categoryActuals.length],
        passed,
        weighting: Math.round(100 / conditionCount),
        category: template.category,
      });
    }

    // Determine gateway status
    const gatewayStatus: MarginRecord['gateway_status'] =
      passedCount === conditionCount ? 'Pass' : passedCount >= conditionCount - 1 ? 'Partial' : 'Fail';

    // Generate KPI results
    const kpiResults: MarginKPIResult[] = kpiResultTemplates.map((tmpl, ki) => {
      const sr = seeded(seed + ki * 7 + 100);
      const actual = Math.round((tmpl.range[0] + (tmpl.range[1] - tmpl.range[0]) * sr) * 100) / 100;
      const achievement = Math.round((actual / tmpl.target) * 100);

      return {
        kpi_id: `mkpi-${i}-${ki}`,
        kpi_name: tmpl.name,
        target: tmpl.target,
        actual,
        achievement_percentage: achievement,
        rag_status: deriveRAG(actual, tmpl.target),
        unit: tmpl.unit,
      };
    });

    // Generate bonus calculation
    const qualificationStatus: BonusCalculation['qualification_status'] =
      gatewayStatus === 'Pass' ? 'Qualified' : gatewayStatus === 'Partial' ? 'Partially Qualified' : 'Not Qualified';

    const bonusPercentage =
      qualificationStatus === 'Qualified' ? 100
        : qualificationStatus === 'Partially Qualified' ? 50 + Math.round(seeded(seed + 200) * 30)
          : 0;

    const maxBonus = 3000 + Math.round(seeded(seed + 300) * 12000);
    const fullYearBonus = Math.round(maxBonus * (bonusPercentage / 100));
    const monthlyAccrual = Math.round(fullYearBonus / 12);
    const ytdPaid = Math.round(monthlyAccrual * (3 + (i % 6)));
    const ytdAccrued = Math.round(monthlyAccrual * (4 + (i % 5)));

    const bonusCalculation: BonusCalculation = {
      qualification_status: qualificationStatus,
      bonus_percentage: bonusPercentage,
      max_bonus_percentage: 100,
      full_year_bonus: fullYearBonus,
      monthly_accrual: monthlyAccrual,
      ytd_paid: ytdPaid,
      ytd_accrued: ytdAccrued,
      variance: ytdAccrued - ytdPaid,
    };

    const hasAppeal = gatewayStatus === 'Fail' && i % 4 === 0;
    const hasOverride = gatewayStatus === 'Partial' && i % 5 === 0;

    result.push({
      id: `mar-${String(i + 1).padStart(3, '0')}`,
      retailer_id: retailer.id,
      retailer_name: retailer.name,
      retailer_code: retailer.code,
      brand: retailer.brand,
      period,
      gateway_conditions: conditions,
      gateway_passed: passedCount,
      gateway_total: conditionCount,
      gateway_status: gatewayStatus,
      kpi_results: kpiResults,
      bonus_calculation: bonusCalculation,
      appeal_submitted: hasAppeal,
      appeal_status: hasAppeal ? (['Pending', 'Approved', 'Rejected'] as const)[(i / 4) % 3] : undefined,
      override_applied: hasOverride,
      override_by: hasOverride ? 'usr-005' : undefined,
      override_reason: hasOverride ? 'Gateway condition missed by marginal amount. Retailer demonstrated improvement trajectory and mitigating circumstances.' : undefined,
      notes: i % 3 === 0 ? `Retailer reviewed at Q${1 + (i % 4)} performance meeting. ${gatewayStatus === 'Pass' ? 'All gateways met.' : 'Improvement plan in place for failing gateways.'}` : undefined,
    });
  }

  return result;
}

export const marginRecords: MarginRecord[] = generateMarginRecords();
