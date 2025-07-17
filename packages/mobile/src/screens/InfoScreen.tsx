import React from 'react';
import { StyleSheet, Text as RNText, View as RNView, ScrollView as RNScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Create component aliases to fix TypeScript errors
const View = RNView as any;
const Text = RNText as any;
const ScrollView = RNScrollView as any;

export default function InfoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Information</Text>
          <Text style={styles.subtitle}>Learn about dog walking safety in different weather conditions</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Heat Safety</Text>
            <Text style={styles.infoText}>
              Dogs are susceptible to heat-related illnesses. They cool themselves primarily through panting, 
              which is less efficient than human sweating. Be cautious when temperatures rise above 20°C (68°F), 
              especially for brachycephalic breeds (flat-faced dogs).
            </Text>
          </View>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Cold Safety</Text>
            <Text style={styles.infoText}>
              Small dogs, dogs with thin coats, and elderly dogs are more vulnerable to cold. 
              Consider a dog coat when temperatures drop below 7°C (45°F). Be aware of ice and 
              salt on roads which can irritate paw pads.
            </Text>
          </View>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Medical Disclaimer</Text>
            <Text style={styles.infoText}>
              This app does not provide veterinary advice. The recommendations are general guidelines. 
              Always consult with your veterinarian for advice specific to your dog's health needs.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
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
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0284c7',
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});