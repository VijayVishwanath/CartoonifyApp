import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  Platform
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { toast } from 'sonner-native';

const { width } = Dimensions.get('window');

// Mock filter styles
const filterStyles = [
  { id: '1', name: 'Anime', image: 'https://api.a0.dev/assets/image?text=Anime%20Style&aspect=1:1', premium: false },
  { id: '2', name: 'Pixar', image: 'https://api.a0.dev/assets/image?text=Pixar%20Style&aspect=1:1', premium: false },
  { id: '3', name: 'Comic', image: 'https://api.a0.dev/assets/image?text=Comic%20Style&aspect=1:1', premium: false },
  { id: '4', name: 'Watercolor', image: 'https://api.a0.dev/assets/image?text=Watercolor%20Style&aspect=1:1', premium: true },
  { id: '5', name: 'Sketch', image: 'https://api.a0.dev/assets/image?text=Sketch%20Style&aspect=1:1', premium: true },
  { id: '6', name: 'Oil Painting', image: 'https://api.a0.dev/assets/image?text=Oil%20Painting%20Style&aspect=1:1', premium: true },
];

export default function FilterPreviewScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { imageUri } = route.params;
  
  const [selectedFilter, setSelectedFilter] = useState('1');
  const [intensity, setIntensity] = useState(0.7);
  const [loading, setLoading] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);
  const [showInterstitialAd, setShowInterstitialAd] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  // Simulate processing image with selected filter
  useEffect(() => {
    if (selectedFilter) {
      setLoading(true);
      setProcessedImage(null);
      
      // Simulate API call to process image
      setTimeout(() => {
        // For demo purposes, we'll just use the filter style image
        const filter = filterStyles.find(f => f.id === selectedFilter);
        setProcessedImage(filter.image);
        setLoading(false);
      }, 1500);
    }
  }, [selectedFilter]);
  
  const handleFilterSelect = (filterId) => {
    const filter = filterStyles.find(f => f.id === filterId);
    
    if (filter.premium) {
      setShowPremiumModal(true);
    } else {
      setSelectedFilter(filterId);
    }
  };
  
  const handleSave = () => {
    setLoading(true);
    
    // Simulate saving process
    setTimeout(() => {
      setLoading(false);
      
      // Show interstitial ad with 50% probability
      if (Math.random() > 0.5) {
        setShowInterstitialAd(true);
      } else {
        navigateToShare();
      }
    }, 1000);
  };
  
  const navigateToShare = () => {
    navigation.navigate('ShareScreen', { 
      processedImageUri: processedImage,
      originalImageUri: imageUri
    });
  };
  
  const closeInterstitialAd = () => {
    setShowInterstitialAd(false);
    navigateToShare();
  };
  
  const closePremiumModal = () => {
    setShowPremiumModal(false);
  };
  
  const goToSubscription = () => {
    setShowPremiumModal(false);
    navigation.navigate('Subscription');
  };
  
  const handleWatchAd = () => {
    setShowPremiumModal(false);
    setLoading(true);
    
    // Simulate rewarded ad
    setTimeout(() => {
      setLoading(false);
      toast.success('Premium filter unlocked for one use!');
      
      // Allow premium filter usage
      const filter = filterStyles.find(f => f.id === selectedFilter);
      if (filter) {
        setSelectedFilter(filter.id);
      }
    }, 2000);
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
        <Text style={styles.headerTitle}>Apply Filter</Text>
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
          <Ionicons name="time-outline" size={24} color="#4361ee" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.previewContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4361ee" />
            <Text style={styles.loadingText}>Processing image...</Text>
          </View>
        ) : processedImage ? (
          <Image 
            source={{ uri: processedImage }} 
            style={styles.previewImage}
            resizeMode="contain"
          />
        ) : (
          <Image 
            source={{ uri: imageUri }} 
            style={styles.previewImage}
            resizeMode="contain"
          />
        )}
        
        {processedImage && (
          <View style={styles.watermark}>
            <Text style={styles.watermarkText}>Cartoonify AI</Text>
          </View>
        )}
      </View>
      
      <View style={styles.controlsContainer}>
        <Text style={styles.controlLabel}>Filter Intensity</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={intensity}
          onValueChange={setIntensity}
          minimumTrackTintColor="#4361ee"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#4361ee"
        />
        <View style={styles.intensityLabels}>
          <Text style={styles.intensityLabel}>Subtle</Text>
          <Text style={styles.intensityLabel}>Strong</Text>
        </View>
      </View>
      
      <Text style={styles.filtersTitle}>Choose a Style</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersScrollContent}
      >
        {filterStyles.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterOption,
              selectedFilter === filter.id && styles.selectedFilterOption
            ]}
            onPress={() => handleFilterSelect(filter.id)}
          >
            <Image source={{ uri: filter.image }} style={styles.filterThumbnail} />
            <Text style={styles.filterName}>{filter.name}</Text>
            {filter.premium && (
              <View style={styles.premiumBadge}>
                <Ionicons name="star" size={12} color="white" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
          disabled={loading || !processedImage}
        >
          <Text style={styles.saveButtonText}>Save & Share</Text>
        </TouchableOpacity>
      </View>
      
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
      
      {/* Premium Feature Modal */}
      {showPremiumModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.premiumModal}>
            <Text style={styles.premiumModalTitle}>Premium Feature</Text>
            <Image 
              source={{ uri: 'https://api.a0.dev/assets/image?text=Premium%20Filters&aspect=16:9' }}
              style={styles.premiumImage}
              resizeMode="cover"
            />
            <Text style={styles.premiumModalText}>
              This filter is only available for premium users.
            </Text>
            
            <View style={styles.premiumOptions}>
              <TouchableOpacity 
                style={styles.subscribeButton}
                onPress={goToSubscription}
              >
                <Text style={styles.subscribeButtonText}>Subscribe</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.watchAdButton}
                onPress={handleWatchAd}
              >
                <Ionicons name="videocam-outline" size={20} color="white" />
                <Text style={styles.watchAdButtonText}>Watch Ad to Unlock</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.closeModalButton}
              onPress={closePremiumModal}
            >
              <Text style={styles.closeModalButtonText}>Not Now</Text>
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
  previewContainer: {
    height: width * 0.8,
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#e9ecef',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#6c757d',
    fontSize: 16,
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
  controlsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  intensityLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  intensityLabel: {
    color: '#6c757d',
    fontSize: 12,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  filtersScrollContent: {
    paddingHorizontal: 12,
  },
  filterOption: {
    marginHorizontal: 4,
    alignItems: 'center',
    width: 80,
  },
  selectedFilterOption: {
    borderWidth: 2,
    borderColor: '#4361ee',
    borderRadius: 12,
  },
  filterThumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginBottom: 4,
  },
  filterName: {
    fontSize: 12,
    color: '#495057',
    textAlign: 'center',
  },
  premiumBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ffc107',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#4361ee',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
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
  premiumModal: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  premiumModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4361ee',
    marginBottom: 16,
  },
  premiumImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 16,
  },
  premiumModalText: {
    fontSize: 16,
    color: '#495057',
    textAlign: 'center',
    marginBottom: 24,
  },
  premiumOptions: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 16,
  },
  subscribeButton: {
    backgroundColor: '#4361ee',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  watchAdButton: {
    backgroundColor: '#4cc9f0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  watchAdButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  closeModalButton: {
    paddingVertical: 12,
  },
  closeModalButtonText: {
    color: '#6c757d',
    fontSize: 16,
  },
});