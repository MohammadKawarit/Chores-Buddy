import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useBalance } from '../context/BalanceContext';

export default function ParentDashboardScreen({ navigation }) {
  const { balance } = useBalance();

  const [notifications, setNotifications] = useState([
    { id: '1', message: 'Alex has completed a task!', isRead: false },
    { id: '2', message: 'Emily has earned a new trophy!', isRead: false },
    { id: '3', message: 'New reward is available in the store.', isRead: true },
  ]);

  const [showDropdown, setShowDropdown] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  // Hide dropdown when clicking outside
  const hideDropdown = () => setShowDropdown(false);

  // Mark all as read
  const markAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
  };

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  return (
    <TouchableWithoutFeedback onPress={hideDropdown}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ padding: 15 }}>
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

        {/* Notification Dropdown */}
        {showDropdown && (
          <View style={styles.dropdown}>
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id}
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

        {/* Content */}
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Current Balance:</Text>
            <Text style={styles.balanceText}>{balance} Points</Text>
          </View>

          <Text style={styles.sectionTitle}>Child Overview</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageChild')}>
            <Text style={styles.buttonText}>Manage Child</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChildProgress')}>
            <Text style={styles.buttonText}>Child Progress</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Task Management</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AssignTask')}>
            <Text style={styles.buttonText}>Assign New Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageTasks')}>
            <Text style={styles.buttonText}>Manage Tasks</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Store Management</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageStore')}>
            <Text style={styles.buttonText}>Manage Child Store</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom Navigation */}
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
});
