import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TaskProgressScreen({ route, navigation }) {
  const { task } = route.params;
  const [childName, setChildName] = useState('Loading...');
  const [userID, setUserId] = useState('Loading..');

  useEffect(() => {
    fetchChildName();
  }, []);

  const fetchChildName = async () => {
    try {
      const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/User/${task.assignedTo}`);
      if (response.ok) {
        const data = await response.json();
        setChildName(data.name);
        setUserId(data.parentId);
      } else {
        setChildName('Unknown');
      }
    } catch (error) {
      console.error('Error fetching child info:', error);
      setChildName('Unknown');
    }
  };

  const handleVerifyTask = async () => {
    Alert.alert(
      'Confirm Verification',
      'Are you sure you want to verify this task and release points?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Verify',
          onPress: async () => {
            try {
              const response = await fetch(
                `https://choresbuddy-dotnet.onrender.com/api/Task/${task.taskId}/verify`,
                {
                  method: 'PUT',
                  headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify("string"),
                }
              );

              if (response.ok) {
                Alert.alert('Success', 'Task verified and points released.');
                navigation.goBack();
              } else {
                Alert.alert('Error', 'Failed to verify task.');
              }
            } catch (error) {
              Alert.alert('Error', 'Something went wrong.');
            }
          },
        },
      ]
    );
  };

  const handleDeleteTask = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const response = await fetch(
                `https://choresbuddy-dotnet.onrender.com/api/Task/${task.taskId}`,
                {
                  method: 'DELETE',
                  headers: {
                    'Accept': '*/*',
                  },
                }
              );

              if (response.ok) {
                Alert.alert('Success', 'Task deleted successfully.');
                navigation.goBack();
              } else {
                Alert.alert('Error', 'Failed to delete task.');
              }
            } catch (error) {
              Alert.alert('Error', 'Something went wrong.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Task Progress</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.taskDetailsHeader}>
            <Text style={styles.taskDetailsTitle}>Task Details</Text>
            <Text style={styles.points}>Points: {task.points}</Text>
          </View>
          <Text style={styles.taskDetailsText}>Task: {task.title}</Text>
          <Text style={styles.taskDetailsText}>Assigned to: {childName}</Text>
          <Text style={styles.taskDetailsText}>Due Date: {new Date(task.deadline).toLocaleString()}</Text>
          <Text style={styles.taskDetailsText}>
            Submitted Date: {task.submittedDate ? new Date(task.submittedDate).toLocaleString() : 'Not submitted yet'}
          </Text>
          <Image style={styles.image} source={{ uri: task.image }} />
        </View>

        {task.status !== 'COMPLETED' && (
          <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyTask}>
            <Text style={styles.verifyButtonText}>Verify to release points</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteTask}>
          <Text style={styles.deleteButtonText}>Delete Task</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ParentDashboard', {userID})}>
          <Icon name="home-outline" size={24} color="#870ae0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Store', {userID})}>
          <Icon name="storefront-outline" size={24} color="#000" />
          <Text style={styles.navText}>Store</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ManageTasks', {userID})}>
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
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  taskDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskDetailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  points: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  taskDetailsText: {
    fontSize: 14,
    color: '#000',
    marginTop: 6,
  },
  image: {
    marginTop: 16,
    height: 150,
    width: '100%',
    borderRadius: 8,
  },
  verifyButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#030303',
    marginTop: 4,
  },
});
