import React, { useState } from 'react';
import { View, Text, Image, Switch, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function LeaderboardScreen({ navigation }) {
  const [isGlobal, setIsGlobal] = useState(false);

  const leaderboardData = [
    {
      id: '1',
      name: 'Alex',
      tasksDone: 120,
      points: 1500,
      trophies: 5,
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: '2',
      name: 'Emily',
      tasksDone: 110,
      points: 1400,
      trophies: 4,
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back-outline" size={28} color="#000" onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Leaderboard</Text>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Global</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#870ae0' }}
          thumbColor={isGlobal ? '#fff' : '#f4f3f4'}
          onValueChange={() => setIsGlobal(!isGlobal)}
          value={isGlobal}
        />
      </View>

      {leaderboardData.map((user) => (
        <View key={user.id} style={styles.userCard}>
          <Image source={{ uri: user.image }} style={styles.userImage} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text>Tasks Done: {user.tasksDone}</Text>
            <Text>Points Earned: {user.points}</Text>
            <Text>Trophies: {user.trophies}</Text>
          </View>
        </View>
      ))}

      <View style={styles.bottomNav}>
        <Icon name="home-outline" size={24} color="#870ae0" onPress={() => navigation.navigate('ChildDashboard')} />
        <Icon name="cart-outline" size={24} color="#000" onPress={() => navigation.navigate('CartScreen')} />
        <Icon name="storefront-outline" size={24} color="#000" onPress={() => navigation.navigate('ChildStoreScreen')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 20, paddingBottom: 80 },

  header: { flexDirection: 'row', alignItems: 'center', paddingBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#030303', marginLeft: 10 },

  switchContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  switchLabel: { fontSize: 18, fontWeight: 'bold', marginRight: 10 },

  userCard: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  userImage: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  userInfo: { flex: 1 },
  userName: { fontSize: 16, fontWeight: 'bold' },

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
});
