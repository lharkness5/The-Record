import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { StatusBadge, TopicTag, PaywallModal } from '../components';
import { mockChanges } from '../data/mockData';
import { useStore } from '../store/useStore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'ChangeDetail'>;

export const ChangeDetailScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const [showPaywall, setShowPaywall] = useState(false);
  const subscriptionTier = useStore((state) => state.subscriptionTier);
  const toggleSaveIssue = useStore((state) => state.toggleSaveIssue);
  const isIssueSaved = useStore((state) => state.savedIssues.includes(id));

  const change = mockChanges.find((c) => c.id === id);

  if (!change) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Change not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const canViewFull = !change.isPremium || subscriptionTier !== 'free';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleOpenSource = () => {
    Linking.openURL(change.sourceUrl);
  };

  const handleSave = () => {
    if (subscriptionTier === 'free') {
      setShowPaywall(true);
    } else {
      toggleSaveIssue(id);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <StatusBadge status={change.status} />
          <Text style={styles.dateText}>
            Updated {formatDate(change.dateUpdated)}
          </Text>
        </View>

        <Text style={styles.title}>{change.title}</Text>

        <View style={styles.topics}>
          {change.topics.map((topic) => (
            <TopicTag key={topic} topic={topic} size="medium" />
          ))}
        </View>

        <View style={styles.metaCard}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Introduced</Text>
            <Text style={styles.metaValue}>{formatDate(change.dateIntroduced)}</Text>
          </View>
          {change.effectiveDate && (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Effective Date</Text>
              <Text style={styles.metaValue}>{formatDate(change.effectiveDate)}</Text>
            </View>
          )}
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Affected Areas</Text>
            <Text style={styles.metaValue}>{change.affectedLocations.join(', ')}</Text>
          </View>
        </View>

        {canViewFull ? (
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
          <View style={styles.previewSection}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>What it is</Text>
              <Text style={styles.summaryText}>{change.summary.whatItIs}</Text>
            </View>

            <View style={styles.paywallBanner}>
              <Text style={styles.paywallTitle}>Read the Full Summary</Text>
              <Text style={styles.paywallText}>
                Upgrade to Iowa Plus to see the complete impact analysis, timeline,
                and what happens next.
              </Text>
              <TouchableOpacity
                style={styles.paywallButton}
                onPress={() => setShowPaywall(true)}
              >
                <Text style={styles.paywallButtonText}>Upgrade to Iowa Plus</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.sourceLink} onPress={handleOpenSource}>
          <Text style={styles.sourceLinkText}>View Primary Source →</Text>
        </TouchableOpacity>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            This summary is for informational purposes only and does not constitute
            legal advice. For official information, refer to the primary source.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveButton, isIssueSaved && styles.saveButtonActive]}
          onPress={handleSave}
        >
          <Text style={[styles.saveButtonText, isIssueSaved && styles.saveButtonTextActive]}>
            {isIssueSaved ? 'Saved' : 'Save Issue'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => {}}
        >
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>

      <PaywallModal
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
        feature="full summaries"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.offWhite,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: typography.fontSize.lg,
    color: colors.neutral.mediumGray,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  dateText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.mediumGray,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: '700',
    color: colors.primary.navy,
    marginBottom: spacing.md,
    lineHeight: typography.fontSize['2xl'] * typography.lineHeight.tight,
  },
  topics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
  },
  metaCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  metaLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.mediumGray,
  },
  metaValue: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.charcoal,
    fontWeight: '500',
  },
  summarySection: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  previewSection: {
    marginBottom: spacing.lg,
  },
  summaryItem: {
    marginBottom: spacing.lg,
  },
  summaryLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: '700',
    color: colors.primary.accent,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summaryText: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.darkGray,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
  },
  paywallBanner: {
    backgroundColor: colors.primary.navy,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  paywallTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.neutral.white,
    marginBottom: spacing.sm,
  },
  paywallText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.lightGray,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
  },
  paywallButton: {
    backgroundColor: colors.primary.accent,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  paywallButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.neutral.white,
  },
  sourceLink: {
    marginBottom: spacing.lg,
  },
  sourceLinkText: {
    fontSize: typography.fontSize.base,
    color: colors.primary.accent,
    fontWeight: '600',
  },
  disclaimer: {
    backgroundColor: colors.neutral.lightGray,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  disclaimerText: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.darkGray,
    lineHeight: typography.fontSize.xs * typography.lineHeight.relaxed,
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.lg,
    backgroundColor: colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.lightGray,
    gap: spacing.md,
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.neutral.lightGray,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  saveButtonActive: {
    backgroundColor: colors.primary.accent,
  },
  saveButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.neutral.darkGray,
  },
  saveButtonTextActive: {
    color: colors.neutral.white,
  },
  shareButton: {
    flex: 1,
    backgroundColor: colors.primary.navy,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.neutral.white,
  },
});
