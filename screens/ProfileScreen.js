import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params || {}; // Get userId from params

  const [profile, setProfile] = useState({
    name: 'Loading...',
    email: 'Loading...',
    points: 0,
    balance: 0,
  });

  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/men/1.jpg');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const fetchProfile = async () => {
    try {
      console.log(`Fetching profile for userId: ${userId}`);

      const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/User/${userId}`);
      console.log("API Response Status:", response.status);

      const data = await response.json();
      console.log("API Response Data:", data);

      if (response.ok) {
        setProfile({
          name: data.name,
          email: data.email,
          points: data.points,
          balance: data.balance,
        });

        // Placeholder for profile image (set a default if no image field is in API)
        setProfileImage(data.image || "https://cdn-icons-png.flaticon.com/512/2922/2922510.png");
      } else {
        setError(data.message || "Failed to load profile.");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Something went wrong while fetching profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => navigation.navigate('Login') },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#870ae0" />
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProfile}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* Profile Image */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={handleProfilePictureChange}>
          <Image style={styles.profileImage} source={{ uri: profileImage }} />
        </TouchableOpacity>
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileEmail}>{profile.email}</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name:</Text>
          <Text style={styles.infoText}>{profile.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoText}>{profile.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Points:</Text>
          <Text style={styles.infoText}>{profile.points}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Balance:</Text>
          <Text style={styles.infoText}>{profile.balance}</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginRight: 24,
  },
  backButton: {
    padding: 5,
  },

  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#870ae0',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },

  infoSection: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
  },

  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
