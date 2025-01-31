import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useBalance } from '../context/BalanceContext'; // Import balance

export default function OrderConfirmationScreen({ navigation, route }) {
  const { balance } = useBalance(); // Get updated balance
  const { points } = route.params || { points: 0 }; // Get purchased points

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
      </View>

      {/* Confirmation Box */}
      <View style={styles.confirmationBox}>
        <Text style={styles.confirmationText}>Order Confirmation</Text>
        <Text>{points} points have been added to your account.</Text>
        <Text style={styles.balanceText}>Current Balance: {balance} points</Text>

        {/* Return to Homepage Button */}
        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => navigation.navigate('ParentDashboard')}
        >
          <Text style={styles.returnButtonText}>Return to Homepage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 20, paddingBottom: 60 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginLeft: 10, color: '#030303' },

  /* Confirmation Messages */
  message: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
  subMessage: { fontSize: 16, textAlign: 'center', marginBottom: 10 },

  /* Delivery Date */
  deliveryCard: { backgroundColor: '#e3e3e3', padding: 15, borderRadius: 6, alignItems: 'center', marginBottom: 20 },
  deliveryText: { fontSize: 16, fontWeight: 'bold', color: '#030303' },
  deliveryDate: { fontSize: 16, color: '#870ae0', fontWeight: 'bold' },

  /* Return Button */
  returnButton: { backgroundColor: '#870ae0', padding: 15, borderRadius: 6, alignItems: 'center', marginTop: 20 },
  returnButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },

  /* Bottom Navigation */
  bottomNav: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#ffffff', flexDirection: 'row', justifyContent: 'space-around',
    borderTopWidth: 1, borderTopColor: '#ccc', paddingVertical: 10, height: 60,
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 14, color: '#030303' },
});
