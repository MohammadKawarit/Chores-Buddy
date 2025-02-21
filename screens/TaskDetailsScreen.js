import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView,
  Platform, ScrollView, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TaskDetailsScreen({ route, navigation }) {
  const { child } = route.params;

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPoints, setTaskPoints] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');

  const handleAssignTask = async () => {
    if (!taskTitle || !taskDescription || !taskPoints || !taskDeadline) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('https://choresbuddy-dotnet.onrender.com/api/Task', {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: taskTitle,
          description: taskDescription,
          assignedTo: child.userId, // Assign task to the selected child
          deadline: `${taskDeadline}T23:59:59.000Z`, // Append time for full date format
          points: parseInt(taskPoints),
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Task assigned successfully.');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to assign task.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Assign Task</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.label}>Task Title</Text>
            <TextInput
              style={styles.input}
              placeholder="What is the task..."
              value={taskTitle}
              onChangeText={setTaskTitle}
              multiline
            />

            <Text style={styles.label}>Task Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Describe the task..."
              value={taskDescription}
              onChangeText={setTaskDescription}
              multiline
            />

            <Text style={styles.label}>Assign To</Text>
            <TextInput
              style={styles.input}
              value={child.name} // Show child's name
              editable={false} // Make it read-only
            />

            <Text style={styles.label}>Task Points</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter points"
              value={taskPoints}
              onChangeText={setTaskPoints}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Task Deadline</Text>
            <TextInput
              style={styles.input}
              placeholder="yyyy-mm-dd (example: 2025-03-02)"
              value={taskDeadline}
              onChangeText={setTaskDeadline}
            />

            <TouchableOpacity style={styles.assignButton} onPress={handleAssignTask}>
              <Text style={styles.assignButtonText}>Assign Task</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
  },
  assignButton: {
    backgroundColor: '#870ae0',
    borderRadius: 6,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  assignButtonText: {
    color: '#ffffff',
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
    fontSize: 14,
    color: '#030303',
  },
});
