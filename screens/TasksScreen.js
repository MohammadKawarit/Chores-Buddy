import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function TasksScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params || {}; // Get userId from navigation params

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/User/child/${userId}/profile`);
      const data = await response.json();

      if (response.ok) {
        // Combine available and late tasks
        const availableTasks = [...data.availableTasks, ...data.lateTasks].filter(
          (task) => task.status === "TO_DO" || task.status === "IN_PROGRESS"
        );
        setTasks(availableTasks);
      } else {
        setError(data.message || 'Failed to load tasks.');
      }
    } catch (err) {
      setError('Something went wrong while fetching tasks.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#870ae0" />
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchTasks}>
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
          <Icon name="arrow-back-outline" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Tasks</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Available Tasks</Text>

      {tasks.length === 0 ? (
        <Text style={styles.noTasksText}>No tasks assigned yet.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.taskId.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDetails}>Deadline: {new Date(item.deadline).toLocaleDateString()}</Text>
              <Text style={styles.taskDetails}>Points: {item.points}</Text>
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={() => navigation.navigate('TaskVerificationScreen', { task: item })}
              >
                <Text style={styles.verifyButtonText}>Proceed to Verification</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Bottom Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('CompletedTasksScreen', { userId })}>
          <Text style={styles.buttonText}>Completed Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('AllTasksScreen', { userId })}>
          <Text style={styles.buttonText}>View All Tasks</Text>
        </TouchableOpacity>
      </View>

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

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#030303' },
  menuButton: { padding: 10 },
  notificationButton: { padding: 10 },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#030303', marginVertical: 15 },

  taskCard: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  taskTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  taskDetails: { fontSize: 14, color: '#333', marginVertical: 2 },

  verifyButton: {
    backgroundColor: '#870ae0',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  verifyButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  secondaryButton: {
    backgroundColor: '#870ae0',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    width: '48%',
  },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
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
