import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ChildProgressScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params || {}; // Get userId from navigation params

  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchChildrenLeaderboard();
    }
  }, [userId]);

  const fetchChildrenLeaderboard = async () => {
    try {
      console.log(`Fetching leaderboard for parentId: ${userId}`);

      const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/Task/child/${userId}/children-leaderboard`);
      console.log("API Response Status:", response.status);

      const data = await response.json();
      console.log("API Response Data:", data);

      if (response.ok) {
        setChildren(data);
      } else {
        setError(data.message || "Failed to load children leaderboard.");
      }
    } catch (err) {
      console.error("Error fetching children leaderboard:", err);
      setError("Something went wrong while fetching leaderboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#870ae0" />
        <Text>Loading children progress...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchChildrenLeaderboard}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
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
        <Text style={styles.title}>Child Progress</Text>
      </View>

      {/* Child Leaderboard List */}
      <FlatList
        data={children}
        keyExtractor={(item) => item.childId.toString()}
        renderItem={({ item }) => (
          <View style={styles.childCard}>
            <Image 
              source={{ uri: `https://cdn-icons-png.flaticon.com/512/2922/2922510.png` }} 
              style={styles.childImage} 
            />

            <View style={styles.childInfo}>
              <Text style={styles.childName}>{item.childName}</Text>
              <Text>Tasks Done: {item.tasksDone}</Text>
              <Text>Points: {item.points}</Text>
              <Text>Trophies: {item.trophiesEarned}</Text>
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.trophyButton}
                onPress={() => navigation.navigate('Trophies', { userId: item.childId })}
              >
                <Text style={styles.buttonText}>Trophies</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.taskButton}
                onPress={() => navigation.navigate('TasksDetails', { userId: item.childId })}
              >
                <Text style={styles.buttonText}>Tasks Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ParentDashboard', { userId })}>
          <Icon name="home-outline" size={24} color="#870ae0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Store', { userId })}>
          <Icon name="storefront-outline" size={24} color="#000" />
          <Text style={styles.navText}>Store</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ManageTasks', { userId })}>
          <Icon name="list-outline" size={24} color="#000" />
          <Text style={styles.navText}>Tasks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    paddingBottom: 60, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center', 
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#030303',
    marginLeft: 10, 
  },
  backButton: {
    padding: 10,
    marginTop: -3, 
  },

  childCard: {
    flexDirection: 'row',
    backgroundColor: '#e3cef2',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 15,
  },
  childImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  trophyButton: {
    backgroundColor: '#870ae0',
    padding: 8,
    borderRadius: 6,
    marginRight: 5,
    alignItems: 'center', 
  },
  taskButton: {
    backgroundColor: '#870ae0',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center', 
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },

  bottomNav: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
    height: 60,
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 14, color: '#030303' },
});
