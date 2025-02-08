import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ManageStoreScreen({ navigation }) {
  const [keywords, setKeywords] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  return (
    <View style={styles.container}>
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
          placeholder="Enter keywords to filter..."
          value={keywords}
          onChangeText={setKeywords}
        />
        
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
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
        
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rewardSection}>
        <TouchableOpacity
          style={styles.rewardButton}
          onPress={() => navigation.navigate('RewardApproval')}
        >
          <Text style={styles.rewardButtonText}>Reward Approval</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ParentDashboard')}>
          <Icon name="home-outline" size={24} color="#870ae0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Store')}>
          <Icon name="storefront-outline" size={24} color="#000" />
          <Text style={styles.navText}>Store</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ManageTasks')}>
          <Icon name="list-outline" size={24} color="#000" />
          <Text style={styles.navText}>Tasks</Text>
        </TouchableOpacity>
      </View>
    </View>
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
