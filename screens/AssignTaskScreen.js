import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function AssignTaskScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params || {}; // Get parentId from navigation params

  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchChildren();
    }
  }, [userId]);

  const fetchChildren = async () => {
    try {
      const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/User/${userId}/children`);
      if (response.ok) {
        const data = await response.json();
        setChildren(data);
      } else {
        Alert.alert('Error', 'Failed to load children.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while fetching children.');
    } finally {
      setLoading(false);
    }
  };

  const renderChild = ({ item }) => (
    <View style={styles.card}>
      <Image
        style={styles.profileImage}
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/147/147144.png', // Placeholder image
        }}
      />
      <Text style={styles.name}>{item.name}</Text>
      <TouchableOpacity
        style={styles.assignButton}
        onPress={() => navigation.navigate('TaskDetails', { child: item })}
      >
        <Text style={styles.assignButtonText}>Assign Task</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Assign Task</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>Assign Task To:</Text>

        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : children.length === 0 ? (
          <Text style={styles.noChildText}>No children found.</Text>
        ) : (
          <FlatList
            data={children}
            renderItem={renderChild}
            keyExtractor={(item) => item.userId.toString()}
            contentContainerStyle={styles.childList}
          />
        )}
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ParentDashboard', { userId })}>
          <Icon name="home-outline" size={24} color="#870ae0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Store', { userId })}>
          <Icon name="storefront-outline" size={24} color="#000" />
          <Text style={styles.navText}>Store</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ManageTasks', { userId })}>
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
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 6,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    flex: 1,
  },
  assignButton: {
    backgroundColor: '#870ae0',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  assignButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 8,
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
