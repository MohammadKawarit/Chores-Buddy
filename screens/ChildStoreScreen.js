import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ChildStoreScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const storeItems = [
    {
      id: '1',
      name: 'Gaming Console',
      points: 500,
      description: 'Experience immersive gaming with high-speed performance.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: '2',
      name: 'Colouring Pens',
      points: 150,
      description: 'Vibrant colors for your creative drawings.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: '3',
      name: 'Remote Controller',
      points: 300,
      description: 'Wireless controller for smooth experience.',
      image: 'https://via.placeholder.com/100',
    },
  ];

  const filteredItems = storeItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Store</Text>
        <View style={styles.pointsContainer}>
          <Icon name="wallet-outline" size={24} color="#000" />
          <Text style={styles.pointsText}>1500 pts</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ViewItemScreen', { item })}>
            <View style={styles.itemCard}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemPoints}>{item.points} pts</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
              <TouchableOpacity style={styles.cartButton}>
                <Icon name="cart-outline" size={24} color="#870ae0" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

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
  backButton: { padding: 10 },
  pointsContainer: { flexDirection: 'row', alignItems: 'center' },
  pointsText: { fontSize: 16, marginLeft: 5, fontWeight: 'bold', color: '#000' },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchIcon: { marginRight: 5 },
  searchInput: { flex: 1, height: 40 },

  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  itemImage: { width: 50, height: 50, borderRadius: 8, marginRight: 15 },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: 'bold' },
  itemPoints: { fontSize: 14, fontWeight: 'bold', color: '#870ae0' },
  itemDescription: { fontSize: 12, color: '#666' },
  cartButton: { padding: 10 },

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
