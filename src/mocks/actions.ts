// ============================================================================
// VWFS Performance Platform - Action Plan & Action Mock Data
// ============================================================================

import type {
  ActionPlan,
  Action,
  ActionStatus,
  ActionComment,
  StatusHistoryEntry,
  BrandCode,
} from '../types';

// --- Reference data ---

const retailerRef = [
  { id: 'ret-001', name: 'Volkswagen Milton Keynes' },
  { id: 'ret-003', name: 'Volkswagen Leeds' },
  { id: 'ret-004', name: 'Volkswagen Birmingham' },
  { id: 'ret-006', name: 'Volkswagen Manchester' },
  { id: 'ret-015', name: 'SEAT Maidstone' },
  { id: 'ret-017', name: 'SEAT Coventry' },
  { id: 'ret-024', name: 'SKODA Cheltenham' },
  { id: 'ret-031', name: 'Audi Reading' },
  { id: 'ret-032', name: 'Audi West London' },
  { id: 'ret-011', name: 'VW Van Centre London' },
];

const ownerRef = [
  { id: 'usr-003', name: 'Emily Chen' },
  { id: 'usr-006', name: 'David Williams' },
  { id: 'usr-007', name: 'Priya Patel' },
  { id: 'usr-010', name: 'Mark Johnson' },
  { id: 'usr-013', name: 'Natalie Wright' },
  { id: 'usr-018', name: 'Tom Anderson' },
];

const assigneeRef = [
  { id: 'usr-001', name: 'Sarah Mitchell' },
  { id: 'usr-002', name: 'James Harper' },
  { id: 'usr-009', name: 'Hannah Roberts' },
  { id: 'usr-012', name: 'Chris Davies' },
  { id: 'usr-015', name: 'Karen Stewart' },
  { id: 'usr-016', name: 'Robert Blackwell' },
  { id: 'usr-003', name: 'Emily Chen' },
  { id: 'usr-006', name: 'David Williams' },
];

const planBrands: BrandCode[] = ['VWPC', 'VWPC', 'SEAT', 'SKODA', 'AUDI', 'AUDI', 'VWCV', 'VWPC', 'SEAT', 'SKODA'];

const planDefs = [
  { title: 'Q1 2026 Finance Penetration Improvement', objective: 'Increase finance penetration from 42% to 55% by end of Q1 2026 through targeted sales training and process improvements.' },
  { title: 'Used Vehicle Stock Turn Optimisation', objective: 'Reduce average days in stock from 62 to 45 days through improved pricing strategy and digital marketing.' },
  { title: 'Service Plan Attachment Recovery Plan', objective: 'Recover service plan attachment rate from 28% to target 45% through revised sales process at handover.' },
  { title: 'Customer Satisfaction Improvement Programme', objective: 'Improve CSI score from 72 to 85+ through staff training, process mapping and mystery shopper feedback.' },
  { title: 'Fleet Business Development Plan', objective: 'Grow fleet penetration from 18% to 30% by developing local business relationships and dedicated fleet executive.' },
  { title: 'Approved Used Programme Compliance', objective: 'Increase approved used penetration from 38% to 60% through improved preparation standards and marketing.' },
  { title: 'Workshop Efficiency Improvement Plan', objective: 'Increase hours per job card from 1.9 to 2.5 through technician upskilling and service advisor upselling.' },
  { title: 'Digital Lead Conversion Programme', objective: 'Improve online enquiry to order conversion rate from 12% to 25% through CRM process and response time targets.' },
  { title: 'Retention Rate Improvement Plan', objective: 'Improve retention renewal rate from 62% to 75% through proactive customer contact 90 days before contract end.' },
  { title: 'F&I Income Maximisation Plan', objective: 'Increase F&I income per unit from \u00A3520 to \u00A3850 through product training and needs-based selling approach.' },
];

const actionCategories = ['Sales Process', 'Training', 'Marketing', 'Pricing', 'Customer Contact', 'Systems & Process', 'People Development', 'Stock Management'];

