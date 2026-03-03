// ============================================================================
// VWFS Performance Platform - Visit Reporting Mock Data
// ============================================================================

import type { Visit, VisitStatus, AgendaItem, UserRole } from '../types';

// --- Reference data ---

const retailerRef = [
  { id: 'ret-001', name: 'Volkswagen Milton Keynes', code: 'RET001' },
  { id: 'ret-002', name: 'Volkswagen Watford', code: 'RET002' },
  { id: 'ret-003', name: 'Volkswagen Leeds', code: 'RET003' },
  { id: 'ret-004', name: 'Volkswagen Birmingham', code: 'RET004' },
  { id: 'ret-006', name: 'Volkswagen Manchester', code: 'RET006' },
  { id: 'ret-009', name: 'Volkswagen Edinburgh', code: 'RET009' },
  { id: 'ret-015', name: 'SEAT Maidstone', code: 'RET015' },
  { id: 'ret-017', name: 'SEAT Coventry', code: 'RET017' },
  { id: 'ret-024', name: 'SKODA Cheltenham', code: 'RET024' },
  { id: 'ret-025', name: 'SKODA Sheffield', code: 'RET025' },
  { id: 'ret-031', name: 'Audi Reading', code: 'RET031' },
  { id: 'ret-032', name: 'Audi West London', code: 'RET032' },
  { id: 'ret-033', name: 'Audi Liverpool', code: 'RET033' },
  { id: 'ret-011', name: 'VW Van Centre London', code: 'RET011' },
  { id: 'ret-020', name: 'CUPRA London City', code: 'RET020' },
  { id: 'ret-021', name: 'CUPRA Manchester', code: 'RET021' },
  { id: 'ret-039', name: 'Volkswagen Plymouth', code: 'RET039' },
  { id: 'ret-049', name: 'Volkswagen Croydon', code: 'RET049' },
  { id: 'ret-034', name: 'Audi Solihull', code: 'RET034' },
  { id: 'ret-028', name: 'SKODA Leicester', code: 'RET028' },
  { id: 'ret-040', name: 'Volkswagen Stockport', code: 'RET040' },
  { id: 'ret-048', name: 'CUPRA Leeds', code: 'RET048' },
];

const creatorRef = [
  { id: 'usr-003', name: 'Emily Chen', role: 'area_manager' as UserRole },
  { id: 'usr-006', name: 'David Williams', role: 'field_force' as UserRole },
  { id: 'usr-007', name: 'Priya Patel', role: 'area_manager' as UserRole },
  { id: 'usr-010', name: 'Mark Johnson', role: 'field_force' as UserRole },
  { id: 'usr-013', name: 'Natalie Wright', role: 'area_manager' as UserRole },
  { id: 'usr-018', name: 'Tom Anderson', role: 'field_force' as UserRole },
];

const attendeePool = [
  { user_id: 'usr-001', user_name: 'Sarah Mitchell', role: 'retailer' as UserRole },
  { user_id: 'usr-002', user_name: 'James Harper', role: 'group_manager' as UserRole },
  { user_id: 'usr-009', user_name: 'Hannah Roberts', role: 'retailer' as UserRole },
  { user_id: 'usr-012', user_name: 'Chris Davies', role: 'retailer' as UserRole },
  { user_id: 'usr-015', user_name: 'Karen Stewart', role: 'retailer' as UserRole },
  { user_id: 'usr-004', user_name: 'Richard Thompson', role: 'national' as UserRole },
  { user_id: 'usr-014', user_name: 'Andrew Grant', role: 'national' as UserRole },
  { user_id: 'usr-016', user_name: 'Robert Blackwell', role: 'group_manager' as UserRole },
];

const visitTypes: Visit['visit_type'][] = ['Performance Review', 'Quarterly Business Review', 'Ad-Hoc', 'Follow-Up', 'Annual Review'];
const visitStatuses: VisitStatus[] = ['Scheduled', 'Completed', 'Overdue', 'Draft', 'Completed', 'Completed', 'Scheduled', 'Completed'];

