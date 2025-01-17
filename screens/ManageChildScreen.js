import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ManageChildScreen({ navigation }) {
  // Sample child data
  const children = [
    {
      id: '1',
      name: 'Emily',
      points: 120,
      image: 'https://assets.api.uizard.io/api/cdn/stream/f92045e7-dd2c-42df-a9d0-1b6af48418dd.png',
    },
    {
      id: '2',
      name: 'Alex',
      points: 95,
      image: 'https://assets.api.uizard.io/api/cdn/stream/989d773b-ce04-426f-86f3-d7ddeeafb45e.png',
    },
  ];

  const renderChild = ({ item }) => (
    <View style={styles.card}>
      <Image style={styles.profileImage} source={{ uri: item.image }} />
      <View style={styles.childInfo}>
        <Text style={styles.childName}>{item.name}</Text>
        <Text style={styles.childPoints}>Points: {item.points}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton}>
          <Icon name="create-outline" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Icon name="trash-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Manage Child</Text>
      </View>

      {/* Children List */}
      <FlatList
        data={children}
        renderItem={renderChild}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.childList}
      />

      {/* Add Child Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddChild')}
        >
        <Text style={styles.addButtonText}>Add Child</Text>
        </TouchableOpacity>

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