const actionTitles = [
  'Conduct finance product knowledge training for all sales executives',
  'Implement daily stock review meeting with used car manager',
  'Set up automated customer contact sequence at 90 days before contract end',
  'Review and update pricing matrix for used vehicle stock over 30 days',
  'Create digital marketing campaign for approved used vehicles',
  'Arrange mystery shopper visits and share feedback with team',
  'Implement handover checklist including service plan discussion',
  'Set up weekly F&I income tracking dashboard',
  'Recruit and train dedicated fleet business development executive',
  'Develop local business partnership programme for fleet customers',
  'Conduct service advisor upselling workshop',
  'Implement CRM follow-up process for all online enquiries within 30 minutes',
  'Review and optimise vehicle preparation standards for approved used',
  'Create customer satisfaction action board in showroom',
  'Schedule monthly one-to-one coaching sessions with all sales staff',
  'Implement digital deal file process to reduce F&I processing time',
  'Set up service plan incentive scheme for sales executives',
  'Develop retention customer contact script and training materials',
  'Create weekly performance review meeting agenda template',
  'Install vehicle health check digital tablet in service reception',
  'Arrange manufacturer product launch training for new model',
  'Review and update demonstrator fleet allocation and utilisation targets',
  'Implement online booking system for service appointments',
  'Create social media content calendar for approved used stock',
  'Set up automated stock ageing alerts at 21, 30, and 45 days',
  'Develop new customer welcome pack including service plan information',
  'Conduct competitor pricing analysis and market positioning review',
  'Arrange customer focus group to identify service improvement areas',
  'Implement daily sales huddle with KPI review',
  'Create video walk-around process for online used vehicle listings',
  'Set up warranty work tracking and recovery improvement process',
  'Arrange F&I regulatory compliance refresher training',
  'Implement part-exchange valuation process improvement',
  'Create fleet customer quarterly review meeting programme',
  'Develop apprentice technician recruitment and training plan',
  'Review and improve customer handover experience process',
  'Set up stock acquisition strategy for high-demand approved used models',
  'Implement Net Promoter Score tracking for all customer touchpoints',
  'Create aftersales marketing campaign for out-of-warranty customers',
  'Arrange test drive process review and quality audit',
  'Implement digital customer feedback system post-service',
  'Set up pipeline management review with area manager',
  'Create trade-in customer retention programme',
  'Develop electric vehicle specialist training programme',
  'Implement online finance calculator on dealership website',
  'Arrange quarterly business review preparation checklist',
  'Create customer referral programme with tracking',
  'Review and optimise workshop booking diary utilisation',
  'Implement sales lead scoring system in CRM',
  'Set up monthly staff recognition programme linked to KPIs',
  'Develop customer communication templates for key lifecycle stages',
  'Create accessory attachment tracking and incentive programme',
  'Arrange manufacturer systems training for new platform',
  'Implement daily cash management and finance deal submission process',
  'Review and update showroom merchandising and POS materials',
];

const actionDescriptions = [
  'Deliver a half-day workshop covering all finance products, compliance requirements and needs-based selling techniques. Include role-play scenarios and FCA guidelines refresher.',
  'Establish a 15-minute morning meeting to review stock ageing, pricing adjustments needed, and incoming part-exchange approvals.',
  'Configure CRM system to trigger automated email, SMS and call task sequences for customers approaching contract end dates.',
  'Analyse current pricing against market data and implement revised pricing strategy for vehicles exceeding target days in stock.',
  'Launch targeted social media and website campaigns highlighting approved used stock with video content and competitive finance offers.',
  'Commission three mystery shopper visits per quarter and conduct team debrief sessions to address findings and implement improvements.',
];

const statusPool: ActionStatus[] = ['Draft', 'Open', 'In Progress', 'For Review', 'Completed', 'Failed', 'Overdue'];
const priorities = ['Low', 'Medium', 'High', 'Critical'] as const;

const smartSuggestions = [
  'Consider linking this action to the F&I income KPI for tracking impact',
  'Similar action was successful at Volkswagen Bristol - review their approach',
  'Training sessions are most effective when held mid-week (Tuesday-Wednesday)',
  'Set up a 2-week checkpoint to assess early progress',
  'Consider involving the manufacturer training team for specialist topics',
];

// --- Generate Actions for a given plan ---

