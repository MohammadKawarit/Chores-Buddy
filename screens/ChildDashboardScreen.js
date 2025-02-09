import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ChildDashboardScreen({ navigation }) {
  const [notifications, setNotifications] = useState([
    { id: '1', message: 'New task assigned: Math Homework', read: false },
    { id: '2', message: 'Task verified: Cleaning Room', read: false },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="menu-outline" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Child Dashboard</Text>

        <View style={styles.headerIcons}>
          <TouchableOpacity
            onPress={() => {
              setShowNotifications(!showNotifications);
              markAllAsRead();
            }}
          >
            <Icon name="notifications-outline" size={28} color="#000" style={styles.iconSpacing} />
            {notifications.some((n) => !n.read) && <View style={styles.notificationDot} />}
          </TouchableOpacity>

          <Image
            style={styles.profileImage}
            source={{ uri: 'https://assets.api.uizard.io/api/cdn/stream/989d773b-ce04-426f-86f3-d7ddeeafb45e.png' }}
          />
        </View>
      </View>

      {showNotifications && (
        <Pressable style={styles.overlay} onPress={() => setShowNotifications(false)}>
          <View style={styles.notificationBox}>
            <Text style={styles.notificationTitle}>Notifications</Text>
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={[styles.notificationItem, item.read ? styles.readNotification : {}]}>
                  <Text style={styles.notificationText}>{item.message}</Text>
                </View>
              )}
            />
          </View>
        </Pressable>
      )}

      <View style={styles.profileSection}>
        <Image
          style={styles.profileImageLarge}
          source={{ uri: 'https://assets.api.uizard.io/api/cdn/stream/989d773b-ce04-426f-86f3-d7ddeeafb45e.png' }}
        />
        <Text style={styles.profileName}>Alex</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Task Management</Text>
        <TouchableOpacity style={styles.viewTasksButton} onPress={() => navigation.navigate('TasksScreen')}>
          <Text style={styles.buttonText}>View Tasks</Text>
        </TouchableOpacity>
        <Text style={styles.taskDetails}>Available Tasks: 4</Text>
        <Text style={styles.taskDetails}>Late Tasks: 2</Text>
        <Text style={styles.taskDetailsUndone}>Undone Tasks: 5</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Points Balance</Text>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsLabel}>Your Points:</Text>
          <Text style={styles.pointsValue}>1500</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.trackProgressButton} onPress={() => navigation.navigate('TaskProgressTrophiesScreen')}>
        <Text style={styles.buttonText}>Track Progress & Trophies</Text>
      </TouchableOpacity>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ChildDashboard')}>
          <Icon name="home-outline" size={28} color="#870ae0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('CartScreen')}>
          <Icon name="cart-outline" size={28} color="#000" />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ChildStoreScreen')}>
          <Icon name="storefront-outline" size={28} color="#000" />
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
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  iconSpacing: { marginRight: 15 },
  profileImage: { width: 35, height: 35, borderRadius: 20 },

  profileSection: { alignItems: 'center', marginVertical: 20 },
  profileImageLarge: { width: 80, height: 80, borderRadius: 40 },
  profileName: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },

  section: { marginVertical: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#030303', marginBottom: 10 },

  taskDetails: { fontSize: 16, color: '#000', marginBottom: 5 },
  taskDetailsUndone: { fontSize: 16, color: 'red', fontWeight: 'bold' },

  viewTasksButton: { backgroundColor: '#870ae0', borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginVertical: 10 },
  trackProgressButton: { backgroundColor: '#870ae0', borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginVertical: 10 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },

  pointsContainer: { backgroundColor: '#e5e5e5', padding: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pointsLabel: { fontSize: 18, fontWeight: 'bold', color: '#030303' },
  pointsValue: { fontSize: 22, fontWeight: 'bold', color: '#870ae0' },

  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#ccc', backgroundColor: '#ffffff', paddingVertical: 12, height: 70 },

  navItem: { alignItems: 'center' },
  navText: { fontSize: 16, color: '#030303', marginTop: 5 },

  notificationDot: { position: 'absolute', top: 3, right: 3, width: 10, height: 10, backgroundColor: 'red', borderRadius: 5 },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 },
  notificationBox: { position: 'absolute', top: 70, right: 20, backgroundColor: '#f1f1f1', padding: 10, borderRadius: 8, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, width: 250, borderWidth: 1, borderColor: '#ddd' },
  notificationTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  notificationItem: { padding: 8, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  notificationText: { fontSize: 14 },
});
