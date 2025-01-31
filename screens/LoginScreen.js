import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ChoresBuddy</Text>
      <Text style={styles.subtitle}>Log in to manage your chores and rewards</Text>
      <TextInput style={styles.input} placeholder="Username" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot my password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.facebookButton}>
        <Text style={styles.buttonText}>Login with Facebook</Text>
      </TouchableOpacity>

      <Text style={styles.title}>For testing</Text>

      <TouchableOpacity
        style={styles.parentLoginButton}
        onPress={() => navigation.navigate('ParentDashboard')}
      >
        <Text style={styles.parentLoginText}>Login as Parent</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.childLoginButton}
        onPress={() => navigation.navigate('ChildDashboard')}
      >
        <Text style={styles.childLoginText}>Login as Child</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 47,
    borderWidth: 1,
    borderColor: '#929292',
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  forgotPassword: {
    color: '#870ae0',
    textAlign: 'right',
    width: '100%',
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#870ae0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  orText: {
    marginVertical: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e4e6ea',
    width: '100%',
    height: 36,
    borderRadius: 6,
    marginBottom: 10,
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e4e6ea',
    width: '100%',
    height: 36,
    borderRadius: 6,
    marginBottom: 20,
  },

  parentLoginButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#870ae0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginTop: 20,
  },
  parentLoginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  childLoginButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#4A90E2', 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginTop: 10,
  },
  childLoginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
