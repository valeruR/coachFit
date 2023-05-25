import React from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import { CardItemType } from '../types';

const Card = ({ item }: { item: CardItemType }) => {
  return (
    <Pressable style={styles.cardContainer} onPress={item.onPress}>
      <View style={styles.imgContainer}>
        <Image
          source={{ uri: item.img }}
          resizeMode="cover"
          style={styles.cardImg}
        />
      </View>
      <View style={styles.cardSection}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardCoach}>{item.coach}</Text>
      </View>
    </Pressable>
  );
};

const extractor = (_item: CardItemType, idx: number) => idx.toString();

const CardList = ({ data }: { data: Array<CardItemType> }) => {
  return (
    <View>
      <FlatList
        horizontal={true}
        data={data}
        renderItem={Card}
        keyExtractor={extractor}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 200,
    width: 200,
    borderRadius: 10,
    marginRight: 10,
    flexDirection: 'column',
  },
  imgContainer: {
    height: '80%',
    width: '100%',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  cardSection: {
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
