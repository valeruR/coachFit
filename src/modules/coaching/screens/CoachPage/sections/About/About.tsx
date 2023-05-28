import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootState, useAppSelector } from '../../../../../../redux';

const About = () => {
  const coach = useAppSelector((state: RootState) => state.coach);
  const tags = useAppSelector((state: RootState) => state.tags);

  return (
    <View style={styles.container}>
      <View style={styles.tagsContainer}>
        {tags?.tags.map((tag) => {
          if (coach.tags.includes(tag.id)) {
            return (
              <View key={tag.id} style={styles.tag}>
                <Text style={styles.tagText}>{tag.name}</Text>
              </View>
            );
          }
        })}
      </View>
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
  tagsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#D3D3D3',
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    flexWrap: 'wrap',
  },
  tag: {
    color: 'rgb(235, 64, 52)',
    padding: 5,
    borderWidth: 1,
    margin: 3,
    fontSize: 5,
    borderStyle: 'solid',
    borderRadius: 20,
    borderColor: 'rgb(235, 64, 52)',
  },
  tagText: {
    color: 'rgb(235, 64, 52)',
    fontSize: 10,
    fontWeight: '600',
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
