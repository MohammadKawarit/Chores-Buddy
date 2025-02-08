import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ManageTasksScreen({ navigation }) {
  const tasks = [
    {
      id: '1',
      title: 'Math Homework',
      assignedTo: 'Alex',
      deadline: '2023-12-02 14:00',
      submittedDate: null,
      points: 10,
      status: 'Undone',
      statusColor: '#FFCDD2',
      image: 'https://assets.api.uizard.io/api/cdn/stream/c1250235-5975-4686-be51-b3e6560d9fd1.png',
    },
    {
      id: '2',
      title: 'Science Project',
      assignedTo: 'Emily',
      deadline: '2023-12-25 16:30',
      submittedDate: null,
      points: 20,
      status: 'In Progress',
      statusColor: '#C8E6C9',
      image: 'https://assets.api.uizard.io/api/cdn/stream/c1250235-5975-4686-be51-b3e6560d9fd1.png',
    },
    {
      id: '3',
      title: 'Reading Assignment',
      assignedTo: 'Emily',
      deadline: '2023-12-27 09:00',
      submittedDate: null,
      points: 15,
      status: 'In Progress',
      statusColor: '#C8E6C9',
      image: 'https://assets.api.uizard.io/api/cdn/stream/c1250235-5975-4686-be51-b3e6560d9fd1.png',
    },
    {
      id: '4',
      title: 'Clean Your Room',
      assignedTo: 'Alex',
      deadline: '2023-12-07 18:00',
      submittedDate: '2023-12-07 16:00',
      points: 50,
      status: 'Waiting for verify',
      statusColor: '#E1BEE7',
      image: 'https://assets.api.uizard.io/api/cdn/stream/c1250235-5975-4686-be51-b3e6560d9fd1.png',
    },
  ];

  const renderTask = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.statusColor }]}
      onPress={() => navigation.navigate('TaskProgress', { task: item })}
    >
      <View style={styles.taskHeader}>
        <Image
          style={styles.profileImage}
          source={{
            uri: item.assignedTo === 'Alex'
              ? 'https://assets.api.uizard.io/api/cdn/stream/989d773b-ce04-426f-86f3-d7ddeeafb45e.png'
              : 'https://assets.api.uizard.io/api/cdn/stream/f92045e7-dd2c-42df-a9d0-1b6af48418dd.png',
          }}
        />
        <Text style={styles.taskTitle}>{item.title}</Text>
      </View>
      <Text style={styles.taskDetails}>Assigned to: {item.assignedTo}</Text>
      <Text style={styles.taskDetails}>Deadline: {item.deadline}</Text>
      <Text style={styles.taskDetails}>Points: {item.points}</Text>
      <Text style={styles.taskStatus}>{item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      {/* Updated Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Manage Tasks</Text>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.taskList}
      />

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ParentDashboard')}>
          <Icon name="home-outline" size={24} color="#870ae0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Store')}>
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
    marginLeft: 10, // Adds spacing between the arrow and title
  },
  backButton: {
    padding: 10,
    marginTop: -3, // Lifts the back arrow slightly
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
