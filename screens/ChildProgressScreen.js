import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const mockChildren = [
  { id: '1', name: 'Alex', points: 100, trophies: 3, image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', name: 'Emily', points: 120, trophies: 5, image: 'https://randomuser.me/api/portraits/women/2.jpg' }
];

export default function ChildProgressScreen() {
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Child Progress</Text>
      
      <FlatList
        data={mockChildren}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.childCard}>
            {/* Child Image */}
            <Image source={{ uri: item.image }} style={styles.childImage} />
            
            {/* Child Info */}
            <View style={styles.childInfo}>
              <Text style={styles.childName}>{item.name}</Text>
              <Text>Points: {item.points}</Text>
              <Text>Trophies: {item.trophies}</Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonsContainer}>
              {/* ✅ Fix: Wrap text inside <Text> */}
              <TouchableOpacity
                style={styles.trophyButton}
                onPress={() => navigation.navigate('Trophies', { child: item })}
              >
                <Text style={styles.buttonText}>Trophies</Text>
              </TouchableOpacity>

              <TouchableOpacity
                 style={styles.taskButton}
                 onPress={() => navigation.navigate('TasksDetails', { child: item })}
              >
                 <Text style={styles.buttonText}>Tasks Details</Text>
              </TouchableOpacity>

            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  childCard: {
    flexDirection: 'row',
    backgroundColor: '#e3cef2',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 15,
  },
  childImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  trophyButton: {
    backgroundColor: '#870ae0',
    padding: 8,
    borderRadius: 6,
    marginRight: 5,
    alignItems: 'center', 
  },
  taskButton: {
    backgroundColor: '#870ae0',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center', 
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});
