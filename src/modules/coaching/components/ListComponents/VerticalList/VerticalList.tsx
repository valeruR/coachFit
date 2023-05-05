import React from 'react';
import { View, StyleSheet } from 'react-native';

import CardList from './CardList';
import LongList from './LongList';
import { CardRendererProps } from '../types';

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

const VerticalList = ({ type, data }: CardRendererProps) => {
  return (
    <View style={styles.categoryContainer}>
      {data && <CardRenderer type={type} data={data} />}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
});

export default VerticalList;