function generateActions(planId: string, planIndex: number, count: number): Action[] {
  const result: Action[] = [];

  for (let i = 0; i < count; i++) {
    const globalIndex = planIndex * 10 + i;
    const status = statusPool[(globalIndex * 3 + i) % statusPool.length];
    const owner = ownerRef[planIndex % ownerRef.length];
    const assignee = assigneeRef[(planIndex + i) % assigneeRef.length];
    const priority = priorities[(globalIndex + planIndex) % priorities.length];
    const createdDate = `2025-${String(10 + (planIndex % 3)).padStart(2, '0')}-${String(5 + (i * 2) % 20).padStart(2, '0')}T09:00:00Z`;
    const dueDate = `2026-${String(1 + (i % 5)).padStart(2, '0')}-${String(10 + (i * 3) % 18).padStart(2, '0')}`;

    // Some actions overdue
    const isOverdue = status === 'Overdue' || (status === 'Open' && dueDate < '2026-03-01');

    const comments: ActionComment[] = [
      {
        id: `ac-cmt-${planIndex}-${i}-1`,
        author_id: owner.id,
        author_name: owner.name,
        content: `Action created as part of the improvement plan. ${assignee.name} to take ownership and report progress at the next review.`,
        created_date: createdDate,
      },
    ];

    if (status !== 'Draft' && status !== 'Open') {
      comments.push({
        id: `ac-cmt-${planIndex}-${i}-2`,
        author_id: assignee.id,
        author_name: assignee.name,
        content: status === 'Completed'
          ? 'Action completed successfully. Results will be visible in next month reporting cycle.'
          : status === 'Failed'
            ? 'Unfortunately we were unable to complete this action due to resource constraints. Requesting extension.'
            : 'Making good progress on this action. Will provide a full update at the next review meeting.',
        created_date: `2026-01-${String(10 + (i % 15)).padStart(2, '0')}T14:00:00Z`,
        mentions: [owner.name],
      });
    }

    const statusHistory: StatusHistoryEntry[] = [
      {
        status: 'Draft',
        changed_by: owner.id,
        changed_by_name: owner.name,
        changed_date: createdDate,
        notes: 'Action created',
      },
    ];

    if (status !== 'Draft') {
      statusHistory.push({
        status: 'Open',
        changed_by: owner.id,
        changed_by_name: owner.name,
        changed_date: `2025-${String(11 + (planIndex % 2)).padStart(2, '0')}-01T09:00:00Z`,
        notes: 'Action assigned and opened',
      });
    }

    if (['In Progress', 'For Review', 'Completed', 'Failed'].includes(status)) {
      statusHistory.push({
        status: 'In Progress',
        changed_by: assignee.id,
        changed_by_name: assignee.name,
        changed_date: `2026-01-${String(5 + (i % 10)).padStart(2, '0')}T10:00:00Z`,
        notes: 'Work commenced',
      });
    }

    if (status === 'Completed') {
      statusHistory.push({
        status: 'Completed',
        changed_by: assignee.id,
        changed_by_name: assignee.name,
        changed_date: `2026-02-${String(10 + (i % 15)).padStart(2, '0')}T16:00:00Z`,
        notes: 'Action completed and verified',
      });
    }

    const kpiLinks = ['SAL-01', 'SAL-02', 'SER-01', 'SER-02', 'USE-01', 'USE-02', 'FIN-01', 'FIN-02'];
    const kpiNames = [
      'Finance Penetration Rate', 'New Vehicle Sales vs Target', 'Service Plan Attachment Rate',
      'Customer Satisfaction Index', 'Used Car Margin', 'Used Vehicle Days in Stock',
      'F&I Income per Unit', 'Insurance Penetration',
    ];

    result.push({
      id: `act-${String(globalIndex + 1).padStart(3, '0')}`,
      action_id: `ACT-2025-${String(3000 + globalIndex).slice(-4)}`,
      plan_id: planId,
      title: actionTitles[globalIndex % actionTitles.length],
      description: actionDescriptions[globalIndex % actionDescriptions.length],
      category: actionCategories[globalIndex % actionCategories.length],
      status: isOverdue && status === 'Open' ? 'Overdue' : status,
      owner_id: owner.id,
      owner_name: owner.name,
      assigned_to: assignee.id,
      assigned_to_name: assignee.name,
      due_date: dueDate,
      completed_date: status === 'Completed' ? `2026-02-${String(10 + (i % 15)).padStart(2, '0')}T16:00:00Z` : undefined,
      kpi_link: kpiLinks[globalIndex % kpiLinks.length],
      kpi_name: kpiNames[globalIndex % kpiNames.length],
      created_date: createdDate,
      updated_date: `2026-02-${String(15 + (i % 10)).padStart(2, '0')}T11:00:00Z`,
      priority,
      comments,
      status_history: statusHistory,
      attachments: globalIndex % 8 === 0
        ? [{
            id: `att-act-${globalIndex}`,
            filename: `action_plan_evidence_${globalIndex + 1}.pdf`,
            file_type: 'application/pdf',
            file_size: 120000 + globalIndex * 3000,
            uploaded_by: assignee.id,
            uploaded_date: `2026-02-${String(10 + (i % 15)).padStart(2, '0')}T12:00:00Z`,
            url: `/attachments/act-${globalIndex + 1}/evidence.pdf`,
          }]
        : [],
      smart_suggestions: globalIndex % 3 === 0
        ? [smartSuggestions[globalIndex % smartSuggestions.length]]
        : undefined,
    });
  }

  return result;
}

