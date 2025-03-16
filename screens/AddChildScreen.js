import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function AddChildScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { parentId } = route.params || {}; // Get parentId from navigation params

  const [childName, setChildName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddChild = async () => {
    if (!childName || !dob || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://choresbuddy-dotnet.onrender.com/api/User/addChild?name=${childName}&email=${email}&password=${password}&parentId=${parentId}&dob=${dob}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/plain',
          },
          body: '',
        }
      );

      if (response.ok) {
        Alert.alert('Success', 'Child added successfully.');
        navigation.goBack(); // Return to previous screen
      } else {
        Alert.alert('Error', 'Failed to add child.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Add Child</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Child Name</Text>
        <TextInput style={styles.input} placeholder="Enter child's name" value={childName} onChangeText={setChildName} />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput style={styles.input} placeholder="YYYY-MM-DD" value={dob} onChangeText={setDob} />

        <Text style={styles.label}>Email Address</Text>
        <TextInput style={styles.input} placeholder="Enter email address" value={email} onChangeText={setEmail} keyboardType="email-address" />

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="Enter password" value={password} onChangeText={setPassword} secureTextEntry />

        <TouchableOpacity style={styles.addButton} onPress={handleAddChild} disabled={loading}>
          <Text style={styles.addButtonText}>{loading ? 'Adding...' : 'Add Child'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ParentDashboard', {parentId})}>
          <Icon name="home-outline" size={24} color="#870ae0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Store', {parentId})}>
          <Icon name="storefront-outline" size={24} color="#000" />
          <Text style={styles.navText}>Store</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ManageTasks', {parentId})}>
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
    paddingHorizontal: 16,
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
  form: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addButton: {
    backgroundColor: '#870ae0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
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
