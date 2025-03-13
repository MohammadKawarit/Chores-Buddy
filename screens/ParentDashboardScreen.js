import React, { useState, useEffect } from 'react';
import { 
  View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ScrollView, 
  TouchableWithoutFeedback, Keyboard, Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ParentDashboardScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params || {}; // Get userId from navigation params

  const [balance, setBalance] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchBalance();
      fetchNotifications();
    }
  }, [userId]);

  const fetchBalance = async () => {
    try {
      const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/User/${userId}/balance`);
      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance);
      } else {
        Alert.alert('Error', 'Failed to fetch balance');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while fetching balance.');
    }
  };

  const fetchNotifications = async () => {
    try {
      console.log(`Fetching notifications for userId: ${userId}`);
      const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/Notification/${userId}`);
      
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        Alert.alert('Error', 'Failed to load notifications.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while fetching notifications.');
    }
  };

  const markAsRead = async () => {
    try {
      // Mark each unread notification as read
      const unreadNotifications = notifications.filter((notif) => !notif.isRead);
      if (unreadNotifications.length === 0) return;

      await Promise.all(
        unreadNotifications.map(async (notif) => {
          const response = await fetch(
            `https://choresbuddy-dotnet.onrender.com/api/Notification/${notif.notificationId}/read`,
            { method: 'PUT' }
          );

          if (!response.ok) {
            console.error(`Failed to mark notification ${notif.notificationId} as read`);
          }
        })
      );

      // Update UI to mark notifications as read
      setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
      Alert.alert('Success', 'All notifications marked as read!');
    } catch (error) {
      console.error('Error marking notifications as read:', error);
      Alert.alert('Error', 'Something went wrong while marking notifications as read.');
    }
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const hideDropdown = () => setShowDropdown(false);

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  return (
    <TouchableWithoutFeedback onPress={hideDropdown}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile', { userId })} style={{ padding: 15 }}>
            <Icon name="menu-outline" size={30} color="#000" />
          </TouchableOpacity>

          <Text style={styles.title}>Parent Dashboard</Text>

          <View style={styles.topRight}>
            <TouchableOpacity onPress={toggleDropdown} style={styles.notificationIcon}>
              <Icon name="notifications-outline" size={24} color="#000" />
              {unreadCount > 0 && <View style={styles.redDot} />}
            </TouchableOpacity>

            <Image
              style={styles.profileImage}
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
            />
          </View>
        </View>

        {showDropdown && (
          <View style={styles.dropdown}>
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.notificationId.toString()}
              renderItem={({ item }) => (
                <View style={[styles.notificationItem, item.isRead && styles.readNotification]}>
                  <Text style={styles.notificationText}>{item.message}</Text>
                </View>
              )}
            />
            <TouchableOpacity style={styles.markAsReadButton} onPress={markAsRead}>
              <Text style={styles.markAsReadText}>Mark All as Read</Text>
            </TouchableOpacity>
          </View>
        )}

        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Current Balance:</Text>
            <Text style={styles.balanceText}>{balance} balance</Text>
          </View>

          <Text style={styles.sectionTitle}>Child Overview</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageChild', { userId })}>
            <Text style={styles.buttonText}>Manage Child</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChildProgress', { userId })}>
            <Text style={styles.buttonText}>Child Progress</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Task Management</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AssignTask', { userId })}>
            <Text style={styles.buttonText}>Assign New Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageTasks', { userId })}>
            <Text style={styles.buttonText}>Manage Tasks</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Store Management</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageStore', { userId })}>
            <Text style={styles.buttonText}>Manage Child Store</Text>
          </TouchableOpacity>
        </ScrollView>

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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', paddingHorizontal: 20, paddingTop: 40 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  title: { fontSize: 24, fontWeight: '500', color: '#030303' },
  topRight: { flexDirection: 'row', alignItems: 'center' },
  profileImage: { width: 40, height: 40, borderRadius: 20 },

  notificationIcon: { position: 'relative', marginRight: 10 },
  redDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },

  dropdown: {
    position: 'absolute',
    top: 70,
    right: 20,
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
    padding: 10,
    zIndex: 999,
  },
  notificationItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  readNotification: { backgroundColor: '#f0f0f0' },
  notificationText: { fontSize: 14, color: '#333' },
  markAsReadButton: { padding: 10, alignItems: 'center', backgroundColor: '#870ae0', borderRadius: 6, marginTop: 10 },
  markAsReadText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },

  balanceContainer: { backgroundColor: '#e5e5e5', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  balanceLabel: { fontSize: 16, fontWeight: '500', color: '#333' },
  balanceText: { fontSize: 20, fontWeight: 'bold', color: '#870ae0' },

  content: { flexGrow: 1, paddingBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '500', color: '#030303', marginVertical: 10 },
  button: { backgroundColor: '#870ae0', borderRadius: 6, paddingVertical: 10, alignItems: 'center', marginVertical: 5 },
  buttonText: { color: '#ffffff', fontSize: 14, fontWeight: '500' },

  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#ccc', paddingVertical: 15 },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 14, color: '#030303' },
  markAsReadButton: { padding: 10, alignItems: 'center', backgroundColor: '#870ae0', borderRadius: 6, marginTop: 10 },
  markAsReadText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
});
