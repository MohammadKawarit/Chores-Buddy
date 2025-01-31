import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useBalance } from '../context/BalanceContext';

export default function ParentDashboardScreen({ navigation }) {
  const { balance } = useBalance();

  return (
    <View style={styles.container}>
      
      <View style={styles.topBar}>
        <Icon name="menu" size={24} color="#000" />
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
          <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ManageChild')}
        >
          <Text style={styles.buttonText}>Manage Child</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ChildProgress')} 
        >
          <Text style={styles.buttonText}>Child Progress</Text>
          </TouchableOpacity>

        <Text style={styles.sectionTitle}>Task Management</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AssignTask')}
        >
          <Text style={styles.buttonText}>Assign New Task</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ManageTasks')}
        >
          <Text style={styles.buttonText}>Manage Tasks</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Store Management</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ManageStore')}
        >
        <Text style={styles.buttonText}>Manage Child Store</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home-outline" size={24} color="#870ae0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Store')}
        >
          <Icon name="storefront-outline" size={24} color="#000" />
          <Text style={styles.navText}>Store</Text>
          
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="list-outline" size={24} color="#000" />
          <Text style={styles.navText}>Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#030303',
  },
  iconSpacing: {
    marginRight: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#030303',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#870ae0',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 15,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 14,
    color: '#030303',
  },
});
