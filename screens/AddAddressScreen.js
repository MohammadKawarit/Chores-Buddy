import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function AddAddressScreen() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Add Address</Text>
      </View>

      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />

      <Text style={styles.label}>Street</Text>
      <TextInput style={styles.input} placeholder="Street" value={street} onChangeText={setStreet} />

      <Text style={styles.label}>City</Text>
      <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />

      <Text style={styles.label}>Postcode</Text>
      <TextInput style={styles.input} placeholder="Postcode" keyboardType="numeric" value={postcode} onChangeText={setPostcode} />

      <Text style={styles.label}>Country</Text>
      <TextInput style={styles.input} placeholder="Country" value={country} onChangeText={setCountry} />

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => navigation.navigate('OrderConfirmation')}
      >
        <Text style={styles.confirmButtonText}>Confirm Order</Text>
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
  label: { fontSize: 16, fontWeight: '500', marginBottom: 5 },
  input: { backgroundColor: '#e3e3e3', padding: 12, borderRadius: 6, marginBottom: 15 },
  confirmButton: { backgroundColor: '#870ae0', padding: 15, borderRadius: 6, alignItems: 'center', marginTop: 10 },
  confirmButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
    height: 60,
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 14, color: '#030303' },
});
