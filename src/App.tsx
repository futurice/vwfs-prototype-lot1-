import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { Toast } from './components/common/Toast';

// Pages
import { Home } from './pages/Home';
import { EnquiryList } from './pages/bonus/EnquiryList';
import { EnquiryCreate } from './pages/bonus/EnquiryCreate';
import { EnquiryDetail } from './pages/bonus/EnquiryDetail';
import { ExceptionList } from './pages/bonus/ExceptionList';
import { ExceptionDetail } from './pages/bonus/ExceptionDetail';
import { ScorecardList } from './pages/scorecards/ScorecardList';
import { ScorecardView } from './pages/scorecards/ScorecardView';
import { DashboardLanding } from './pages/dashboards/DashboardLanding';
import { BrandDashboard } from './pages/dashboards/BrandDashboard';
import { KPIDrillDown } from './pages/dashboards/KPIDrillDown';
import { ActionCentre } from './pages/actions/ActionCentre';
import { ActionPlanDetail } from './pages/actions/ActionPlanDetail';
import { ActionDetail } from './pages/actions/ActionDetail';
import { VisitCentre } from './pages/visits/VisitCentre';
import { VisitCreate } from './pages/visits/VisitCreate';
import { VisitDetail } from './pages/visits/VisitDetail';
import { MarginOverview } from './pages/margin/MarginOverview';
import { MarginDetail } from './pages/margin/MarginDetail';
import { RetentionSummary } from './pages/retention/RetentionSummary';
import { RenewalReporting } from './pages/retention/RenewalReporting';
import { MigrationMatrix } from './pages/retention/MigrationMatrix';
import { Forecasting } from './pages/retention/Forecasting';
import { Appeals } from './pages/retention/Appeals';
import { CustomerConsent } from './pages/retention/CustomerConsent';

function App() {
  return (
    <>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Home />} />

          {/* Bonus */}
          <Route path="/bonus/enquiries" element={<EnquiryList />} />
          <Route path="/bonus/enquiries/new" element={<EnquiryCreate />} />
          <Route path="/bonus/enquiries/:id" element={<EnquiryDetail />} />
          <Route path="/bonus/exceptions" element={<ExceptionList />} />
          <Route path="/bonus/exceptions/:id" element={<ExceptionDetail />} />

          {/* Scorecards */}
          <Route path="/scorecards" element={<ScorecardList />} />
          <Route path="/scorecards/:brand" element={<ScorecardView />} />

          {/* Dashboards */}
          <Route path="/dashboards" element={<DashboardLanding />} />
          <Route path="/dashboards/:brand" element={<BrandDashboard />} />
          <Route path="/dashboards/:brand/:kpiId" element={<KPIDrillDown />} />

          {/* Actions */}
          <Route path="/actions" element={<ActionCentre />} />
          <Route path="/actions/plans/:id" element={<ActionPlanDetail />} />
          <Route path="/actions/:id" element={<ActionDetail />} />

          {/* Visits */}
          <Route path="/visits" element={<VisitCentre />} />
          <Route path="/visits/new" element={<VisitCreate />} />
          <Route path="/visits/:id" element={<VisitDetail />} />

          {/* Margin */}
          <Route path="/margin" element={<MarginOverview />} />
          <Route path="/margin/:id" element={<MarginDetail />} />

          {/* Retention */}
          <Route path="/retention" element={<RetentionSummary />} />
          <Route path="/retention/renewals" element={<RenewalReporting />} />
          <Route path="/retention/migration" element={<MigrationMatrix />} />
          <Route path="/retention/forecast" element={<Forecasting />} />
          <Route path="/retention/appeals" element={<Appeals />} />
          <Route path="/retention/consent" element={<CustomerConsent />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <Toast />
    </>
  );
}

export default App;
