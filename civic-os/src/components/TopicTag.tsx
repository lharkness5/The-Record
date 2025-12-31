import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import type { Topic } from '../types';
import { colors, spacing, borderRadius, typography } from '../theme';

interface TopicTagProps {
  topic: Topic;
  selected?: boolean;
  onPress?: () => void;
  size?: 'small' | 'medium';
}

const topicLabels: Record<Topic, string> = {
  education: 'Education',
  taxes: 'Taxes',
  healthcare: 'Healthcare',
  agriculture: 'Agriculture',
  housing: 'Housing',
  transportation: 'Transportation',
  environment: 'Environment',
  business: 'Business',
  judiciary: 'Judiciary',
};

export const TopicTag: React.FC<TopicTagProps> = ({
  topic,
  selected = false,
  onPress,
  size = 'medium',
}) => {
  const topicColor = colors.topics[topic];

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      style={[
        styles.container,
        size === 'small' && styles.containerSmall,
        { backgroundColor: selected ? topicColor : `${topicColor}20` },
      ]}
    >
      <Text
        style={[
          styles.text,
          size === 'small' && styles.textSmall,
          { color: selected ? colors.neutral.white : topicColor },
        ]}
      >
        {topicLabels[topic]}
      </Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  containerSmall: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  text: {
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
  },
  textSmall: {
    fontSize: typography.fontSize.xs,
  },
});
