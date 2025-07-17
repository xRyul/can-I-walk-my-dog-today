// This file contains global type declarations for React Native components

import React from 'react';
import { 
  ViewProps, 
  TextProps, 
  TextInputProps, 
  ActivityIndicatorProps,
  ScrollViewProps,
  SwitchProps,
  TouchableOpacityProps
} from 'react-native';

// Declare the React Native components as JSX intrinsic elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'View': React.PropsWithChildren<ViewProps>;
      'Text': React.PropsWithChildren<TextProps>;
      'TextInput': React.PropsWithChildren<TextInputProps>;
      'ActivityIndicator': React.PropsWithChildren<ActivityIndicatorProps>;
      'ScrollView': React.PropsWithChildren<ScrollViewProps>;
      'Switch': React.PropsWithChildren<SwitchProps>;
      'TouchableOpacity': React.PropsWithChildren<TouchableOpacityProps>;
    }
  }
}