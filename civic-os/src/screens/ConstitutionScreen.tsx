import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { constitution } from '../data/mockData';

export const ConstitutionScreen: React.FC = () => {
  const [showOriginal, setShowOriginal] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{constitution.title}</Text>
          <Text style={styles.summary}>{constitution.plainLanguageSummary}</Text>
        </View>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, !showOriginal && styles.toggleButtonActive]}
            onPress={() => setShowOriginal(false)}
          >
            <Text style={[styles.toggleText, !showOriginal && styles.toggleTextActive]}>
              Plain Language
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, showOriginal && styles.toggleButtonActive]}
            onPress={() => setShowOriginal(true)}
          >
            <Text style={[styles.toggleText, showOriginal && styles.toggleTextActive]}>
              Original Text
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionsContainer}>
          {constitution.sections.map((section) => (
            <TouchableOpacity
              key={section.id}
              style={styles.sectionCard}
              onPress={() => toggleSection(section.id)}
              activeOpacity={0.7}
            >
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.expandIcon}>
                  {expandedSection === section.id ? '−' : '+'}
                </Text>
              </View>

              {expandedSection === section.id && (
                <View style={styles.sectionContent}>
                  {showOriginal ? (
                    <View style={styles.originalTextContainer}>
                      <Text style={styles.originalLabel}>Original Text</Text>
                      <Text style={styles.originalText}>{section.originalText}</Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.plainLabel}>What This Means</Text>
                      <Text style={styles.plainText}>{section.plainLanguage}</Text>
                    </View>
                  )}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.amendmentsSection}>
          <Text style={styles.amendmentsTitle}>Amendments</Text>
          <Text style={styles.amendmentsSubtitle}>
            The Constitution has been amended 27 times. The first ten amendments
            are known as the Bill of Rights.
          </Text>

          <View style={styles.amendmentCard}>
            <Text style={styles.amendmentNumber}>1st Amendment</Text>
            <Text style={styles.amendmentSummary}>
              Protects freedom of religion, speech, press, assembly, and petition.
            </Text>
          </View>

          <View style={styles.amendmentCard}>
            <Text style={styles.amendmentNumber}>2nd Amendment</Text>
            <Text style={styles.amendmentSummary}>
              Protects the right to keep and bear arms.
            </Text>
          </View>

          <View style={styles.amendmentCard}>
            <Text style={styles.amendmentNumber}>4th Amendment</Text>
            <Text style={styles.amendmentSummary}>
              Protects against unreasonable searches and seizures.
            </Text>
          </View>

          <View style={styles.amendmentCard}>
            <Text style={styles.amendmentNumber}>5th Amendment</Text>
            <Text style={styles.amendmentSummary}>
              Protects against self-incrimination and double jeopardy; guarantees due process.
            </Text>
          </View>

          <View style={styles.amendmentCard}>
            <Text style={styles.amendmentNumber}>14th Amendment</Text>
            <Text style={styles.amendmentSummary}>
              Guarantees equal protection under the law and due process to all citizens.
            </Text>
          </View>

          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All 27 Amendments →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            These plain-language summaries are provided for educational purposes.
            For legal matters, consult the original text and qualified legal counsel.
          </Text>
        </View>
      </ScrollView>
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
    paddingBottom: spacing.xl,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.primary.navy,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: '700',
    color: colors.neutral.white,
    marginBottom: spacing.md,
  },
  summary: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.lightGray,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
  },
  toggleContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.lightGray,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  toggleButtonActive: {
    backgroundColor: colors.primary.accent,
  },
  toggleText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
    color: colors.neutral.mediumGray,
  },
  toggleTextActive: {
    color: colors.neutral.white,
  },
  sectionsContainer: {
    padding: spacing.lg,
  },
  sectionCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    ...shadows.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.primary.navy,
    flex: 1,
  },
  expandIcon: {
    fontSize: typography.fontSize.xl,
    color: colors.primary.accent,
    fontWeight: '300',
  },
  sectionContent: {
    padding: spacing.lg,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.lightGray,
    marginTop: spacing.md,
    paddingTop: spacing.lg,
  },
  originalTextContainer: {
    backgroundColor: colors.neutral.offWhite,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  originalLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: '700',
    color: colors.neutral.mediumGray,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  originalText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.darkGray,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
    fontStyle: 'italic',
  },
  plainLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: '700',
    color: colors.primary.accent,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  plainText: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.darkGray,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
  },
  amendmentsSection: {
    padding: spacing.lg,
    backgroundColor: colors.neutral.white,
    marginTop: spacing.md,
  },
  amendmentsTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.primary.navy,
    marginBottom: spacing.xs,
  },
  amendmentsSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.darkGray,
    marginBottom: spacing.lg,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
  },
  amendmentCard: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.lightGray,
  },
  amendmentNumber: {
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
    color: colors.primary.accent,
    marginBottom: spacing.xs,
  },
  amendmentSummary: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.darkGray,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  viewAllButton: {
    marginTop: spacing.lg,
  },
  viewAllText: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.primary.accent,
  },
  disclaimer: {
    margin: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.neutral.lightGray,
    borderRadius: borderRadius.md,
  },
  disclaimerText: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.darkGray,
    lineHeight: typography.fontSize.xs * typography.lineHeight.relaxed,
    textAlign: 'center',
  },
});
