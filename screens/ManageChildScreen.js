import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ManageChildScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params || {}; // Get parent userId from navigation params

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
      <Image style={styles.profileImage} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/147/147144.png' }} />
      <View style={styles.childInfo}>
        <Text style={styles.childName}>{item.name}</Text>
        <Text style={styles.childPoints}>Points: {item.points}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('ModifyChild', { child: item })}
        >
          <Icon name="create-outline" size={27} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteChild(item.userId)}>
          <Icon name="trash-outline" size={27} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleDeleteChild = async (childId) => {
    Alert.alert(
      "Delete Child",
      "Are you sure you want to remove this child?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const response = await fetch(`https://choresbuddy-dotnet.onrender.com/api/User/${childId}`, {
                method: 'DELETE',
              });
              if (response.ok) {
                setChildren(children.filter(child => child.userId !== childId));
                Alert.alert("Success", "Child removed successfully.");
              } else {
                Alert.alert("Error", "Failed to remove child.");
              }
            } catch (error) {
              Alert.alert("Error", "Something went wrong.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Manage Child</Text>
      </View>

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

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddChild', { parentId: userId })}>
        <Text style={styles.addButtonText}>Add Child</Text>
      </TouchableOpacity>

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
  childList: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  childPoints: {
    fontSize: 14,
    color: '#000',
  },
  actions: {
    flexDirection: 'row',
  },
  editButton: {
    marginRight: 10,
  },
  deleteButton: {},
  addButton: {
    backgroundColor: '#870ae0',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
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
