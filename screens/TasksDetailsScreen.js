import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function TasksDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params || {}; // Get userId from navigation params

  const [child, setChild] = useState({ name: 'Unknown', image: 'https://via.placeholder.com/100' });
  const [taskStats, setTaskStats] = useState({ completed: 0, inProgress: 0, toDo: 0, late: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchChildProfile();
    }
  }, [userId]);

  const fetchChildProfile = async () => {
    try {
      const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/User/child/${userId}/profile`);

      const data = await response.json();

      if (response.ok) {
        // Set child name & profile image (fallback if missing)
        setChild({
          name: data.childName,
          image: data.image || "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
        });

        // Categorize task stats properly
        const completed = data.completedTasks.length;
        const inProgress = data.availableTasks.filter(task => task.status === "IN_PROGRESS" || task.status === "PENDING").length;
        const toDo = data.availableTasks.filter(task => task.status === "TO_DO").length;
        const late = data.lateTasks.length;

        setTaskStats({ completed, inProgress, toDo, late });
      } else {
        setError(data.message || "Failed to load child profile.");
      }
    } catch (err) {
      console.error("Error fetching child profile:", err);
      setError("Something went wrong while fetching profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#870ae0" />
        <Text>Loading child progress...</Text>
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Child Progress</Text>
      </View>

      {/* Child Info */}
      <View style={styles.childInfo}>
        <Image source={{ uri: child.image }} style={styles.childImage} />
        <Text style={styles.childName}>{child.name}</Text>
      </View>

      {/* Task Stats */}
      <View style={styles.taskCard}><Text style={styles.taskText}>Tasks Completed: {taskStats.completed}</Text></View>
      <View style={styles.taskCard}><Text style={styles.taskText}>In Progress Tasks: {taskStats.inProgress}</Text></View>
      <View style={styles.taskCard}><Text style={styles.taskText}>To Do Tasks: {taskStats.toDo}</Text></View>
      <View style={styles.taskCard}><Text style={styles.taskText}>Late Tasks: {taskStats.late}</Text></View>

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
          <Text style={styles.navText}>Task</Text>
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
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: '500', marginLeft: 10, color: '#030303' },
  childInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  childImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  childName: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  taskCard: { backgroundColor: '#e3e3e3', padding: 15, borderRadius: 6, marginVertical: 5 },
  taskText: { fontSize: 16, color: '#000' },

  
  bottomNav: {
    position: 'absolute',  
    bottom: 4,             
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
