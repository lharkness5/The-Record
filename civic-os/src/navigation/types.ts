import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  HomeMain: undefined;
  FederalMain: undefined;
  IowaMain: undefined;
  FoundationMain: undefined;
  SettingsMain: undefined;
  ChangeDetail: { id: string };
  Constitution: undefined;
  Glossary: undefined;
  HowItWorks: { level?: 'federal' | 'iowa' };
  DocumentDetail: { id: string };
};

export type HomeStackParamList = {
  HomeMain: undefined;
  ChangeDetail: { id: string };
};

export type FederalStackParamList = {
  FederalMain: undefined;
  ChangeDetail: { id: string };
};

export type IowaStackParamList = {
  IowaMain: undefined;
  ChangeDetail: { id: string };
};

export type FoundationStackParamList = {
  FoundationMain: undefined;
  Constitution: undefined;
  Glossary: undefined;
  HowItWorks: { level?: 'federal' | 'iowa' };
  DocumentDetail: { id: string };
};

export type ChangeDetailScreenProps = NativeStackScreenProps<HomeStackParamList, 'ChangeDetail'>;
export type HowItWorksScreenProps = NativeStackScreenProps<FoundationStackParamList, 'HowItWorks'>;
