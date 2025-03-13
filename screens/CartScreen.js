import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert, StyleSheet 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function CartScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params || {}; // Get userId from navigation params

  const [cartItems, setCartItems] = useState([]);
  const [childPoints, setChildPoints] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchCart();
      fetchChildPoints();
    }
  }, [userId]);

  const fetchCart = async () => {
    try {
      console.log(`Fetching cart for childId: ${userId}`);
      const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/Cart/${userId}`);

      if (response.ok) {
        const data = await response.json();
        console.log("Cart API Response Data:", data);

        // Filter out rewards with "APPROVED" status
        const filteredRewards = data.rewards.filter(item => item.parentApprovalStatus !== "APPROVED" && item.parentApprovalStatus !== "DECLINED");

        setCartItems(filteredRewards || []);
        setCartId(data.cartId || null);
      } else {
        console.error("Failed to fetch cart.");
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

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

  const removeFromCart = async (rewardId) => {
    try {
      console.log(`Removing reward ${rewardId} from cart for childId: ${userId}`);
      const response = await fetch(
        `https://choresbuddy-dotnet.onrender.com/api/RewardCart?cartId=${cartId}&rewardId=${rewardId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        Alert.alert("Success", "Reward removed from cart!");
        fetchCart(); // Refresh cart
      } else {
        Alert.alert("Error", "Failed to remove reward from cart.");
      }
    } catch (err) {
      console.error("Error removing reward from cart:", err);
      Alert.alert("Error", "Something went wrong while removing reward.");
    }
  };

  const submitForVerification = async () => {
    try {
      console.log(`Submitting cart for verification for childId: ${userId}`);
      const response = await fetch(
        `https://choresbuddy-dotnet.onrender.com/api/RewardCart/submit/${userId}`,
        { method: "POST" }
      );

      if (response.ok) {
        Alert.alert("Success", "Cart submitted for verification!");
        fetchCart(); // Refresh cart
      } else {
        Alert.alert("Error", "Failed to submit cart.");
      }
    } catch (err) {
      console.error("Error submitting cart:", err);
      Alert.alert("Error", "Something went wrong while submitting cart.");
    }
  };

  const allItemsSubmitted = cartItems.length > 0 && cartItems.every(item => item.parentApprovalStatus === "SUBMITTED");

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#870ae0" />
        <Text>Loading cart...</Text>
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
        <Text style={styles.title}>Cart</Text>
        <View style={styles.pointsContainer}>
          <Icon name="wallet-outline" size={24} color="#000" />
          <Text style={styles.pointsText}>{childPoints} pts</Text>
        </View>
      </View>

      {/* Cart List */}
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => `${item.rewardId}-${index}`} // ✅ Ensure unique keys
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemPoints}>{item.pointsRequired} pts</Text>
                {item.parentApprovalStatus === "SUBMITTED" && (
                  <Text style={styles.submittedText}>Submitted</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.rewardId)}
                disabled={item.parentApprovalStatus === "SUBMITTED"}
              >
                <Icon name="trash-outline" size={24} color={item.parentApprovalStatus === "SUBMITTED" ? "gray" : "red"} />
              </TouchableOpacity>
            </View>
          )}
        />

      )}

      {/* Total Points */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: </Text>
        <Text style={styles.totalPoints}>
          {cartItems.reduce((total, item) => total + item.pointsRequired, 0)} pts
        </Text>
      </View>

      {/* Submit for Verification */}
      <TouchableOpacity 
        style={[styles.verifyButton, allItemsSubmitted && styles.disabledButton]} 
        onPress={submitForVerification} 
        disabled={allItemsSubmitted}
      >
        <Text style={styles.verifyButtonText}>
          {allItemsSubmitted ? "Already Submitted" : "Send for Verification"}
        </Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ChildDashboard', { userId })}>
          <Icon name="home-outline" size={24} color="#870ae0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Cart', { userId })}>
          <Icon name="cart-outline" size={24} color="#000" />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ChildStoreScreen', { userId })}>
          <Icon name="storefront-outline" size={24} color="#000" />
          <Text style={styles.navText}>Store</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 20, paddingBottom: 80 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#030303' },
  backButton: { padding: 10 },
  pointsContainer: { flexDirection: 'row', alignItems: 'center' },
  pointsText: { fontSize: 16, marginLeft: 5, fontWeight: 'bold', color: '#000' },

  itemCard: { flexDirection: 'row', backgroundColor: '#f7f7f7', padding: 15, borderRadius: 8, alignItems: 'center', marginVertical: 8 },
  itemImage: { width: 50, height: 50, borderRadius: 8, marginRight: 15 },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: 'bold' },
  itemPoints: { fontSize: 14, fontWeight: 'bold', color: '#870ae0' },
  itemQty: { fontSize: 12, color: '#666' },

  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  totalText: { fontSize: 18, fontWeight: 'bold' },
  totalPoints: { fontSize: 18, fontWeight: 'bold', color: '#870ae0' },

  verifyButton: { backgroundColor: '#870ae0', borderRadius: 6, paddingVertical: 12, alignItems: 'center', marginVertical: 10 },
  verifyButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  disabledButton: { backgroundColor: '#ccc' },

  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#ccc', backgroundColor: '#ffffff', paddingVertical: 12, height: 70 },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 16, color: '#030303', marginTop: 5 },
});
