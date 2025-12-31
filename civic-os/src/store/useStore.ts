import { create } from 'zustand';
import type { Topic, SubscriptionTier, Change } from '../types';

interface AppState {
  // User state
  isLoggedIn: boolean;
  subscriptionTier: SubscriptionTier;
  selectedState: string;

  // Preferences
  followedTopics: Topic[];
  followedLocations: string[];
  savedIssues: string[];
  notificationsEnabled: boolean;

  // Actions
  setLoggedIn: (value: boolean) => void;
  setSubscriptionTier: (tier: SubscriptionTier) => void;
  setSelectedState: (state: string) => void;
  toggleFollowTopic: (topic: Topic) => void;
  toggleFollowLocation: (location: string) => void;
  toggleSaveIssue: (issueId: string) => void;
  setNotificationsEnabled: (value: boolean) => void;
  isTopicFollowed: (topic: Topic) => boolean;
  isLocationFollowed: (location: string) => boolean;
  isIssueSaved: (issueId: string) => boolean;
}

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  isLoggedIn: false,
  subscriptionTier: 'free',
  selectedState: 'Iowa',
  followedTopics: [],
  followedLocations: [],
  savedIssues: [],
  notificationsEnabled: false,

  // Actions
  setLoggedIn: (value) => set({ isLoggedIn: value }),

  setSubscriptionTier: (tier) => set({ subscriptionTier: tier }),

  setSelectedState: (state) => set({ selectedState: state }),

  toggleFollowTopic: (topic) => set((state) => ({
    followedTopics: state.followedTopics.includes(topic)
      ? state.followedTopics.filter((t) => t !== topic)
      : [...state.followedTopics, topic],
  })),

  toggleFollowLocation: (location) => set((state) => ({
    followedLocations: state.followedLocations.includes(location)
      ? state.followedLocations.filter((l) => l !== location)
      : [...state.followedLocations, location],
  })),

  toggleSaveIssue: (issueId) => set((state) => ({
    savedIssues: state.savedIssues.includes(issueId)
      ? state.savedIssues.filter((id) => id !== issueId)
      : [...state.savedIssues, issueId],
  })),

  setNotificationsEnabled: (value) => set({ notificationsEnabled: value }),

  isTopicFollowed: (topic) => get().followedTopics.includes(topic),

  isLocationFollowed: (location) => get().followedLocations.includes(location),

  isIssueSaved: (issueId) => get().savedIssues.includes(issueId),
}));

// Selector hooks for common patterns
export const useSubscriptionTier = () => useStore((state) => state.subscriptionTier);
export const useFollowedTopics = () => useStore((state) => state.followedTopics);
export const useSavedIssues = () => useStore((state) => state.savedIssues);
