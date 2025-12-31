import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, borderRadius } from '../theme';
import { SectionHeader, ChangeCard, TopicTag, PaywallModal } from '../components';
import { mockChanges, topics } from '../data/mockData';
import { useStore } from '../store/useStore';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Topic } from '../types';

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const subscriptionTier = useStore((state) => state.subscriptionTier);
  const followedTopics = useStore((state) => state.followedTopics);
  const toggleFollowTopic = useStore((state) => state.toggleFollowTopic);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const recentChanges = mockChanges.slice(0, 3);

  const handleChangePress = (changeId: string) => {
    navigation.navigate('ChangeDetail', { id: changeId });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.title}>The Record</Text>
          <Text style={styles.subtitle}>
            Civic clarity for Iowa. No noise, no spin.
          </Text>
        </View>

        {subscriptionTier === 'free' && (
          <TouchableOpacity
            style={styles.upgradeCard}
            onPress={() => setShowPaywall(true)}
          >
            <Text style={styles.upgradeTitle}>Get Full Access</Text>
            <Text style={styles.upgradeText}>
              Read complete summaries and track what matters to you.
            </Text>
            <Text style={styles.upgradeAction}>Learn More →</Text>
          </TouchableOpacity>
        )}

        <View style={styles.section}>
          <SectionHeader
            title="This Week in Iowa"
            subtitle="Latest legislative and governance changes"
            actionLabel="See all"
            onActionPress={() => navigation.navigate('Iowa')}
          />
          {recentChanges.map((change) => (
            <View key={change.id} style={styles.cardContainer}>
              <ChangeCard
                change={change}
                onPress={() => handleChangePress(change.id)}
              />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Topics You Follow"
            subtitle={followedTopics.length > 0
              ? `Following ${followedTopics.length} topics`
              : 'Select topics to personalize your feed'
            }
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topicsContainer}
          >
            {topics.map((topic) => (
              <TopicTag
                key={topic.id}
                topic={topic.id as Topic}
                selected={followedTopics.includes(topic.id as Topic)}
                onPress={() => {
                  if (subscriptionTier === 'free' && !followedTopics.includes(topic.id as Topic)) {
                    setShowPaywall(true);
                  } else {
                    toggleFollowTopic(topic.id as Topic);
                  }
                }}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Understand Your Government"
            subtitle="Foundational civic knowledge"
          />
          <View style={styles.foundationCards}>
            <TouchableOpacity
              style={styles.foundationCard}
              onPress={() => navigation.navigate('Foundation')}
            >
              <Text style={styles.foundationIcon}>📜</Text>
              <Text style={styles.foundationTitle}>U.S. Constitution</Text>
              <Text style={styles.foundationSubtitle}>Plain-language guide</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.foundationCard}
              onPress={() => navigation.navigate('Foundation', { screen: 'HowItWorks' })}
            >
              <Text style={styles.foundationIcon}>🏛️</Text>
              <Text style={styles.foundationTitle}>How It Works</Text>
              <Text style={styles.foundationSubtitle}>Federal & Iowa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.foundationCard}
              onPress={() => navigation.navigate('Foundation', { screen: 'Glossary' })}
            >
              <Text style={styles.foundationIcon}>📖</Text>
              <Text style={styles.foundationTitle}>Glossary</Text>
              <Text style={styles.foundationSubtitle}>Civic terms defined</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            The Record is part of the By The People movement.
          </Text>
          <Text style={styles.footerSubtext}>
            Neutral. Non-partisan. For all Americans.
          </Text>
        </View>
      </ScrollView>

      <PaywallModal
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
        feature="following topics"
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
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  greeting: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.mediumGray,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: '700',
    color: colors.primary.navy,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.darkGray,
  },
  upgradeCard: {
    backgroundColor: colors.primary.navy,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  upgradeTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.neutral.white,
    marginBottom: spacing.xs,
  },
  upgradeText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.lightGray,
    marginBottom: spacing.md,
  },
  upgradeAction: {
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
    color: colors.primary.accent,
  },
  section: {
    marginBottom: spacing.xl,
  },
  cardContainer: {
    paddingHorizontal: spacing.lg,
  },
  topicsContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  foundationCards: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  foundationCard: {
    flex: 1,
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  foundationIcon: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  foundationTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
    color: colors.primary.navy,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  foundationSubtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.mediumGray,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
    paddingHorizontal: spacing.lg,
  },
  footerText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.mediumGray,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  footerSubtext: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.mediumGray,
    textAlign: 'center',
  },
});
