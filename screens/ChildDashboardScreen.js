import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function ChildDashboardScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params || {}; // Get userId from navigation params

  const [childProfile, setChildProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchChildProfile();
      fetchNotifications();
    }
  }, [userId]);

  const fetchChildProfile = async () => {
    try {
      const response = await fetch(
        `https://choresbuddy-dotnet.onrender.com/api/User/child/${userId}/profile`
      );
      const data = await response.json();

      if (response.ok) {
        setChildProfile(data);
      } else {
        setError(data.message || "Failed to load profile.");
      }
    } catch (err) {
      setError("Something went wrong while fetching the profile.");
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `https://choresbuddy-dotnet.onrender.com/api/Notification/${userId}`
      );

      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        Alert.alert("Error", "Failed to load notifications.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong while fetching notifications.");
    }
  };

  const markAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter((notif) => !notif.isRead);
      if (unreadNotifications.length === 0) return;

      await Promise.all(
        unreadNotifications.map(async (notif) => {
          const response = await fetch(
            `https://choresbuddy-dotnet.onrender.com/api/Notification/${notif.notificationId}/read`,
            { method: "PUT" }
          );

          if (!response.ok) {
            console.error(`Failed to mark notification ${notif.notificationId} as read`);
          }
        })
      );

      setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
      Alert.alert("Success", "All notifications marked as read!");
    } catch (error) {
      Alert.alert("Error", "Something went wrong while marking notifications as read.");
    }
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const hideDropdown = () => setShowDropdown(false);

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#870ae0" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchChildProfile}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={hideDropdown}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile", { userId })}>
            <Icon name="menu-outline" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Child Dashboard</Text>

          <View style={styles.topRight}>
            <TouchableOpacity onPress={toggleDropdown} style={styles.notificationIcon}>
              <Icon name="notifications-outline" size={24} color="#000" />
              {unreadCount > 0 && <View style={styles.redDot} />}
            </TouchableOpacity>
          </View>
        </View>

        {/* Notification Dropdown */}
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

        {/* Existing Content */}
        <View style={styles.profileSection}>
          <Image
            style={styles.profileImageLarge}
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png" }}
          />
          <Text style={styles.profileName}>{childProfile.childName}</Text>
        </View>

        {/* Task Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Task Overview</Text>
          <Text style={styles.taskDetails}>Available Tasks: {childProfile.availableTasks.length}</Text>
          <Text style={styles.taskDetails}>Late Tasks: {childProfile.lateTasks.length}</Text>
          <Text style={styles.taskDetailsUndone}>Completed Tasks: {childProfile.completedTasks.length}</Text>

          <TouchableOpacity style={styles.viewTasksButton} onPress={() => navigation.navigate("TasksScreen", { userId })}>
            <Text style={styles.buttonText}>View Tasks</Text>
          </TouchableOpacity>
        </View>

        {/* Points Balance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Points Balance</Text>
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsLabel}>Your Points:</Text>
            <Text style={styles.pointsValue}>{childProfile.points}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.trackProgressButton} onPress={() => navigation.navigate("TaskProgressTrophiesScreen", { userId })}>
          <Text style={styles.buttonText}>Track Progress & Trophies</Text>
        </TouchableOpacity>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("ChildDashboard", { userId })}>
            <Icon name="home-outline" size={28} color="#870ae0" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Cart", { userId })}>
            <Icon name="cart-outline" size={28} color="#000" />
            <Text style={styles.navText}>Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("ChildStoreScreen", { userId })}>
            <Icon name="storefront-outline" size={28} color="#000" />
            <Text style={styles.navText}>Store</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
    paddingBottom: 80,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#030303" },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  iconSpacing: { marginRight: 15 },
  profileImage: { width: 35, height: 35, borderRadius: 20 },

  profileSection: { alignItems: "center", marginVertical: 20 },
  profileImageLarge: { width: 80, height: 80, borderRadius: 40 },
  profileName: { fontSize: 20, fontWeight: "bold", marginTop: 10 },

  section: { marginVertical: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#030303",
    marginBottom: 10,
  },

  taskDetails: { fontSize: 16, color: "#000", marginBottom: 5 },
  taskDetailsUndone: { fontSize: 16, color: "red", fontWeight: "bold" },

  viewTasksButton: {
    backgroundColor: "#870ae0",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginVertical: 10,
  },
  trackProgressButton: {
    backgroundColor: "#870ae0",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },

  pointsContainer: {
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pointsLabel: { fontSize: 18, fontWeight: "bold", color: "#030303" },
  pointsValue: { fontSize: 22, fontWeight: "bold", color: "#870ae0" },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    height: 70,
  },

  navItem: { alignItems: "center" },
  navText: { fontSize: 16, color: "#030303", marginTop: 5 },

  notificationDot: {
    position: "absolute",
    top: 3,
    right: 3,
    width: 10,
    height: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  notificationBox: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 8,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: 250,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  notificationTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  notificationItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  notificationText: { fontSize: 14 },
  notificationItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  readNotification: { backgroundColor: '#f0f0f0' },
  notificationText: { fontSize: 14, color: '#333' },
  markAsReadButton: { padding: 10, alignItems: 'center', backgroundColor: '#870ae0', borderRadius: 6, marginTop: 10 },
  markAsReadText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
});
