import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const navigation = useNavigation();

  const handleSignup = () => {
    navigation.navigate('ParentDashboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://assets.api.uizard.io/api/cdn/stream/a392d245-fba6-49b3-a5c0-123a1ab05cbb.png',
          }}
        />
        <Text style={styles.title}>Signup</Text>
        <Text style={styles.subtitle}>Please fill in your details</Text>
        <TextInput style={styles.input} placeholder="Name" />
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  card: {
    width: '90%',
    backgroundColor: '#e3cef2',
    borderRadius: 6,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 146,
    height: 111,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    color: '#030303',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#030303',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 56,
    borderWidth: 1,
    borderColor: '#929292',
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#870ae0',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
