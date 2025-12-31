import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { BillStatus } from '../types';
import { colors, spacing, borderRadius, typography } from '../theme';

interface StatusBadgeProps {
  status: BillStatus;
}

const statusConfig: Record<BillStatus, { label: string; color: string; bgColor: string }> = {
  introduced: {
    label: 'Introduced',
    color: colors.neutral.darkGray,
    bgColor: colors.neutral.lightGray,
  },
  committee: {
    label: 'In Committee',
    color: colors.semantic.warning,
    bgColor: colors.semantic.warning + '20',
  },
  passed_house: {
    label: 'Passed House',
    color: colors.semantic.info,
    bgColor: colors.semantic.info + '20',
  },
  passed_senate: {
    label: 'Passed Senate',
    color: colors.semantic.info,
    bgColor: colors.semantic.info + '20',
  },
  signed: {
    label: 'Signed',
    color: colors.semantic.success,
    bgColor: colors.semantic.success + '20',
  },
  vetoed: {
    label: 'Vetoed',
    color: colors.semantic.error,
    bgColor: colors.semantic.error + '20',
  },
  enacted: {
    label: 'Enacted',
    color: colors.semantic.success,
    bgColor: colors.semantic.success + '20',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];

  return (
    <View style={[styles.container, { backgroundColor: config.bgColor }]}>
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  text: {
    fontSize: typography.fontSize.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
