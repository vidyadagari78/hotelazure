import { SentimentType, OperationalTopic } from '../types';

// Positive & Negative Lexicons for General Sentiment Analysis
const POSITIVE_WORDS = new Set([
  'excellent', 'amazing', 'superb', 'exceptional', 'great', 'good', 'wonderful',
  'fantastic', 'pleasant', 'loved', 'lovely', 'beautiful', 'clean', 'spotless',
  'comfortable', 'cozy', 'spacious', 'helpful', 'friendly', 'courteous', 'polite',
  'delicious', 'tasty', 'fresh', 'best', 'perfect', 'quiet', 'peaceful', 'fast',
  'luxurious', 'impressive', 'convenient', 'welcoming', 'attentive', 'smooth',
  'worth', 'recommend', 'recommended', 'happy', 'enjoyed', 'gem', 'top-notch',
  'stellar', 'impeccable', 'seamless', 'delightful', 'central', 'easy'
]);

const NEGATIVE_WORDS = new Set([
  'bad', 'poor', 'terrible', 'horrible', 'awful', 'worst', 'dirty', 'filthy',
  'dusty', 'stain', 'stained', 'noisy', 'loud', 'rude', 'unhelpful', 'arrogant',
  'slow', 'delay', 'delayed', 'broken', 'damaged', 'smell', 'stink', 'odor',
  'expensive', 'overpriced', 'disappointed', 'disappointing', 'uncomfortable',
  'hard', 'cramped', 'small', 'tiny', 'cold', 'leak', 'leaking', 'cockroach',
  'bugs', 'mold', 'mould', 'issue', 'problem', 'fail', 'failed', 'refused',
  'waste', 'unacceptable', 'subpar', 'careless', 'nightmare', 'unfriendly'
]);

const NEGATION_WORDS = new Set([
  'not', 'no', 'never', 'hardly', 'barely', 'scarcely', 'without', "wasn't", "didn't", "don't", "won't", "couldn't"
]);

export interface TopicDefinition {
  key: OperationalTopic;
  label: string;
  keywords: string[];
}

export const OPERATIONAL_TOPICS: TopicDefinition[] = [
  {
    key: 'cleanliness',
    label: 'Cleanliness',
    keywords: [
      'clean', 'dirty', 'filthy', 'dust', 'dusty', 'stain', 'stained', 'hair', 'hygiene',
      'towel', 'linen', 'sheet', 'smell', 'odor', 'toilet', 'bathroom', 'mold', 'mould',
      'spotless', 'cockroach', 'bugs', 'housekeeping', 'trash', 'rubbish', 'grime'
    ]
  },
  {
    key: 'checkin',
    label: 'Check-in Experience',
    keywords: [
      'check-in', 'check in', 'checkin', 'checkout', 'check-out', 'key', 'keycard',
      'code', 'door code', 'deposit', 'bond', 'queue', 'waiting', 'early check-in',
      'late check-in', 'kiosk', 'lockbox', 'pin', 'id check', 'arrival'
    ]
  },
  {
    key: 'staff',
    label: 'Staff & Receptionist Behaviour',
    keywords: [
      'staff', 'reception', 'receptionist', 'front desk', 'manager', 'concierge',
      'host', 'service', 'helpful', 'polite', 'rude', 'unhelpful', 'friendly',
      'arrogant', 'attitude', 'courteous', 'greeting', 'welcoming', 'assist'
    ]
  },
  {
    key: 'noise',
    label: 'Noise & Soundproofing',
    keywords: [
      'noise', 'noisy', 'loud', 'sound', 'music', 'pub', 'bar', 'street', 'traffic',
      'siren', 'thin walls', 'earplugs', 'footsteps', 'banging', 'horns', 'screaming',
      'shouting', 'soundproof', 'quiet', 'peaceful', 'sleep'
    ]
  },
  {
    key: 'facilities',
    label: 'Facilities & Amenities',
    keywords: [
      'wifi', 'wi-fi', 'internet', 'lift', 'elevator', 'stairs', 'gym', 'pool',
      'kettle', 'tea', 'coffee', 'fridge', 'refrigerator', 'tv', 'iron', 'hairdryer',
      'kitchen', 'microwave', 'parking', 'amenities', 'laundry', 'washer'
    ]
  },
  {
    key: 'location',
    label: 'Location & Accessibility',
    keywords: [
      'location', 'paddington', 'potts point', 'surry hills', 'darling harbour',
      'central', 'station', 'train', 'bus', 'metro', 'close', 'near', 'walking distance',
      'convenient', 'neighborhood', 'area', 'restaurants', 'cafes', 'scg', 'allianz'
    ]
  },
  {
    key: 'room_condition',
    label: 'Room Condition & Comfort',
    keywords: [
      'room', 'bed', 'mattress', 'pillow', 'air conditioning', 'ac', 'heating',
      'shower', 'water pressure', 'hot water', 'drain', 'plumbing', 'window',
      'cramped', 'small', 'tiny', 'spacious', 'dated', 'old', 'worn', 'renovated',
      'modern', 'leak', 'lamp', 'power point', 'socket'
    ]
  },
  {
    key: 'value',
    label: 'Value for Money',
    keywords: [
      'value', 'price', 'money', 'expensive', 'cheap', 'cost', 'worth', 'overpriced',
      'rate', 'affordable', 'budget', 'rip off', 'bargain', 'charge'
    ]
  }
];

