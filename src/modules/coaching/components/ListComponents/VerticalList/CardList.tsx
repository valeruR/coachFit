import React from 'react';
import { View, Image, FlatList, StyleSheet, Text } from 'react-native';
import { CardItemType } from '../types';

const Card = ({ item }: { item: CardItemType }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imgContainer}>
        <Image source={item.img} resizeMode="cover" style={styles.cardImg} />
      </View>
      <View style={styles.cardSection}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardCoach}>{item.coach}</Text>
      </View>
    </View>
  );
};

const extractor = (_item: CardItemType, idx: number) => `${_item.title}_${idx}`;

const CardList = ({ data }: { data: CardItemType[] }) => {
  return (
    <FlatList
      data={data}
      renderItem={Card}
      keyExtractor={extractor}
      numColumns={2}
      style={styles.container}
      // columnWrapperStyle={styles.column}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 60,
    paddingHorizontal: 10,
  },
  cardContainer: {
    width: '50%',
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 5,
    flexDirection: 'column',
  },
  imgContainer: {
    height: '80%',
    width: '90%',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  cardSection: {
    width: '90%',
    flexDirection: 'column',
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: '600',
  },
  cardCoach: {
    fontSize: 8,
    color: 'gray',
  },
});

export default CardList;
