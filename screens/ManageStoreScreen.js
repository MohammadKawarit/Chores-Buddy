import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, 
  ScrollView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ManageStoreScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params || {}; // Get userId from params

  const [keywords, setKeywords] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchFilterSettings();
    }
  }, [userId]);

  const fetchFilterSettings = async () => {
    try {
      console.log(`Fetching store filters for parentId: ${userId}`);

      const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/RewardFilter/${userId}`);
      console.log("API Response Status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("API Response Data:", data);

        setKeywords(data.bannedKeywords || '');
        setMinPrice(data.minPrice?.toString() || '');
        setMaxPrice(data.maxPrice?.toString() || '');
      } else {
        console.log("No filter found, allowing user to create a new one.");
      }
    } catch (err) {
      console.error("Error fetching store filters:", err);
      setError("Something went wrong while fetching store filters.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFilter = async () => {

    const filterData = {
      parentId: userId,
      bannedKeywords: keywords,
      minPrice: parseInt(minPrice, 10),
      maxPrice: parseInt(maxPrice, 10),
    };

    try {
      console.log(filterData);
      const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/RewardFilter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterData),
      });

      console.log("API Response Status:", response.status);
      const responseData = await response.json();
      console.log("API Response Data:", responseData);

      if (response.ok) {
        Alert.alert("Success", "Filter settings updated successfully.");
      } else {
        Alert.alert("Error", responseData.message || "Failed to update filter settings.");
      }
    } catch (err) {
      console.error("Error saving store filters:", err);
      Alert.alert("Error", "Something went wrong while saving store filters.");
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#870ae0" />
        <Text>Loading store filter settings...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchFilterSettings}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="arrow-back-outline" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Manage Store & Verify Gifts</Text>
          </View>

          <View style={styles.filterCard}>
            <Text style={styles.sectionTitle}>Filter Keywords</Text>
            <Text style={styles.description}>
              Enter keywords for items you want to ban from the shop. This will prevent these items from being visible to children.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter keywords to filter (comma-separated)..."
              value={keywords}
              onChangeText={setKeywords}
            />
          </View>

          <View style={styles.filterCard}>
            <Text style={styles.sectionTitle}>Filter by Price</Text>
            <Text style={styles.description}>
              Set the price range for items you want to display in the shop.
            </Text>
            <View style={styles.priceFilter}>
              <TextInput
                style={styles.priceInput}
                placeholder="Min price..."
                keyboardType="numeric"
                value={minPrice}
                onChangeText={setMinPrice}
              />
              <TextInput
                style={styles.priceInput}
                placeholder="Max price..."
                keyboardType="numeric"
                value={maxPrice}
                onChangeText={setMaxPrice}
              />
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={handleSaveFilter}>
              <Text style={styles.confirmButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rewardSection}>
            <TouchableOpacity
              style={styles.rewardButton}
              onPress={() => navigation.navigate('RewardApproval', {userId})}
            >
              <Text style={styles.rewardButtonText}>Reward Approval</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 20, paddingBottom: 80 },

  topBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingBottom: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc',
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#030303',
    marginLeft: 10, 
  },
  backButton: {
    padding: 10,
    marginTop: -3, 
  },

  filterCard: { backgroundColor: '#f7f7f7', padding: 15, borderRadius: 6, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#030303', marginBottom: 5 },
  description: { fontSize: 14, color: '#666', marginBottom: 10 },
  input: { backgroundColor: '#e3e3e3', padding: 10, borderRadius: 6 },

  priceFilter: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  priceInput: { backgroundColor: '#e3e3e3', padding: 10, borderRadius: 6, width: '48%' },

  confirmButton: {
    backgroundColor: '#870ae0',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },

  rewardSection: {
    marginTop: 40, 
    alignItems: 'center', 
  },
  rewardButton: {
    backgroundColor: '#870ae0',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    width: '100%',
  },
  rewardButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },

  bottomNav: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#ffffff', flexDirection: 'row', justifyContent: 'space-around',
    borderTopWidth: 1, borderTopColor: '#ccc', paddingVertical: 10, height: 60,
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 14, color: '#030303' },
});
