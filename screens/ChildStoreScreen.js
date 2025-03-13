import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, TextInput, TouchableOpacity, Image, ActivityIndicator, StyleSheet, Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ChildStoreScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params || {}; // Get userId from navigation params

  const [searchQuery, setSearchQuery] = useState('');
  const [rewards, setRewards] = useState([]);
  const [childPoints, setChildPoints] = useState(0);
  const [cartItems, setCartItems] = useState([]); // Stores cart items
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchRewards();
      fetchChildPoints();
      fetchCart(); // Fetch cart items
    }
  }, [userId]);

  const fetchRewards = async () => {
    try {
      console.log(`Fetching available rewards for childId: ${userId}`);

      const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/Reward/child/${userId}/available`);
      console.log("API Response Status:", response.status);

      const data = await response.json();
      console.log("API Response Data:", data);

      if (response.ok) {
        setRewards(data);
      } else {
        setError(data.message || "No rewards available.");
      }
    } catch (err) {
      console.error("Error fetching rewards:", err);
      setError("Something went wrong while fetching rewards.");
    } finally {
      setLoading(false);
    }
  };

  const fetchChildPoints = async () => {
    try {
      console.log(`Fetching points for childId: ${userId}`);
      
      const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/User/child/${userId}/points`);
      console.log("Points API Response Status:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Points API Response Data:", data);
        setChildPoints(data.points);
      } else {
        console.log("Failed to fetch child points.");
      }
    } catch (err) {
      console.error("Error fetching child points:", err);
    }
  };

  const fetchCart = async () => {
    try {
      console.log(`Fetching cart for childId: ${userId}`);
      
      const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/Cart/${userId}`);
      console.log("Cart API Response Status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Cart API Response Data:", data);
        setCartItems(data.rewards || []);
      } else {
        console.log("Failed to fetch cart.");
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const addToCart = async (rewardId, pointsRequired) => {
    if (childPoints < pointsRequired) {
      Alert.alert("Not Enough Points", "You don't have enough points for this reward.");
      return;
    }

    try {
      console.log(`Adding reward ${rewardId} to cart for childId: ${userId}`);
      
      const response = await fetch(
        `https://choresbuddy-dotnet.onrender.com/api/rewardcart/add-to-cart?childId=${userId}&rewardId=${rewardId}`,
        { method: "POST" }
      );
      console.log("Add to Cart API Response Status:", response.status);

      if (response.ok) {
        Alert.alert("Success", "Reward added to cart!");
        setChildPoints((prevPoints) => prevPoints - pointsRequired);
        fetchCart(); // Refresh cart count
      } else {
        const data = await response.json();
        Alert.alert("Error", data.message || "Failed to add reward to cart.");
      }
    } catch (err) {
      console.error("Error adding reward to cart:", err);
      Alert.alert("Error", "Something went wrong while adding reward to cart.");
    }
  };

  const filteredItems = rewards.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Store</Text>
        <View style={styles.pointsContainer}>
          <Icon name="wallet-outline" size={24} color="#000" />
          <Text style={styles.pointsText}>{childPoints} pts</Text>
        </View>
        <TouchableOpacity style={styles.cartIcon} onPress={() => navigation.navigate('Cart', { userId })}>
          <Icon name="cart-outline" size={28} color="#000" />
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Rewards List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.rewardId.toString()}
        renderItem={({ item }) => {
          const existingItem = cartItems.find(cartItem => cartItem.rewardId === item.rewardId);
          const isInCart = existingItem && ["PENDING", "SUBMITTED"].includes(existingItem.parentApprovalStatus);

          return (
            <TouchableOpacity onPress={() => navigation.navigate('ViewItemScreen', { userId, item })}>
              <View style={styles.itemCard}>
                <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <Text style={styles.itemPoints}>{item.pointsRequired} pts</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
                <TouchableOpacity 
                  style={[styles.cartButton, isInCart && styles.disabledButton]}
                  onPress={() => addToCart(item.rewardId, item.pointsRequired)}
                  disabled={isInCart}
                >
                  <Icon name="cart-outline" size={24} color={isInCart ? "#ccc" : "#870ae0"} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 20, paddingBottom: 80 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#030303' },
  backButton: { padding: 10 },
  pointsContainer: { flexDirection: 'row', alignItems: 'center' },
  pointsText: { fontSize: 16, marginLeft: 5, fontWeight: 'bold', color: '#000' },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchIcon: { marginRight: 5 },
  searchInput: { flex: 1, height: 40 },

  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  itemImage: { width: 50, height: 50, borderRadius: 8, marginRight: 15 },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: 'bold' },
  itemPoints: { fontSize: 14, fontWeight: 'bold', color: '#870ae0' },
  itemDescription: { fontSize: 12, color: '#666' },
  cartButton: { padding: 10 },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    height: 70,
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 16, color: '#030303', marginTop: 5 },
});
