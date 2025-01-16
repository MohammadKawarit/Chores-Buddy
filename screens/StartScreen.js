import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ChoresBuddy</Text>
      <Text style={styles.subtitle}>Assign tasks to children</Text>
      <Image
        style={styles.image}
        source={{
          uri: 'https://assets.api.uizard.io/api/cdn/stream/a392d245-fba6-49b3-a5c0-123a1ab05cbb.png',
        }}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPress={() => navigation.navigate('Login')}
          color="#870ae0"
        />
        <Button
          title="Sign Up"
          onPress={() => {}}
          color="#870ae0"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    color: '#030303',
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#030303',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
});
