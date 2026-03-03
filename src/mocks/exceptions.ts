// ============================================================================
// VWFS Performance Platform - Exception Mock Data
// ============================================================================

import type {
  Exception,
  ExceptionStatus,
  BrandCode,
  BusinessArea,
  BonusType,
  ApprovalStage,
  ApprovalStageStatus,
  InternalChatMessage,
  AuditTrailEntry,
  VINRecord,
  UserRole,
} from '../types';

// --- Reference data ---

const retailerPool = [
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
  { id: 'ret-037', name: 'Audi York', code: 'RET037', brand: 'AUDI' as BrandCode },
  { id: 'ret-040', name: 'Volkswagen Stockport', code: 'RET040', brand: 'VWPC' as BrandCode },
  { id: 'ret-049', name: 'Volkswagen Croydon', code: 'RET049', brand: 'VWPC' as BrandCode },
  { id: 'ret-048', name: 'CUPRA Leeds', code: 'RET048', brand: 'CUPRA' as BrandCode },
  { id: 'ret-028', name: 'SKODA Leicester', code: 'RET028', brand: 'SKODA' as BrandCode },
  { id: 'ret-034', name: 'Audi Solihull', code: 'RET034', brand: 'AUDI' as BrandCode },
  { id: 'ret-039', name: 'Volkswagen Plymouth', code: 'RET039', brand: 'VWPC' as BrandCode },
];

const creatorPool = [
  { id: 'usr-001', name: 'Sarah Mitchell', role: 'retailer' as UserRole },
  { id: 'usr-002', name: 'James Harper', role: 'group_manager' as UserRole },
  { id: 'usr-009', name: 'Hannah Roberts', role: 'retailer' as UserRole },
  { id: 'usr-012', name: 'Chris Davies', role: 'retailer' as UserRole },
  { id: 'usr-015', name: 'Karen Stewart', role: 'retailer' as UserRole },
  { id: 'usr-016', name: 'Robert Blackwell', role: 'group_manager' as UserRole },
];

const approverPool = [
  { id: 'usr-003', name: 'Emily Chen', role: 'area_manager' as UserRole },
  { id: 'usr-004', name: 'Richard Thompson', role: 'national' as UserRole },
  { id: 'usr-005', name: 'Alexandra Foster', role: 'head_office' as UserRole },
  { id: 'usr-007', name: 'Priya Patel', role: 'area_manager' as UserRole },
  { id: 'usr-008', name: "Michael O'Brien", role: 'national' as UserRole },
  { id: 'usr-011', name: 'Lisa Turner', role: 'head_office' as UserRole },
  { id: 'usr-013', name: 'Natalie Wright', role: 'area_manager' as UserRole },
  { id: 'usr-014', name: 'Andrew Grant', role: 'national' as UserRole },
];

const reasons = [
  'Bonus clawback disputed by retailer',
  'Factory delay impacted delivery timeline',
  'System error on VIN registration date',
  'Fleet order attribution incorrect across group',
  'Tactical campaign not applied to qualifying units',
  'Catch-back applied despite revised target agreement',
  'Demo vehicle incorrectly classified for bonus',
  'Customer cancelled and re-ordered within period',
  'Multi-franchise deal bonus allocation dispute',
  'Pre-registration bonus eligibility query',
  'Motability order bonus calculation error',
  'Volume threshold calculation discrepancy',
  'Finance product change post-order affecting bonus',
  'Quarterly target re-assessment required',
  'Cross-quarter delivery attribution dispute',
];

const descriptions = [
  'The retailer disputes a catch-back deduction of the stated value applied to their Q4 2025 bonus. Documentation shows the revised quarterly target agreed with the Area Manager was met. The original target was adjusted due to a model run-out affecting supply.',
  'A fleet order for multiple vehicles was delivered across two bonus periods due to factory production delays. The retailer has provided factory confirmation of the original estimated delivery dates and is seeking the bonus to be applied to the original period.',
  'The system recorded incorrect handover dates for the listed VINs. The retailer has provided signed handover documentation confirming the actual dates fall within the qualifying bonus period.',
  'A group order was placed through one dealer code but vehicles were delivered across multiple sites. The bonus needs to be split proportionally according to the delivery locations.',
  'A tactical bonus campaign was running during the qualifying period but the system did not apply the uplift to the listed vehicles. All vehicles meet the campaign criteria.',
  'The retailer exceeded their adjusted quarterly target but the catch-back deduction was calculated against the original unadjusted figure. Area Manager confirmation of the revised target is attached.',
  'Demo fleet vehicles sold within the qualifying period have been excluded from the bonus calculation. The retailer believes these should qualify as retail disposals per the current policy.',
  'Following customer order cancellations and re-orders within the same quarter, the system is treating these as separate transactions and has not carried forward the original bonus eligibility.',
  'A large corporate fleet deal was split across brands within the group. The margin support agreed at group level has not been correctly attributed to individual retailer codes.',
  'Pre-registered vehicles that were subsequently sold to retail customers within the bonus period are not showing on the bonus report despite meeting all qualifying criteria.',
];

