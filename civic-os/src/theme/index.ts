export const colors = {
  // Primary palette - calm, trustworthy, civic
  primary: {
    navy: '#1A1A2E',
    blue: '#16213E',
    slate: '#0F3460',
    accent: '#4A6FA5',
  },
  // Neutral grays
  neutral: {
    white: '#FFFFFF',
    offWhite: '#F8F9FA',
    lightGray: '#E9ECEF',
    mediumGray: '#ADB5BD',
    darkGray: '#495057',
    charcoal: '#212529',
  },
  // Semantic colors
  semantic: {
    success: '#2D6A4F',
    warning: '#9A6700',
    error: '#9B2C2C',
    info: '#2B6CB0',
  },
  // Tier colors
  tier: {
    free: '#6C757D',
    plus: '#4A6FA5',
    pro: '#1A1A2E',
  },
  // Topic colors
  topics: {
    education: '#5C7AEA',
    taxes: '#48BB78',
    healthcare: '#ED64A6',
    agriculture: '#68D391',
    housing: '#F6AD55',
    transportation: '#4FD1C5',
    environment: '#38A169',
    business: '#805AD5',
    judiciary: '#C53030',
  },
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};
