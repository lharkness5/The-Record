import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, borderRadius } from '../theme';
import { SectionHeader, ChangeCard, TopicTag, StatusBadge } from '../components';
import { mockChanges, topics } from '../data/mockData';
import { useStore } from '../store/useStore';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Topic, BillStatus } from '../types';

interface IowaScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

type FilterType = 'all' | 'topic' | 'status';

export const IowaScreen: React.FC<IowaScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<BillStatus | null>(null);

  const filteredChanges = mockChanges.filter((change) => {
    const matchesSearch = change.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      change.summary.whatItIs.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = !selectedTopic || change.topics.includes(selectedTopic);
    const matchesStatus = !selectedStatus || change.status === selectedStatus;
    return matchesSearch && matchesTopic && matchesStatus;
  });

  const handleChangePress = (changeId: string) => {
    navigation.navigate('ChangeDetail', { id: changeId });
  };

  const statuses: { value: BillStatus; label: string }[] = [
    { value: 'introduced', label: 'Introduced' },
    { value: 'committee', label: 'In Committee' },
    { value: 'passed_house', label: 'Passed House' },
    { value: 'passed_senate', label: 'Passed Senate' },
    { value: 'signed', label: 'Signed' },
    { value: 'enacted', label: 'Enacted' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Iowa</Text>
        <Text style={styles.subtitle}>What Changed and How It Affects You</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search bills and changes..."
          placeholderTextColor={colors.neutral.mediumGray}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        <TouchableOpacity
          style={[
            styles.filterChip,
            !selectedTopic && !selectedStatus && styles.filterChipActive,
          ]}
          onPress={() => {
            setSelectedTopic(null);
            setSelectedStatus(null);
          }}
        >
          <Text
            style={[
              styles.filterChipText,
              !selectedTopic && !selectedStatus && styles.filterChipTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {topics.slice(0, 5).map((topic) => (
          <TouchableOpacity
            key={topic.id}
            style={[
              styles.filterChip,
              selectedTopic === topic.id && styles.filterChipActive,
            ]}
            onPress={() => {
              setSelectedTopic(selectedTopic === topic.id ? null : topic.id as Topic);
              setSelectedStatus(null);
            }}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedTopic === topic.id && styles.filterChipTextActive,
              ]}
            >
              {topic.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.statusFilters}
        contentContainerStyle={styles.filtersContent}
      >
        {statuses.map((status) => (
          <TouchableOpacity
            key={status.value}
            style={[
              styles.statusChip,
              selectedStatus === status.value && styles.statusChipActive,
            ]}
            onPress={() => {
              setSelectedStatus(selectedStatus === status.value ? null : status.value);
              setSelectedTopic(null);
            }}
          >
            <Text
              style={[
                styles.statusChipText,
                selectedStatus === status.value && styles.statusChipTextActive,
              ]}
            >
              {status.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredChanges.length} {filteredChanges.length === 1 ? 'result' : 'results'}
          </Text>
        </View>

        {filteredChanges.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No results found</Text>
            <Text style={styles.emptyStateText}>
              Try adjusting your search or filters.
            </Text>
          </View>
        ) : (
          filteredChanges.map((change) => (
            <ChangeCard
              key={change.id}
              change={change}
              onPress={() => handleChangePress(change.id)}
            />
          ))
        )}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>About Iowa Changes</Text>
          <Text style={styles.infoText}>
            We track legislation, court rulings, and governance actions from the Iowa
            General Assembly and state agencies. Each item is selected for its real-world
            impact and summarized in plain language.
          </Text>
          <Text style={styles.infoText}>
            Updates are published weekly during legislative sessions and as significant
            changes occur.
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
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  searchInput: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.fontSize.base,
    color: colors.neutral.charcoal,
    borderWidth: 1,
    borderColor: colors.neutral.lightGray,
  },
  filtersContainer: {
    maxHeight: 50,
    marginBottom: spacing.sm,
  },
  filtersContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.neutral.white,
    borderWidth: 1,
    borderColor: colors.neutral.lightGray,
    marginRight: spacing.sm,
  },
  filterChipActive: {
    backgroundColor: colors.primary.navy,
    borderColor: colors.primary.navy,
  },
  filterChipText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.darkGray,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: colors.neutral.white,
  },
  statusFilters: {
    maxHeight: 44,
    marginBottom: spacing.md,
  },
  statusChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.neutral.lightGray,
    marginRight: spacing.sm,
  },
  statusChipActive: {
    backgroundColor: colors.primary.accent,
  },
  statusChipText: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.darkGray,
    fontWeight: '500',
  },
  statusChipTextActive: {
    color: colors.neutral.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  resultsHeader: {
    marginBottom: spacing.md,
  },
  resultsCount: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.mediumGray,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  emptyStateTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.neutral.darkGray,
    marginBottom: spacing.sm,
  },
  emptyStateText: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.mediumGray,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary.accent,
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
    marginBottom: spacing.sm,
  },
});
