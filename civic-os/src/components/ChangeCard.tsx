import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { Change } from '../types';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';
import { TopicTag } from './TopicTag';
import { StatusBadge } from './StatusBadge';
import { useStore } from '../store/useStore';

interface ChangeCardProps {
  change: Change;
  onPress: () => void;
  showFullSummary?: boolean;
}

export const ChangeCard: React.FC<ChangeCardProps> = ({
  change,
  onPress,
  showFullSummary = false,
}) => {
  const subscriptionTier = useStore((state) => state.subscriptionTier);
  const toggleSaveIssue = useStore((state) => state.toggleSaveIssue);
  const isIssueSaved = useStore((state) => state.savedIssues.includes(change.id));

  const canViewFull = !change.isPremium || subscriptionTier !== 'free';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <StatusBadge status={change.status} />
        <Text style={styles.date}>Updated {formatDate(change.dateUpdated)}</Text>
      </View>

      <Text style={styles.title}>{change.title}</Text>

      <View style={styles.topics}>
        {change.topics.map((topic) => (
          <TopicTag key={topic} topic={topic} size="small" />
        ))}
      </View>

      {showFullSummary && canViewFull ? (
        <View style={styles.summarySection}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>What it is</Text>
            <Text style={styles.summaryText}>{change.summary.whatItIs}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>What changed</Text>
            <Text style={styles.summaryText}>{change.summary.whatChanged}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Who it affects</Text>
            <Text style={styles.summaryText}>{change.summary.whoItAffects}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>When it takes effect</Text>
            <Text style={styles.summaryText}>{change.summary.whenItTakesEffect}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>What happens next</Text>
            <Text style={styles.summaryText}>{change.summary.whatHappensNext}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.preview} numberOfLines={2}>
          {change.summary.whatItIs}
        </Text>
      )}

      {change.isPremium && subscriptionTier === 'free' && (
        <View style={styles.premiumBanner}>
          <Text style={styles.premiumText}>
            Upgrade to Iowa Plus to read the full summary
          </Text>
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => toggleSaveIssue(change.id)}
        >
          <Text style={[styles.saveButtonText, isIssueSaved && styles.savedText]}>
            {isIssueSaved ? 'Saved' : 'Save'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.readMore}>
          {canViewFull ? 'Read full summary' : 'Preview'} →
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  date: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.mediumGray,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.primary.navy,
    marginBottom: spacing.sm,
    lineHeight: typography.fontSize.lg * typography.lineHeight.tight,
  },
  topics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  preview: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.darkGray,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    marginBottom: spacing.md,
  },
  summarySection: {
    marginBottom: spacing.md,
  },
  summaryItem: {
    marginBottom: spacing.md,
  },
  summaryLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
    color: colors.primary.accent,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summaryText: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.darkGray,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
  },
  premiumBanner: {
    backgroundColor: colors.tier.plus + '15',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.tier.plus,
  },
  premiumText: {
    fontSize: typography.fontSize.sm,
    color: colors.tier.plus,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.neutral.lightGray,
    paddingTop: spacing.md,
  },
  saveButton: {
    paddingVertical: spacing.xs,
  },
  saveButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.mediumGray,
    fontWeight: '600',
  },
  savedText: {
    color: colors.primary.accent,
  },
  readMore: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.accent,
    fontWeight: '600',
  },
});
