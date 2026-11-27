import React, { useState } from 'react';
import { Building2, FileDown, Printer, BarChart3, Lightbulb, MessageSquare, FileText, CheckCircle2, Calendar, RefreshCw, Check } from 'lucide-react';
import { Hotel, DateFilterType } from '../types';

interface NavbarProps {
  hotels: Hotel[];
  selectedHotelId: string;
  onSelectHotel: (id: string) => void;
  dateFilter: DateFilterType;
  onSelectDateFilter: (filter: DateFilterType) => void;
  activeTab: 'analytics' | 'insights' | 'reviews' | 'comparison' | 'report';
  setActiveTab: (tab: 'analytics' | 'insights' | 'reviews' | 'comparison' | 'report') => void;
  onExportCsv: () => void;
  onPrintReport: () => void;
  onSyncReviews: () => void;
  isSyncing: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  hotels,
  selectedHotelId,
  onSelectHotel,
  dateFilter,
  onSelectDateFilter,
  activeTab,
  setActiveTab,
  onExportCsv,
  onPrintReport,
  onSyncReviews,
  isSyncing,
}) => {
  const [showSyncNotification, setShowSyncNotification] = useState(false);

  const handleSyncClick = () => {
    onSyncReviews();
    setShowSyncNotification(true);
    setTimeout(() => setShowSyncNotification(false), 3500);
  };

  return (
    <header className="bg-booking-blue text-white shadow-lg sticky top-0 z-50">
      {/* Top Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/40">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              <span className="bg-booking-lightBlue text-white px-2 py-0.5 rounded text-sm font-black">Azzurro</span>
              <span className="text-booking-yellow">Hotels</span>
            </span>
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
              Booking.com Review Insights Dashboard
            </h1>
            <p className="text-xs text-blue-200 hidden sm:block">
              Operations & Guest Sentiment Analytics • Sydney Properties
            </p>
          </div>
        </div>

        {/* Global Action Controls: Sync, Export, Print */}
        <div className="flex items-center gap-2.5">
          {/* Review Scraper / Sync Button */}
          <button
            onClick={handleSyncClick}
            disabled={isSyncing}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all text-white border border-white/20 ${
              isSyncing ? 'bg-blue-800 cursor-not-allowed opacity-80' : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
            title="Collect latest reviews from Booking.com property pages"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Scraping Reviews...' : 'Sync Reviews'}</span>
          </button>

          {/* Export CSV */}
          <button
            onClick={onExportCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-booking-lightBlue hover:bg-blue-600 text-xs font-semibold shadow-sm transition-all text-white"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          {/* Print/PDF */}
          <button
            onClick={onPrintReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold border border-white/20 transition-all text-white"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Sync Success Banner */}
      {showSyncNotification && (
        <div className="bg-emerald-500 text-white text-xs px-4 py-1.5 flex items-center justify-center gap-2 transition-all">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
          <span>Review collection sync complete: All 4 Sydney properties up to date (Deduplicated).</span>
        </div>
      )}

      {/* Filter and Tab Sub-bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-sm">
        {/* Left Side: Property and Date Filter dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Property Selector */}
          <div className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-booking-yellow shrink-0" />
            <select
              id="hotel-select"
              value={selectedHotelId}
              onChange={(e) => onSelectHotel(e.target.value)}
              className="bg-booking-darkBlue text-white text-xs sm:text-sm font-semibold rounded-lg px-2.5 py-1.5 border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-booking-yellow cursor-pointer shadow-inner"
            >
              <option value="all">All 4 Sydney Properties (Consolidated)</option>
              {hotels.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.suburb})
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Selector */}
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-booking-yellow shrink-0" />
            <select
              id="date-filter"
              value={dateFilter}
              onChange={(e) => onSelectDateFilter(e.target.value as DateFilterType)}
              className="bg-booking-darkBlue text-white text-xs sm:text-sm font-semibold rounded-lg px-2.5 py-1.5 border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-booking-yellow cursor-pointer shadow-inner"
            >
              <option value="current-week">Current Week (Nov 23 - 27)</option>
              <option value="previous-week">Previous Week (Nov 16 - 22)</option>
              <option value="last-30-days">Last 30 Days</option>
              <option value="all-time">All Time (Baseline)</option>
            </select>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-booking-yellow text-slate-900 shadow-md'
                : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Operations Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('comparison')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'comparison'
                ? 'bg-booking-yellow text-slate-900 shadow-md'
                : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Property Breakdown</span>
          </button>

          <button
            onClick={() => setActiveTab('insights')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'insights'
                ? 'bg-booking-yellow text-slate-900 shadow-md'
                : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Operational Topics</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'bg-booking-yellow text-slate-900 shadow-md'
                : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Review Feed</span>
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'report'
                ? 'bg-booking-yellow text-slate-900 shadow-md'
                : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Executive Report</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
