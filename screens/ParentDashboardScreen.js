import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useBalance } from '../context/BalanceContext';
import { Menu, MenuOptions, MenuOption } from 'react-native-popup-menu';

export default function ParentDashboardScreen({ navigation }) {
  const { balance } = useBalance();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Menu>
            <TouchableOpacity>
              <Icon name="menu" size={26} color="#000" />
            </TouchableOpacity>
          <MenuOptions>
            <MenuOption onSelect={() => navigation.navigate('ParentDashboard')}>
              <Text style={styles.menuText}>Dashboard</Text>
            </MenuOption>
            <MenuOption onSelect={() => navigation.navigate('Profile')}>
              <Text style={styles.menuText}>Profile</Text>
            </MenuOption>
            <MenuOption onSelect={() => navigation.navigate('Settings')}>
              <Text style={styles.menuText}>Settings</Text>
            </MenuOption>
            <MenuOption onSelect={() => navigation.navigate('Login')}>
              <Text style={styles.menuTextLogout}>Logout</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>

        <Text style={styles.title}>Parent Dashboard</Text>

        <View style={styles.topRight}>
          <Icon name="notifications-outline" size={24} color="#000" style={styles.iconSpacing} />
          <Image
            style={styles.profileImage}
            source={{
              uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHw1fHxQZW9wbGV8ZW58MXx8fHwxNjg0MjQ4ODE3fDA&ixlib=rb-4.0.3&q=80&w=1080',
            }}
          />
        </View>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Current Balance:</Text>
        <Text style={styles.balanceText}>{balance} Points</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Child Overview</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageChild')}>
          <Text style={styles.buttonText}>Manage Child</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChildProgress')}>
          <Text style={styles.buttonText}>Child Progress</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Task Management</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AssignTask')}>
          <Text style={styles.buttonText}>Assign New Task</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageTasks')}>
          <Text style={styles.buttonText}>Manage Tasks</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Store Management</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageStore')}>
          <Text style={styles.buttonText}>Manage Child Store</Text>
        </TouchableOpacity>
      </View>

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
  container: { flex: 1, backgroundColor: '#ffffff', paddingHorizontal: 20, paddingTop: 40 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  title: { fontSize: 24, fontWeight: '500', color: '#030303' },
  topRight: { flexDirection: 'row', alignItems: 'center' },
  iconSpacing: { marginRight: 10 },
  profileImage: { width: 40, height: 40, borderRadius: 20 },

  menuText: { fontSize: 16, padding: 10 },
  menuTextLogout: { fontSize: 16, padding: 10, color: 'red' },

  menuTrigger: { padding: 5 },

  balanceContainer: { backgroundColor: '#e5e5e5', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  balanceLabel: { fontSize: 16, fontWeight: '500', color: '#333' },
  balanceText: { fontSize: 20, fontWeight: 'bold', color: '#870ae0' },

  content: { flex: 1 },
  sectionTitle: { fontSize: 20, fontWeight: '500', color: '#030303', marginVertical: 10 },
  button: { backgroundColor: '#870ae0', borderRadius: 6, paddingVertical: 10, alignItems: 'center', marginVertical: 5 },
  buttonText: { color: '#ffffff', fontSize: 14, fontWeight: '500' },

  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#ccc', paddingVertical: 15 },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 14, color: '#030303' },
});
