import React from 'react';
import { StyleSheet, Text as RNText, View as RNView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Create component aliases to fix TypeScript errors
const View = RNView as any;
const Text = RNText as any;

export default function ForecastScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Forecast</Text>
        <Text style={styles.subtitle}>View the weather forecast for the next few days</Text>
        
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>Forecast data will appear here</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#555',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
  },
});