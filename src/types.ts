export type TravelerType = 'Solo' | 'Couple' | 'Family' | 'Group' | 'Business';

export type SentimentType = 'positive' | 'neutral' | 'negative';

export type OperationalTopic = 
  | 'cleanliness'
  | 'checkin'
  | 'staff'
  | 'noise'
  | 'facilities'
  | 'location'
  | 'room_condition'
  | 'value';

export interface HotelSubScores {
  cleanliness: number;
  staff: number;
  facilities: number;
  comfort: number;
  valueForMoney: number;
  location: number;
  freeWifi: number;
}

export interface Hotel {
  id: string;
  name: string;
  slug: string;
  bookingUrl: string;
  suburb: string;
  city: string;
  state: string;
  category: string;
  stars: number;
  image: string;
  pricePerNight: string;
  overallScore: number;
  ratingWord: string;
  reviewCount: number;
  subScores: HotelSubScores;
  description: string;
}

export interface Review {
  id: string;
  hotelId: string;
  hotelName: string;
  author: string;
  country: string;
  countryCode: string;
  travelerType: TravelerType;
  date: string; // YYYY-MM-DD
  stayDuration: string;
  roomType: string;
  rating: number; // 1.0 - 10.0
  title: string;
  positiveText: string;
  negativeText: string;
  sentiment: {
    overall: SentimentType;
    score: number; // -1.0 to +1.0
    positivePercentage: number;
    negativePercentage: number;
    detectedTopics: OperationalTopic[];
  };
}

export type DateFilterType = 'current-week' | 'previous-week' | 'last-30-days' | 'all-time';

export interface FilterState {
  hotelId: string;
  dateFilter: DateFilterType;
  sentiment: 'all' | SentimentType;
  topic: 'all' | OperationalTopic;
  travelerType: 'all' | TravelerType;
  searchQuery: string;
  sortBy: 'date-desc' | 'date-asc' | 'rating-desc' | 'rating-asc';
}

export interface WeeklyMetrics {
  currentWeekAvgRating: number;
  previousWeekAvgRating: number;
  ratingChange: number; // e.g. +0.3 or -0.4
  currentWeekReviewCount: number;
  previousWeekReviewCount: number;
  reviewCountChange: number;
  currentWeekPositiveShare: number;
  previousWeekPositiveShare: number;
  positiveShareChange: number;
  currentWeekNegativeCount: number;
  previousWeekNegativeCount: number;
}

export interface TopicInsight {
  topic: OperationalTopic;
  label: string;
  totalMentions: number;
  positiveMentions: number;
  negativeMentions: number;
  negativePercentOfAllNegatives: number; // e.g. 40% of all negative reviews
  alertLevel: 'critical' | 'warning' | 'stable';
  exampleSnippet: string;
}
