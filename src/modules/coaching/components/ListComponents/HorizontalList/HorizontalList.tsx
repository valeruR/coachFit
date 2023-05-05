import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import CardList from './CardList';
import LongList from './LongList';
import { CardRendererProps, HorizontalListProps } from '../types';
interface Categories {
  [key: string]: string;
}

const categories: Categories = {
  celebrity: 'celebrity',
  cardio: 'cardio',
  meditation: 'meditation',
  stretching: 'stretching',
  training: 'training',
};

const CardRenderer = ({ type, data }: CardRendererProps) => {
  switch (type) {
    case 'card':
      return <CardList data={data} />;
    case 'longCard':
      return <LongList data={data} />;
    default:
      return <CardList data={data} />;
  }
};

function HorizontalList({
  cardType,
  category,
  data,
  navigation,
}: HorizontalListProps) {
  const pressShowAll = useCallback(
    () =>
      navigation.navigate('ShowAll', {
        category,
        type: cardType,
      }),
    [navigation, cardType, category],
  );

  if (!categories[category]) {
    return null;
  }

  return (
    <View style={styles.categoryContainer}>
      <View style={styles.subTitlesContainer}>
        <Text style={styles.text}>{categories[category].toUpperCase()}</Text>
        <TouchableOpacity onPress={pressShowAll}>
          <Text style={styles.textButton}>SHOW ALL {'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.category}>
        {data && <CardRenderer type={cardType} data={data} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'column',
    width: '100%',
    marginVertical: 10,
  },
  category: {
    width: '100%',
    marginTop: 10,
  },
  subTitlesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'gray',
    fontSize: 12,
    fontWeight: 'bold',
  },
  textButton: {
    fontSize: 12,
    color: 'mediumpurple',
    fontWeight: 'bold',
  },
});

export default HorizontalList;
