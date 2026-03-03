import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Plus, X } from 'lucide-react';
import { FileUploader } from '../../components/forms/FileUploader';
import { useAppStore } from '../../stores/appStore';
import type { BusinessArea, BonusType, BrandCode } from '../../types';

const STEPS = ['Business Details', 'VIN Entry', 'Supporting Info', 'Review & Submit'];

const BRANDS: BrandCode[] = ['VWPC', 'VWCV', 'SEAT', 'CUPRA', 'SKODA'];
const BUSINESS_AREAS: BusinessArea[] = ['Retail', 'Fleet', 'Direct'];
const BONUS_TYPES: BonusType[] = ['Margin', 'Catch-Back', 'Tactical'];
const REASONS = [
  'VIN not appearing on bonus report',
  'Delivery delay beyond retailer control',
  'Customer changed finance product post-order',
  'Bonus period overlap',
  'System error on handover date',
  'Other',
];

interface VINEntry {
  vin: string;
  model: string;
}

export function EnquiryCreate() {
  const navigate = useNavigate();
  const { addToast } = useAppStore();
  const [step, setStep] = useState(0);

  // Form state
  const [brand, setBrand] = useState<BrandCode>('VWPC');
  const [businessArea, setBusinessArea] = useState<BusinessArea>('Retail');
  const [bonusType, setBonusType] = useState<BonusType>('Margin');
  const [reason, setReason] = useState(REASONS[0]);
  const [vinInput, setVinInput] = useState('');
  const [vins, setVins] = useState<VINEntry[]>([]);
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  function addVin() {
    if (vinInput.trim().length >= 5) {
      setVins((prev) => [...prev, { vin: vinInput.trim().toUpperCase(), model: 'Auto-detected' }]);
      setVinInput('');
    }
  }

  function removeVin(index: number) {
    setVins((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit() {
    addToast({ type: 'success', message: 'Enquiry submitted successfully' });
    navigate('/bonus/enquiries');
  }

  function canProceed(): boolean {
    if (step === 1 && vins.length === 0) return false;
    if (step === 2 && !description.trim()) return false;
    return true;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/bonus/enquiries')}
          className="text-sm text-vwfs-text/60 hover:text-vwfs-brand flex items-center gap-1 mb-2"
        >
          <ChevronLeft size={14} /> Back to Enquiries
        </button>
        <h1 className="text-2xl font-bold text-vwfs-brand">New Bonus Enquiry</h1>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                i < step
                  ? 'bg-vwfs-success text-white'
                  : i === step
                  ? 'bg-vwfs-brand text-white'
                  : 'bg-gray-200 text-vwfs-text/40'
              }`}
            >
              {i < step ? <Check size={16} /> : i + 1}
            </div>
            <span
              className={`text-xs font-medium hidden sm:inline ${
                i === step ? 'text-vwfs-brand' : 'text-vwfs-text/50'
              }`}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 ${
                  i < step ? 'bg-vwfs-success' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="card">
        {/* Step 1: Business Details */}
        {step === 0 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-vwfs-brand">Business Details</h2>

            <div>
              <label className="block text-sm font-medium text-vwfs-text mb-1.5">Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value as BrandCode)}
                className="input-field"
              >
                {BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-vwfs-text mb-1.5">Business Area</label>
              <select
                value={businessArea}
                onChange={(e) => setBusinessArea(e.target.value as BusinessArea)}
                className="input-field"
              >
                {BUSINESS_AREAS.map((ba) => (
                  <option key={ba} value={ba}>{ba}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-vwfs-text mb-1.5">Bonus Type</label>
              <select
                value={bonusType}
                onChange={(e) => setBonusType(e.target.value as BonusType)}
                className="input-field"
              >
                {BONUS_TYPES.map((bt) => (
                  <option key={bt} value={bt}>{bt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-vwfs-text mb-1.5">Reason</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="input-field"
              >
                {REASONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Step 2: VIN Entry */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-vwfs-brand">VIN Entry</h2>
            <p className="text-sm text-vwfs-text/60">Add the VINs related to this enquiry.</p>

            <div className="flex gap-2">
              <input
                type="text"
                value={vinInput}
                onChange={(e) => setVinInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addVin()}
                placeholder="Enter VIN (e.g. WVWZZZ3CZWE123456)"
                className="input-field flex-1 font-mono"
              />
              <button onClick={addVin} className="btn-primary flex items-center gap-1">
                <Plus size={16} /> Add
              </button>
            </div>

            {vins.length > 0 && (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-vwfs-surface">
                      <th className="px-4 py-2 text-left text-xs font-semibold text-vwfs-text/70">#</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-vwfs-text/70">VIN</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-vwfs-text/70">Model</th>
                      <th className="px-4 py-2 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {vins.map((v, i) => (
                      <tr key={i} className="border-t border-gray-100">
                        <td className="px-4 py-2 text-vwfs-text/50">{i + 1}</td>
                        <td className="px-4 py-2 font-mono text-xs">{v.vin}</td>
                        <td className="px-4 py-2 text-vwfs-text/60">{v.model}</td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => removeVin(i)}
                            className="text-vwfs-error hover:bg-vwfs-error/10 p-1 rounded"
                          >
                            <X size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {vins.length === 0 && (
              <div className="text-center py-8 text-vwfs-text/40 text-sm">
                No VINs added yet. Enter a VIN above and click Add.
              </div>
            )}
          </div>
        )}

        {/* Step 3: Supporting Info */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-vwfs-brand">Supporting Information</h2>

            <div>
              <label className="block text-sm font-medium text-vwfs-text mb-1.5">
                Description / Justification
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="input-field resize-none"
                placeholder="Provide a detailed description of why this bonus enquiry is being raised..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-vwfs-text mb-1.5">
                Attachments
              </label>
              <FileUploader
                onFilesChange={setFiles}
                acceptedTypes={['.pdf', '.xlsx', '.docx', '.png', '.jpg']}
              />
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-vwfs-brand">Review & Submit</h2>
            <p className="text-sm text-vwfs-text/60">
              Please review the details below before submitting your enquiry.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-vwfs-surface rounded-lg p-4">
                <p className="text-xs text-vwfs-text/50 mb-1">Brand</p>
                <p className="text-sm font-semibold text-vwfs-brand">{brand}</p>
              </div>
              <div className="bg-vwfs-surface rounded-lg p-4">
                <p className="text-xs text-vwfs-text/50 mb-1">Business Area</p>
                <p className="text-sm font-semibold text-vwfs-brand">{businessArea}</p>
              </div>
              <div className="bg-vwfs-surface rounded-lg p-4">
                <p className="text-xs text-vwfs-text/50 mb-1">Bonus Type</p>
                <p className="text-sm font-semibold text-vwfs-brand">{bonusType}</p>
              </div>
              <div className="bg-vwfs-surface rounded-lg p-4">
                <p className="text-xs text-vwfs-text/50 mb-1">Reason</p>
                <p className="text-sm font-semibold text-vwfs-brand">{reason}</p>
              </div>
            </div>

            <div className="bg-vwfs-surface rounded-lg p-4">
              <p className="text-xs text-vwfs-text/50 mb-1">VINs ({vins.length})</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {vins.map((v, i) => (
                  <span key={i} className="font-mono text-xs bg-white px-2 py-1 rounded border border-gray-200">
                    {v.vin}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-vwfs-surface rounded-lg p-4">
              <p className="text-xs text-vwfs-text/50 mb-1">Description</p>
              <p className="text-sm text-vwfs-text whitespace-pre-wrap">{description || 'No description provided'}</p>
            </div>

            <div className="bg-vwfs-surface rounded-lg p-4">
              <p className="text-xs text-vwfs-text/50 mb-1">Attachments ({files.length})</p>
              {files.length > 0 ? (
                <ul className="text-sm text-vwfs-text space-y-0.5">
                  {files.map((f, i) => (
                    <li key={i}>{f.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-vwfs-text/50">None</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => (step === 0 ? navigate('/bonus/enquiries') : setStep(step - 1))}
          className="btn-secondary flex items-center gap-1"
        >
          <ChevronLeft size={16} />
          {step === 0 ? 'Cancel' : 'Back'}
        </button>

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className="btn-primary flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="btn-primary flex items-center gap-1"
          >
            <Check size={16} /> Submit Enquiry
          </button>
        )}
      </div>
    </div>
  );
}
