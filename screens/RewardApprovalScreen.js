import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function RewardApprovalScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params || {}; // Parent ID

  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartData, setCartData] = useState({}); // Stores cart details per child

  useEffect(() => {
    fetchChildren();
  }, [userId]);

  // Fetch all children
  const fetchChildren = async () => {
    try {
      console.log(`Fetching children for parentId: ${userId}`);
      const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/User/${userId}/children`);
      
      if (response.ok) {
        const data = await response.json();
        setChildren(data);

        // Fetch each child's cart details
        data.forEach((child) => fetchChildCart(child.userId));
      } else {
        setError("Failed to fetch children.");
      }
    } catch (error) {
      console.error("Error fetching children:", error);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart details for each child
  const fetchChildCart = async (childId) => {
    try {
      console.log(`Fetching cart for childId: ${childId}`);
      const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/Cart/${childId}`);

      if (response.ok) {
        const data = await response.json();
        
        // Filter only rewards with "SUBMITTED" status
        const submittedRewards = data.rewards.filter((reward) => reward.parentApprovalStatus === "SUBMITTED");

        // Only set the cart if it has submitted rewards
        if (submittedRewards.length > 0) {
          setCartData((prev) => ({
            ...prev,
            [childId]: { ...data, rewards: submittedRewards },
          }));
        }
      }
    } catch (error) {
      console.error(`Error fetching cart for child ${childId}:`, error);
    }
  };

 // Approve the cart for a child
  const approveCart = async (childId) => {
    try {
      console.log(`Approving cart for childId: ${childId}`);
      const response = await fetch(
        `https://choresbuddy-dotnet.onrender.com/api/RewardCart/approve/${childId}`,
        { method: 'POST' }
      );

      if (response.ok) {
        Alert.alert("Success", "Cart approved!");
        fetchChildren(); // Refresh the cart details after approval
      } else {
        Alert.alert("Error", "Failed to approve the cart.");
      }
    } catch (error) {
      console.error("Error approving cart:", error);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  // Decline the cart for a child
  const declineCart = async (childId) => {
    try {
      console.log(`Declining cart for childId: ${childId}`);
      const response = await fetch(
        `https://choresbuddy-dotnet.onrender.com/api/RewardCart/${childId}/decline`,
        { method: 'PUT' }
      );

      if (response.ok) {
        Alert.alert("Success", "Cart declined.");
        fetchChildren(); // Refresh the cart details after decline
      } else {
        Alert.alert("Error", "Failed to decline the cart.");
      }
    } catch (error) {
      console.error("Error declining cart:", error);
      Alert.alert("Error", "Something went wrong.");
    }
  };


  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#870ae0" />
        <Text>Loading reward approvals...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Reward Approvals</Text>
      </View>

      <FlatList
        data={children}
        keyExtractor={(child) => child.userId.toString()}
        renderItem={({ item: child }) => {
          const cart = cartData[child.userId];

          return (
            cart ? (
              <View style={styles.childCard}>
                <Text style={styles.childName}>{child.name}'s Reward Cart</Text>

                {cart.rewards.map((reward, index) => (
                  <View key={`${reward.rewardId}-${index}`} style={styles.rewardCard}> 
                    <Image source={{ uri: reward.imageUrl }} style={styles.rewardImage} />
                    <View style={styles.rewardInfo}>
                      <Text style={styles.rewardName}>{reward.name}</Text>
                      <Text style={styles.rewardPoints}>{reward.pointsRequired} pts</Text>
                    </View>
                  </View>
                ))}

                {/* Approve & Decline Buttons */}
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.approveButton}
                    onPress={() => approveCart(child.userId)} // Now uses childId
                  >
                    <Text style={styles.buttonText}>Approve</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.declineButton}
                    onPress={() => declineCart(child.userId)} // Now uses childId
                  >
                    <Text style={styles.buttonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null
          );
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginLeft: 10 },
  backButton: { padding: 10 },

  childCard: { backgroundColor: '#f1f1f1', padding: 15, borderRadius: 8, marginBottom: 15 },
  childName: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },

  rewardCard: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  rewardImage: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  rewardInfo: { flex: 1 },
  rewardName: { fontSize: 16, fontWeight: 'bold' },
  rewardPoints: { fontSize: 14, color: '#870ae0' },

  noRewards: { fontSize: 16, fontStyle: 'italic', color: '#666', marginTop: 5 },

  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  approveButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 6, flex: 1, alignItems: 'center', marginRight: 5 },
  declineButton: { backgroundColor: '#F44336', padding: 10, borderRadius: 6, flex: 1, alignItems: 'center', marginLeft: 5 },
  buttonText: { color: '#ffffff', fontSize: 14, fontWeight: 'bold' },

  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: 'red', textAlign: 'center', marginTop: 10 },
});
