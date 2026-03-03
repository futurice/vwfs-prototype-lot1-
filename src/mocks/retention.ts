// ============================================================================
// VWFS Performance Platform - Retention Portal Mock Data
// ============================================================================

import type {
  RetentionSummary,
  Renewal,
  Appeal,
  BrandCode,
  FuelType,
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
  { id: 'ret-024', name: 'SKODA Cheltenham', code: 'RET024', brand: 'SKODA' as BrandCode },
  { id: 'ret-025', name: 'SKODA Sheffield', code: 'RET025', brand: 'SKODA' as BrandCode },
  { id: 'ret-027', name: 'SKODA Newcastle', code: 'RET027', brand: 'SKODA' as BrandCode },
  { id: 'ret-028', name: 'SKODA Leicester', code: 'RET028', brand: 'SKODA' as BrandCode },
  { id: 'ret-031', name: 'Audi Reading', code: 'RET031', brand: 'AUDI' as BrandCode },
  { id: 'ret-032', name: 'Audi West London', code: 'RET032', brand: 'AUDI' as BrandCode },
  { id: 'ret-033', name: 'Audi Liverpool', code: 'RET033', brand: 'AUDI' as BrandCode },
  { id: 'ret-034', name: 'Audi Solihull', code: 'RET034', brand: 'AUDI' as BrandCode },
  { id: 'ret-037', name: 'Audi York', code: 'RET037', brand: 'AUDI' as BrandCode },
  { id: 'ret-039', name: 'Volkswagen Plymouth', code: 'RET039', brand: 'VWPC' as BrandCode },
  { id: 'ret-040', name: 'Volkswagen Stockport', code: 'RET040', brand: 'VWPC' as BrandCode },
  { id: 'ret-049', name: 'Volkswagen Croydon', code: 'RET049', brand: 'VWPC' as BrandCode },
  { id: 'ret-048', name: 'CUPRA Leeds', code: 'RET048', brand: 'CUPRA' as BrandCode },
  { id: 'ret-021', name: 'CUPRA Manchester', code: 'RET021', brand: 'CUPRA' as BrandCode },
  { id: 'ret-005', name: 'Volkswagen Bristol', code: 'RET005', brand: 'VWPC' as BrandCode },
  { id: 'ret-016', name: 'SEAT Bolton', code: 'RET016', brand: 'SEAT' as BrandCode },
  { id: 'ret-035', name: 'Audi Brighton', code: 'RET035', brand: 'AUDI' as BrandCode },
  { id: 'ret-042', name: 'SKODA Oxford', code: 'RET042', brand: 'SKODA' as BrandCode },
  { id: 'ret-010', name: 'Volkswagen Cardiff', code: 'RET010', brand: 'VWPC' as BrandCode },
  { id: 'ret-019', name: 'SEAT Southampton', code: 'RET019', brand: 'SEAT' as BrandCode },
  { id: 'ret-026', name: 'SKODA Exeter', code: 'RET026', brand: 'SKODA' as BrandCode },
];

const modelsByBrand: Record<string, string[]> = {
  VWPC: ['Golf', 'Polo', 'Tiguan', 'T-Roc', 'ID.3', 'ID.4', 'Passat', 'T-Cross', 'ID.7', 'Arteon'],
  VWCV: ['Transporter', 'Caddy', 'Crafter', 'Amarok', 'ID. Buzz', 'California'],
  SEAT: ['Leon', 'Ibiza', 'Arona', 'Ateca', 'Tarraco'],
  CUPRA: ['Born', 'Formentor', 'Leon', 'Ateca', 'Tavascan'],
  SKODA: ['Octavia', 'Fabia', 'Kamiq', 'Karoq', 'Kodiaq', 'Enyaq', 'Superb'],
  AUDI: ['A3', 'A4', 'Q3', 'Q5', 'Q7', 'e-tron', 'Q4 e-tron', 'A1'],
};

const customerNames = [
  'James Thornton', 'Sarah Whitfield', 'David Murray', 'Claire Henderson',
  'Robert Ashton', 'Emma Fitzgerald', 'Paul McKenzie', 'Laura Chambers',
  'Andrew Barrett', 'Helen Sinclair', 'Mark Gallagher', 'Kate Donovan',
  'Michael O\'Neill', 'Jennifer Walsh', 'Steven Hughes', 'Rebecca Lane',
  'Thomas Carter', 'Alison Hayward', 'Christopher Blake', 'Natalie Marsh',
  'Daniel Cooper', 'Victoria Scott', 'Jonathan Reid', 'Samantha Fox',
  'William Preston', 'Caroline Adams', 'George Maxwell', 'Louise Hardy',
  'Patrick Shaw', 'Amanda Burke', 'Simon Harding', 'Rachel Pearce',
  'Brian Doyle', 'Michelle Conway', 'Keith Lawson', 'Joanne Nicholls',
  'Gary Brennan', 'Tracy Farrell', 'Ian Crawford', 'Maria Thompson',
  'Tony Griffiths', 'Susan Barker', 'Philip Jennings', 'Diane Mortimer',
  'Colin Hargreaves', 'Angela Dunn', 'Stuart Dixon', 'Wendy Pearson',
  'Neil Andrews', 'Sandra Lewis', 'Matthew Wood', 'Linda Foster',
];