const vinPrefixes: Record<string, string> = {
  VWPC: 'WVWZZZ',
  VWCV: 'WV1ZZZ',
  SEAT: 'VSSZZZ',
  CUPRA: 'VSSZZZ',
  SKODA: 'TMBZZZ',
  AUDI: 'WAUZZZ',
};

const models: Record<string, string[]> = {
  VWPC: ['Golf', 'Tiguan', 'T-Roc', 'Polo', 'ID.3', 'ID.4', 'Passat', 'ID.7'],
  VWCV: ['Transporter', 'Caddy', 'Crafter', 'Amarok', 'ID. Buzz'],
  SEAT: ['Leon', 'Ibiza', 'Arona', 'Ateca', 'Tarraco'],
  CUPRA: ['Born', 'Formentor', 'Leon', 'Ateca', 'Tavascan'],
  SKODA: ['Octavia', 'Fabia', 'Kamiq', 'Karoq', 'Kodiaq', 'Enyaq'],
  AUDI: ['A3', 'A4', 'Q3', 'Q5', 'Q7', 'e-tron', 'Q4 e-tron'],
};

const statuses: ExceptionStatus[] = ['Pending', 'In Progress', 'Approved', 'Rejected', 'Escalated'];
const businessAreas: BusinessArea[] = ['Retail', 'Fleet', 'Direct'];
const bonusTypes: BonusType[] = ['Margin', 'Catch-Back', 'Tactical'];

// --- Deterministic pseudo-random ---
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function generateVINs(index: number, brand: string, count: number): VINRecord[] {
  const prefix = vinPrefixes[brand] || 'WVWZZZ';
  const brandModels = models[brand] || models.VWPC;
  const customerNames = [
    'James Thornton', 'Sarah Whitfield', 'David Murray', 'Claire Henderson',
    'Robert Ashton', 'Emma Fitzgerald', 'Paul McKenzie', 'Laura Chambers',
    'Andrew Barrett', 'Helen Sinclair', 'Mark Gallagher', 'Kate Donovan',
  ];
  const orderTypes = ['Retail', 'Fleet', 'Motability', 'Direct'] as const;

  return Array.from({ length: count }, (_, vi) => ({
    vin: `${prefix}3CZ${String(200000 + index * 10 + vi).slice(-6)}`,
    model: brandModels[(index + vi) % brandModels.length],
    variant: ['SE', 'SEL', 'R-Line', 'Style', 'S line', 'FR', 'Xcellence', 'Monte Carlo'][vi % 8],
    registration_number: `${['VW', 'AU', 'SK', 'SE', 'CU', 'CV'][index % 6]}${25 + (index % 2)} ${['LKJ', 'MNP', 'RST', 'XYZ', 'BCD', 'FGH'][vi % 6]}`,
    handover_date: `2025-${String(3 + (index % 10)).padStart(2, '0')}-${String(5 + (vi * 3) % 20).padStart(2, '0')}T00:00:00Z`,
    bonus_period: `Q${1 + (index % 4)} 2025`,
    bonus_amount: 200 + ((index * 50 + vi * 75) % 2500),
    customer_name: customerNames[(index + vi) % customerNames.length],
    order_type: orderTypes[(index + vi) % 4],
  }));
}

