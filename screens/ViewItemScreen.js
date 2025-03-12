import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ViewItemScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId, item } = route.params || {};
  console.log(userId);
  console.log(item);

  const [childPoints, setChildPoints] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchChildPoints();
      fetchCart();
    }
  }, [userId]);

  const fetchChildPoints = async () => {
    try {
      console.log(`Fetching points for childId: ${userId}`);
      const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/User/child/${userId}/points`);
      
      if (response.ok) {
        const data = await response.json();
        setChildPoints(data.points);
      } else {
        console.error("Failed to fetch child points.");
      }
    } catch (err) {
      console.error("Error fetching child points:", err);
    }
  };

  const fetchCart = async () => {
    try {
      console.log(`Fetching cart for childId: ${userId}`);
      const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/Cart/${userId}`);

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.rewards || []);
      } else {
        console.error("Failed to fetch cart.");
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    if (childPoints < item.pointsRequired) {
      Alert.alert("Not Enough Points", "You don't have enough points for this reward.");
      return;
    }

    try {
      console.log(`Adding reward ${item.rewardId} to cart for childId: ${userId}`);
      const response = await fetch(
        `https://choresbuddy-dotnet.onrender.com/api/rewardcart/add-to-cart?childId=${userId}&rewardId=${item.rewardId}`,
        { method: "POST" }
      );

      if (response.ok) {
        Alert.alert("Success", "Reward added to cart!");
        setChildPoints((prevPoints) => prevPoints - item.pointsRequired);
        fetchCart(); // Refresh cart
      } else {
        const data = await response.json();
        Alert.alert("Error", data.message || "Failed to add reward to cart.");
      }
    } catch (err) {
      console.error("Error adding reward to cart:", err);
      Alert.alert("Error", "Something went wrong while adding reward to cart.");
    }
  };

  const isInCart = cartItems.some(cartItem => cartItem.rewardId === item.rewardId);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#870ae0" />
        <Text>Loading reward details...</Text>
      </View>
    );
  }

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
      </View>

      {/* Item Details */}
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemPoints}>{item.pointsRequired} pts</Text>

      {/* Add to Cart Button */}
      <TouchableOpacity 
        style={[styles.addToCartButton, isInCart && styles.disabledButton]} 
        onPress={addToCart} 
        disabled={isInCart}
      >
        <Icon name="cart-outline" size={24} color="#fff" />
        <Text style={styles.addToCartText}>{isInCart ? "Already in Cart" : "Add to Cart"}</Text>
      </TouchableOpacity>

      {/* Description */}
      <Text style={styles.itemDescription}>{item.description}</Text>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ChildDashboard')}>
          <Icon name="home-outline" size={24} color="#870ae0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Cart', { userId })}>
          <Icon name="cart-outline" size={24} color="#000" />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ChildStoreScreen')}>
          <Icon name="storefront-outline" size={24} color="#000" />
          <Text style={styles.navText}>Store</Text>
        </TouchableOpacity>
      </View>
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

  itemImage: { width: '100%', height: 200, borderRadius: 10, marginVertical: 10 },
  itemTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  itemPoints: { fontSize: 16, fontWeight: 'bold', color: '#870ae0', marginVertical: 5 },
  itemDescription: { fontSize: 14, color: '#666', marginVertical: 10 },

  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#870ae0',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  addToCartText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#030303', marginVertical: 10 },

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