const agendaTemplates: { title: string; description: string; duration: number }[][] = [
  // Performance Review
  [
    { title: 'Scorecard Review', description: 'Review current month scorecard performance and KPI trends', duration: 20 },
    { title: 'Action Plan Progress', description: 'Review progress on open action items from previous visit', duration: 15 },
    { title: 'Finance Penetration Deep Dive', description: 'Analyse finance product attachment rates and identify improvement areas', duration: 20 },
    { title: 'Retention Pipeline Review', description: 'Review upcoming contract endings and retention strategy', duration: 15 },
    { title: 'Next Steps & Actions', description: 'Agree new actions and confirm next visit date', duration: 10 },
  ],
  // QBR
  [
    { title: 'Quarter Performance Summary', description: 'Overview of quarterly performance against all KPI targets', duration: 25 },
    { title: 'Market Analysis & Competitor Review', description: 'Review local market conditions and competitive landscape', duration: 15 },
    { title: 'People & Training Update', description: 'Discuss staffing levels, training needs and development plans', duration: 15 },
    { title: 'Used Vehicle Strategy', description: 'Review used vehicle stock profile, turn rate and margin performance', duration: 20 },
    { title: 'Service Department Review', description: 'Analyse service retention, workshop loading and CSI scores', duration: 20 },
    { title: 'Forward Plan & Targets', description: 'Agree objectives and targets for the coming quarter', duration: 15 },
  ],
  // Ad-Hoc
  [
    { title: 'Issue Discussion', description: 'Address specific performance concern or urgent matter', duration: 20 },
    { title: 'Root Cause Analysis', description: 'Identify underlying factors contributing to the issue', duration: 20 },
    { title: 'Remedial Actions', description: 'Agree immediate corrective actions and timeline', duration: 15 },
  ],
  // Follow-Up
  [
    { title: 'Action Review', description: 'Review progress on actions agreed at previous visit', duration: 15 },
    { title: 'Performance Update', description: 'Check latest performance data against targets', duration: 15 },
    { title: 'Additional Support Requirements', description: 'Identify any additional support or resources needed', duration: 10 },
    { title: 'Next Review Date', description: 'Confirm next scheduled visit', duration: 5 },
  ],
  // Annual Review
  [
    { title: 'Annual Performance Summary', description: 'Comprehensive review of full-year performance against all targets', duration: 30 },
    { title: 'Financial Review', description: 'Review profitability, margin performance and bonus achievement', duration: 25 },
    { title: 'Customer Experience Review', description: 'Analyse CSI trends, complaints and customer feedback', duration: 20 },
    { title: 'People & Capability', description: 'Review team capability, training investment and succession planning', duration: 20 },
    { title: 'Strategic Plan', description: 'Agree strategic priorities and investment plans for the coming year', duration: 25 },
  ],
];

const completedNotes = [
  'Productive meeting with clear actions agreed. Retailer is engaged and committed to improving finance penetration. Key focus areas identified: sales executive product knowledge and needs-based selling approach. Follow-up visit scheduled for 4 weeks.',
  'Quarterly review completed. Strong progress on used vehicle turn rate (down from 62 to 48 days). Service plan attachment remains below target and is now the priority focus. Area Manager to arrange manufacturer training support.',
  'Good engagement from the dealer principal. Scorecard has improved by 8 positions this month. Retention pipeline review highlighted 23 contracts ending in the next 60 days - immediate contact plan agreed.',
  'Ad-hoc visit following CSI dip. Root cause identified as staffing gap in service reception causing extended wait times. Recruitment plan agreed with target start date of 1st March. Interim agency cover being arranged.',
  'Follow-up visit confirmed actions from January are progressing well. Three of five actions completed. Finance penetration has improved from 42% to 49% - tracking towards Q1 target. Two remaining actions due by month end.',
  'Annual review completed. Strong performance year overall with improvements across 12 of 15 KPIs. Key challenge remains used vehicle margin which is under pressure from market conditions. Capital investment approved for showroom refresh.',
  'Comprehensive QBR with group management present. Discussed brand strategy alignment and stock allocation for Q2. Fleet development plan approved with dedicated resource from April. Group committed to achieving top 25% across all brands.',
  'Visit focused on retention programme implementation. New CRM workflow demonstrated and approved. Training session for customer-facing staff booked for next week. Target: 75% of ending contracts contacted at 90 days.',
];

const outcomes = [
  '5 new actions created and assigned. Next visit scheduled for 25th March 2026. Retailer to provide weekly finance penetration update via email.',
  '3 actions carried forward, 4 new actions agreed. Manufacturer training request submitted. QBR presentation to be shared with group management.',
  'Immediate action plan agreed with 2-week review checkpoint. Area Manager to provide additional support resources. CSI improvement target: 80+ by April.',
  'All previous actions reviewed and updated. 2 actions closed as completed. Retailer demonstrating good momentum on improvement plan.',
  'Strategic plan agreed for FY2026/27. Investment case prepared for board approval. Succession planning discussion to continue at next visit.',
];

