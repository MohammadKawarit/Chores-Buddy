import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ChildDashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={28} color="#000" onPress={() => navigation.navigate('Profile')}></Icon>
        </TouchableOpacity>
        <Text style={styles.title}>Child Dashboard</Text>
        <View style={styles.headerIcons}>
          <Icon name="notifications-outline" size={28} color="#000" style={styles.iconSpacing} />
          <Image
            style={styles.profileImage}
            source={{ uri: 'https://assets.api.uizard.io/api/cdn/stream/989d773b-ce04-426f-86f3-d7ddeeafb45e.png' }}
          />
        </View>
      </View>

      <View style={styles.profileSection}>
        <Image
          style={styles.profileImageLarge}
          source={{ uri: 'https://assets.api.uizard.io/api/cdn/stream/989d773b-ce04-426f-86f3-d7ddeeafb45e.png' }}
        />
        <Text style={styles.profileName}>Alex</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Task Management</Text>
        <TouchableOpacity style={styles.viewTasksButton} onPress={() => navigation.navigate('TasksScreen')}>
          <Text style={styles.buttonText}>View Tasks</Text>
        </TouchableOpacity>

        <Text style={styles.taskDetails}>Available Tasks: 4</Text>
        <Text style={styles.taskDetails}>Late Tasks: 2</Text>
        <Text style={styles.taskDetailsUndone}>Undone Tasks: 5</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Points Balance</Text>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsLabel}>Your Points:</Text>
          <Text style={styles.pointsValue}>1500</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.trackProgressButton} onPress={() => navigation.navigate('TaskProgressTrophiesScreen')}>
        <Text style={styles.buttonText}>Track Progress & Trophies</Text>
      </TouchableOpacity>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ChildDashboard')}>
          <Icon name="home-outline" size={28} color="#870ae0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('CartScreen')}>
          <Icon name="cart-outline" size={28} color="#000" />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ChildStoreScreen')}>
          <Icon name="storefront-outline" size={28} color="#000" />
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
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  iconSpacing: { marginRight: 15 },
  profileImage: { width: 35, height: 35, borderRadius: 20 },

  profileSection: { alignItems: 'center', marginVertical: 20 },
  profileImageLarge: { width: 80, height: 80, borderRadius: 40 },
  profileName: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },

  section: { marginVertical: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#030303', marginBottom: 10 },

  taskDetails: { fontSize: 16, color: '#000', marginBottom: 5 },
  taskDetailsUndone: { fontSize: 16, color: 'red', fontWeight: 'bold' },

  viewTasksButton: { backgroundColor: '#870ae0', borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginVertical: 10 },
  trackProgressButton: { backgroundColor: '#870ae0', borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginVertical: 10 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },

  pointsContainer: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsLabel: { fontSize: 18, fontWeight: 'bold', color: '#030303' },
  pointsValue: { fontSize: 22, fontWeight: 'bold', color: '#870ae0' },

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
