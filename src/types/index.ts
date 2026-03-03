// ============================================================================
// VWFS Performance Platform - Type Definitions
// ============================================================================

// --- Enums & Union Types ---

export type UserRole =
  | 'retailer'
  | 'group_manager'
  | 'area_manager'
  | 'national'
  | 'head_office'
  | 'field_force';

export type BrandCode = 'VWPC' | 'VWCV' | 'SEAT' | 'CUPRA' | 'SKODA' | 'AUDI';

export type EnquiryStatus = 'Draft' | 'Open' | 'In Review' | 'Closed' | 'Appealed';

export type ExceptionStatus = 'Pending' | 'In Progress' | 'Approved' | 'Rejected' | 'Escalated';

export type ActionStatus =
  | 'Draft'
  | 'Open'
  | 'In Progress'
  | 'For Review'
  | 'Completed'
  | 'Failed'
  | 'Overdue';

export type VisitStatus = 'Draft' | 'Scheduled' | 'Completed' | 'Overdue' | 'Cancelled';

export type RAGStatus = 'Red' | 'Amber' | 'Green';

export type Trend = 'up' | 'down' | 'stable';

export type ScorecardPeriod = 'Monthly' | 'Quarterly' | 'YTD' | 'HY1' | 'HY2';

export type ApprovalStageStatus = 'Pending' | 'Approved' | 'Rejected' | 'Skipped';

export type BusinessArea = 'Retail' | 'Fleet' | 'Direct';

export type BonusType = 'Margin' | 'Catch-Back' | 'Tactical';

export type Department = 'Sales' | 'Service' | 'Used' | 'Overall';

export type Region = 'North' | 'South' | 'Midlands' | 'East' | 'West' | 'London';

export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'PHEV';

export type ConsentChannel = 'Email' | 'SMS' | 'Post' | 'Phone';

// --- Core Entity Interfaces ---

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: UserRole;
  brand_access: BrandCode[];
  retailer_id?: string;
  group_id?: string;
  area_id?: string;
  region?: Region;
  avatar_url?: string;
  phone?: string;
  job_title: string;
  active: boolean;
  last_login: string;
  created_date: string;
}

export interface Retailer {
  id: string;
  code: string;
  name: string;
  brand: BrandCode[];
  region: Region;
  area: string;
  group: string;
  address: string;
  postcode: string;
  active: boolean;
  phone?: string;
  email?: string;
  principal_name?: string;
}

export interface HierarchyNode {
  id: string;
  name: string;
  level: 'national' | 'region' | 'area' | 'group' | 'retailer';
  parent_id?: string;
  children_ids: string[];
  brand?: BrandCode;
  retailer_id?: string;
}

// --- Bonus Enquiries ---

export interface VINRecord {
  vin: string;
  model: string;
  variant?: string;
  registration_number?: string;
  handover_date?: string;
  bonus_period?: string;
  bonus_amount?: number;
  customer_name?: string;
  order_type?: 'Retail' | 'Fleet' | 'Motability' | 'Direct';
}

export interface Comment {
  id: string;
  author_id: string;
  author_name: string;
  content: string;
  created_date: string;
  is_internal: boolean;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  filename: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  uploaded_date: string;
  url: string;
}

export interface Enquiry {
  id: string;
  enquiry_id: string;
  status: EnquiryStatus;
  brand: BrandCode;
  business_area: BusinessArea;
  bonus_type: BonusType;
  reason: string;
  description: string;
  retailer_id: string;
  retailer_name: string;
  retailer_code: string;
  created_by: string;
  created_by_name: string;
  assigned_to?: string;
  assigned_to_name?: string;
  created_date: string;
  updated_date: string;
  closed_date?: string;
  vins: VINRecord[];
  comments: Comment[];
  attachments: Attachment[];
  escalated_to_exception?: string;
  appeal_reason?: string;
  resolution_notes?: string;
}

// --- Bonus Exceptions ---

export interface ApprovalStage {
  stage_number: number;
  stage_name: string;
  approver_id: string;
  approver_name: string;
  approver_role: UserRole;
  status: ApprovalStageStatus;
  decision_date?: string;
  notes?: string;
  deputised_to?: string;
  deputised_to_name?: string;
}

export interface AuditTrailEntry {
  id: string;
  timestamp: string;
  user_id: string;
  user_name: string;
  action: string;
  details: string;
  old_value?: string;
  new_value?: string;
}

export interface InternalChatMessage {
  id: string;
  author_id: string;
  author_name: string;
  author_role: UserRole;
  content: string;
  timestamp: string;
}