// --- Generate 10 Action Plans with 5-7 actions each ---

function generateActionPlans(): { plans: ActionPlan[]; allActions: Action[] } {
  const plans: ActionPlan[] = [];
  const allActions: Action[] = [];
  const linkedKPIs = [
    ['SAL-01', 'SAL-02', 'FIN-01'],
    ['USE-01', 'USE-02', 'USE-04'],
    ['SER-01', 'SER-02'],
    ['SER-02', 'SER-03', 'SER-05'],
    ['SAL-06', 'SAL-03'],
    ['USE-05', 'USE-01'],
    ['SER-04', 'SER-05'],
    ['SAL-03', 'SAL-01'],
    ['SER-03', 'SAL-01'],
    ['FIN-01', 'FIN-02', 'FIN-03'],
  ];

  for (let p = 0; p < 10; p++) {
    const retailer = retailerRef[p % retailerRef.length];
    const owner = ownerRef[p % ownerRef.length];
    const planId = `plan-${String(p + 1).padStart(3, '0')}`;
    const actionCount = 5 + (p % 3); // 5-7 actions per plan
    const planActions = generateActions(planId, p, actionCount);
    allActions.push(...planActions);

    const completedCount = planActions.filter((a) => a.status === 'Completed').length;
    const overdueCount = planActions.filter((a) => a.status === 'Overdue').length;
    const progress = planActions.length > 0 ? Math.round((completedCount / planActions.length) * 100) : 0;

    plans.push({
      id: planId,
      plan_id: `PLN-2025-${String(100 + p).slice(-3)}`,
      title: planDefs[p].title,
      objective: planDefs[p].objective,
      brand: planBrands[p],
      retailer_id: retailer.id,
      retailer_name: retailer.name,
      owner_id: owner.id,
      owner_name: owner.name,
      start_date: `2025-${String(10 + (p % 3)).padStart(2, '0')}-01`,
      end_date: `2026-${String(3 + (p % 6)).padStart(2, '0')}-31`,
      created_date: `2025-${String(9 + (p % 3)).padStart(2, '0')}-15T09:00:00Z`,
      updated_date: `2026-02-${String(20 + (p % 8)).padStart(2, '0')}T14:00:00Z`,
      status: p < 7 ? 'Active' : p === 7 ? 'Completed' : 'Archived',
      actions: planActions,
      progress_percentage: p === 7 ? 100 : progress,
      total_actions: planActions.length,
      completed_actions: p === 7 ? planActions.length : completedCount,
      overdue_actions: overdueCount,
      linked_kpis: linkedKPIs[p],
    });
  }

  return { plans, allActions };
}

const { plans, allActions } = generateActionPlans();

export const actionPlans: ActionPlan[] = plans;
export const actions: Action[] = allActions;
