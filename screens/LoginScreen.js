import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch(
        `https://choresbuddy-dotnet.onrender.com/api/User/login?email=${email}&password=${password}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        const { userId, role } = data;
        setLoading(false); // Stop loading
        if (role === 'Parent') {
          navigation.navigate('ParentDashboard', { userId });
        } else {
          navigation.navigate('ChildDashboard', { userId });
        }
      } else {
        setLoading(false); // Stop loading
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      setLoading(false); // Stop loading
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ChoresBuddy</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '80%', padding: 10, borderWidth: 1, marginBottom: 10 },
  button: { backgroundColor: 'blue', padding: 10, borderRadius: 5 },
  buttonText: { color: 'white', fontSize: 18 },
});
