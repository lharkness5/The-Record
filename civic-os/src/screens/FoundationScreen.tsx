import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface FoundationScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

interface DocumentCardProps {
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
  isFree?: boolean;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  title,
  description,
  icon,
  onPress,
  isFree = true,
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardIcon}>{icon}</Text>
      {isFree && (
        <View style={styles.freeBadge}>
          <Text style={styles.freeBadgeText}>FREE</Text>
        </View>
      )}
    </View>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDescription}>{description}</Text>
    <Text style={styles.cardAction}>Read →</Text>
  </TouchableOpacity>
);

export const FoundationScreen: React.FC<FoundationScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Civic Foundation</Text>
        <Text style={styles.subtitle}>
          Understand the documents and systems that govern America
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Founding Documents</Text>
          <Text style={styles.sectionSubtitle}>
            The bedrock of American governance, in plain language
          </Text>

          <DocumentCard
            icon="📜"
            title="U.S. Constitution"
            description="The supreme law of the United States, with plain-language explanations of each article and amendment."
            onPress={() => navigation.navigate('Constitution')}
          />

          <DocumentCard
            icon="✍️"
            title="Declaration of Independence"
            description="The founding statement of American principles and the reasons for independence from Britain."
            onPress={() => navigation.navigate('DocumentDetail', { id: 'declaration' })}
          />

          <DocumentCard
            icon="📋"
            title="Bill of Rights"
            description="The first ten amendments to the Constitution, protecting fundamental individual liberties."
            onPress={() => navigation.navigate('DocumentDetail', { id: 'bill-of-rights' })}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How Government Works</Text>
          <Text style={styles.sectionSubtitle}>
            Clear explanations of government structure and processes
          </Text>

          <DocumentCard
            icon="🏛️"
            title="Federal Government"
            description="The three branches, their powers, their limits, and how they work together."
            onPress={() => navigation.navigate('HowItWorks', { level: 'federal' })}
          />

          <DocumentCard
            icon="🌽"
            title="Iowa State Government"
            description="How Iowa's legislature, governor, and courts operate within the federal system."
            onPress={() => navigation.navigate('HowItWorks', { level: 'iowa' })}
          />

          <DocumentCard
            icon="📊"
            title="How a Bill Becomes Law"
            description="Step-by-step explanation of the legislative process at federal and state levels."
            onPress={() => navigation.navigate('DocumentDetail', { id: 'bill-process' })}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reference</Text>
          <Text style={styles.sectionSubtitle}>
            Quick lookup for civic terms and concepts
          </Text>

          <DocumentCard
            icon="📖"
            title="Civic Glossary"
            description="Plain-language definitions of legal and political terms you'll encounter."
            onPress={() => navigation.navigate('Glossary')}
          />

          <DocumentCard
            icon="🗳️"
            title="Election Guide"
            description="How elections work, from primaries to general elections, caucuses to conventions."
            onPress={() => navigation.navigate('DocumentDetail', { id: 'elections' })}
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>About the Federal Foundation</Text>
          <Text style={styles.infoText}>
            This section is free for all users as part of our mission to provide
            universal civic literacy. The Record believes every American should
            have access to clear explanations of how their government works.
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
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
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
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  section: {
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
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardIcon: {
    fontSize: 32,
  },
  freeBadge: {
    backgroundColor: colors.semantic.success + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  freeBadgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: '700',
    color: colors.semantic.success,
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.primary.navy,
    marginBottom: spacing.sm,
  },
  cardDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.darkGray,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
    marginBottom: spacing.md,
  },
  cardAction: {
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
    color: colors.primary.accent,
  },
  infoBox: {
    backgroundColor: colors.primary.navy + '10',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary.navy,
  },
  infoTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.primary.navy,
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.darkGray,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
  },
});
