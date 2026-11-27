import React from 'react';
import { TopicInsight, OperationalTopic } from '../types';
import { AlertTriangle, CheckCircle2, AlertOctagon, Info, Sparkles, Filter } from 'lucide-react';

interface TopicInsightsProps {
  topicInsights: TopicInsight[];
  onSelectTopicFilter?: (topic: OperationalTopic) => void;
  selectedTopic?: string;
}

export const TopicInsights: React.FC<TopicInsightsProps> = ({
  topicInsights,
  onSelectTopicFilter,
  selectedTopic,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-booking-blue via-blue-900 to-indigo-950 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-yellow-300 text-xs font-semibold backdrop-blur-sm mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Operational Topic Intelligence</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Guest Review Insights & Operational Clustering
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-2 leading-relaxed">
            Automated topic-based sentiment extraction across 8 core hospitality operations dimensions. Identifies root causes of guest dissatisfaction to guide property general managers and front-line staff.
          </p>
        </div>
      </div>

      {/* Prominent Operational Callout Cards (Highlighting Required Example Insights) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topicInsights.slice(0, 3).map((insight, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border transition-all ${
              insight.alertLevel === 'critical'
                ? 'bg-rose-50/70 border-rose-200'
                : insight.alertLevel === 'warning'
                ? 'bg-amber-50/70 border-amber-200'
                : 'bg-emerald-50/70 border-emerald-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span
                className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  insight.alertLevel === 'critical'
                    ? 'bg-rose-200 text-rose-800'
                    : insight.alertLevel === 'warning'
                    ? 'bg-amber-200 text-amber-800'
                    : 'bg-emerald-200 text-emerald-800'
                }`}
              >
                {insight.alertLevel === 'critical' ? 'High Operational Risk' : insight.alertLevel === 'warning' ? 'Moderate Risk' : 'Healthy Performance'}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {insight.totalMentions} mentions
              </span>
            </div>

            {/* Exact Required Operational Insight Statement */}
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
              "{insight.negativePercentOfAllNegatives}% of negative reviews this week mentioned {insight.label.toLowerCase()} issues."
            </h3>

            <p className="text-xs text-slate-600 mt-2 italic bg-white/70 p-2 rounded-lg border border-slate-200/50">
              "{insight.exampleSnippet}"
            </p>

            {onSelectTopicFilter && (
              <button
                onClick={() => onSelectTopicFilter(insight.topic)}
                className="mt-3 w-full py-1.5 px-2 bg-white text-xs font-semibold text-slate-700 hover:text-booking-blue border border-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <Filter className="w-3 h-3 text-slate-400" />
                <span>Filter Feed for #{insight.topic}</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Complete 8 Operational Topics Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              Operational Topic Breakdown (All 8 Topics)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review volume, positive vs negative balance, and relative share of negative feedback
            </p>
          </div>
          <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
            Weekly Dataset: Nov 23 - Nov 27, 2026
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-100 rounded-lg overflow-hidden">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Operational Topic</th>
                <th className="py-3 px-3 text-center">Total Mentions</th>
                <th className="py-3 px-3 text-center text-emerald-700">Positive Mentions</th>
                <th className="py-3 px-3 text-center text-rose-700">Negative Mentions</th>
                <th className="py-3 px-4">% of All Negative Reviews</th>
                <th className="py-3 px-4">Status & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topicInsights.map((t, idx) => {
                const isSelected = selectedTopic === t.topic;

                return (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50 transition-colors ${isSelected ? 'bg-blue-50/60 font-semibold' : ''}`}
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-800 text-sm">{t.label}</div>
                      <div className="text-[11px] text-slate-400 font-normal">#{t.topic}</div>
                    </td>
                    <td className="py-3 px-3 text-center font-semibold text-slate-700">
                      {t.totalMentions}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-emerald-600">
                      {t.positiveMentions}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-rose-600">
                      {t.negativeMentions}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              t.negativePercentOfAllNegatives >= 30
                                ? 'bg-rose-500'
                                : t.negativePercentOfAllNegatives >= 15
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(100, t.negativePercentOfAllNegatives * 2)}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-900 w-10">
                          {t.negativePercentOfAllNegatives}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {t.alertLevel === 'critical' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-rose-100 text-rose-800">
                          <AlertOctagon className="w-3 h-3" />
                          <span>Critical Audit Needed</span>
                        </span>
                      ) : t.alertLevel === 'warning' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-100 text-amber-800">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Monitor Closely</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Satisfactory</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Methodology & Limitations Note for the Operations Team */}
        <div className="mt-4 p-3.5 rounded-lg bg-blue-50/70 border border-blue-200/70 text-xs text-slate-700 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-booking-blue shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-booking-darkBlue">Classification Methodology: </strong>
            Reviews are processed through a deterministic multi-label keyword and phrase matching engine with negation handling (e.g. <em>"not clean"</em> correctly assigns negative sentiment to Cleanliness).
            <span className="block mt-1 text-slate-600">
              <strong>Limitations:</strong> Keyword-based matching may occasionally capture neutral mentions (e.g., <em>"near the station"</em> without strong sentiment). For full edge-case nuance (sarcasm or idioms), this pipeline can be paired with an LLM verification pass in production.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
