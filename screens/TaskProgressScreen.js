import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TaskProgressScreen({ route, navigation }) {
  const { task } = route.params;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Task Progress</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.taskDetailsHeader}>
            <Text style={styles.taskDetailsTitle}>Task Details</Text>
            <Text style={styles.points}>Points: {task.points}</Text>
          </View>
          <Text style={styles.taskDetailsText}>Task: {task.title}</Text>
          <Text style={styles.taskDetailsText}>Assigned to: {task.assignedTo}</Text>
          <Text style={styles.taskDetailsText}>Due Date: {task.deadline}</Text>
          <Text style={styles.taskDetailsText}>
            Submitted Date: {task.submittedDate || 'Not submitted yet'}
          </Text>
          <Image style={styles.image} source={{ uri: task.image }} />
        </View>

        {/* Actions */}
        <TouchableOpacity style={styles.verifyButton}>
          <Text style={styles.verifyButtonText}>Verify to release points</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete Task</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={24} color="#870ae0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Store')}>
          <Icon name="storefront-outline" size={24} color="#000" />
          <Text style={styles.navText}>Store</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Tasks')}>
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
    justifyContent: 'space-between', // Ensures footer stays at the bottom
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
