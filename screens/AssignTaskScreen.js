import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AssignTaskScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Assign Task</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>Assign Task To:</Text>

        <View style={styles.card}>
          <Image
            style={styles.profileImage}
            source={{
              uri: 'https://assets.api.uizard.io/api/cdn/stream/f92045e7-dd2c-42df-a9d0-1b6af48418dd.png',
            }}
          />
          <Text style={styles.name}>Emily</Text>
          <TouchableOpacity
            style={styles.assignButton}
            onPress={() => navigation.navigate('TaskDetails', { child: 'Emily' })}
          >
            <Text style={styles.assignButtonText}>Assign Task</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Image
            style={styles.profileImage}
            source={{
              uri: 'https://assets.api.uizard.io/api/cdn/stream/989d773b-ce04-426f-86f3-d7ddeeafb45e.png',
            }}
          />
          <Text style={styles.name}>Alex</Text>
          <TouchableOpacity
            style={styles.assignButton}
            onPress={() => navigation.navigate('TaskDetails', { child: 'Alex' })}
          >
            <Text style={styles.assignButtonText}>Assign Task</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={24} color="#870ae0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Store')}>
          <Icon name="storefront-outline" size={24} color="#000" />
          <Text style={styles.navText}>Store</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Tasks')}>
          <Icon name="list-outline" size={24} color="#000" />
          <Text style={styles.navText}>Tasks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 6,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    flex: 1,
  },
  assignButton: {
    backgroundColor: '#870ae0',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  assignButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#030303',
    marginTop: 4,
  },
});
