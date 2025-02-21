import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ManageTasksScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params || {}; // Parent ID passed from navigation

  const [tasks, setTasks] = useState([]);
  const [children, setChildren] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/Task/${userId}/tasks`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();

      // Sort tasks: All statuses first, then 'COMPLETED' at the bottom
      const sortedTasks = [
        ...data.filter(task => task.status !== 'COMPLETED'),
        ...data.filter(task => task.status === 'COMPLETED'),
      ];

      setTasks(sortedTasks);
      fetchChildrenInfo(sortedTasks);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while fetching tasks.');
    } finally {
      setLoading(false);
    }
  };

  const fetchChildrenInfo = async (taskData) => {
    const uniqueChildIds = [...new Set(taskData.map(task => task.assignedTo))];

    let childInfo = {};
    for (const childId of uniqueChildIds) {
      try {
        const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/User/${childId}`);
        if (response.ok) {
          const childData = await response.json();
          childInfo[childId] = childData.name;
        }
      } catch (error) {
        console.error('Error fetching child info:', error);
      }
    }
    setChildren(childInfo);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'TO_DO':
        return '#FFCDD2';
      case 'IN_PROGRESS':
        return '#C8E6C9';
      case 'PENDING':
        return '#E1BEE7';
      case 'COMPLETED':
        return '#B3E5FC';
      default:
        return '#FFF';
    }
  };

  const renderTask = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: getStatusColor(item.status) }]}
      onPress={() => navigation.navigate('TaskProgress', { task: item })}
    >
      <View style={styles.taskHeader}>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/147/147144.png' }}
        />
        <Text style={styles.taskTitle}>{item.title}</Text>
      </View>
      <Text style={styles.taskDetails}>Assigned to: {children[item.assignedTo] || 'Loading...'}</Text>
      <Text style={styles.taskDetails}>Deadline: {new Date(item.deadline).toLocaleString()}</Text>
      <Text style={styles.taskDetails}>Points: {item.points}</Text>
      <Text style={styles.taskStatus}>{item.status.replace('_', ' ')}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Manage Tasks</Text>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : tasks.length === 0 ? (
        <Text style={styles.noTasksText}>No tasks found.</Text>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.taskId.toString()}
          contentContainerStyle={styles.taskList}
        />
      )}

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ParentDashboard', { userId })}>
          <Icon name="home-outline" size={24} color="#870ae0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Store', { userId })}>
          <Icon name="storefront-outline" size={24} color="#000" />
          <Text style={styles.navText}>Store</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="list-outline" size={24} color="#000" />
          <Text style={styles.navTextActive}>Tasks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginLeft: 10,
  },
  backButton: {
    padding: 10,
    marginTop: -3, 
  },
  taskList: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  card: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  taskDetails: {
    fontSize: 14,
    color: '#000',
    marginVertical: 2,
  },
  taskStatus: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
    color: '#000',
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
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
  navTextActive: { fontSize: 14, color: "#000", fontWeight: 'bold' },
});
