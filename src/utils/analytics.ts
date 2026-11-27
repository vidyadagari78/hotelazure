import { Review, Hotel, WeeklyMetrics, TopicInsight, DateFilterType } from '../types';
import { OPERATIONAL_TOPICS } from './sentiment';

// Current reference date (Trial context: Friday, Nov 27, 2026)
export const REFERENCE_DATE = '2026-11-27';

// Date ranges
export const CURRENT_WEEK_START = '2026-11-23';
export const CURRENT_WEEK_END = '2026-11-27';
export const PREVIOUS_WEEK_START = '2026-11-16';
export const PREVIOUS_WEEK_END = '2026-11-22';

export interface OverviewMetrics {
  totalReviews: number;
  averageRating: number;
  positiveCount: number;
  neutralCount: number;
  negativeCount: number;
  positivePercent: number;
  neutralPercent: number;
  negativePercent: number;
  satisfactionIndex: number;
}

export function filterReviewsByDate(reviews: Review[], dateFilter: DateFilterType): Review[] {
  if (dateFilter === 'all-time') return reviews;

  return reviews.filter(r => {
    if (dateFilter === 'current-week') {
      return r.date >= CURRENT_WEEK_START && r.date <= CURRENT_WEEK_END;
    }
    if (dateFilter === 'previous-week') {
      return r.date >= PREVIOUS_WEEK_START && r.date <= PREVIOUS_WEEK_END;
    }
    if (dateFilter === 'last-30-days') {
      return r.date >= '2026-10-28' && r.date <= CURRENT_WEEK_END;
    }
    return true;
  });
}

export function computeWeeklyMetrics(reviews: Review[]): WeeklyMetrics {
  const currentWeekReviews = reviews.filter(r => r.date >= CURRENT_WEEK_START && r.date <= CURRENT_WEEK_END);
  const previousWeekReviews = reviews.filter(r => r.date >= PREVIOUS_WEEK_START && r.date <= PREVIOUS_WEEK_END);

  const currentCount = currentWeekReviews.length;
  const previousCount = previousWeekReviews.length;

  const currentAvg = currentCount > 0
    ? Number((currentWeekReviews.reduce((sum, r) => sum + r.rating, 0) / currentCount).toFixed(1))
    : 0;

  const prevAvg = previousCount > 0
    ? Number((previousWeekReviews.reduce((sum, r) => sum + r.rating, 0) / previousCount).toFixed(1))
    : 0;

  const ratingChange = previousCount > 0 ? Number((currentAvg - prevAvg).toFixed(1)) : 0;

  const currentPos = currentWeekReviews.filter(r => r.sentiment.overall === 'positive').length;
  const prevPos = previousWeekReviews.filter(r => r.sentiment.overall === 'positive').length;

  const currentPosShare = currentCount > 0 ? Math.round((currentPos / currentCount) * 100) : 0;
  const prevPosShare = previousCount > 0 ? Math.round((prevPos / previousCount) * 100) : 0;
  const posShareChange = currentPosShare - prevPosShare;

  const currentNegCount = currentWeekReviews.filter(r => r.sentiment.overall === 'negative').length;
  const prevNegCount = previousWeekReviews.filter(r => r.sentiment.overall === 'negative').length;

  return {
    currentWeekAvgRating: currentAvg,
    previousWeekAvgRating: prevAvg,
    ratingChange,
    currentWeekReviewCount: currentCount,
    previousWeekReviewCount: previousCount,
    reviewCountChange: currentCount - previousCount,
    currentWeekPositiveShare: currentPosShare,
    previousWeekPositiveShare: prevPosShare,
    positiveShareChange: posShareChange,
    currentWeekNegativeCount: currentNegCount,
    previousWeekNegativeCount: prevNegCount,
  };
}

export function computeOperationalTopicInsights(reviews: Review[], currentWeekOnly = true): TopicInsight[] {
  const targetReviews = currentWeekOnly
    ? reviews.filter(r => r.date >= CURRENT_WEEK_START && r.date <= CURRENT_WEEK_END)
    : reviews;

  const totalNegativeReviews = targetReviews.filter(r => r.sentiment.overall === 'negative' || r.rating <= 6.5).length || 1;

  return OPERATIONAL_TOPICS.map(topic => {
    let totalMentions = 0;
    let positiveMentions = 0;
    let negativeMentions = 0;
    let exampleSnippet = '';

    targetReviews.forEach(r => {
      const hasTopic = r.sentiment.detectedTopics.includes(topic.key);
      if (hasTopic) {
        totalMentions++;
        const posHit = topic.keywords.some(k => r.positiveText.toLowerCase().includes(k));
        const negHit = topic.keywords.some(k => r.negativeText.toLowerCase().includes(k));

        if (negHit || r.sentiment.overall === 'negative') {
          negativeMentions++;
          if (!exampleSnippet && r.negativeText.length > 15) {
            exampleSnippet = r.negativeText;
          }
        } else if (posHit || r.sentiment.overall === 'positive') {
          positiveMentions++;
          if (!exampleSnippet && r.positiveText.length > 15) {
            exampleSnippet = r.positiveText;
          }
        }
      }
    });

    const negativePercentOfAllNegatives = Math.round((negativeMentions / totalNegativeReviews) * 100);

    let alertLevel: 'critical' | 'warning' | 'stable' = 'stable';
    if (negativePercentOfAllNegatives >= 30) {
      alertLevel = 'critical';
    } else if (negativePercentOfAllNegatives >= 15) {
      alertLevel = 'warning';
    }

    return {
      topic: topic.key,
      label: topic.label,
      totalMentions,
      positiveMentions,
      negativeMentions,
      negativePercentOfAllNegatives,
      alertLevel,
      exampleSnippet: exampleSnippet || 'No recurring issues reported for this period.',
    };
  }).sort((a, b) => b.negativePercentOfAllNegatives - a.negativePercentOfAllNegatives);
}

