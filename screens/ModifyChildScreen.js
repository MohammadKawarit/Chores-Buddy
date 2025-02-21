import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function ModifyChildScreen({ route }) {
  const navigation = useNavigation();
  const { child } = route.params || { child: {} };

  const [childName, setChildName] = useState(child.name || '');
  const [dob, setDob] = useState(child.dob || ''); // Keeping it as a text input
  const [email, setEmail] = useState(child.email || '');
  const [password, setPassword] = useState('');

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `https://choresbuddy-dotnet.onrender.com/api/User/${child.userId}?name=${childName}&email=${email}&dob=${dob}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        Alert.alert('Success', 'Child details updated successfully.');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to update child details.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Modify Child</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/147/147144.png' }} style={styles.profileImage} />
      </View>

      <Text style={styles.label}>Child Name</Text>
      <TextInput style={styles.input} placeholder="Enter child's name" value={childName} onChangeText={setChildName} />

      <Text style={styles.label}>Date of Birth</Text>
      <TextInput style={styles.input} placeholder="YYYY-MM-DD" value={dob} onChangeText={setDob} />

      <Text style={styles.label}>Email Address</Text>
      <TextInput style={styles.input} placeholder="Enter email address" value={email} onChangeText={setEmail} keyboardType="email-address" />

      <Text style={styles.label}>Password (optional)</Text>
      <TextInput style={styles.input} placeholder="Enter password" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>

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
          <Text style={styles.navText}>Tasks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 20, paddingBottom: 60 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginLeft: 10, color: '#030303' },
  imageContainer: { alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  label: { fontSize: 16, fontWeight: '500', marginBottom: 5 },
  input: { backgroundColor: '#e3e3e3', padding: 12, borderRadius: 6, marginBottom: 15 },
  saveButton: { backgroundColor: '#870ae0', padding: 15, borderRadius: 6, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },

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
});
