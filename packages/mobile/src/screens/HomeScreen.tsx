import React, { useState } from 'react';
import { StyleSheet, Text as RNText, View as RNView, TextInput as RNTextInput, TouchableOpacity, ActivityIndicator as RNActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Create component aliases to fix TypeScript errors
const View = RNView as any;
const Text = RNText as any;
const TextInput = RNTextInput as any;
const ActivityIndicator = RNActivityIndicator as any;
// Make sure expo-env.d.ts is properly loaded

export default function HomeScreen() {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckWeather = () => {
    if (!location) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Can I Walk My Dog Today?</Text>
        <Text style={styles.subtitle}>Check if weather conditions are safe for walking your dog</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your location"
            value={location}
            onChangeText={setLocation}
          />
          <TouchableOpacity 
            style={styles.button}
            onPress={handleCheckWeather}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Check</Text>
            )}
          </TouchableOpacity>
        </View>
        
        <View style={styles.resultContainer}>
          {/* Weather results will be displayed here */}
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
    textAlign: 'center',
    marginBottom: 10,
    color: '#0369a1',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#0c4a6e',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#bae6fd',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: 80,
    height: 50,
    backgroundColor: '#0284c7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});