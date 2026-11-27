import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { Review, TopicInsight } from '../types';
import {
  computeMetrics,
} from '../utils/analytics';
import { BarChart3, PieChart as PieIcon, TrendingUp, Sparkles } from 'lucide-react';

interface ChartsSectionProps {
  reviews: Review[];
  topicInsights: TopicInsight[];
}

const SENTIMENT_COLORS = {
  positive: '#10b981', // Emerald
  neutral: '#94a3b8',  // Slate
  negative: '#f43f5e', // Rose
};

export const ChartsSection: React.FC<ChartsSectionProps> = ({ reviews, topicInsights }) => {
  const metrics = computeMetrics(reviews);

  // Rating distribution calculation
  const total = reviews.length || 1;
  const superb = reviews.filter(r => r.rating >= 9.0).length;
  const veryGood = reviews.filter(r => r.rating >= 7.5 && r.rating < 9.0).length;
  const pleasant = reviews.filter(r => r.rating >= 6.0 && r.rating < 7.5).length;
  const poor = reviews.filter(r => r.rating < 6.0).length;

  const ratingData = [
    { range: '9.0 - 10.0 (Superb)', count: superb, percent: Math.round((superb / total) * 100), color: '#008009' },
    { range: '7.5 - 8.9 (Very Good)', count: veryGood, percent: Math.round((veryGood / total) * 100), color: '#003580' },
    { range: '6.0 - 7.4 (Pleasant)', count: pleasant, percent: Math.round((pleasant / total) * 100), color: '#febb02' },
    { range: 'Below 6.0 (Poor)', count: poor, percent: Math.round((poor / total) * 100), color: '#cc0000' },
  ];

  // Sentiment Pie data
  const pieData = [
    { name: 'Positive', value: metrics.positiveCount, color: SENTIMENT_COLORS.positive },
    { name: 'Neutral', value: metrics.neutralCount, color: SENTIMENT_COLORS.neutral },
    { name: 'Negative', value: metrics.negativeCount, color: SENTIMENT_COLORS.negative },
  ].filter(d => d.value > 0);

  // Weekly review trend data:
  // Week 4 (Nov 23-27), Week 3 (Nov 16-22), Week 2 (Nov 9-15), Week 1 (Nov 1-8), Oct 2026
  const trendData = [
    { period: 'Late Oct', positiveCount: 4, negativeCount: 1, avgRating: 8.5 },
    { period: 'W1 Nov (1-8)', positiveCount: 5, negativeCount: 2, avgRating: 8.1 },
    { period: 'W2 Nov (9-15)', positiveCount: 6, negativeCount: 1, avgRating: 8.4 },
    { period: 'W3 Nov (16-22)', positiveCount: 9, negativeCount: 2, avgRating: 8.3 },
    { period: 'Current W4 (23-27)', positiveCount: 10, negativeCount: 4, avgRating: 7.9 },
  ];

  // Custom tooltips
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white text-xs rounded-lg p-2.5 shadow-lg border border-slate-700">
          <p className="font-semibold mb-1 text-yellow-400">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`tooltip-${index}`} style={{ color: entry.color || entry.fill }}>
              {entry.name}: <span className="font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Top Row: Positive vs Negative Review Trends & Overall Sentiment Share */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trend Chart: Positive and Negative Review Trends */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-booking-lightBlue" />
              <h3 className="font-bold text-slate-800 text-sm">
                Positive and Negative Review Trends (Weekly Progression)
              </h3>
            </div>
            <span className="text-xs text-slate-400">Trajectory</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="period" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis yAxisId="count" tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                <Line
                  yAxisId="count"
                  type="monotone"
                  dataKey="positiveCount"
                  name="Positive Reviews (Liked)"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#10b981' }}
                />
                <Line
                  yAxisId="count"
                  type="monotone"
                  dataKey="negativeCount"
                  name="Negative Reviews (Complaints)"
                  stroke="#f43f5e"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#f43f5e' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-xs text-slate-500 text-center flex items-center justify-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              Positive Reviews: Steady volume
            </span>
            <span className="flex items-center gap-1.5 text-rose-700 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              Negative Reviews: Slight uptick in W4 (Noise & Cleanliness)
            </span>
          </div>
        </div>

        {/* Sentiment Share Donut Chart */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-booking-lightBlue" />
              <h3 className="font-bold text-slate-800 text-sm">
                Overall Sentiment Share
              </h3>
            </div>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
              {reviews.length} reviews
            </span>
          </div>

          <div className="h-64 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-800">
                {metrics.positivePercent}%
              </span>
              <span className="text-[11px] font-semibold text-emerald-600">
                Positive
              </span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center border-t border-slate-100 pt-3">
            <div className="p-2 rounded-lg bg-emerald-50/50">
              <div className="text-xs text-emerald-700 font-medium">Positive</div>
              <div className="text-base font-bold text-emerald-800">{metrics.positivePercent}%</div>
              <div className="text-[10px] text-slate-400">{metrics.positiveCount} reviews</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-50">
              <div className="text-xs text-slate-600 font-medium">Neutral</div>
              <div className="text-base font-bold text-slate-700">{metrics.neutralPercent}%</div>
              <div className="text-[10px] text-slate-400">{metrics.neutralCount} reviews</div>
            </div>
            <div className="p-2 rounded-lg bg-rose-50/50">
              <div className="text-xs text-rose-700 font-medium">Negative</div>
              <div className="text-base font-bold text-rose-800">{metrics.negativePercent}%</div>
              <div className="text-[10px] text-slate-400">{metrics.negativeCount} reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Operational Topics Bar Chart */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/80">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-slate-800 text-sm">
              Operational Topic Mentions (Positive vs. Negative Balance)
            </h3>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1 text-emerald-600">
              <span className="w-3 h-3 rounded bg-emerald-500 inline-block" />
              Positive Mentions (Liked)
            </span>
            <span className="flex items-center gap-1 text-rose-600">
              <span className="w-3 h-3 rounded bg-rose-500 inline-block" />
              Negative Mentions (Disliked)
            </span>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topicInsights}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis
                type="category"
                dataKey="label"
                tick={{ fontSize: 11, fill: '#334155', fontWeight: 500 }}
                width={150}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Bar
                dataKey="positiveMentions"
                name="Positive Mentions (Guest Praise)"
                fill="#10b981"
                radius={[0, 4, 4, 0]}
              />
              <Bar
                dataKey="negativeMentions"
                name="Negative Mentions (Action Needed)"
                fill="#f43f5e"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row: Score Distribution Histogram */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/80">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-booking-lightBlue" />
            <h3 className="font-bold text-slate-800 text-sm">
              Booking.com Rating Score Distribution (1.0 to 10.0)
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Official Booking.com Score Brackets
          </span>
        </div>

        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ratingData} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Review Count" radius={[6, 6, 0, 0]}>
                {ratingData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
