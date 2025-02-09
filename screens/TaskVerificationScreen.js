import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TaskVerificationScreen({ route, navigation }) {
  const { task } = route.params;
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="arrow-back-outline" size={28} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Tasks</Text>
            <TouchableOpacity style={styles.notificationButton}>
                <Icon name="notifications-outline" size={28} color="#000" />
            </TouchableOpacity>
        </View>
      <Text style={styles.sectionTitle}>Send for Verification</Text>
      <View style={styles.taskCard}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskDetails}>Deadline: {task.deadline}</Text>
        <Text style={styles.taskDetails}>Points: {task.points}</Text>
      </View>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the description..."
        multiline
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
        <Text style={styles.uploadButtonText}>Upload Image to Verify</Text>
        <Icon name="add-outline" size={20} color="#fff" />
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.uploadedImage} />}

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ChildDashboard')}>
          <Icon name="home-outline" size={24} color="#870ae0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Cart')}>
          <Icon name="cart-outline" size={24} color="#000" />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ChildStoreScreen')}>
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

  label: { fontSize: 16, fontWeight: 'bold', color: '#030303', marginBottom: 5 },
  input: {
    backgroundColor: '#e3e3e3',
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
    height: 80,
    textAlignVertical: 'top',
  },

  uploadButton: {
    backgroundColor: '#870ae0',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  uploadButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginRight: 5 },

  uploadedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 10,
  },

  submitButton: {
    backgroundColor: '#870ae0',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

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