function generateApprovalStages(index: number, status: ExceptionStatus): ApprovalStage[] {
  const stageCount = 2 + (index % 3); // 2-4 stages
  const stageNames = ['Area Manager Review', 'National Manager Review', 'Head Office Approval', 'Director Sign-Off'];
  const stages: ApprovalStage[] = [];

  for (let s = 0; s < stageCount; s++) {
    const approver = approverPool[(index + s) % approverPool.length];
    let stageStatus: ApprovalStageStatus;

    if (status === 'Approved') {
      stageStatus = 'Approved';
    } else if (status === 'Rejected') {
      stageStatus = s === stageCount - 1 ? 'Rejected' : 'Approved';
    } else if (status === 'In Progress') {
      stageStatus = s === 0 ? 'Approved' : s === 1 ? 'Pending' : 'Pending';
    } else if (status === 'Escalated') {
      stageStatus = s < stageCount - 1 ? 'Approved' : 'Pending';
    } else {
      stageStatus = 'Pending';
    }

    stages.push({
      stage_number: s + 1,
      stage_name: stageNames[s % stageNames.length],
      approver_id: approver.id,
      approver_name: approver.name,
      approver_role: approver.role,
      status: stageStatus,
      decision_date: stageStatus !== 'Pending' ? `2026-0${1 + (index % 2)}-${String(5 + s * 4).padStart(2, '0')}T${10 + s}:30:00Z` : undefined,
      notes: stageStatus === 'Approved'
        ? 'Reviewed documentation. Criteria met, approved to proceed.'
        : stageStatus === 'Rejected'
          ? 'Insufficient evidence provided. Does not meet exception policy criteria.'
          : undefined,
    });
  }

  return stages;
}

function generateInternalChat(index: number, status: ExceptionStatus): InternalChatMessage[] {
  const messages: InternalChatMessage[] = [];
  const chatParticipants = [
    { id: 'usr-003', name: 'Emily Chen', role: 'area_manager' as UserRole },
    { id: 'usr-004', name: 'Richard Thompson', role: 'national' as UserRole },
    { id: 'usr-011', name: 'Lisa Turner', role: 'head_office' as UserRole },
    { id: 'usr-005', name: 'Alexandra Foster', role: 'head_office' as UserRole },
  ];

  const chatMessages = [
    'I have reviewed this exception request. The retailer has provided supporting factory delay confirmation.',
    'Can we check the bonus calculation against the revised targets that were agreed in October?',
    'I have spoken with the retailer principal and they are willing to provide additional documentation.',
    'Looking at the VIN data, two of the vehicles are borderline on the qualifying criteria.',
    'Recommend approval based on the evidence provided. The factory delay was clearly beyond retailer control.',
    'We need to be consistent with similar cases. Last quarter we approved three comparable exceptions.',
    'The total value is within delegation limits for area manager approval.',
    'I have flagged this with finance to ensure the payment run can accommodate the adjustment.',
  ];

  const messageCount = status === 'Pending' ? 1 : status === 'In Progress' ? 2 : 3 + (index % 2);

  for (let m = 0; m < messageCount; m++) {
    const participant = chatParticipants[(index + m) % chatParticipants.length];
    messages.push({
      id: `chat-${index}-${m}`,
      author_id: participant.id,
      author_name: participant.name,
      author_role: participant.role,
      content: chatMessages[(index + m) % chatMessages.length],
      timestamp: `2026-0${1 + (index % 2)}-${String(10 + m * 2).padStart(2, '0')}T${9 + m}:${String(15 + m * 10).padStart(2, '0')}:00Z`,
    });
  }

  return messages;
}

function generateAuditTrail(index: number, status: ExceptionStatus): AuditTrailEntry[] {
  const creator = creatorPool[index % creatorPool.length];
  const entries: AuditTrailEntry[] = [
    {
      id: `aud-${index}-1`,
      timestamp: `2026-01-${String(5 + (index % 20)).padStart(2, '0')}T09:00:00Z`,
      user_id: creator.id,
      user_name: creator.name,
      action: 'Created',
      details: 'Exception request created and submitted for review.',
    },
  ];

  if (status !== 'Pending') {
    const reviewer = approverPool[index % approverPool.length];
    entries.push({
      id: `aud-${index}-2`,
      timestamp: `2026-01-${String(8 + (index % 18)).padStart(2, '0')}T11:30:00Z`,
      user_id: reviewer.id,
      user_name: reviewer.name,
      action: 'Status Changed',
      details: 'Exception moved to In Progress for review.',
      old_value: 'Pending',
      new_value: 'In Progress',
    });
  }

  if (status === 'Approved' || status === 'Rejected') {
    const approver = approverPool[(index + 1) % approverPool.length];
    entries.push({
      id: `aud-${index}-3`,
      timestamp: `2026-02-${String(1 + (index % 20)).padStart(2, '0')}T14:00:00Z`,
      user_id: approver.id,
      user_name: approver.name,
      action: status === 'Approved' ? 'Approved' : 'Rejected',
      details: status === 'Approved'
        ? 'All approval stages completed. Exception approved and bonus adjustment authorised.'
        : 'Exception rejected. Insufficient evidence to support the claim.',
      old_value: 'In Progress',
      new_value: status,
    });
  }

  if (status === 'Escalated') {
    entries.push({
      id: `aud-${index}-3`,
      timestamp: `2026-02-${String(5 + (index % 15)).padStart(2, '0')}T10:00:00Z`,
      user_id: 'usr-005',
      user_name: 'Alexandra Foster',
      action: 'Escalated',
      details: 'Exception escalated to Head Office for director-level review.',
      old_value: 'In Progress',
      new_value: 'Escalated',
    });
  }

  return entries;
}

