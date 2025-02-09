import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CartScreen({ navigation }) {
  const cartItems = [
    { id: '1', name: 'Gaming Console', points: 500, qty: 1, image: 'https://via.placeholder.com/80' },
    { id: '2', name: 'Smartwatch', points: 1000, qty: 1, image: 'https://via.placeholder.com/80' },
  ];

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Cart</Text>
        <View style={styles.pointsContainer}>
          <Icon name="wallet-outline" size={24} color="#000" />
          <Text style={styles.pointsText}>1500 pts</Text>
        </View>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemPoints}>{item.points} pts</Text>
              <Text style={styles.itemQty}>Qty: {item.qty}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: </Text>
        <Text style={styles.totalPoints}>1500 pts</Text>
      </View>

      <TouchableOpacity style={styles.verifyButton}>
        <Text style={styles.verifyButtonText}>Send for Verification</Text>
      </TouchableOpacity>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ChildDashboard')}>
          <Icon name="home-outline" size={24} color="#870ae0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('CartScreen')}>
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

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#030303' },
  backButton: { padding: 10 },
  pointsContainer: { flexDirection: 'row', alignItems: 'center' },
  pointsText: { fontSize: 16, marginLeft: 5, fontWeight: 'bold', color: '#000' },

  itemCard: { flexDirection: 'row', backgroundColor: '#f7f7f7', padding: 15, borderRadius: 8, alignItems: 'center', marginVertical: 8 },
  itemImage: { width: 50, height: 50, borderRadius: 8, marginRight: 15 },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: 'bold' },
  itemPoints: { fontSize: 14, fontWeight: 'bold', color: '#870ae0' },
  itemQty: { fontSize: 12, color: '#666' },

  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  totalText: { fontSize: 18, fontWeight: 'bold' },
  totalPoints: { fontSize: 18, fontWeight: 'bold', color: '#870ae0' },

  verifyButton: { backgroundColor: '#870ae0', borderRadius: 6, paddingVertical: 12, alignItems: 'center', marginVertical: 10 },
  verifyButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },

  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#ccc', backgroundColor: '#ffffff', paddingVertical: 12, height: 70 },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 16, color: '#030303', marginTop: 5 },
});
