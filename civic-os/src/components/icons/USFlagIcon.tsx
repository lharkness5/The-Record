import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme';

interface USFlagIconProps {
  size?: number;
  focused?: boolean;
}

export const USFlagIcon: React.FC<USFlagIconProps> = ({ size = 24, focused = false }) => {
  const stripeHeight = (size * 0.7) / 13;
  const opacity = focused ? 1 : 0.6;

  return (
    <View style={[styles.container, { width: size, height: size * 0.7, opacity }]}>
      {/* Stripes */}
      <View style={styles.stripesContainer}>
        {[...Array(13)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.stripe,
              {
                height: stripeHeight,
                backgroundColor: i % 2 === 0 ? '#B22234' : '#FFFFFF',
              },
            ]}
          />
        ))}
      </View>
      {/* Blue canton */}
      <View
        style={[
          styles.canton,
          {
            width: size * 0.4,
            height: stripeHeight * 7,
            backgroundColor: '#3C3B6E',
          },
        ]}
      >
        {/* Stars representation - simplified dots */}
        <View style={styles.starsContainer}>
          {[...Array(9)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.star,
                {
                  width: size * 0.04,
                  height: size * 0.04,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  stripesContainer: {
    flex: 1,
  },
  stripe: {
    width: '100%',
  },
  canton: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  starsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 2,
  },
  star: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 1,
  },
});
