import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function RewardApprovalScreen({ navigation }) {
  // Mock data for a reward request
  const rewardRequest = {
    childName: 'Alex',
    rewardName: 'PS5',
    imageUrl: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5', 
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Reward Requests</Text>
      </View>

      
      <View style={styles.rewardCard}>
        <Text style={styles.sectionTitle}>Reward Selection</Text>
        <Text style={styles.description}>
          {rewardRequest.childName} has chosen a {rewardRequest.rewardName} as a reward.
        </Text>
        <Image source={{ uri: rewardRequest.imageUrl }} style={styles.rewardImage} />
        
        
        <View style={styles.buttonRow}>
        <TouchableOpacity
            style={styles.approveButton}
            onPress={() => navigation.navigate('AddAddress')}
        >
        <Text style={styles.buttonText}>Approve</Text>
            </TouchableOpacity>

        <TouchableOpacity style={styles.declineButton}>
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>
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
  container: { flex: 1, backgroundColor: '#ffffff', padding: 20, paddingBottom: 60 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginLeft: 10, color: '#030303' },

  /* Reward Selection Card */
  rewardCard: { backgroundColor: '#f7f7f7', padding: 15, borderRadius: 6, alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#030303', marginBottom: 5 },
  description: { fontSize: 14, color: '#666', marginBottom: 10, textAlign: 'center' },
  rewardImage: { width: 150, height: 150, borderRadius: 6, marginBottom: 15 },

  /* Buttons */
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  approveButton: { flex: 1, backgroundColor: '#870ae0', padding: 12, borderRadius: 6, alignItems: 'center', marginRight: 5 },
  declineButton: { flex: 1, backgroundColor: '#870ae0', padding: 12, borderRadius: 6, alignItems: 'center', marginLeft: 5 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },

  /* Bottom Navigation */
  bottomNav: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#ffffff', flexDirection: 'row', justifyContent: 'space-around',
    borderTopWidth: 1, borderTopColor: '#ccc', paddingVertical: 10, height: 60,
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 14, color: '#030303' },
});