export function computeMetrics(reviews: Review[]): OverviewMetrics {
  const total = reviews.length;
  if (total === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      positiveCount: 0,
      neutralCount: 0,
      negativeCount: 0,
      positivePercent: 0,
      neutralPercent: 0,
      negativePercent: 0,
      satisfactionIndex: 0,
    };
  }

  const sumRating = reviews.reduce((acc, r) => acc + r.rating, 0);
  const positiveCount = reviews.filter(r => r.sentiment.overall === 'positive').length;
  const negativeCount = reviews.filter(r => r.sentiment.overall === 'negative').length;
  const neutralCount = reviews.filter(r => r.sentiment.overall === 'neutral').length;

  const averageRating = Number((sumRating / total).toFixed(1));
  const positivePercent = Math.round((positiveCount / total) * 100);
  const negativePercent = Math.round((negativeCount / total) * 100);
  const neutralPercent = 100 - positivePercent - negativePercent;

  const sentimentNet = (positiveCount - negativeCount) / total;
  const ratingFactor = (averageRating - 5) / 5;
  const satisfactionIndex = Math.max(0, Math.min(100, Math.round(((sentimentNet * 0.5 + ratingFactor * 0.5 + 1) / 2) * 100)));

  return {
    totalReviews: total,
    averageRating,
    positiveCount,
    neutralCount,
    negativeCount,
    positivePercent,
    neutralPercent,
    negativePercent,
    satisfactionIndex,
  };
}

export function computePropertyBreakdown(hotels: Hotel[], reviews: Review[]) {
  return hotels.map(hotel => {
    const hotelReviews = reviews.filter(r => r.hotelId === hotel.id);
    const weeklyMetrics = computeWeeklyMetrics(hotelReviews);
    const overallMetrics = computeMetrics(hotelReviews);
    const topTopic = computeOperationalTopicInsights(hotelReviews, true)[0];

    return {
      hotel,
      currentWeekRating: weeklyMetrics.currentWeekAvgRating,
      previousWeekRating: weeklyMetrics.previousWeekAvgRating,
      ratingChange: weeklyMetrics.ratingChange,
      reviewCount: hotelReviews.length,
      currentWeekReviews: weeklyMetrics.currentWeekReviewCount,
      positiveShare: overallMetrics.positivePercent,
      topPainPoint: topTopic ? `${topTopic.label} (${topTopic.negativePercentOfAllNegatives}% of complaints)` : 'None reported',
    };
  });
}

export function exportReviewsToCSV(reviews: Review[]): void {
  const headers = [
    'Review ID', 'Property Name', 'Suburb', 'Author', 'Country', 'Traveler Type',
    'Stay Date', 'Rating (1-10)', 'Sentiment', 'Positive %', 'Operational Topics',
    'Review Title', 'What Guest Liked', 'What Guest Disliked'
  ];

  const rows = reviews.map(r => [
    `"${r.id}"`,
    `"${r.hotelName.replace(/"/g, '""')}"`,
    `"${r.hotelId === 'olympic-paddington' ? 'Paddington' : r.hotelId === 'venus-potts-point' ? 'Potts Point' : r.hotelId === 'venus-surry-hills' ? 'Surry Hills' : 'Darling Harbour'}"`,
    `"${r.author.replace(/"/g, '""')}"`,
    `"${r.country}"`,
    `"${r.travelerType}"`,
    `"${r.date}"`,
    r.rating.toFixed(1),
    `"${r.sentiment.overall.toUpperCase()}"`,
    `${r.sentiment.positivePercentage}%`,
    `"${r.sentiment.detectedTopics.join(', ')}"`,
    `"${r.title.replace(/"/g, '""')}"`,
    `"${r.positiveText.replace(/"/g, '""')}"`,
    `"${r.negativeText.replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `azzurro_hotels_booking_reviews_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
