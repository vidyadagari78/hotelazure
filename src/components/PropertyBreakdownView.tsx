import React from 'react';
import { Hotel, Review } from '../types';
import { computePropertyBreakdown } from '../utils/analytics';
import { ExternalLink, TrendingUp, TrendingDown, MapPin, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface PropertyBreakdownViewProps {
  hotels: Hotel[];
  reviews: Review[];
  onSelectHotel: (hotelId: string) => void;
}

export const PropertyBreakdownView: React.FC<PropertyBreakdownViewProps> = ({
  hotels,
  reviews,
  onSelectHotel,
}) => {
  const breakdownData = computePropertyBreakdown(hotels, reviews);

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-booking-lightBlue" />
            <span>Property-by-Property Performance Breakdown</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Weekly rating tracking, sub-category performance, and recurring operational issues across all 4 Sydney properties
          </p>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {breakdownData.map(({ hotel, currentWeekRating, previousWeekRating, ratingChange, currentWeekReviews, topPainPoint }) => {
          const isUp = ratingChange >= 0;

          return (
            <div
              key={hotel.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden flex flex-col hover:shadow-lg transition-all"
            >
              {/* Hotel Image & Price Header */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[11px] font-semibold">
                  <span>{hotel.suburb}, Sydney</span>
                </div>
                <div className="absolute bottom-2 right-2 bg-booking-darkBlue text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-md">
                  {hotel.pricePerNight} <span className="text-[10px] font-normal text-blue-200">/ night</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {hotel.name}
                  </h3>

                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{hotel.suburb}</span>
                    </span>
                    <a
                      href={hotel.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-booking-lightBlue hover:underline flex items-center gap-0.5"
                    >
                      <span>Booking.com</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Weekly Rating Box */}
                  <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200/70">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 block">
                          Current Week Rating
                        </span>
                        <div className="text-2xl font-black text-slate-900 mt-0.5">
                          {currentWeekRating.toFixed(1)} <span className="text-xs font-normal text-slate-400">/ 10</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block">vs Last Week</span>
                        <div className={`text-xs font-bold flex items-center justify-end gap-1 mt-0.5 ${isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                          <span>{isUp ? `+${ratingChange}` : ratingChange}</span>
                          <span className="text-slate-400 font-normal">({previousWeekRating.toFixed(1)})</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-500 border-t border-slate-200/60 pt-1.5 flex justify-between">
                      <span>{currentWeekReviews} reviews this week</span>
                      <span className="font-semibold text-booking-blue">Overall: {hotel.overallScore} ★</span>
                    </div>
                  </div>

                  {/* Sub-Category Scores Matrix */}
                  <div className="mt-4 space-y-1.5 text-xs">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                      Sub-Category Scores (/10)
                    </div>
                    {[
                      { label: 'Cleanliness', score: hotel.subScores.cleanliness },
                      { label: 'Staff', score: hotel.subScores.staff },
                      { label: 'Comfort', score: hotel.subScores.comfort },
                      { label: 'Location', score: hotel.subScores.location },
                      { label: 'Value', score: hotel.subScores.valueForMoney },
                      { label: 'Wi-Fi', score: hotel.subScores.freeWifi },
                    ].map((sub, sIdx) => (
                      <div key={sIdx} className="flex items-center justify-between">
                        <span className="text-slate-600">{sub.label}</span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                sub.score >= 8.5 ? 'bg-emerald-500' : sub.score >= 7.5 ? 'bg-booking-blue' : 'bg-amber-500'
                              }`}
                              style={{ width: `${(sub.score / 10) * 100}%` }}
                            />
                          </div>
                          <span className="font-bold text-slate-800 text-[11px] w-6 text-right">
                            {sub.score}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Primary Operational Pain Point */}
                  <div className="mt-4 p-2.5 rounded-lg bg-rose-50/70 border border-rose-100 text-xs">
                    <div className="flex items-start gap-1.5 text-rose-800 font-semibold text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <span>Top Weekly Issue: {topPainPoint}</span>
                    </div>
                  </div>
                </div>

                {/* Deep Dive Button */}
                <button
                  onClick={() => onSelectHotel(hotel.id)}
                  className="mt-4 w-full py-2 px-3 rounded-lg bg-booking-blue hover:bg-booking-darkBlue text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <span>Filter Reviews For This Property</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
