import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Mail, MessageSquare, Send, Phone } from 'lucide-react';
import { ChartWrapper } from '../../components/common/ChartWrapper';
import { retailers } from '../../mocks';
import { ExportButton } from '../../components/common/ExportButton';

function generateConsentData() {
  return retailers.slice(0, 30).map(r => {
    const total = Math.floor(500 + Math.random() * 3000);
    const emailPct = 55 + Math.random() * 35;
    const smsPct = 40 + Math.random() * 40;
    const postPct = 60 + Math.random() * 30;
    const phonePct = 30 + Math.random() * 45;
    return {
      retailer: r.name,
      email: Math.round(emailPct * 10) / 10,
      sms: Math.round(smsPct * 10) / 10,
      post: Math.round(postPct * 10) / 10,
      phone: Math.round(phonePct * 10) / 10,
      total,
      emailCount: Math.round(total * emailPct / 100),
      smsCount: Math.round(total * smsPct / 100),
      postCount: Math.round(total * postPct / 100),
      phoneCount: Math.round(total * phonePct / 100),
      change: Math.round((Math.random() - 0.4) * 6 * 10) / 10,
    };
  });
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function CustomerConsent() {
  const [monthOffset, setMonthOffset] = useState(0);
  const currentMonth = new Date(2026, 2 - monthOffset, 1);
  const monthLabel = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;

  const consentData = useMemo(() => generateConsentData(), []);

  const avgEmail = useMemo(() => consentData.reduce((s, d) => s + d.email, 0) / consentData.length, [consentData]);
  const avgSms = useMemo(() => consentData.reduce((s, d) => s + d.sms, 0) / consentData.length, [consentData]);
  const avgPost = useMemo(() => consentData.reduce((s, d) => s + d.post, 0) / consentData.length, [consentData]);
  const avgPhone = useMemo(() => consentData.reduce((s, d) => s + d.phone, 0) / consentData.length, [consentData]);
  const totalCustomers = consentData.reduce((s, d) => s + d.total, 0);

  const summaryCards = [
    { label: 'Email Consent', value: `${avgEmail.toFixed(1)}%`, icon: <Mail size={20} />, count: consentData.reduce((s, d) => s + d.emailCount, 0), color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'SMS Consent', value: `${avgSms.toFixed(1)}%`, icon: <MessageSquare size={20} />, count: consentData.reduce((s, d) => s + d.smsCount, 0), color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Post Consent', value: `${avgPost.toFixed(1)}%`, icon: <Send size={20} />, count: consentData.reduce((s, d) => s + d.postCount, 0), color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Phone Consent', value: `${avgPhone.toFixed(1)}%`, icon: <Phone size={20} />, count: consentData.reduce((s, d) => s + d.phoneCount, 0), color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const trendData = Array.from({ length: 6 }, (_, i) => ({
    month: monthNames[(currentMonth.getMonth() - 5 + i + 12) % 12].slice(0, 3),
    Email: Math.round((avgEmail + (Math.random() - 0.5) * 8) * 10) / 10,
    SMS: Math.round((avgSms + (Math.random() - 0.5) * 10) * 10) / 10,
    Post: Math.round((avgPost + (Math.random() - 0.5) * 6) * 10) / 10,
    Phone: Math.round((avgPhone + (Math.random() - 0.5) * 12) * 10) / 10,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[30px] font-bold text-vwfs-brand">Customer Consent</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded px-3 py-1.5">
            <button onClick={() => setMonthOffset(o => Math.min(o + 1, 11))} className="text-vwfs-text/40 hover:text-vwfs-brand"><ChevronLeft size={16} /></button>
            <span className="text-sm font-semibold text-vwfs-brand min-w-[140px] text-center">{monthLabel}</span>
            <button onClick={() => setMonthOffset(o => Math.max(o - 1, 0))} className="text-vwfs-text/40 hover:text-vwfs-brand" disabled={monthOffset === 0}><ChevronRight size={16} /></button>
          </div>
          <ExportButton />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {summaryCards.map(c => (
          <div key={c.label} className={`card ${c.bg}`}>
            <div className="flex items-center gap-3 mb-2">
              <span className={c.color}>{c.icon}</span>
              <span className="text-sm font-semibold text-vwfs-text">{c.label}</span>
            </div>
            <p className={`text-3xl font-bold ${c.color}`}>{c.value}</p>
            <p className="text-xs text-vwfs-text/50 mt-1">
              {c.count.toLocaleString()} of {totalCustomers.toLocaleString()} customers
            </p>
          </div>
        ))}
      </div>

      {/* Trend Chart */}
      <ChartWrapper
        type="line"
        data={trendData}
        xKey="month"
        yKeys={['Email', 'SMS', 'Post', 'Phone']}
        title="6-Month Consent Trend"
        height={280}
        colors={['#3B82F6', '#22C55E', '#8B5CF6', '#F97316']}
      />

      {/* Detailed Table */}
      <div className="card overflow-x-auto">
        <h3 className="text-sm font-bold text-vwfs-brand mb-4">Consent by Retailer</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-vwfs-brand text-white">
              <th className="px-3 py-2 text-left">Retailer</th>
              <th className="px-3 py-2 text-right">Email %</th>
              <th className="px-3 py-2 text-right">SMS %</th>
              <th className="px-3 py-2 text-right">Post %</th>
              <th className="px-3 py-2 text-right">Phone %</th>
              <th className="px-3 py-2 text-right">Total Customers</th>
              <th className="px-3 py-2 text-right">vs Last Month</th>
            </tr>
          </thead>
          <tbody>
            {consentData.map((row, i) => (
              <tr key={row.retailer} className={i % 2 === 0 ? 'bg-white' : 'bg-vwfs-surface/50'}>
                <td className="px-3 py-2 font-medium">{row.retailer}</td>
                <td className="px-3 py-2 text-right">
                  <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${row.email >= 80 ? 'bg-vwfs-success/20 text-vwfs-success' : row.email >= 60 ? 'bg-vwfs-warning/30 text-yellow-700' : 'bg-vwfs-error/20 text-vwfs-error'}`}>
                    {row.email.toFixed(1)}%
                  </span>
                </td>
                <td className="px-3 py-2 text-right">
                  <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${row.sms >= 70 ? 'bg-vwfs-success/20 text-vwfs-success' : row.sms >= 50 ? 'bg-vwfs-warning/30 text-yellow-700' : 'bg-vwfs-error/20 text-vwfs-error'}`}>
                    {row.sms.toFixed(1)}%
                  </span>
                </td>
                <td className="px-3 py-2 text-right">
                  <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${row.post >= 75 ? 'bg-vwfs-success/20 text-vwfs-success' : row.post >= 55 ? 'bg-vwfs-warning/30 text-yellow-700' : 'bg-vwfs-error/20 text-vwfs-error'}`}>
                    {row.post.toFixed(1)}%
                  </span>
                </td>
                <td className="px-3 py-2 text-right">
                  <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${row.phone >= 60 ? 'bg-vwfs-success/20 text-vwfs-success' : row.phone >= 40 ? 'bg-vwfs-warning/30 text-yellow-700' : 'bg-vwfs-error/20 text-vwfs-error'}`}>
                    {row.phone.toFixed(1)}%
                  </span>
                </td>
                <td className="px-3 py-2 text-right">{row.total.toLocaleString()}</td>
                <td className="px-3 py-2 text-right">
                  <span className={row.change >= 0 ? 'text-vwfs-success font-semibold' : 'text-vwfs-error font-semibold'}>
                    {row.change >= 0 ? '+' : ''}{row.change}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
