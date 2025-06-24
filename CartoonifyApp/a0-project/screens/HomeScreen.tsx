import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.appTitle}>Cartoonify AI</Text>
        <Text style={styles.appSubtitle}>Avatar Maker</Text>
      </View>
      
      <View style={styles.heroContainer}>
        <Image 
          source={{ uri: 'https://api.a0.dev/assets/image?text=Cartoon%20Avatars%20Examples&aspect=16:9' }}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => navigation.navigate('ImagePicker')}
        >
          <Text style={styles.actionButtonText}>Get Started</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.secondaryButton]} 
          onPress={() => navigation.navigate('History')}
        >
          <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>View History</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.secondaryButton]} 
          onPress={() => navigation.navigate('Subscription')}
        >
          <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Premium Features</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Transform your photos into amazing cartoon avatars!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4361ee',
  },
  appSubtitle: {
    fontSize: 18,
    color: '#4361ee',
    opacity: 0.8,
  },
  heroContainer: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    height: 200,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  actionsContainer: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  actionButton: {
    backgroundColor: '#4361ee',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#4361ee',
  },
  secondaryButtonText: {
    color: '#4361ee',
  },
  footer: {
    marginTop: 'auto',
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
});