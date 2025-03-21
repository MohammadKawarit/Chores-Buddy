import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function TaskProgressAndTrophiesScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params || {}; // Get userId from params

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Track Progress</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.progressButton}
          onPress={() => navigation.navigate('Trophies', { userId })}
        >
          <Icon name="trophy-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Trophies</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.progressButton}
          onPress={() => navigation.navigate('TasksDetails', { userId })}
        >
          <Icon name="list-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Task Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.progressButton}
          onPress={() => navigation.navigate('Leaderboard', { userId })}
        >
          <Icon name="bar-chart-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Leaderboard</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ChildDashboard', { userId })}>
          <Icon name="home-outline" size={28} color="#870ae0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Cart', { userId })}>
          <Icon name="cart-outline" size={28} color="#000" />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ChildStoreScreen', { userId })}>
          <Icon name="storefront-outline" size={28} color="#000" />
          <Text style={styles.navText}>Store</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 20, paddingBottom: 80 },

  header: { flexDirection: 'row', alignItems: 'center', paddingBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#030303', marginLeft: 10 },
  backButton: { padding: 10 },

  buttonContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  progressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#870ae0',
    padding: 12,
    borderRadius: 8,
    width: '80%',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },

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