export interface Exception {
  id: string;
  exception_id: string;
  status: ExceptionStatus;
  brand: BrandCode;
  business_area: BusinessArea;
  bonus_type: BonusType;
  reason: string;
  description: string;
  retailer_id: string;
  retailer_name: string;
  retailer_code: string;
  escalated_from_enquiry?: string;
  created_by: string;
  created_by_name: string;
  created_date: string;
  updated_date: string;
  resolved_date?: string;
  vins: VINRecord[];
  approval_stages: ApprovalStage[];
  current_stage: number;
  internal_chat: InternalChatMessage[];
  audit_trail: AuditTrailEntry[];
  attachments: Attachment[];
  total_value: number;
  comments: Comment[];
}

// --- Balanced Scorecards ---

export interface ScorecardKPI {
  kpi_id: string;
  kpi_code: string;
  kpi_name: string;
  department: Department;
  raw_result: number;
  score_achieved: number;
  target: number;
  rag_status: RAGStatus;
  trend: Trend;
  r12_trend: number[];
  rank: number;
  total_ranked: number;
  benchmark_national: number;
  benchmark_top25: number;
  weighting: number;
  unit: string;
}

export interface Scorecard {
  id: string;
  brand: BrandCode;
  period: ScorecardPeriod;
  period_label: string;
  retailer_id: string;
  retailer_name: string;
  retailer_code: string;
  department: Department;
  kpi_results: ScorecardKPI[];
  overall_score: number;
  overall_rank: number;
  total_retailers: number;
  rank_movement: number;
  benchmark_national: number;
  benchmark_top25: number;
  is_most_improved: boolean;
  published: boolean;
  published_date?: string;
}

// --- Performance Dashboards / KPIs ---

export interface KPIHistoryPoint {
  month: string;
  value: number;
  target: number;
}

export interface KPI {
  id: string;
  kpi_code: string;
  kpi_name: string;
  brand: BrandCode;
  category: string;
  department: Department;
  current_value: number;
  target_value: number;
  previous_value: number;
  rag_status: RAGStatus;
  trend: Trend;
  unit: string;
  format: 'percentage' | 'currency' | 'number' | 'ratio';
  history: KPIHistoryPoint[];
  benchmark_national: number;
  benchmark_top25: number;
  rank: number;
  total_ranked: number;
  rag_thresholds: {
    red_below: number;
    amber_below: number;
    green_above: number;
  };
  description?: string;
  data_source?: string;
  retailer_id?: string;
}

// --- Action Planning ---

export interface ActionComment {
  id: string;
  author_id: string;
  author_name: string;
  content: string;
  created_date: string;
  mentions?: string[];
}

export interface StatusHistoryEntry {
  status: ActionStatus;
  changed_by: string;
  changed_by_name: string;
  changed_date: string;
  notes?: string;
}

export interface Action {
  id: string;
  action_id: string;
  plan_id: string;
  title: string;
  description: string;
  category: string;
  status: ActionStatus;
  owner_id: string;
  owner_name: string;
  assigned_to: string;
  assigned_to_name: string;
  due_date: string;
  completed_date?: string;
  kpi_link?: string;
  kpi_name?: string;
  created_date: string;
  updated_date: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  comments: ActionComment[];
  status_history: StatusHistoryEntry[];
  attachments: Attachment[];
  smart_suggestions?: string[];
}

export interface ActionPlan {
  id: string;
  plan_id: string;
  title: string;
  objective: string;
  brand: BrandCode;
  retailer_id: string;
  retailer_name: string;
  owner_id: string;
  owner_name: string;
  start_date: string;
  end_date: string;
  created_date: string;
  updated_date: string;
  status: 'Active' | 'Completed' | 'Archived';
  actions: Action[];
  progress_percentage: number;
  total_actions: number;
  completed_actions: number;
  overdue_actions: number;
  linked_kpis: string[];
}

// --- Visit Reporting ---

export interface AgendaItem {
  id: string;
  order: number;
  title: string;
  description?: string;
  duration_minutes: number;
  notes?: string;
  owner_id?: string;
  owner_name?: string;
  linked_action_id?: string;
  completed: boolean;
}

