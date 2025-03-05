import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function LeaderboardScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params || {}; // Get userId from navigation params

  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchLeaderboard();
    }
  }, [userId]);

  const fetchLeaderboard = async () => {
    try {
      console.log(`Fetching leaderboard for childId: ${userId}`);

      const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/Task/child/${userId}/siblings-leaderboard`);
      console.log("API Response Status:", response.status);

      const data = await response.json();
      console.log("API Response Data:", data);

      if (response.ok) {
        setLeaderboard(data);
      } else {
        setError(data.message || "Failed to load leaderboard.");
      }
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError("Something went wrong while fetching leaderboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#870ae0" />
        <Text>Loading leaderboard...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchLeaderboard}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="arrow-back-outline" size={28} color="#000" onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Leaderboard</Text>
      </View>

      {/* Leaderboard List */}
      <FlatList
        data={leaderboard}
        keyExtractor={(item) => item.childId.toString()}
        renderItem={({ item, index }) => (
          <View key={item.childId} style={styles.userCard}>
            <Image source={{ uri: `https://cdn-icons-png.flaticon.com/512/2922/2922510.png` }} style={styles.userImage} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {index + 1}. {item.childName}
              </Text>
              <Text>Tasks Done: {item.tasksDone}</Text>
              <Text>Points Earned: {item.points}</Text>
              <Text>Trophies: {item.trophiesEarned}</Text>
            </View>
          </View>
        )}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Icon name="home-outline" size={24} color="#870ae0" onPress={() => navigation.navigate('ChildDashboard', { userId })} />
        <Icon name="cart-outline" size={24} color="#000" onPress={() => navigation.navigate('CartScreen', { userId })} />
        <Icon name="storefront-outline" size={24} color="#000" onPress={() => navigation.navigate('ChildStoreScreen', { userId })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 20, paddingBottom: 80 },

  header: { flexDirection: 'row', alignItems: 'center', paddingBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#030303', marginLeft: 10 },

  switchContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  switchLabel: { fontSize: 18, fontWeight: 'bold', marginRight: 10 },

  userCard: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  userImage: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  userInfo: { flex: 1 },
  userName: { fontSize: 16, fontWeight: 'bold' },

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
});
