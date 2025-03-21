import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function StoreScreen({ route, navigation }) {
  const [balance, setBalance] = useState(150);
  const { userId } = route.params || {};

  const storeItems = [
    { id: '1', points: 100, price: '£10' },
    { id: '2', points: 500, price: '£40' },
    { id: '3', points: 1000, price: '£75' },
    { id: '4', points: 1500, price: '£100' },
  ];

  return (
    <View style={styles.container}>
      
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Store</Text>
      </View>

      
      <Text style={styles.balance}>Balance: {balance} pts</Text>

      <FlatList
        data={storeItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.storeCard}
            onPress={() => navigation.navigate('Checkout', { points: item.points, price: item.price, userId: userId })}
          >
            <Text style={styles.pointsText}>{item.points} Points</Text>
            <Text style={styles.subText}>{item.points} pts</Text>
            <Text style={styles.priceText}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />


      
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ParentDashboard', {userId})}>
          <Icon name="home-outline" size={24} color="#870ae0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="storefront-outline" size={24} color="#000" />
          <Text style={styles.navText}>Store</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ManageTasks', {userId})}>
          <Icon name="list-outline" size={24} color="#000" />
          <Text style={styles.navText}>Tasks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 20, paddingBottom: 60 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#000' },

  
  balance: { fontSize: 18, fontWeight: 'bold', color: '#870ae0', textAlign: 'center', marginBottom: 15 },

  storeCard: { backgroundColor: '#e5c6ff', padding: 15, borderRadius: 6, marginBottom: 10 },
  pointsText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  subText: { fontSize: 14, color: '#000' },
  priceText: { fontSize: 16, fontWeight: 'bold', color: '#000', alignSelf: 'flex-end' },

  bottomNav: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#ffffff', flexDirection: 'row', justifyContent: 'space-around',
    borderTopWidth: 1, borderTopColor: '#ccc', paddingVertical: 10, height: 60,
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 14, color: '#030303' },
});
