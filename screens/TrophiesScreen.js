import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const mockTrophies = [
  { id: '1', name: 'Math Whiz', icon: 'trophy', earned: true },
  { id: '2', name: 'Reading', icon: 'book', earned: true },
  { id: '3', name: 'Science Explorer', icon: 'flask', earned: false },
  { id: '4', name: 'History', icon: 'school', earned: true },
  { id: '5', name: 'Cleaning', icon: 'broom', earned: true },
  { id: '6', name: 'Homework Hero', icon: 'pencil', earned: true },
  { id: '7', name: 'Creative', icon: 'color-palette', earned: true },
  { id: '8', name: 'Artistic', icon: 'brush', earned: true },
  { id: '9', name: 'Musical', icon: 'musical-notes', earned: true },
  { id: '10', name: 'Fitness', icon: 'fitness', earned: false },
  { id: '11', name: 'Eco', icon: 'leaf', earned: false },
];

export default function TrophiesScreen({ route, navigation }) {
  const { child } = route.params; // Receive child data from navigation

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Child Progress</Text>
      </View>

      {/* Child Info */}
      <View style={styles.childInfo}>
        <Text style={styles.sectionTitle}>Trophies Earned By {child.name}</Text>
        <Image source={{ uri: child.image }} style={styles.childImage} />
      </View>

      {/* Trophies List */}
      <FlatList
        data={mockTrophies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.trophyItem}>
            <Icon
              name={item.icon}
              size={22}
              color={item.earned ? '#870ae0' : '#ccc'}
            />
            <Text style={[styles.trophyText, item.earned ? {} : styles.notEarned]}>
              {item.name}
            </Text>
          </View>
        )}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home-outline" size={24} color="#870ae0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 10,
    color: '#030303',
  },
  childInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#030303',
  },
  childImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  trophyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  trophyText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  notEarned: {
    color: '#ccc',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 14,
    color: '#030303',
  },
});
