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
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default LongList;
