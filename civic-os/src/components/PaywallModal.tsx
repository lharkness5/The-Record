import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';
import { useStore } from '../store/useStore';

interface PaywallModalProps {
  visible: boolean;
  onClose: () => void;
  feature?: string;
}

const features = {
  plus: [
    'Full plain-language Iowa summaries',
    'Bill-to-impact explanations',
    'Process timelines',
    'Topic and location following',
    'Saved issues',
    'Personalized alerts',
    'Weekly email briefings',
  ],
  pro: [
    'Everything in Plus',
    'Historical comparisons',
    'Long-term issue timelines',
    'Exportable summaries',
    'Discussion guides',
    'Advanced alerting',
    'Professional use license',
  ],
};

export const PaywallModal: React.FC<PaywallModalProps> = ({
  visible,
  onClose,
  feature,
}) => {
  const setSubscriptionTier = useStore((state) => state.setSubscriptionTier);

  const handleUpgrade = (tier: 'plus' | 'pro') => {
    setSubscriptionTier(tier);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Unlock Full Civic Clarity</Text>
          <Text style={styles.subtitle}>
            {feature
              ? `Upgrade to access ${feature} and more.`
              : 'Get complete access to Iowa legislative changes and personalized civic updates.'}
          </Text>

          <View style={styles.tierCard}>
            <View style={styles.tierHeader}>
              <Text style={styles.tierName}>Iowa Plus</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>$7</Text>
                <Text style={styles.pricePeriod}>/month</Text>
              </View>
            </View>
            <Text style={styles.tierDescription}>
              Perfect for engaged citizens who want to stay informed
            </Text>
            <View style={styles.featureList}>
              {features.plus.map((feat, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={styles.checkmark}>✓</Text>
                  <Text style={styles.featureText}>{feat}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={() => handleUpgrade('plus')}
            >
              <Text style={styles.upgradeButtonText}>Start Iowa Plus</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.tierCard, styles.tierCardPro]}>
            <View style={styles.tierHeader}>
              <Text style={[styles.tierName, styles.tierNamePro]}>Civic Pro</Text>
              <View style={styles.priceContainer}>
                <Text style={[styles.price, styles.pricePro]}>$19</Text>
                <Text style={[styles.pricePeriod, styles.pricePro]}>/month</Text>
              </View>
            </View>
            <Text style={[styles.tierDescription, styles.tierDescriptionPro]}>
              For educators, journalists, and civic professionals
            </Text>
            <View style={styles.featureList}>
              {features.pro.map((feat, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={[styles.checkmark, styles.checkmarkPro]}>✓</Text>
                  <Text style={[styles.featureText, styles.featureTextPro]}>{feat}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={[styles.upgradeButton, styles.upgradeButtonPro]}
              onPress={() => handleUpgrade('pro')}
            >
              <Text style={styles.upgradeButtonText}>Start Civic Pro</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.disclaimer}>
            Cancel anytime. No questions asked. Your subscription supports neutral,
            non-partisan civic clarity for all Americans.
          </Text>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.offWhite,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  closeButton: {
    padding: spacing.sm,
  },
  closeText: {
    fontSize: typography.fontSize.base,
    color: colors.primary.accent,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: '700',
    color: colors.primary.navy,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.darkGray,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
  },
  tierCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.lg,
  },
  tierCardPro: {
    backgroundColor: colors.primary.navy,
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  tierName: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.primary.navy,
  },
  tierNamePro: {
    color: colors.neutral.white,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: '700',
    color: colors.primary.accent,
  },
  pricePro: {
    color: colors.neutral.white,
  },
  pricePeriod: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.mediumGray,
    marginLeft: spacing.xs,
  },
  tierDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.darkGray,
    marginBottom: spacing.lg,
  },
  tierDescriptionPro: {
    color: colors.neutral.lightGray,
  },
  featureList: {
    marginBottom: spacing.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  checkmark: {
    fontSize: typography.fontSize.base,
    color: colors.semantic.success,
    marginRight: spacing.sm,
    fontWeight: '700',
  },
  checkmarkPro: {
    color: colors.neutral.white,
  },
  featureText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.darkGray,
    flex: 1,
  },
  featureTextPro: {
    color: colors.neutral.lightGray,
  },
  upgradeButton: {
    backgroundColor: colors.primary.accent,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  upgradeButtonPro: {
    backgroundColor: colors.neutral.white,
  },
  upgradeButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '700',
    color: colors.neutral.white,
  },
  disclaimer: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.mediumGray,
    textAlign: 'center',
    marginBottom: spacing['2xl'],
    lineHeight: typography.fontSize.xs * typography.lineHeight.relaxed,
  },
});
