import React, { useCallback, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { homeWorkout, calisthenics, cardioWorkout } from '../../../../assets';
import VerticalList from '../../components/ListComponents/VerticalList/VerticalList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DiscoveryNavigatorParamsList } from '../../../../navigation/types';
import { RouteProp } from '@react-navigation/native';

const cardData = [
  {
    img: cardioWorkout,
    title: 'Cardio Program',
    coach: 'Reever Valerus',
  },
  {
    img: calisthenics,
    title: 'Calisthenics Program',
    coach: 'Alassane Fall',
  },
  {
    img: homeWorkout,
    title: 'Home Workout Program',
    coach: '',
  },
  {
    img: cardioWorkout,
    title: 'Cardio Program',
    coach: 'Reever Valerus',
  },
  {
    img: calisthenics,
    title: 'Calisthenics Program',
    coach: 'Alassane Fall',
  },
  {
    img: homeWorkout,
    title: 'Home Workout Program',
    coach: '',
  },
  {
    img: cardioWorkout,
    title: 'Cardio Program',
    coach: 'Reever Valerus',
  },
  {
    img: calisthenics,
    title: 'Calisthenics Program',
    coach: 'Alassane Fall',
  },
  {
    img: homeWorkout,
    title: 'Home Workout Program',
    coach: '',
  },
];

type ShowAllProps = {
  navigation: NativeStackNavigationProp<
    DiscoveryNavigatorParamsList,
    'ShowAll'
  >;
  route: RouteProp<DiscoveryNavigatorParamsList, 'ShowAll'>;
};

const ShowAll = ({ route, navigation }: ShowAllProps) => {
  const { type, category } = route.params;

  const goBackButton = useCallback(() => navigation.goBack(), [navigation]);

  const renderBackButton = useCallback(
    () => (
      <Pressable onPress={goBackButton}>
        <Text>Back</Text>
      </Pressable>
    ),
    [goBackButton],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: category.charAt(0).toUpperCase() + category.slice(1),
      headerLeft: () => renderBackButton(),
    });
  }, [category, navigation, renderBackButton]);

  return (
    <View style={styles.container}>
      <VerticalList type={type} data={cardData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ShowAll;
