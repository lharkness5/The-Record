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
import { governmentBranches } from '../data/mockData';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FoundationStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<FoundationStackParamList, 'HowItWorks'>;

export const HowItWorksScreen: React.FC<Props> = ({ route }) => {
  const initialLevel = route.params?.level || 'federal';
  const [selectedLevel, setSelectedLevel] = useState<'federal' | 'iowa'>(initialLevel);
  const [expandedBranch, setExpandedBranch] = useState<string | null>(null);

  const branches = governmentBranches.filter((branch) =>
    selectedLevel === 'federal'
      ? branch.level === 'federal'
      : branch.level === 'state'
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>How Government Works</Text>
        <Text style={styles.subtitle}>
          Understanding the structure and powers of each branch
        </Text>
      </View>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedLevel === 'federal' && styles.toggleButtonActive,
          ]}
          onPress={() => setSelectedLevel('federal')}
        >
          <Text
            style={[
              styles.toggleText,
              selectedLevel === 'federal' && styles.toggleTextActive,
            ]}
          >
            Federal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedLevel === 'iowa' && styles.toggleButtonActive,
          ]}
          onPress={() => setSelectedLevel('iowa')}
        >
          <Text
            style={[
              styles.toggleText,
              selectedLevel === 'iowa' && styles.toggleTextActive,
            ]}
          >
            Iowa
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {selectedLevel === 'federal' && (
          <View style={styles.introCard}>
            <Text style={styles.introTitle}>Separation of Powers</Text>
            <Text style={styles.introText}>
              The federal government is divided into three branches to prevent any
              single branch from becoming too powerful. Each branch has specific
              powers and checks on the other branches.
            </Text>
          </View>
        )}

        {selectedLevel === 'iowa' && (
          <View style={styles.introCard}>
            <Text style={styles.introTitle}>Iowa State Government</Text>
            <Text style={styles.introText}>
              Iowa's government mirrors the federal structure with three branches.
              State powers include education, transportation, and laws not reserved
              by the federal government.
            </Text>
          </View>
        )}

        {branches.map((branch) => (
          <TouchableOpacity
            key={branch.id}
            style={styles.branchCard}
            onPress={() =>
              setExpandedBranch(expandedBranch === branch.id ? null : branch.id)
            }
            activeOpacity={0.7}
          >
            <View style={styles.branchHeader}>
              <View style={styles.branchTitleContainer}>
                <Text style={styles.branchName}>{branch.name}</Text>
                <Text style={styles.branchLevel}>
                  {branch.level === 'federal' ? 'Federal' : 'Iowa'}
                </Text>
              </View>
              <Text style={styles.expandIcon}>
                {expandedBranch === branch.id ? '−' : '+'}
              </Text>
            </View>

            <Text style={styles.branchDescription}>{branch.description}</Text>

            {expandedBranch === branch.id && (
              <View style={styles.branchDetails}>
                <View style={styles.detailSection}>
                  <Text style={styles.detailTitle}>Powers</Text>
                  {branch.powers.map((power, index) => (
                    <View key={index} style={styles.listItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.listText}>{power}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailTitle}>Limits</Text>
                  {branch.limits.map((limit, index) => (
                    <View key={index} style={styles.listItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.listText}>{limit}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailTitle}>Key Roles</Text>
                  <Text style={styles.rolesText}>{branch.keyRoles.join(' • ')}</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}

        <View style={styles.checksSection}>
          <Text style={styles.checksSectionTitle}>Checks and Balances</Text>
          <Text style={styles.checksSectionSubtitle}>
            Each branch can limit the powers of the others
          </Text>

          <View style={styles.checkCard}>
            <Text style={styles.checkTitle}>
              Legislature checks Executive
            </Text>
            <Text style={styles.checkText}>
              Can override vetoes, control funding, approve appointments, and
              impeach officials.
            </Text>
          </View>

          <View style={styles.checkCard}>
            <Text style={styles.checkTitle}>
              Executive checks Legislature
            </Text>
            <Text style={styles.checkText}>
              Can veto legislation and call special sessions.
            </Text>
          </View>

          <View style={styles.checkCard}>
            <Text style={styles.checkTitle}>
              Judiciary checks Both
            </Text>
            <Text style={styles.checkText}>
              Can declare laws or executive actions unconstitutional.
            </Text>
          </View>
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
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: '700',
    color: colors.primary.navy,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.darkGray,
  },
  toggleContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.neutral.white,
    borderWidth: 1,
    borderColor: colors.neutral.lightGray,
  },
  toggleButtonActive: {
    backgroundColor: colors.primary.navy,
    borderColor: colors.primary.navy,
  },
  toggleText: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.neutral.darkGray,
  },
  toggleTextActive: {
    color: colors.neutral.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  introCard: {
    backgroundColor: colors.primary.navy,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  introTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.neutral.white,
    marginBottom: spacing.sm,
  },
  introText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.lightGray,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
  },
  branchCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  branchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  branchTitleContainer: {
    flex: 1,
  },
  branchName: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.primary.navy,
    marginBottom: spacing.xs,
  },
  branchLevel: {
    fontSize: typography.fontSize.xs,
    color: colors.primary.accent,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  expandIcon: {
    fontSize: typography.fontSize.xl,
    color: colors.primary.accent,
    fontWeight: '300',
  },
  branchDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.darkGray,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
  },
  branchDetails: {
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.lightGray,
  },
  detailSection: {
    marginBottom: spacing.lg,
  },
  detailTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
    color: colors.primary.accent,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  bullet: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.accent,
    marginRight: spacing.sm,
  },
  listText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.darkGray,
    flex: 1,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  rolesText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.darkGray,
  },
  checksSection: {
    marginTop: spacing.lg,
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  checksSectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.primary.navy,
    marginBottom: spacing.xs,
  },
  checksSectionSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.mediumGray,
    marginBottom: spacing.lg,
  },
  checkCard: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.lightGray,
  },
  checkTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
    color: colors.primary.navy,
    marginBottom: spacing.xs,
  },
  checkText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.darkGray,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
});
