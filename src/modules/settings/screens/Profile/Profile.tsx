import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

import { Context } from '../../../../utils/context';

const ProfilePage = () => {
  const context = useContext(Context);

  const onPressDisconnect = () => {
    auth()
      .signOut()
      .then(() => {
        context?.setUser(null);
        console.log('User signed out!');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Signed as: {context?.user?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={onPressDisconnect}>
        <Text style={styles.buttonText}>Disconnect</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Login
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: '80%',
    backgroundColor: '#fb7185',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default ProfilePage;
