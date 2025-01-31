import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TasksDetailsScreen({ route, navigation }) {
  const { child } = route.params; 

  // Mock task data
  const taskStats = {
    completed: 15,
    inProgress: 5,
    undone: 3,
    late: 2,
  };

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

      {/* Task Statistics */}
      <View style={styles.taskCard}><Text style={styles.taskText}>Tasks Completed: {taskStats.completed}</Text></View>
      <View style={styles.taskCard}><Text style={styles.taskText}>In Progress Tasks: {taskStats.inProgress}</Text></View>
      <View style={styles.taskCard}><Text style={styles.taskText}>Undone Tasks: {taskStats.undone}</Text></View>
      <View style={styles.taskCard}><Text style={styles.taskText}>Late Tasks: {taskStats.late}</Text></View>

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
