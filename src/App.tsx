import { useState, useMemo } from 'react';
import { HOTELS, REVIEWS } from './data/hotelsData';
import { Navbar } from './components/Navbar';
import { KPICards } from './components/KPICards';
import { ChartsSection } from './components/ChartsSection';
import { PropertyBreakdownView } from './components/PropertyBreakdownView';
import { TopicInsights } from './components/TopicInsights';
import { ReviewsExplorer } from './components/ReviewsExplorer';
import { ExecutiveReport } from './components/ExecutiveReport';
import {
  computeWeeklyMetrics,
  computeOperationalTopicInsights,
  filterReviewsByDate,
  exportReviewsToCSV
} from './utils/analytics';
import { DateFilterType, OperationalTopic } from './types';
import { Sparkles, ShieldCheck } from 'lucide-react';

export function App() {
  const [selectedHotelId, setSelectedHotelId] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<DateFilterType>('current-week');
  const [activeTab, setActiveTab] = useState<'analytics' | 'comparison' | 'insights' | 'reviews' | 'report'>('analytics');
  const [activeTopicFilter, setActiveTopicFilter] = useState<string>('all');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const reviewsList = REVIEWS;

  // Filter reviews by selected property
  const propertyReviews = useMemo(() => {
    if (selectedHotelId === 'all') return reviewsList;
    return reviewsList.filter((r) => r.hotelId === selectedHotelId);
  }, [selectedHotelId, reviewsList]);

  // Filter reviews by date range
  const activeReviews = useMemo(() => {
    return filterReviewsByDate(propertyReviews, dateFilter);
  }, [propertyReviews, dateFilter]);

  // Compute live weekly metrics (Current week vs Previous week)
  const weeklyMetrics = useMemo(() => {
    return computeWeeklyMetrics(propertyReviews);
  }, [propertyReviews]);

  // Compute operational topic insights
  const topicInsights = useMemo(() => {
    return computeOperationalTopicInsights(propertyReviews, dateFilter === 'current-week');
  }, [propertyReviews, dateFilter]);

  const activeHotel = useMemo(() => {
    if (selectedHotelId === 'all') return null;
    return HOTELS.find((h) => h.id === selectedHotelId) || null;
  }, [selectedHotelId]);

  const handleExportCsv = () => {
    exportReviewsToCSV(activeReviews);
  };

  const handlePrintReport = () => {
    window.print();
  };

  // Live Review Collection / Ingestion Simulation
  const handleSyncReviews = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1200);
  };

  const handleFilterByTopic = (topic: OperationalTopic) => {
    setActiveTopicFilter(topic);
    setActiveTab('reviews');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-booking-yellow selection:text-slate-900">
      <div>
        {/* Main Navigation Bar */}
        <Navbar
          hotels={HOTELS}
          selectedHotelId={selectedHotelId}
          onSelectHotel={(id) => setSelectedHotelId(id)}
          dateFilter={dateFilter}
          onSelectDateFilter={(filter) => setDateFilter(filter)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onExportCsv={handleExportCsv}
          onPrintReport={handlePrintReport}
          onSyncReviews={handleSyncReviews}
          isSyncing={isSyncing}
        />

        {/* Dashboard Main Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Top Operational KPI Cards with Week-over-Week Tracking */}
          {activeTab !== 'report' && (
            <KPICards
              weeklyMetrics={weeklyMetrics}
              topTopicInsight={topicInsights[0]}
              hotelName={
                activeHotel
                  ? `${activeHotel.name} (${activeHotel.suburb})`
                  : 'All 4 Sydney Properties (Consolidated Overview)'
              }
            />
          )}

          {/* Tab 1: Operations Overview & Charts */}
          {activeTab === 'analytics' && (
            <ChartsSection
              reviews={activeReviews}
              topicInsights={topicInsights}
            />
          )}

          {/* Tab 2: Property-by-Property Breakdown */}
          {activeTab === 'comparison' && (
            <PropertyBreakdownView
              hotels={HOTELS}
              reviews={reviewsList}
              onSelectHotel={(id) => {
                setSelectedHotelId(id);
                setActiveTab('reviews');
              }}
            />
          )}

          {/* Tab 3: Operational Topics (8 Core Dimensions & Insights) */}
          {activeTab === 'insights' && (
            <TopicInsights
              topicInsights={topicInsights}
              onSelectTopicFilter={handleFilterByTopic}
              selectedTopic={activeTopicFilter}
            />
          )}

          {/* Tab 4: Review Feed Explorer */}
          {activeTab === 'reviews' && (
            <ReviewsExplorer
              reviews={activeReviews}
              hotels={HOTELS}
              initialTopicFilter={activeTopicFilter}
            />
          )}

          {/* Tab 5: Executive Audit Report */}
          {activeTab === 'report' && (
            <ExecutiveReport
              hotels={HOTELS}
              reviews={reviewsList}
              selectedHotelId={selectedHotelId}
              onPrint={handlePrintReport}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-booking-blue">Azzurro Hotels</span>
            <span>•</span>
            <span>Booking.com Review Insights & Operations Platform (Sydney, AU)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>4 Sydney Properties: Paddington, Potts Point, Surry Hills, Darling Harbour</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-600">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>React 18 • TypeScript • Tailwind CSS • Recharts</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
