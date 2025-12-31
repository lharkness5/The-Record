import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { glossaryTerms } from '../data/mockData';

export const GlossaryScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const categories = [...new Set(glossaryTerms.map((term) => term.category))];

  const filteredTerms = glossaryTerms.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedTerms = filteredTerms.reduce((acc, term) => {
    const firstLetter = term.term[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(term);
    return acc;
  }, {} as Record<string, typeof glossaryTerms>);

  const sortedLetters = Object.keys(groupedTerms).sort();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>Civic Glossary</Text>
        <Text style={styles.subtitle}>
          Plain-language definitions of legal and political terms
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search terms..."
          placeholderTextColor={colors.neutral.mediumGray}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryChip,
            !selectedCategory && styles.categoryChipActive,
          ]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text
            style={[
              styles.categoryChipText,
              !selectedCategory && styles.categoryChipTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive,
            ]}
            onPress={() =>
              setSelectedCategory(selectedCategory === category ? null : category)
            }
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === category && styles.categoryChipTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {sortedLetters.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No terms found</Text>
            <Text style={styles.emptyStateText}>
              Try a different search term or category.
            </Text>
          </View>
        ) : (
          sortedLetters.map((letter) => (
            <View key={letter} style={styles.letterSection}>
              <Text style={styles.letterHeader}>{letter}</Text>
              {groupedTerms[letter].map((term) => (
                <TouchableOpacity
                  key={term.id}
                  style={styles.termCard}
                  onPress={() =>
                    setExpandedTerm(expandedTerm === term.id ? null : term.id)
                  }
                  activeOpacity={0.7}
                >
                  <View style={styles.termHeader}>
                    <Text style={styles.termName}>{term.term}</Text>
                    <View style={styles.termMeta}>
                      <Text style={styles.termCategory}>{term.category}</Text>
                      <Text style={styles.expandIcon}>
                        {expandedTerm === term.id ? '−' : '+'}
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={styles.termDefinition}
                    numberOfLines={expandedTerm === term.id ? undefined : 2}
                  >
                    {term.definition}
                  </Text>

                  {expandedTerm === term.id && term.relatedTerms.length > 0 && (
                    <View style={styles.relatedTerms}>
                      <Text style={styles.relatedLabel}>Related terms:</Text>
                      <Text style={styles.relatedList}>
                        {term.relatedTerms.join(', ')}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))
        )}

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>About This Glossary</Text>
          <Text style={styles.infoText}>
            These definitions are written for everyday understanding, not legal
            precision. For official definitions, consult legal resources or
            relevant legislation.
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
  categoriesContainer: {
    maxHeight: 50,
    marginBottom: spacing.md,
  },
  categoriesContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    flexDirection: 'row',
  },
  categoryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.neutral.white,
    borderWidth: 1,
    borderColor: colors.neutral.lightGray,
    marginRight: spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: colors.primary.navy,
    borderColor: colors.primary.navy,
  },
  categoryChipText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.darkGray,
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: colors.neutral.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
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
  letterSection: {
    marginBottom: spacing.lg,
  },
  letterHeader: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.primary.accent,
    marginBottom: spacing.sm,
    paddingBottom: spacing.xs,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary.accent,
  },
  termCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  termHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  termName: {
    fontSize: typography.fontSize.base,
    fontWeight: '700',
    color: colors.primary.navy,
    flex: 1,
  },
  termMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  termCategory: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.mediumGray,
    backgroundColor: colors.neutral.lightGray,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  expandIcon: {
    fontSize: typography.fontSize.lg,
    color: colors.primary.accent,
    fontWeight: '300',
  },
  termDefinition: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.darkGray,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
  },
  relatedTerms: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.lightGray,
  },
  relatedLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: '600',
    color: colors.neutral.mediumGray,
    marginBottom: spacing.xs,
  },
  relatedList: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.accent,
  },
  infoBox: {
    backgroundColor: colors.neutral.lightGray,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  infoTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.neutral.darkGray,
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.darkGray,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
  },
});
