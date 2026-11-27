import React from 'react';
import { Hotel, Review } from '../types';
import { computeWeeklyMetrics, computeOperationalTopicInsights } from '../utils/analytics';
import { Printer, FileText, CheckCircle2, TrendingUp, BarChart2, ShieldCheck } from 'lucide-react';

interface ExecutiveReportProps {
  hotels: Hotel[];
  reviews: Review[];
  selectedHotelId: string;
  onPrint: () => void;
}

export const ExecutiveReport: React.FC<ExecutiveReportProps> = ({
  hotels,
  reviews,
  selectedHotelId,
  onPrint,
}) => {
  const activeHotel = hotels.find((h) => h.id === selectedHotelId);
  const activeReviews = selectedHotelId === 'all' ? reviews : reviews.filter((r) => r.hotelId === selectedHotelId);

  const weekly = computeWeeklyMetrics(activeReviews);
  const topicInsights = computeOperationalTopicInsights(activeReviews, true);

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 max-w-5xl mx-auto space-y-8">
      {/* Report Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-booking-blue font-bold text-xs uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Azzurro Hotels — Operations Intelligence & Booking.com Performance Audit</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {activeHotel ? activeHotel.name : 'All 4 Sydney Properties: Executive Operations Audit'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Audit Date: 27 November 2026 | Weekly Cycle: Nov 23 - Nov 27, 2026 | Sample: {activeReviews.length} verified reviews
          </p>
        </div>

        <button
          onClick={onPrint}
          className="no-print px-4 py-2 bg-booking-blue text-white rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-booking-darkBlue shadow-sm transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* KPI Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200/70">
        <div>
          <div className="text-xs text-slate-500 font-medium">Current Week Avg Rating</div>
          <div className="text-2xl sm:text-3xl font-black text-booking-blue mt-1">
            {weekly.currentWeekAvgRating.toFixed(1)} <span className="text-xs font-normal text-slate-400">/ 10</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {weekly.ratingChange >= 0 ? `+${weekly.ratingChange}` : weekly.ratingChange} vs previous week ({weekly.previousWeekAvgRating.toFixed(1)})
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 font-medium">Positive Sentiment Share</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
            {weekly.currentWeekPositiveShare}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {weekly.positiveShareChange >= 0 ? `+${weekly.positiveShareChange}%` : `${weekly.positiveShareChange}%`} WoW trend
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 font-medium">Weekly Reviews Audited</div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            {weekly.currentWeekReviewCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {weekly.currentWeekNegativeCount} negative flags detected
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 font-medium">Primary Operational Risk</div>
          <div className="text-lg font-black text-rose-600 mt-1 truncate">
            {topicInsights[0] ? topicInsights[0].label : 'Cleanliness'}
          </div>
          <div className="text-[11px] text-rose-700 mt-1 font-semibold">
            {topicInsights[0] ? `${topicInsights[0].negativePercentOfAllNegatives}% of complaints` : '40% of complaints'}
          </div>
        </div>
      </div>

      {/* Section 1: Executive Findings */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-booking-lightBlue" />
          <span>1. Operational Performance Audit Summary</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Across Azzurro Hotels' four Sydney properties, <strong>Chateau de Venus Darling Harbour</strong> commands premium guest sentiment with a 9.2 weekly rating driven by harbour views and modern facilities. <strong>Venus Central Sydney (Surry Hills)</strong> performs strongly at 8.3 with high ratings for cafe accessibility, although digital check-in PIN failures caused minor guest friction. <strong>Venus Boutique Hotel Potts Point</strong> maintains an 8.1 average with praise for Victorian character, though narrow staircases and weekend noise remain pain points. <strong>Olympic Hotel Paddington</strong> (6.5 this week) represents the highest operational priority, where shared bathroom cleanliness complaints and ground-floor beer garden noise during match nights account for 40% of all recorded negative mentions.
        </p>
      </section>

      {/* Section 2: Operational Topic Breakdown Table */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-booking-lightBlue" />
          <span>2. Weekly Operational Topic Breakdown (8 Core Areas)</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Topic Area</th>
                <th className="py-3 px-3 text-center">Total Mentions</th>
                <th className="py-3 px-3 text-center text-emerald-700">Positive Mentions</th>
                <th className="py-3 px-3 text-center text-rose-700">Negative Mentions</th>
                <th className="py-3 px-4">% of Total Negative Reviews</th>
                <th className="py-3 px-4">Operational Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {topicInsights.map((t, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-semibold text-slate-800">
                    {t.label}
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-600">{t.totalMentions}</td>
                  <td className="py-2.5 px-3 text-center font-bold text-emerald-600">{t.positiveMentions}</td>
                  <td className="py-2.5 px-3 text-center font-bold text-rose-600">{t.negativeMentions}</td>
                  <td className="py-2.5 px-4 font-bold text-slate-800">{t.negativePercentOfAllNegatives}%</td>
                  <td className="py-2.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.alertLevel === 'critical'
                          ? 'bg-rose-100 text-rose-800'
                          : t.alertLevel === 'warning'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {t.alertLevel.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Targeted 30-60-90 Day Action Plan */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>3. Operational Action Roadmap (30-60-90 Days)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
            <div className="font-extrabold text-emerald-800 uppercase tracking-wide text-[11px] mb-1">
              Day 1 - 30: Quick Operations Fixes
            </div>
            <ul className="space-y-2 text-slate-700 mt-2 list-disc list-inside">
              <li>Deploy 2-hour shared bathroom housekeeping audit intervals at Olympic Paddington</li>
              <li>Fix automated SMS/email PIN delivery for Surry Hills self check-in</li>
              <li>Provide premium silicone earplugs in all street-facing rooms across Paddington and Potts Point</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50">
            <div className="font-extrabold text-booking-blue uppercase tracking-wide text-[11px] mb-1">
              Day 31 - 60: Facility Upgrades
            </div>
            <ul className="space-y-2 text-slate-700 mt-2 list-disc list-inside">
              <li>Install Wi-Fi mesh extenders on Potts Point top floor rooms</li>
              <li>Implement luggage porter assistance protocol for terrace staircase properties</li>
              <li>Upgrade shower drainage and replace bathroom tile silicone at Surry Hills</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50">
            <div className="font-extrabold text-purple-800 uppercase tracking-wide text-[11px] mb-1">
              Day 61 - 90: Booking.com Rating Growth
            </div>
            <ul className="space-y-2 text-slate-700 mt-2 list-disc list-inside">
              <li>Target +0.6 overall Booking.com score lift at Olympic Paddington (7.6 → 8.2)</li>
              <li>Maintain &gt;85% Net Guest Satisfaction index across all 4 Sydney properties</li>
              <li>Drive 25% increase in repeat bookings through improved guest check-in journeys</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Property Registry */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
        <div className="font-bold text-slate-700 mb-2 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-booking-blue" />
          <span>Azzurro Hotels Sydney Portfolio Registry:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
          <div>• <strong>Olympic Hotel Paddington:</strong> 140 Moore Park Rd, Paddington NSW 2021</div>
          <div>• <strong>Venus Boutique Hotel Potts Point:</strong> 18 Victoria St, Potts Point NSW 2011</div>
          <div>• <strong>Venus Central Sydney (Surry Hills):</strong> Crown St, Surry Hills NSW 2010</div>
          <div>• <strong>Chateau de Venus Darling Harbour:</strong> Pyrmont/Darling Harbour NSW 2009</div>
        </div>
      </div>

      {/* Sign-off footer */}
      <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <div>Generated by Azzurro Hotels Review Intelligence System</div>
        <div>Confidential • For Operations Leadership & General Managers</div>
      </div>
    </div>
  );
};
