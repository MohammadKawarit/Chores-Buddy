import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ViewItemScreen({ route, navigation }) {
  const { item } = route.params; 

  const similarItems = [
    {
      id: '1',
      name: 'Gaming Console',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: '2',
      name: 'Retro Console',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: '3',
      name: 'Wireless Controller',
      image: 'https://via.placeholder.com/100',
    },
  ];

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

      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemPoints}>{item.points} pts</Text>

      <TouchableOpacity style={styles.addToCartButton}>
        <Icon name="cart-outline" size={24} color="#fff" />
        <Text style={styles.addToCartText}>Add to cart</Text>
      </TouchableOpacity>

      <Text style={styles.itemDescription}>{item.description}</Text>

      <Text style={styles.sectionTitle}>Similar Items</Text>
      <FlatList
        horizontal
        data={similarItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.similarItem}>
            <Image source={{ uri: item.image }} style={styles.similarImage} />
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

  itemImage: { width: '100%', height: 200, borderRadius: 10, marginVertical: 10 },
  itemTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  itemPoints: { fontSize: 16, fontWeight: 'bold', color: '#870ae0', marginVertical: 5 },
  itemDescription: { fontSize: 14, color: '#666', marginVertical: 10 },

  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#870ae0',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  addToCartText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#030303', marginVertical: 10 },
  similarItem: { marginRight: 10 },
  similarImage: { width: 80, height: 80, borderRadius: 6 },

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
