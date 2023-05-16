import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import VerticalList from '../../components/ListComponents/VerticalList/VerticalList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DiscoveryNavigatorParamsList } from '../../../../navigation/types';
import { RouteProp } from '@react-navigation/native';
import { CardItemType } from '../../components/ListComponents/types';

type ShowAllProps = {
  navigation: NativeStackNavigationProp<
    DiscoveryNavigatorParamsList,
    'ShowAll'
  >;
  route: RouteProp<DiscoveryNavigatorParamsList, 'ShowAll'>;
};

const ShowAll = ({ route, navigation }: ShowAllProps) => {
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState<CardItemType[]>([]);
  const { type, category } = route?.params;

  useEffect(() => {
    setLoading(true);
    const subscriber = firestore()
      .collection('programs')
      .where('tag', '==', category)
      .onSnapshot(async (querySnapshot) => {
        const progs: CardItemType[] = [];

        for (const doc of querySnapshot.docs) {
          const { name } = doc.data();
          const img = await (
            await storage().ref(`programs/${doc.id}`).list()
          ).items[0].getDownloadURL();
          progs.push({
            img,
            coach: '',
            title: name,
            key: doc.id,
          });
        }
        setLoading(false);
        setPrograms(progs);
      });

    return () => subscriber();
  }, [category]);

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

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <VerticalList type={type} data={programs} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ShowAll;
