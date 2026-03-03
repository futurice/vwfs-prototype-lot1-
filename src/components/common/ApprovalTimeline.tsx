// ============================================================================
// VWFS Performance Platform - Approval Timeline (Showpiece Component)
// ============================================================================

import { Check, X, Clock, Plus, UserCheck } from 'lucide-react';
import type { ApprovalStage, ApprovalStageStatus } from '../../types';

interface ApprovalTimelineProps {
  stages: ApprovalStage[];
  currentStage: number;
  onApprove?: (stageNumber: number) => void;
  onReject?: (stageNumber: number) => void;
  onRequestChanges?: (stageNumber: number) => void;
  onAddStage?: () => void;
  onDeputise?: (stageNumber: number) => void;
}

const roleLabels: Record<string, string> = {
  retailer: 'Retailer',
  group_manager: 'Group Manager',
  area_manager: 'Area Manager',
  national: 'National',
  head_office: 'Head Office',
  field_force: 'Field Force',
};

function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function StageCircle({ status, isCurrent }: { status: ApprovalStageStatus; isCurrent: boolean }) {
  const baseClasses = 'w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all';

  if (status === 'Approved') {
    return (
      <div className={`${baseClasses} bg-vwfs-success text-white`}>
        <Check size={20} strokeWidth={3} />
      </div>
    );
  }

  if (status === 'Rejected') {
    return (
      <div className={`${baseClasses} bg-vwfs-error text-white`}>
        <X size={20} strokeWidth={3} />
      </div>
    );
  }

  if (status === 'Skipped') {
    return (
      <div className={`${baseClasses} bg-vwfs-surface-dark/40 text-vwfs-text/50 border-2 border-dashed border-vwfs-surface-dark`}>
        <span className="text-xs font-bold">SKIP</span>
      </div>
    );
  }

  // Pending
  if (isCurrent) {
    return (
      <div className={`${baseClasses} bg-vwfs-accent-light text-vwfs-brand pulse-dot`}>
        <Clock size={20} />
      </div>
    );
  }

  return (
    <div className={`${baseClasses} bg-gray-200 text-vwfs-text/40 border-2 border-dashed border-gray-300`}>
      <Clock size={18} />
    </div>
  );
}

function ConnectorLine({ status, isBefore }: { status: ApprovalStageStatus; isBefore: boolean }) {
  if (status === 'Approved' && isBefore) {
    return <div className="flex-1 h-0.5 bg-vwfs-success min-w-[40px]" />;
  }
  if (status === 'Rejected') {
    return <div className="flex-1 h-0.5 bg-vwfs-error min-w-[40px]" />;
  }
  return (
    <div className="flex-1 min-w-[40px] border-t-2 border-dashed border-gray-300" />
  );
}

export function ApprovalTimeline({
  stages,
  currentStage,
  onApprove,
  onReject,
  onRequestChanges,
  onAddStage,
  onDeputise,
}: ApprovalTimelineProps) {
  const totalStages = stages.length;
  const currentApproverRole =
    stages.find((s) => s.stage_number === currentStage)?.approver_role ?? '';

  return (
    <div className="card overflow-visible">
      {/* Progress text */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-vwfs-brand mb-1">Approval Workflow</h3>
          <p className="text-sm text-vwfs-text/70">
            Stage {currentStage} of {totalStages} —{' '}
            <span className="font-medium">
              Awaiting {roleLabels[currentApproverRole] ?? currentApproverRole} approval
            </span>
          </p>
        </div>
        {onAddStage && (
          <button
            onClick={onAddStage}
            className="btn-secondary flex items-center gap-1.5 text-xs"
          >
            <Plus size={14} />
            Add Stage
          </button>
        )}
      </div>

      {/* Timeline */}
      <div className="flex items-start overflow-x-auto pb-4">
        {stages.map((stage, index) => {
          const isCurrent = stage.stage_number === currentStage;
          const isLast = index === stages.length - 1;

          return (
            <div key={stage.stage_number} className="flex items-start flex-shrink-0">
              {/* Stage Column */}
              <div className="flex flex-col items-center min-w-[140px]">
                {/* Circle */}
                <StageCircle status={stage.status} isCurrent={isCurrent} />

                {/* Info below circle */}
                <div className="mt-3 text-center max-w-[140px]">
                  <p className="text-xs font-bold text-vwfs-brand leading-tight">
                    {stage.stage_name}
                  </p>
                  <p className="text-[11px] text-vwfs-text/70 mt-0.5">
                    {stage.approver_name}
                  </p>
                  <p className="text-[10px] text-vwfs-text/50 mt-0.5">
                    {roleLabels[stage.approver_role] ?? stage.approver_role}
                  </p>
                  {stage.decision_date && (
                    <p className="text-[10px] text-vwfs-text/40 mt-0.5">
                      {formatDate(stage.decision_date)}
                    </p>
                  )}
                  {stage.deputised_to_name && (
                    <p className="text-[10px] text-purple-600 mt-0.5 flex items-center justify-center gap-0.5">
                      <UserCheck size={10} />
                      Deputised: {stage.deputised_to_name}
                    </p>
                  )}
                  {stage.notes && (
                    <p className="text-[10px] text-vwfs-text/50 mt-1 italic line-clamp-2">
                      "{stage.notes}"
                    </p>
                  )}

                  {/* Action buttons for current stage */}
                  {isCurrent && stage.status === 'Pending' && (
                    <div className="mt-3 space-y-1.5">
                      <div className="flex gap-1">
                        {onApprove && (
                          <button
                            onClick={() => onApprove(stage.stage_number)}
                            className="flex-1 bg-vwfs-success text-white text-[10px] font-bold uppercase px-2 py-1.5 rounded hover:bg-green-700 transition-colors"
                          >
                            Approve
                          </button>
                        )}
                        {onReject && (
                          <button
                            onClick={() => onReject(stage.stage_number)}
                            className="flex-1 bg-vwfs-error text-white text-[10px] font-bold uppercase px-2 py-1.5 rounded hover:bg-red-700 transition-colors"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                      {onRequestChanges && (
                        <button
                          onClick={() => onRequestChanges(stage.stage_number)}
                          className="w-full bg-vwfs-warning text-vwfs-text text-[10px] font-bold uppercase px-2 py-1.5 rounded hover:bg-yellow-400 transition-colors"
                        >
                          Request Changes
                        </button>
                      )}
                      {onDeputise && (
                        <button
                          onClick={() => onDeputise(stage.stage_number)}
                          className="w-full text-vwfs-brand text-[10px] font-medium underline hover:text-vwfs-accent transition-colors mt-1"
                        >
                          Deputise
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Connector */}
              {!isLast && (
                <div className="flex items-center mt-5 px-1">
                  <ConnectorLine
                    status={stage.status}
                    isBefore={stage.stage_number < currentStage}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ApprovalTimeline;