export interface Visit {
  id: string;
  visit_id: string;
  visit_date: string;
  visit_time: string;
  duration_minutes: number;
  retailer_id: string;
  retailer_name: string;
  retailer_code: string;
  visit_type: 'Performance Review' | 'Quarterly Business Review' | 'Ad-Hoc' | 'Follow-Up' | 'Annual Review';
  status: VisitStatus;
  created_by: string;
  created_by_name: string;
  attendees: {
    user_id: string;
    user_name: string;
    role: UserRole;
    confirmed: boolean;
  }[];
  agenda_items: AgendaItem[];
  outcomes?: string;
  summary_notes?: string;
  linked_actions: string[];
  attachments: Attachment[];
  created_date: string;
  updated_date: string;
}

// --- Margin Tool ---

export interface GatewayCondition {
  id: string;
  condition_name: string;
  description: string;
  target: string;
  actual: string;
  passed: boolean;
  weighting?: number;
  category: string;
}

export interface MarginKPIResult {
  kpi_id: string;
  kpi_name: string;
  target: number;
  actual: number;
  achievement_percentage: number;
  rag_status: RAGStatus;
  unit: string;
}

export interface BonusCalculation {
  qualification_status: 'Qualified' | 'Partially Qualified' | 'Not Qualified';
  bonus_percentage: number;
  max_bonus_percentage: number;
  full_year_bonus: number;
  monthly_accrual: number;
  ytd_paid: number;
  ytd_accrued: number;
  variance: number;
}

export interface MarginRecord {
  id: string;
  retailer_id: string;
  retailer_name: string;
  retailer_code: string;
  brand: BrandCode;
  period: string;
  gateway_conditions: GatewayCondition[];
  gateway_passed: number;
  gateway_total: number;
  gateway_status: 'Pass' | 'Fail' | 'Partial';
  kpi_results: MarginKPIResult[];
  bonus_calculation: BonusCalculation;
  appeal_submitted: boolean;
  appeal_status?: 'Pending' | 'Approved' | 'Rejected';
  override_applied: boolean;
  override_by?: string;
  override_reason?: string;
  notes?: string;
}

// --- Retailer Retention Portal ---

export interface RetentionSummary {
  id: string;
  retailer_id: string;
  retailer_name: string;
  retailer_code: string;
  brand: BrandCode;
  period: string;
  percentage_renewed: number;
  rank: number;
  total_ranked: number;
  trend_6month: number[];
  gap_to_target: number;
  target_percentage: number;
  new_renewals: number;
  used_renewals: number;
  total_renewals: number;
  ended_volume: number;
  renewal_volume: number;
  finance_product?: string;
}

export interface Renewal {
  id: string;
  retailer_id: string;
  retailer_name: string;
  brand: BrandCode;
  period: string;
  customer_name: string;
  original_model: string;
  renewal_model: string;
  original_registration: string;
  renewal_registration?: string;
  finance_product: string;
  fuel_type: FuelType;
  new_or_used: 'New' | 'Used';
  renewal_date?: string;
  contract_end_date: string;
  status: 'Renewed' | 'Lost' | 'Pending' | 'In Negotiation';
  monthly_payment?: number;
  term_months?: number;
}

export interface MigrationMatrixEntry {
  original_model: string;
  renewal_model: string;
  volume: number;
  percentage: number;
}

export interface ForecastEntry {
  retailer_id: string;
  retailer_name: string;
  brand: BrandCode;
  month: string;
  predicted_endings: number;
  target: number;
  actual: number;
  variance: number;
  new_target: number;
  new_actual: number;
  used_target: number;
  used_actual: number;
}

export interface Appeal {
  id: string;
  retailer_id: string;
  retailer_name: string;
  brand: BrandCode;
  reason: string;
  contracts: string[];
  submitted_date: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
  decision_date?: string;
  decision_notes?: string;
  submitted_by: string;
  submitted_by_name: string;
  customer_name: string;
}

export interface CustomerConsent {
  id: string;
  retailer_id: string;
  retailer_name: string;
  brand: BrandCode;
  period: string;
  email_count: number;
  email_percentage: number;
  sms_count: number;
  sms_percentage: number;
  post_count: number;
  post_percentage: number;
  phone_count: number;
  phone_percentage: number;
  total_customers: number;
  trend_6month: {
    month: string;
    email: number;
    sms: number;
    post: number;
    phone: number;
  }[];
}

// --- Notification ---

export interface Notification {
  id: string;
  user_id: string;
  type: 'enquiry' | 'exception' | 'action' | 'visit' | 'scorecard' | 'system';
  title: string;
  message: string;
  link: string;
  read: boolean;
  created_date: string;
}

// --- Filter / Search ---

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface TableSort {
  column: string;
  direction: 'asc' | 'desc';
}

export interface PaginationState {
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
}
