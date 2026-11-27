export interface TranslationStrings {
  appTitle: string;
  appSubtitle: string;
  allHotels: string;
  compareMode: string;
  insightsTab: string;
  reviewsTab: string;
  reportTab: string;
  exportCsv: string;
  printReport: string;
  totalReviews: string;
  avgRating: string;
  positiveSentiment: string;
  negativeSentiment: string;
  neutralSentiment: string;
  npsScore: string;
  aspectsTitle: string;
  ratingDistribution: string;
  trendTitle: string;
  sentimentBreakdown: string;
  topStrengths: string;
  topComplaints: string;
  actionableInsights: string;
  filterBySentiment: string;
  filterByTraveler: string;
  filterByAspect: string;
  searchPlaceholder: string;
  liked: string;
  disliked: string;
  stayedFor: string;
  travelerTypeLabel: string;
  scoreOutOfTen: string;
  hotelComparison: string;
  cleanliness: string;
  staff: string;
  food: string;
  location: string;
  comfort: string;
  value: string;
  wifi: string;
  recommendationTitle: string;
  noReviewsMatch: string;
  resetFilters: string;
}

export const TRANSLATIONS: Record<'en' | 'kn', TranslationStrings> = {
  en: {
    appTitle: 'Booking.com 4-Hotel Reviews Analytics Dashboard',
    appSubtitle: 'Customer sentiment analysis, ratings breakdown, aspect insights & performance comparison',
    allHotels: 'All 4 Hotels (Overview)',
    compareMode: 'Multi-Hotel Comparison',
    insightsTab: 'Feedback Insights & AI Action Points',
    reviewsTab: 'Customer Reviews Explorer',
    reportTab: 'Executive Performance Report',
    exportCsv: 'Export CSV',
    printReport: 'Print / Save PDF',
    totalReviews: 'Total Reviews Analyzed',
    avgRating: 'Average Booking.com Rating',
    positiveSentiment: 'Positive Sentiment',
    negativeSentiment: 'Negative Sentiment',
    neutralSentiment: 'Neutral Sentiment',
    npsScore: 'Guest Satisfaction Index',
    aspectsTitle: 'Aspect-Based Sentiment Analysis',
    ratingDistribution: 'Rating Score Distribution',
    trendTitle: 'Monthly Rating & Sentiment Trends',
    sentimentBreakdown: 'Overall Sentiment Share',
    topStrengths: 'Key Strengths & Praises',
    topComplaints: 'Key Pain Points & Dislikes',
    actionableInsights: 'Strategic Hotel Management Recommendations',
    filterBySentiment: 'Sentiment Filter',
    filterByTraveler: 'Traveler Type',
    filterByAspect: 'Service Aspect',
    searchPlaceholder: 'Search reviews (e.g. food, clean, bed, staff, wifi)...',
    liked: 'What Guests Liked (Positive)',
    disliked: 'What Guests Disliked (Negative)',
    stayedFor: 'Stayed',
    travelerTypeLabel: 'Traveler',
    scoreOutOfTen: 'Score / 10',
    hotelComparison: 'Performance Comparison Across All 4 Hotels',
    cleanliness: 'Cleanliness & Hygiene',
    staff: 'Staff & Hospitality',
    food: 'Food & Dining',
    location: 'Location & Connectivity',
    comfort: 'Room Comfort & Sleep',
    value: 'Value for Money',
    wifi: 'Wi-Fi & Internet',
    recommendationTitle: 'Priority Recommendations to Boost Booking.com Ranking',
    noReviewsMatch: 'No reviews found matching the current search filters.',
    resetFilters: 'Reset All Filters',
  },
  kn: {
    appTitle: 'Booking.com 4 ಹೋಟೆಲ್‌ಗಳ ವಿಮರ್ಶೆಗಳ ವಿಶ್ಲೇಷಣಾ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    appSubtitle: 'ಗ್ರಾಹಕರ ಅಭಿಪ್ರಾಯ ವಿಶ್ಲೇಷಣೆ, ರೇಟಿಂಗ್‌ಗಳು, ಸೇವಾ ಅಂಶಗಳ ಒಳನೋಟ ಮತ್ತು ಹೋಟೆಲ್ ಹೋಲಿಕೆ',
    allHotels: 'ಎಲ್ಲಾ 4 ಹೋಟೆಲ್‌ಗಳು (ಅವಲೋಕನ)',
    compareMode: 'ಹೋಟೆಲ್‌ಗಳ ತುಲನಾತ್ಮಕ ನೋಟ',
    insightsTab: 'ಗ್ರಾಹಕರ ಒಳನೋಟಗಳು ಮತ್ತು ಸಲಹೆಗಳು',
    reviewsTab: 'ಗ್ರಾಹಕರ ವಿಮರ್ಶೆಗಳ ವಿವರ',
    reportTab: 'ಕಾರ್ಯನಿರ್ವಾಹಕ ವರದಿ (Executive Report)',
    exportCsv: 'CSV ಡೌನ್‌ಲೋಡ್',
    printReport: 'ವರದಿ ಮುದ್ರಿಸಿ / PDF',
    totalReviews: 'ಒಟ್ಟು ವಿಶ್ಲೇಷಿಸಿದ ವಿಮರ್ಶೆಗಳು',
    avgRating: 'ಸರಾಸರಿ Booking.com ರೇಟಿಂಗ್',
    positiveSentiment: 'ಧನಾತ್ಮಕ ವಿಮರ್ಶೆಗಳು (Positive)',
    negativeSentiment: 'ಋಣಾತ್ಮಕ ವಿಮರ್ಶೆಗಳು (Negative)',
    neutralSentiment: 'ತಟಸ್ಥ ವಿಮರ್ಶೆಗಳು (Neutral)',
    npsScore: 'ಗ್ರಾಹಕರ ತೃಪ್ತಿ ಸೂಚ್ಯಂಕ (Satisfaction)',
    aspectsTitle: 'ಸೇವಾ ಅಂಶಗಳ ಆಧಾರಿತ ವಿಮರ್ಶೆ ವಿಶ್ಲೇಷಣೆ',
    ratingDistribution: 'ರೇಟಿಂಗ್ ಅಂಕಗಳ ಹಂಚಿಕೆ',
    trendTitle: 'ಮಾಸಿಕ ರೇಟಿಂಗ್ ಮತ್ತು ಒಲವಿನ ಪ್ರವೃತ್ತಿ',
    sentimentBreakdown: 'ಭಾವನೆಗಳ ಒಟ್ಟು ಪಾಲು (Sentiment Share)',
    topStrengths: 'ಮುಖ್ಯಾಂಶಗಳು ಮತ್ತು ಮೆಚ್ಚುಗೆಗಳು',
    topComplaints: 'ದೂರುಗಳು ಮತ್ತು ಸುಧಾರಿಸಬೇಕಾದ ಅಂಶಗಳು',
    actionableInsights: 'ಹೋಟೆಲ್ ಆಡಳಿತ ಮಂಡಳಿಗೆ ಕಾರ್ಯತಂತ್ರದ ಶಿಫಾರಸುಗಳು',
    filterBySentiment: 'ಭಾವನೆಯ ಪ್ರಕಾರ ಫಿಲ್ಟರ್',
    filterByTraveler: 'ಪ್ರವಾಸಿಗರ ವರ್ಗ',
    filterByAspect: 'ಸೇವಾ ವಿಭಾಗ',
    searchPlaceholder: 'ವಿಮರ್ಶೆಗಳಲ್ಲಿ ಹುಡುಕಿ (ಉದಾ: ಆಹಾರ, ಸ್ವಚ್ಛತೆ, ಸಿಬ್ಬಂದಿ, ವೈ-ಫೈ)...',
    liked: 'ಗ್ರಾಹಕರು ಇಷ್ಟಪಟ್ಟ ಅಂಶಗಳು (Liked)',
    disliked: 'ಗ್ರಾಹಕರಿಗೆ ಇಷ್ಟವಾಗದ ಅಂಶಗಳು (Disliked)',
    stayedFor: 'ತಂಗಿದ ಅವಧಿ',
    travelerTypeLabel: 'ಪ್ರವಾಸಿ',
    scoreOutOfTen: 'ಅಂಕ / 10',
    hotelComparison: '4 ಹೋಟೆಲ್‌ಗಳ ನಡುವಿನ ಸಮಗ್ರ ಹೋಲಿಕೆ',
    cleanliness: 'ಸ್ವಚ್ಛತೆ ಮತ್ತು ನೈರ್ಮಲ್ಯ',
    staff: 'ಸಿಬ್ಬಂದಿ ಮತ್ತು ಆತಿಥ್ಯ',
    food: 'ಆಹಾರ ಮತ್ತು ಭೋಜನ',
    location: 'ಸ್ಥಳ ಮತ್ತು ಪ್ರವೇಶ ಸೌಲಭ್ಯ',
    comfort: 'ಕೋಣೆ ಸೌಕರ್ಯ ಮತ್ತು ನಿದ್ರೆ',
    value: 'ಹಣಕ್ಕೆ ತಕ್ಕ ಮೌಲ್ಯ',
    wifi: 'ವೈ-ಫೈ ಮತ್ತು ಇಂಟರ್ನೆಟ್',
    recommendationTitle: 'Booking.com ರೇಟಿಂಗ್ ಹೆಚ್ಚಿಸಲು ಪ್ರಮುಖ ಸಲಹೆಗಳು',
    noReviewsMatch: 'ಆಯ್ಕೆಮಾಡಿದ ಫಿಲ್ಟರ್‌ಗಳಿಗೆ ಯಾವುದೇ ವಿಮರ್ಶೆಗಳು ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ.',
    resetFilters: 'ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಮರುಹೊಂದಿಸಿ',
  }
};