const financeProducts = ['PCP', 'HP', 'PCH', 'Solutions PCP', 'Business Contract Hire'];
const fuelTypes: FuelType[] = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'PHEV'];

// --- Deterministic pseudo-random ---
function seeded(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

// --- Generate Retention Summaries ---

function generateRetentionSummaries(): RetentionSummary[] {
  const result: RetentionSummary[] = [];

  for (let i = 0; i < 32; i++) {
    const retailer = retailerRef[i % retailerRef.length];
    const seed = i * 17 + 3;
    const sr = seeded(seed);
    const renewalPct = Math.round((60 + sr * 30) * 10) / 10; // 60-90%
    const targetPct = 75;
    const totalRanked = retailer.brand === 'VWPC' ? 156 : retailer.brand === 'AUDI' ? 120 : retailer.brand === 'SKODA' ? 98 : retailer.brand === 'VWCV' ? 48 : 72;
    const endedVolume = 15 + Math.round(seeded(seed + 1) * 40);
    const renewalVolume = Math.round(endedVolume * (renewalPct / 100));
    const newRenewals = Math.round(renewalVolume * (0.5 + seeded(seed + 2) * 0.3));
    const usedRenewals = renewalVolume - newRenewals;

    // Generate 6-month trend
    const trend6m: number[] = [];
    let trendBase = renewalPct - 5;
    for (let m = 0; m < 6; m++) {
      trendBase += (seeded(seed + m * 10) - 0.4) * 4;
      trend6m.push(Math.round(Math.max(50, Math.min(95, trendBase)) * 10) / 10);
    }

    result.push({
      id: `ret-sum-${String(i + 1).padStart(3, '0')}`,
      retailer_id: retailer.id,
      retailer_name: retailer.name,
      retailer_code: retailer.code,
      brand: retailer.brand,
      period: 'February 2026',
      percentage_renewed: renewalPct,
      rank: Math.round(1 + sr * (totalRanked - 1)),
      total_ranked: totalRanked,
      trend_6month: trend6m,
      gap_to_target: Math.round((renewalPct - targetPct) * 10) / 10,
      target_percentage: targetPct,
      new_renewals: newRenewals,
      used_renewals: usedRenewals,
      total_renewals: renewalVolume,
      ended_volume: endedVolume,
      renewal_volume: renewalVolume,
      finance_product: financeProducts[i % financeProducts.length],
    });
  }

  return result;
}

// --- Generate Renewals ---

function generateRenewals(): Renewal[] {
  const result: Renewal[] = [];
  const renewalStatuses: Renewal['status'][] = ['Renewed', 'Lost', 'Pending', 'In Negotiation'];

  for (let i = 0; i < 55; i++) {
    const retailer = retailerRef[i % retailerRef.length];
    const seed = i * 23 + 11;
    const sr = seeded(seed);
    const brandModels = modelsByBrand[retailer.brand] || modelsByBrand.VWPC;
    const originalModel = brandModels[i % brandModels.length];
    const renewalModel = brandModels[(i + 1) % brandModels.length];
    const status = renewalStatuses[i % renewalStatuses.length];
    const fuelType = fuelTypes[i % fuelTypes.length];
    const isNew = sr > 0.4;

    const regLetters = ['AB', 'CD', 'EF', 'GH', 'KL', 'MN', 'PQ', 'RS', 'TW', 'VX'];
    const regSuffix = ['ABC', 'DEF', 'GHJ', 'KLM', 'NPR', 'STU', 'WXY', 'BCD'];

    result.push({
      id: `ren-${String(i + 1).padStart(3, '0')}`,
      retailer_id: retailer.id,
      retailer_name: retailer.name,
      brand: retailer.brand,
      period: 'February 2026',
      customer_name: customerNames[i % customerNames.length],
      original_model: originalModel,
      renewal_model: status === 'Renewed' || status === 'In Negotiation' ? renewalModel : originalModel,
      original_registration: `${regLetters[i % regLetters.length]}22 ${regSuffix[i % regSuffix.length]}`,
      renewal_registration: status === 'Renewed' ? `${regLetters[(i + 3) % regLetters.length]}26 ${regSuffix[(i + 2) % regSuffix.length]}` : undefined,
      finance_product: financeProducts[i % financeProducts.length],
      fuel_type: fuelType,
      new_or_used: isNew ? 'New' : 'Used',
      renewal_date: status === 'Renewed' ? `2026-02-${String(1 + (i % 25)).padStart(2, '0')}T00:00:00Z` : undefined,
      contract_end_date: `2026-${String(2 + (i % 4)).padStart(2, '0')}-${String(5 + (i * 3) % 22).padStart(2, '0')}`,
      status,
      monthly_payment: status !== 'Lost' ? Math.round(180 + sr * 450) : undefined,
      term_months: status !== 'Lost' ? [24, 36, 42, 48][(i) % 4] : undefined,
    });
  }

  return result;
}

// --- Generate Appeals ---

function generateAppeals(): Appeal[] {
  const result: Appeal[] = [];
  const appealStatuses: Appeal['status'][] = ['Pending', 'Approved', 'Rejected', 'Under Review', 'Pending', 'Approved', 'Rejected', 'Pending', 'Under Review', 'Rejected', 'Approved', 'Pending', 'Rejected', 'Approved', 'Pending', 'Under Review'];
  const submitterRef = [
    { id: 'usr-001', name: 'Sarah Mitchell' },
    { id: 'usr-002', name: 'James Harper' },
    { id: 'usr-009', name: 'Hannah Roberts' },
    { id: 'usr-012', name: 'Chris Davies' },
    { id: 'usr-015', name: 'Karen Stewart' },
    { id: 'usr-016', name: 'Robert Blackwell' },
  ];

  const appealReasons = [
    'Customer relocated outside of retailer territory during contract period. Should not count as a lost renewal.',
    'Vehicle was written off in an accident. Customer has placed a new order but delivery is delayed due to factory lead times.',
    'Customer renewed through a different franchise within our dealer group. This should be counted as a group retention.',
    'Finance agreement was restructured mid-term at customer request. The renewal shows as lost but the customer has committed to a new agreement.',
    'Customer moved to a company car scheme but has confirmed they will return to personal finance at the next opportunity.',
    'The contract end date in the system is incorrect. Actual end date is 3 months later and the customer has confirmed intent to renew.',
    'Customer has placed an order for a factory-build vehicle. The renewal cannot be completed until the vehicle arrives in approximately 8 weeks.',
    'Fleet customer renewed through their leasing company directly. Retailer was not given the opportunity to handle the renewal.',
    'Customer passed away during the contract term. We request this is excluded from renewal calculations.',
    'Customer downgraded to a used vehicle from another franchise due to financial circumstances. We are maintaining the service relationship.',
    'Vehicle delivery was delayed by the manufacturer. Customer has a confirmed order but it could not be fulfilled before contract end.',
    'Customer emigrated overseas during the contract. Renewal was not possible.',
    'The customer renewed with a cash purchase, which is not being captured in the finance renewal data.',
    'Customer was incorrectly attributed to our retailer code. They are serviced by a different site in our group.',
    'Customer elected to extend their current agreement by 6 months. This should count as a retained customer.',
    'Insurance write-off settlement delayed the renewal process. Customer has confirmed a new order.',
  ];

  const decisionNotes = [
    'Appeal upheld. Renewal reclassified and excluded from retailer calculations.',
    'Insufficient evidence provided. The renewal is correctly recorded as lost.',
    'Partially upheld. The renewal will be excluded but noted for future reporting adjustments.',
    'Appeal rejected. Group retention policy does not apply in this circumstance.',
    'Appeal approved. Factory delay confirmation verified against manufacturer records.',
  ];

  for (let i = 0; i < 16; i++) {
    const retailer = retailerRef[i % retailerRef.length];
    const submitter = submitterRef[i % submitterRef.length];
    const status = appealStatuses[i % appealStatuses.length];
    const isDecided = status === 'Approved' || status === 'Rejected';

    result.push({
      id: `app-${String(i + 1).padStart(3, '0')}`,
      retailer_id: retailer.id,
      retailer_name: retailer.name,
      brand: retailer.brand,
      reason: appealReasons[i % appealReasons.length],
      contracts: [`ren-${String(1 + (i * 3) % 55).padStart(3, '0')}`, `ren-${String(2 + (i * 5) % 55).padStart(3, '0')}`],
      submitted_date: `2026-02-${String(5 + (i % 20)).padStart(2, '0')}T10:00:00Z`,
      status,
      decision_date: isDecided ? `2026-02-${String(15 + (i % 10)).padStart(2, '0')}T14:00:00Z` : undefined,
      decision_notes: isDecided ? decisionNotes[i % decisionNotes.length] : undefined,
      submitted_by: submitter.id,
      submitted_by_name: submitter.name,
      customer_name: customerNames[i % customerNames.length],
    });
  }

  return result;
}

export const retentionSummaries: RetentionSummary[] = generateRetentionSummaries();
export const renewals: Renewal[] = generateRenewals();
export const appeals: Appeal[] = generateAppeals();
