import React from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';

const Card = ({ item }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={item.img} resizeMode="cover" style={styles.cardImg} />
    </View>
  );
};

const extractor = (_item, idx) => idx;

const LongList = ({ data }) => {
  return <FlatList data={data} renderItem={Card} keyExtractor={extractor} />;
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default LongList;
