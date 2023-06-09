import React from 'react';
import { View, Image, FlatList, StyleSheet, Pressable } from 'react-native';
import { CardItemType } from '../types';

const Card = ({ item }: { item: CardItemType }) => {
  return (
    <Pressable style={styles.cardContainer} onPress={item.onPress}>
      <Image
        source={{ uri: item.img }}
        resizeMode="cover"
        style={styles.cardImg}
      />
    </Pressable>
  );
};

const extractor = (_item: CardItemType, idx: number) => idx.toString();

const LongList = ({ data }: { data: Array<CardItemType> }) => {
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
    height: 150,
    width: 250,
    borderRadius: 10,
    marginRight: 10,
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default LongList;
