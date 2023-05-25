import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootState, useAppSelector } from '../../../../../../redux';

const About = () => {
  const coach = useAppSelector((state: RootState) => state.coach);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.subtitle}>A BRIEF INTRO</Text>
      <Text style={styles.description}>{coach.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'grey',
    fontSize: 10,
  },
  description: {
    marginTop: 10,
  },
});

export default About;
