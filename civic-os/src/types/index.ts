export type SubscriptionTier = 'free' | 'plus' | 'pro';

export type Topic =
  | 'education'
  | 'taxes'
  | 'healthcare'
  | 'agriculture'
  | 'housing'
  | 'transportation'
  | 'environment'
  | 'business'
  | 'judiciary';

export type ChangeType = 'bill' | 'ruling' | 'executive' | 'regulation';

export type BillStatus =
  | 'introduced'
  | 'committee'
  | 'passed_house'
  | 'passed_senate'
  | 'signed'
  | 'vetoed'
  | 'enacted';

export interface Change {
  id: string;
  title: string;
  type: ChangeType;
  topics: Topic[];
  status: BillStatus;
  dateIntroduced: string;
  dateUpdated: string;
  effectiveDate?: string;
  summary: {
    whatItIs: string;
    whatChanged: string;
    whoItAffects: string;
    whenItTakesEffect: string;
    whatHappensNext: string;
  };
  sourceUrl: string;
  isPremium: boolean;
  affectedLocations: string[];
}

export interface FoundingDocument {
  id: string;
  title: string;
  shortTitle: string;
  originalText: string;
  plainLanguageSummary: string;
  sections: DocumentSection[];
}

export interface DocumentSection {
  id: string;
  title: string;
  originalText: string;
  plainLanguage: string;
  order: number;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  relatedTerms: string[];
  category: string;
}

export interface GovernmentBranch {
  id: string;
  name: string;
  level: 'federal' | 'state';
  description: string;
  powers: string[];
  limits: string[];
  keyRoles: string[];
}

export interface UserPreferences {
  followedTopics: Topic[];
  followedLocations: string[];
  savedIssues: string[];
  notificationsEnabled: boolean;
  emailDigestEnabled: boolean;
}

export interface User {
  id: string;
  email: string;
  subscriptionTier: SubscriptionTier;
  preferences: UserPreferences;
  state: string;
}