// --- Generate 55 exceptions ---

function generateExceptions(): Exception[] {
  const result: Exception[] = [];

  for (let i = 0; i < 55; i++) {
    const retailer = retailerPool[i % retailerPool.length];
    const status = statuses[i % statuses.length];
    const creator = creatorPool[i % creatorPool.length];
    const vinCount = 1 + (i % 5);
    const sr = seededRandom(i);
    const totalValue = Math.round(500 + sr * 14500);
    const approvalStages = generateApprovalStages(i, status);
    const currentStage = approvalStages.findIndex((s) => s.status === 'Pending');

    result.push({
      id: `exc-${String(i + 1).padStart(3, '0')}`,
      exception_id: `EXC-2025-${String(2000 + i).slice(-4)}`,
      status,
      brand: retailer.brand,
      business_area: businessAreas[i % businessAreas.length],
      bonus_type: bonusTypes[i % bonusTypes.length],
      reason: reasons[i % reasons.length],
      description: descriptions[i % descriptions.length],
      retailer_id: retailer.id,
      retailer_name: retailer.name,
      retailer_code: retailer.code,
      escalated_from_enquiry: i % 7 === 0 ? `enq-${String(i * 2 + 1).padStart(3, '0')}` : undefined,
      created_by: creator.id,
      created_by_name: creator.name,
      created_date: `2026-01-${String(3 + (i % 25)).padStart(2, '0')}T${String(8 + (i % 6)).padStart(2, '0')}:${String(10 + (i % 50)).padStart(2, '0')}:00Z`,
      updated_date: `2026-02-${String(1 + (i % 25)).padStart(2, '0')}T${String(9 + (i % 5)).padStart(2, '0')}:00:00Z`,
      resolved_date: status === 'Approved' || status === 'Rejected'
        ? `2026-02-${String(10 + (i % 15)).padStart(2, '0')}T15:00:00Z`
        : undefined,
      vins: generateVINs(i, retailer.brand, vinCount),
      approval_stages: approvalStages,
      current_stage: currentStage >= 0 ? currentStage + 1 : approvalStages.length,
      internal_chat: generateInternalChat(i, status),
      audit_trail: generateAuditTrail(i, status),
      attachments: i % 4 === 0
        ? [
            {
              id: `att-exc-${i}-1`,
              filename: `exception_evidence_${i + 1}.pdf`,
              file_type: 'application/pdf',
              file_size: 180000 + i * 5000,
              uploaded_by: creator.id,
              uploaded_date: `2026-01-${String(3 + (i % 25)).padStart(2, '0')}T09:00:00Z`,
              url: `/attachments/exc-${i + 1}/exception_evidence.pdf`,
            },
          ]
        : [],
      total_value: totalValue,
      comments: [
        {
          id: `cmt-exc-${i}-1`,
          author_id: creator.id,
          author_name: creator.name,
          content: `Submitting exception request for ${retailer.name}. Total value: \u00A3${totalValue.toLocaleString()}. Please review the supporting documentation.`,
          created_date: `2026-01-${String(3 + (i % 25)).padStart(2, '0')}T09:15:00Z`,
          is_internal: false,
        },
        ...(status !== 'Pending'
          ? [
              {
                id: `cmt-exc-${i}-2`,
                author_id: approverPool[i % approverPool.length].id,
                author_name: approverPool[i % approverPool.length].name,
                content: 'Exception request received and under review. I will provide an update once the approval stages have been progressed.',
                created_date: `2026-01-${String(8 + (i % 18)).padStart(2, '0')}T14:00:00Z`,
                is_internal: false,
              },
            ]
          : []),
      ],
    });
  }

  return result;
}

export const exceptions: Exception[] = generateExceptions();
