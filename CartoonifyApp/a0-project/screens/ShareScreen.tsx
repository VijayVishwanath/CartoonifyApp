import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  Platform,
  ActivityIndicator,
  Share,
  ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { toast } from 'sonner-native';

const socialPlatforms = [
  { id: 'instagram', name: 'Instagram', icon: 'logo-instagram', color: '#E1306C' },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'logo-whatsapp', color: '#25D366' },
  { id: 'tiktok', name: 'TikTok', icon: 'logo-tiktok', color: '#000000' },
  { id: 'facebook', name: 'Facebook', icon: 'logo-facebook', color: '#1877F2' },
  { id: 'twitter', name: 'Twitter', icon: 'logo-twitter', color: '#1DA1F2' },
];

export default function ShareScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { processedImageUri, originalImageUri } = route.params;
  
  const [loading, setLoading] = useState(false);
  const [showInterstitialAd, setShowInterstitialAd] = useState(false);
  
  const handleShare = async (platform) => {
    try {
      setLoading(true);
      
      // Simulate sharing process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result = await Share.share({
        message: `Check out my cartoon avatar created with Cartoonify AI!`,
        url: processedImageUri,
      });
      
      if (result.action === Share.sharedAction) {
        toast.success(`Shared to ${platform.name}!`);
        
        // Show interstitial ad with 30% probability after sharing
        if (Math.random() < 0.3) {
          setShowInterstitialAd(true);
        }
      }
    } catch (error) {
      toast.error('Error sharing image');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSaveToGallery = () => {
    setLoading(true);
    
    // Simulate saving to gallery
    setTimeout(() => {
      setLoading(false);
      toast.success('Image saved to gallery!');
    }, 1500);
  };
  
  const closeInterstitialAd = () => {
    setShowInterstitialAd(false);
  };
  
  const handleCreateNew = () => {
    navigation.navigate('ImagePicker');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#4361ee" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Share Your Creation</Text>
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
          <Ionicons name="time-outline" size={24} color="#4361ee" />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: processedImageUri }} 
            style={styles.processedImage}
            resizeMode="contain"
          />
          
          <View style={styles.watermark}>
            <Text style={styles.watermarkText}>Cartoonify AI</Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Share to Social Media</Text>
        
        <View style={styles.socialButtonsContainer}>
          {socialPlatforms.map((platform) => (
            <TouchableOpacity
              key={platform.id}
              style={[styles.socialButton, { backgroundColor: platform.color }]}
              onPress={() => handleShare(platform)}
              disabled={loading}
            >
              <Ionicons name={platform.icon} size={24} color="white" />
              <Text style={styles.socialButtonText}>{platform.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSaveToGallery}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Ionicons name="download-outline" size={20} color="white" />
                <Text style={styles.saveButtonText}>Save to Gallery</Text>
              </>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.newButton}
            onPress={handleCreateNew}
          >
            <Ionicons name="add-circle-outline" size={20} color="white" />
            <Text style={styles.newButtonText}>Create New</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.beforeAfterContainer}>
          <Text style={styles.beforeAfterTitle}>Before & After</Text>
          
          <View style={styles.beforeAfterImages}>
            <View style={styles.beforeImageContainer}>
              <Image 
                source={{ uri: originalImageUri }} 
                style={styles.beforeImage}
                resizeMode="cover"
              />
              <Text style={styles.beforeAfterLabel}>Original</Text>
            </View>
            
            <Ionicons name="arrow-forward" size={24} color="#6c757d" style={styles.arrowIcon} />
            
            <View style={styles.afterImageContainer}>
              <Image 
                source={{ uri: processedImageUri }} 
                style={styles.afterImage}
                resizeMode="cover"
              />
              <Text style={styles.beforeAfterLabel}>Cartoon</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.upgradeButton}
          onPress={() => navigation.navigate('Subscription')}
        >
          <Ionicons name="star" size={20} color="white" />
          <Text style={styles.upgradeButtonText}>Upgrade to Premium</Text>
        </TouchableOpacity>
      </ScrollView>
      
      <View style={styles.adBanner}>
        <Text style={styles.adText}>AD BANNER PLACEHOLDER</Text>
      </View>
      
      {/* Interstitial Ad Modal */}
      {showInterstitialAd && (
        <View style={styles.modalOverlay}>
          <View style={styles.adModal}>
            <Text style={styles.adModalTitle}>Advertisement</Text>
            <View style={styles.adModalContent}>
              <Text style={styles.adModalText}>This would be an interstitial ad</Text>
            </View>
            <TouchableOpacity 
              style={styles.adModalCloseButton}
              onPress={closeInterstitialAd}
            >
              <Text style={styles.adModalCloseText}>Close Ad</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  imageContainer: {
    height: 300,
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#e9ecef',
    position: 'relative',
  },
  processedImage: {
    width: '100%',
    height: '100%',
  },
  watermark: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  watermarkText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
    width: '48%',
  },
  socialButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  saveButton: {
    backgroundColor: '#4361ee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    flex: 0.48,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  newButton: {
    backgroundColor: '#4cc9f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    flex: 0.48,
  },
  newButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  beforeAfterContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  beforeAfterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 12,
  },
  beforeAfterImages: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  beforeImageContainer: {
    width: '40%',
    alignItems: 'center',
  },
  afterImageContainer: {
    width: '40%',
    alignItems: 'center',
  },
  beforeImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  afterImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  beforeAfterLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  arrowIcon: {
    marginHorizontal: 8,
  },
  upgradeButton: {
    backgroundColor: '#f72585',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  upgradeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  adBanner: {
    height: 50,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 0 : 10,
  },
  adText: {
    color: '#6c757d',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  adModal: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  adModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  adModalContent: {
    width: '100%',
    height: 200,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 8,
  },
  adModalText: {
    fontSize: 16,
    color: '#6c757d',
  },
  adModalCloseButton: {
    backgroundColor: '#4361ee',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  adModalCloseText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});