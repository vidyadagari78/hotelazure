import React, { useState, useMemo } from 'react';
import { Review, SentimentType, TravelerType, OperationalTopic, DateFilterType, Hotel } from '../types';
import { Search, ThumbsUp, ThumbsDown, Calendar, User, Tag, RotateCcw, ExternalLink } from 'lucide-react';
import { OPERATIONAL_TOPICS } from '../utils/sentiment';

interface ReviewsExplorerProps {
  reviews: Review[];
  hotels: Hotel[];
  initialTopicFilter?: string;
}

export const ReviewsExplorer: React.FC<ReviewsExplorerProps> = ({
  reviews,
  hotels,
  initialTopicFilter = 'all',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState<'all' | SentimentType>('all');
  const [travelerFilter, setTravelerFilter] = useState<'all' | TravelerType>('all');
  const [topicFilter, setTopicFilter] = useState<string>(initialTopicFilter);
  const [hotelFilter, setHotelFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<DateFilterType>('all-time');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'rating-desc' | 'rating-asc'>('date-desc');

  // Filtered & Sorted Reviews
  const filteredReviews = useMemo(() => {
    return reviews
      .filter((r) => {
        // Hotel filter
        if (hotelFilter !== 'all' && r.hotelId !== hotelFilter) {
          return false;
        }
        // Date filter
        if (dateFilter === 'current-week' && !(r.date >= '2026-11-23' && r.date <= '2026-11-27')) {
          return false;
        }
        if (dateFilter === 'previous-week' && !(r.date >= '2026-11-16' && r.date <= '2026-11-22')) {
          return false;
        }
        if (dateFilter === 'last-30-days' && !(r.date >= '2026-10-28' && r.date <= '2026-11-27')) {
          return false;
        }
        // Sentiment filter
        if (sentimentFilter !== 'all' && r.sentiment.overall !== sentimentFilter) {
          return false;
        }
        // Traveler filter
        if (travelerFilter !== 'all' && r.travelerType !== travelerFilter) {
          return false;
        }
        // Topic filter
        if (topicFilter !== 'all' && !r.sentiment.detectedTopics.includes(topicFilter as OperationalTopic)) {
          return false;
        }
        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchTitle = r.title.toLowerCase().includes(q);
          const matchPos = r.positiveText.toLowerCase().includes(q);
          const matchNeg = r.negativeText.toLowerCase().includes(q);
          const matchAuthor = r.author.toLowerCase().includes(q);
          const matchHotel = r.hotelName.toLowerCase().includes(q);
          if (!matchTitle && !matchPos && !matchNeg && !matchAuthor && !matchHotel) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (sortBy === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
        if (sortBy === 'rating-desc') return b.rating - a.rating;
        if (sortBy === 'rating-asc') return a.rating - b.rating;
        return 0;
      });
  }, [reviews, searchQuery, sentimentFilter, travelerFilter, topicFilter, hotelFilter, dateFilter, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSentimentFilter('all');
    setTravelerFilter('all');
    setTopicFilter('all');
    setHotelFilter('all');
    setDateFilter('all-time');
    setSortBy('date-desc');
  };

  const getScoreColor = (rating: number) => {
    if (rating >= 9.0) return 'bg-emerald-600 text-white';
    if (rating >= 8.0) return 'bg-booking-blue text-white';
    if (rating >= 7.0) return 'bg-blue-600 text-white';
    if (rating >= 6.0) return 'bg-amber-500 text-slate-900';
    return 'bg-rose-600 text-white';
  };

  const getHotelBookingUrl = (hotelId: string) => {
    const hotel = hotels.find(h => h.id === hotelId);
    return hotel ? hotel.bookingUrl : 'https://www.booking.com';
  };

  return (
    <div className="space-y-5">
      {/* Search and Filters Bar */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/80 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reviews (e.g. bathroom, keycode, noise, SCG, stairs, coffee, wifi)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-booking-lightBlue text-slate-800 placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2 border-t border-slate-100 text-xs">
          {/* Property Filter */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Property:</label>
            <select
              value={hotelFilter}
              onChange={(e) => setHotelFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-booking-lightBlue"
            >
              <option value="all">All 4 Properties</option>
              {hotels.map(h => (
                <option key={h.id} value={h.id}>{h.suburb} ({h.name})</option>
              ))}
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Time Period:</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as DateFilterType)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-booking-lightBlue"
            >
              <option value="all-time">All Dates</option>
              <option value="current-week">Current Week (Nov 23–27)</option>
              <option value="previous-week">Previous Week (Nov 16–22)</option>
              <option value="last-30-days">Last 30 Days</option>
            </select>
          </div>

          {/* Operational Topic Filter */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Operational Topic:</label>
            <select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-booking-lightBlue"
            >
              <option value="all">All Topics (8/8)</option>
              {OPERATIONAL_TOPICS.map(t => (
                <option key={t.key} value={t.key}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Sentiment Filter */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Sentiment:</label>
            <select
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-booking-lightBlue"
            >
              <option value="all">All Sentiments</option>
              <option value="positive">Positive Only (😊)</option>
              <option value="neutral">Neutral Only (😐)</option>
              <option value="negative">Negative Only (😡)</option>
            </select>
          </div>

          {/* Traveler Type Filter */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Traveler Type:</label>
            <select
              value={travelerFilter}
              onChange={(e) => setTravelerFilter(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-booking-lightBlue"
            >
              <option value="all">All Travelers</option>
              <option value="Couple">Couples</option>
              <option value="Business">Business</option>
              <option value="Solo">Solo</option>
              <option value="Family">Families</option>
              <option value="Group">Groups</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Sort Order:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-booking-lightBlue"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="rating-desc">Highest Rating</option>
              <option value="rating-asc">Lowest Rating</option>
            </select>
          </div>
        </div>

        {/* Counter and Reset */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500">
            Showing <strong className="text-slate-900">{filteredReviews.length}</strong> of {reviews.length} reviews
          </span>
          {(searchQuery || sentimentFilter !== 'all' || travelerFilter !== 'all' || topicFilter !== 'all' || hotelFilter !== 'all' || dateFilter !== 'all-time') && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-800 font-semibold px-2 py-0.5"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Reviews Cards List */}
      {filteredReviews.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
          <p className="text-slate-500 text-sm">No reviews found matching the current search filters.</p>
          <button
            onClick={resetFilters}
            className="mt-3 px-4 py-2 rounded-lg bg-booking-blue text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((rev) => {
            const isPos = rev.sentiment.overall === 'positive';
            const isNeg = rev.sentiment.overall === 'negative';

            return (
              <div
                key={rev.id}
                className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/80 hover:border-slate-300 transition-all space-y-3"
              >
                {/* Header Row: Score + Title + Property */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className={`px-2.5 py-1 rounded-lg font-black text-sm shadow-sm ${getScoreColor(rev.rating)}`}>
                      {rev.rating.toFixed(1)}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 leading-snug">
                        "{rev.title}"
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                        <span className="font-bold text-booking-darkBlue">{rev.hotelName}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-400" />
                          <span>{rev.author}</span>
                        </span>
                        <span>•</span>
                        <span>{rev.country}</span>
                        <span>•</span>
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                          {rev.travelerType}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sentiment Pill & External Booking.com Link */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                        isPos
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : isNeg
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {isPos ? '😊 Positive' : isNeg ? '😡 Negative' : '😐 Neutral'} ({rev.sentiment.positivePercentage}%)
                    </span>
                    <a
                      href={getHotelBookingUrl(rev.hotelId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-400 hover:text-booking-blue rounded hover:bg-slate-100"
                      title="View Property on Booking.com"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Positive "Liked" Section */}
                {rev.positiveText && (
                  <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-100 flex items-start gap-2.5 text-xs text-slate-800">
                    <ThumbsUp className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-800 block text-[11px] uppercase tracking-wider mb-0.5">
                        What Guest Liked
                      </span>
                      <p className="leading-relaxed">{rev.positiveText}</p>
                    </div>
                  </div>
                )}

                {/* Negative "Disliked" Section */}
                {rev.negativeText && (
                  <div className="p-3 rounded-lg bg-rose-50/70 border border-rose-100 flex items-start gap-2.5 text-xs text-slate-800">
                    <ThumbsDown className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-rose-800 block text-[11px] uppercase tracking-wider mb-0.5">
                        What Guest Disliked (Operational Issue)
                      </span>
                      <p className="leading-relaxed">{rev.negativeText}</p>
                    </div>
                  </div>
                )}

                {/* Footer metadata: Stay info and Detected Operational Topics */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-semibold text-slate-600">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{rev.date}</span>
                    </span>
                    <span>•</span>
                    <span>{rev.stayDuration}</span>
                    <span>•</span>
                    <span className="italic">{rev.roomType}</span>
                  </div>

                  {/* Operational Topic Badges */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {rev.sentiment.detectedTopics.map((topic, tIdx) => (
                      <span
                        key={tIdx}
                        onClick={() => setTopicFilter(topic)}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-0.5 cursor-pointer hover:bg-slate-200 transition-colors ${
                          topic === 'cleanliness'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : topic === 'noise'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Tag className="w-2.5 h-2.5" />
                        <span>#{topic}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