// --- Generate visits ---

function generateVisits(): Visit[] {
  const result: Visit[] = [];

  for (let i = 0; i < 25; i++) {
    const retailer = retailerRef[i % retailerRef.length];
    const creator = creatorRef[i % creatorRef.length];
    const status = visitStatuses[i % visitStatuses.length];
    const visitType = visitTypes[i % visitTypes.length];
    const isCompleted = status === 'Completed';
    const isDraft = status === 'Draft';

    // Determine visit date
    let visitDate: string;
    if (status === 'Overdue') {
      visitDate = `2026-02-${String(5 + (i % 15)).padStart(2, '0')}`;
    } else if (status === 'Completed') {
      visitDate = `2026-${String(1 + (i % 2)).padStart(2, '0')}-${String(8 + (i * 3) % 18).padStart(2, '0')}`;
    } else if (isDraft) {
      visitDate = `2026-03-${String(15 + (i % 12)).padStart(2, '0')}`;
    } else {
      visitDate = `2026-03-${String(5 + (i * 2) % 22).padStart(2, '0')}`;
    }

    const visitTime = `${String(9 + (i % 4)).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`;
    const duration = visitType === 'Ad-Hoc' ? 60 : visitType === 'Annual Review' ? 180 : visitType === 'Quarterly Business Review' ? 120 : 90;

    // Select agenda items based on visit type
    const templateIndex = visitTypes.indexOf(visitType);
    const template = agendaTemplates[templateIndex >= 0 ? templateIndex : 0];
    const agendaItems: AgendaItem[] = template.map((item, idx) => ({
      id: `agi-${i}-${idx}`,
      order: idx + 1,
      title: item.title,
      description: item.description,
      duration_minutes: item.duration,
      notes: isCompleted ? `Discussed and reviewed. ${idx === 0 ? 'Key findings noted.' : 'Actions agreed.'}` : undefined,
      owner_id: idx % 2 === 0 ? creator.id : attendeePool[i % attendeePool.length].user_id,
      owner_name: idx % 2 === 0 ? creator.name : attendeePool[i % attendeePool.length].user_name,
      completed: isCompleted,
    }));

    // Select attendees (2-4 per visit)
    const attendeeCount = 2 + (i % 3);
    const attendees = [
      { ...attendeePool[i % attendeePool.length], confirmed: true },
      { user_id: creator.id, user_name: creator.name, role: creator.role, confirmed: true },
    ];
    for (let a = 1; a < attendeeCount; a++) {
      const att = attendeePool[(i + a) % attendeePool.length];
      if (!attendees.find((x) => x.user_id === att.user_id)) {
        attendees.push({ ...att, confirmed: isCompleted || i % 3 !== 0 });
      }
    }

    result.push({
      id: `vis-${String(i + 1).padStart(3, '0')}`,
      visit_id: `VIS-2026-${String(500 + i).slice(-3)}`,
      visit_date: visitDate,
      visit_time: visitTime,
      duration_minutes: duration,
      retailer_id: retailer.id,
      retailer_name: retailer.name,
      retailer_code: retailer.code,
      visit_type: visitType,
      status,
      created_by: creator.id,
      created_by_name: creator.name,
      attendees,
      agenda_items: agendaItems,
      outcomes: isCompleted ? outcomes[i % outcomes.length] : undefined,
      summary_notes: isCompleted ? completedNotes[i % completedNotes.length] : undefined,
      linked_actions: isCompleted
        ? [`act-${String(1 + (i * 3) % 55).padStart(3, '0')}`, `act-${String(2 + (i * 5) % 55).padStart(3, '0')}`]
        : [],
      attachments: isCompleted && i % 3 === 0
        ? [{
            id: `att-vis-${i}`,
            filename: `visit_report_${retailer.code}_${visitDate}.pdf`,
            file_type: 'application/pdf',
            file_size: 350000 + i * 10000,
            uploaded_by: creator.id,
            uploaded_date: `${visitDate}T17:00:00Z`,
            url: `/attachments/vis-${i + 1}/visit_report.pdf`,
          }]
        : [],
      created_date: `2026-${String(1 + (i % 2)).padStart(2, '0')}-${String(1 + (i % 20)).padStart(2, '0')}T09:00:00Z`,
      updated_date: isCompleted
        ? `${visitDate}T17:30:00Z`
        : `2026-02-${String(20 + (i % 8)).padStart(2, '0')}T10:00:00Z`,
    });
  }

  return result;
}

export const visits: Visit[] = generateVisits();