export function analyzeTextSentiment(text: string): { score: number; posCount: number; negCount: number } {
  if (!text || text.trim() === '') return { score: 0, posCount: 0, negCount: 0 };

  const words = text.toLowerCase().replace(/[^a-z0-9'\s-]/g, ' ').split(/\s+/).filter(Boolean);
  let posCount = 0;
  let negCount = 0;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const prevWord = i > 0 ? words[i - 1] : '';
    const isNegated = NEGATION_WORDS.has(prevWord);

    if (POSITIVE_WORDS.has(word)) {
      if (isNegated) {
        negCount += 1.5;
      } else {
        posCount += 1;
      }
    } else if (NEGATIVE_WORDS.has(word)) {
      if (isNegated) {
        posCount += 0.8;
      } else {
        negCount += 1.5;
      }
    }
  }

  const total = posCount + negCount;
  if (total === 0) return { score: 0, posCount: 0, negCount: 0 };

  const score = (posCount - negCount) / total;
  return { score: Number(score.toFixed(2)), posCount, negCount };
}

export function detectOperationalTopics(text: string): OperationalTopic[] {
  const lower = text.toLowerCase();
  const detected: OperationalTopic[] = [];

  for (const topic of OPERATIONAL_TOPICS) {
    const matches = topic.keywords.some(keyword => {
      // Check for whole word or phrase match
      return lower.includes(keyword);
    });
    if (matches) {
      detected.push(topic.key);
    }
  }

  return detected;
}

export function computeReviewSentiment(
  rating: number,
  positiveText: string,
  negativeText: string
): {
  overall: SentimentType;
  score: number;
  positivePercentage: number;
  negativePercentage: number;
  detectedTopics: OperationalTopic[];
} {
  const posAnalysis = analyzeTextSentiment(positiveText);
  const negAnalysis = analyzeTextSentiment(negativeText);

  const posLen = positiveText.trim().length;
  const negLen = negativeText.trim().length;

  // Normalized rating score: Booking.com 1-10 mapped to -1 to +1
  const normalizedRatingScore = (rating - 5.5) / 4.5;

  let combinedScore = normalizedRatingScore * 0.5;

  if (posLen > 0 || negLen > 0) {
    const totalChars = (posLen + negLen) || 1;
    const textRatio = (posLen - negLen) / totalChars;
    const wordNetScore = (posAnalysis.score - negAnalysis.score) / 2;
    combinedScore = combinedScore * 0.5 + textRatio * 0.25 + wordNetScore * 0.25;
  }

  combinedScore = Math.max(-1, Math.min(1, combinedScore));

  let overall: SentimentType = 'neutral';
  if (combinedScore >= 0.20 || rating >= 8.0) {
    overall = 'positive';
  } else if (combinedScore <= -0.15 || rating <= 5.5) {
    overall = 'negative';
  } else {
    overall = 'neutral';
  }

  const positivePercentage = Math.round(Math.max(0, (combinedScore + 1) / 2 * 100));
  const negativePercentage = 100 - positivePercentage;

  const fullText = `${positiveText} ${negativeText}`;
  const detectedTopics = detectOperationalTopics(fullText);

  return {
    overall,
    score: Number(combinedScore.toFixed(2)),
    positivePercentage,
    negativePercentage,
    detectedTopics,
  };
}
