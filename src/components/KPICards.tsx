import React from 'react';
import { Star, TrendingUp, TrendingDown, MessageSquareText, ThumbsUp, AlertTriangle, ShieldCheck } from 'lucide-react';
import { WeeklyMetrics, TopicInsight } from '../types';

interface KPICardsProps {
  weeklyMetrics: WeeklyMetrics;
  topTopicInsight?: TopicInsight;
  hotelName?: string;
}

export const KPICards: React.FC<KPICardsProps> = ({
  weeklyMetrics,
  topTopicInsight,
  hotelName,
}) => {
  const isRatingUp = weeklyMetrics.ratingChange >= 0;
  const isPosShareUp = weeklyMetrics.positiveShareChange >= 0;

  const getScoreBadgeColor = (rating: number) => {
    if (rating >= 9.0) return 'bg-emerald-600 text-white';
    if (rating >= 8.0) return 'bg-booking-blue text-white';
    if (rating >= 7.0) return 'bg-blue-600 text-white';
    if (rating >= 6.0) return 'bg-amber-500 text-slate-900';
    return 'bg-rose-600 text-white';
  };

  return (
    <section className="mb-6">
      {/* Header bar displaying target property context */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-booking-lightBlue" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            {hotelName || 'All 4 Sydney Properties (Consolidated Overview)'}
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-semibold border border-amber-200">
            Current Week: Nov 23 - Nov 27, 2026
          </span>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-500 hidden sm:inline">
            Compared to Previous Week (Nov 16 - Nov 22)
          </span>
        </div>
      </div>

      {/* 5 Operational KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Current Week Average Rating */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 tracking-wide">
              Current Week Avg Rating
            </span>
            <div className="p-2 bg-amber-50 text-amber-500 rounded-lg group-hover:bg-amber-400 group-hover:text-slate-900 transition-colors">
              <Star className="w-4 h-4 fill-current" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2.5">
            <span className={`text-2xl sm:text-3xl font-black px-2.5 py-0.5 rounded-lg shadow-sm ${getScoreBadgeColor(weeklyMetrics.currentWeekAvgRating)}`}>
              {weeklyMetrics.currentWeekAvgRating.toFixed(1)}
            </span>
            <div className="text-xs">
              <div className="font-bold text-slate-800">
                {weeklyMetrics.currentWeekAvgRating >= 8.5 ? 'Very Good' : weeklyMetrics.currentWeekAvgRating >= 7.5 ? 'Good' : 'Pleasant'}
              </div>
              <div className="text-slate-400">Scale of 1.0 – 10.0</div>
            </div>
          </div>
          {/* Week-over-Week Indicator */}
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">vs Previous Week:</span>
            <span className={`font-bold flex items-center gap-1 ${isRatingUp ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isRatingUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{isRatingUp ? `+${weeklyMetrics.ratingChange}` : weeklyMetrics.ratingChange}</span>
              <span className="text-slate-400 font-normal">({weeklyMetrics.previousWeekAvgRating.toFixed(1)})</span>
            </span>
          </div>
        </div>

        {/* Card 2: Previous Week Benchmark */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 tracking-wide">
              Previous Week Rating
            </span>
            <div className="p-2 bg-blue-50 text-booking-blue rounded-lg">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              {weeklyMetrics.previousWeekAvgRating.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ 10.0</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Period: Nov 16–22</span>
            <span className="font-medium text-slate-600">{weeklyMetrics.previousWeekReviewCount} reviews</span>
          </div>
        </div>

        {/* Card 3: Current Week Reviews Count */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 tracking-wide">
              Reviews This Week
            </span>
            <div className="p-2 bg-blue-50 text-booking-blue rounded-lg group-hover:bg-booking-blue group-hover:text-white transition-colors">
              <MessageSquareText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              {weeklyMetrics.currentWeekReviewCount}
            </span>
            <span className="text-xs text-slate-400 font-medium">reviews</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">WoW Volume:</span>
            <span className="font-semibold text-booking-lightBlue">
              {weeklyMetrics.reviewCountChange >= 0 ? `+${weeklyMetrics.reviewCountChange}` : weeklyMetrics.reviewCountChange} vs last week
            </span>
          </div>
        </div>

        {/* Card 4: Positive Sentiment Share Trend */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 tracking-wide">
              Positive Sentiment Share
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <ThumbsUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
              {weeklyMetrics.currentWeekPositiveShare}%
            </span>
            <span className="text-xs text-slate-400 font-medium">
              ({weeklyMetrics.currentWeekNegativeCount} negatives)
            </span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">WoW Trend:</span>
            <span className={`font-bold flex items-center gap-1 ${isPosShareUp ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isPosShareUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{isPosShareUp ? `+${weeklyMetrics.positiveShareChange}%` : `${weeklyMetrics.positiveShareChange}%`}</span>
            </span>
          </div>
        </div>

        {/* Card 5: Operational Priority Risk Alert */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group border-l-4 border-l-rose-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-700 tracking-wide flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Top Operational Issue</span>
            </span>
          </div>
          <div className="mt-2">
            <span className="text-lg font-black text-slate-900 block truncate">
              {topTopicInsight ? topTopicInsight.label : 'Cleanliness'}
            </span>
            <p className="text-xs text-rose-600 font-semibold mt-0.5">
              {topTopicInsight ? `${topTopicInsight.negativePercentOfAllNegatives}% of negative reviews` : '40% of negative reviews'}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500 truncate">
            Requires housekeeping supervisor audit
          </div>
        </div>
      </div>
    </section>
  );
};
