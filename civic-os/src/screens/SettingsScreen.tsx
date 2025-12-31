import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { TopicTag, PaywallModal } from '../components';
import { topics } from '../data/mockData';
import { useStore } from '../store/useStore';
import type { Topic } from '../types';

export const SettingsScreen: React.FC = () => {
  const [showPaywall, setShowPaywall] = useState(false);
  const subscriptionTier = useStore((state) => state.subscriptionTier);
  const followedTopics = useStore((state) => state.followedTopics);
  const savedIssues = useStore((state) => state.savedIssues);
  const notificationsEnabled = useStore((state) => state.notificationsEnabled);
  const toggleFollowTopic = useStore((state) => state.toggleFollowTopic);
  const setNotificationsEnabled = useStore((state) => state.setNotificationsEnabled);
  const setSubscriptionTier = useStore((state) => state.setSubscriptionTier);

  const tierLabels = {
    free: 'Free',
    plus: 'Iowa Plus',
    pro: 'Civic Pro',
  };

  const handleTopicPress = (topicId: Topic) => {
    if (subscriptionTier === 'free' && !followedTopics.includes(topicId)) {
      setShowPaywall(true);
    } else {
      toggleFollowTopic(topicId);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subscription</Text>
          <View style={styles.subscriptionCard}>
            <View style={styles.subscriptionInfo}>
              <Text style={styles.subscriptionTier}>
                {tierLabels[subscriptionTier]}
              </Text>
              <Text style={styles.subscriptionStatus}>
                {subscriptionTier === 'free'
                  ? 'Limited access'
                  : 'Full access to Iowa changes'}
              </Text>
            </View>
            {subscriptionTier === 'free' ? (
              <TouchableOpacity
                style={styles.upgradeButton}
                onPress={() => setShowPaywall(true)}
              >
                <Text style={styles.upgradeButtonText}>Upgrade</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.manageButton}
                onPress={() => setSubscriptionTier('free')}
              >
                <Text style={styles.manageButtonText}>Manage</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Topics You Follow</Text>
          <Text style={styles.sectionSubtitle}>
            {followedTopics.length > 0
              ? `Following ${followedTopics.length} topics`
              : 'Select topics to personalize your feed'}
          </Text>
          <View style={styles.topicsGrid}>
            {topics.map((topic) => (
              <TopicTag
                key={topic.id}
                topic={topic.id as Topic}
                selected={followedTopics.includes(topic.id as Topic)}
                onPress={() => handleTopicPress(topic.id as Topic)}
              />
            ))}
          </View>
          {subscriptionTier === 'free' && (
            <Text style={styles.upgradeHint}>
              Upgrade to Iowa Plus to follow topics and receive personalized updates.
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Issues</Text>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{savedIssues.length}</Text>
            <Text style={styles.statLabel}>
              {savedIssues.length === 1 ? 'issue saved' : 'issues saved'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Text style={styles.settingDescription}>
                Get notified when topics you follow have updates
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={(value) => {
                if (subscriptionTier === 'free' && value) {
                  setShowPaywall(true);
                } else {
                  setNotificationsEnabled(value);
                }
              }}
              trackColor={{
                false: colors.neutral.lightGray,
                true: colors.primary.accent,
              }}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Weekly Email Digest</Text>
              <Text style={styles.settingDescription}>
                Receive a weekly summary of changes in Iowa
              </Text>
            </View>
            <Switch
              value={false}
              onValueChange={() => {
                if (subscriptionTier === 'free') {
                  setShowPaywall(true);
                }
              }}
              trackColor={{
                false: colors.neutral.lightGray,
                true: colors.primary.accent,
              }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>

          <TouchableOpacity style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>About The Record</Text>
            <Text style={styles.aboutArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Privacy Policy</Text>
            <Text style={styles.aboutArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Terms of Service</Text>
            <Text style={styles.aboutArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Contact Support</Text>
            <Text style={styles.aboutArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>The Record v1.0.0</Text>
          <Text style={styles.footerSubtext}>
            A By The People Initiative
          </Text>
          <Text style={styles.footerMotto}>
            Clarity over commentary. Utility over ideology.
          </Text>
        </View>
      </ScrollView>

      <PaywallModal
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.offWhite,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: '700',
    color: colors.primary.navy,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.primary.navy,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.mediumGray,
    marginBottom: spacing.md,
  },
  subscriptionCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.md,
  },
  subscriptionInfo: {
    flex: 1,
  },
  subscriptionTier: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.primary.navy,
    marginBottom: spacing.xs,
  },
  subscriptionStatus: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.mediumGray,
  },
  upgradeButton: {
    backgroundColor: colors.primary.accent,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  upgradeButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
    color: colors.neutral.white,
  },
  manageButton: {
    backgroundColor: colors.neutral.lightGray,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  manageButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
    color: colors.neutral.darkGray,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  upgradeHint: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.accent,
    marginTop: spacing.md,
    fontStyle: 'italic',
  },
  statCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.sm,
  },
  statNumber: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: '700',
    color: colors.primary.navy,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.mediumGray,
  },
  settingRow: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  settingInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  settingLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.primary.navy,
    marginBottom: spacing.xs,
  },
  settingDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.mediumGray,
  },
  aboutRow: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  aboutLabel: {
    fontSize: typography.fontSize.base,
    color: colors.primary.navy,
  },
  aboutArrow: {
    fontSize: typography.fontSize.base,
    color: colors.primary.accent,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  footerText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.mediumGray,
    marginBottom: spacing.xs,
  },
  footerSubtext: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.mediumGray,
    marginBottom: spacing.sm,
  },
  footerMotto: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.accent,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
