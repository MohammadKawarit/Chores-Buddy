import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useBalance} from '../context/BalanceContext';

export default function CheckoutScreen({ route, navigation }) {
  
  const { points, price } = route.params || { points: 0, price: '£0' };
  const { balance, setBalance } = useBalance();
  const handlePayment = () => {
    const newBalance = balance + points; 
    setBalance(newBalance); 
    navigation.navigate('OrderConfirmation', { newBalance, points });
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>CheckOut</Text>
      </View>

      
      <Text style={styles.purchaseText}>
        You are purchasing:{' '}
        <Text style={styles.pointsText}>{points} Points for {price}</Text>
      </Text>

      
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Card Details</Text>
        <TextInput style={styles.input} placeholder="Card Number" keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Expiry Date (MM/YY)" keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="CVV" keyboardType="numeric" secureTextEntry />
        <TextInput style={styles.input} placeholder="Cardholder Name" />
      </View>

     
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay {price}</Text>
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

  
  purchaseText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  pointsText: { color: '#870ae0' },

  
  cardContainer: { backgroundColor: '#f2f2f2', padding: 15, borderRadius: 6, marginBottom: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  input: { backgroundColor: '#e3e3e3', padding: 12, borderRadius: 6, marginBottom: 10 },

 
  payButton: { backgroundColor: '#870ae0', padding: 15, borderRadius: 6, alignItems: 'center' },
  payButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },

  
  bottomNav: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#ffffff', flexDirection: 'row', justifyContent: 'space-around',
    borderTopWidth: 1, borderTopColor: '#ccc', paddingVertical: 10, height: 60,
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 14, color: '#030303' },
});
