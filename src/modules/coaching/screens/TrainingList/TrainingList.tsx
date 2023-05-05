import React, { useCallback, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';

import { SafeAreaView } from 'react-native-safe-area-context';
import HorizontalList from '../../components/ListComponents/HorizontalList/HorizontalList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DiscoveryNavigatorParamsList } from '../../../../navigation/types';
import { layout, swiperLayout } from './listLayout';

const HeaderButton = ({ title }: { title: string }) => {
  return (
    <TouchableOpacity
      style={styles.headerButton}
      /* onPress={() => {
        navigation.push(routes.Support, {
          hasMargin: true,
        });
      }} */
    >
      <Text style={styles.headerText}>{title}</Text>
    </TouchableOpacity>
  );
};

type HomePageProps = {
  navigation: NativeStackNavigationProp<
    DiscoveryNavigatorParamsList,
    'HomePage'
  >;
};

export default function HomePage({ navigation }: HomePageProps) {
  const renderHeaderButton = useCallback(
    (title: string) => <HeaderButton title={title} />,
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => renderHeaderButton('Share'),
      headerRight: () => renderHeaderButton('Search'),
      headerTransparent: true,
    });
  }, [navigation, renderHeaderButton]);

  return (
    <SafeAreaView style={styles.safeAreaw}>
      <ScrollView style={styles.background}>
        <View style={styles.categoryContainer}>
          <View style={styles.subTitlesContainer}>
            <Text style={styles.text}>FEATURED</Text>
            <TouchableOpacity>
              <Text style={styles.textButton}>SHOW ALL {'>'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.swiper}>
            <Swiper
              containerStyle={styles.wrapper}
              showsButtons={false}
              dotColor="gray"
              activeDotColor="lightgray"
            >
              {swiperLayout &&
                swiperLayout.map((item) => (
                  <View key={item.key}>
                    <Image
                      source={item.img}
                      resizeMode="cover"
                      style={styles.img}
                    />
                  </View>
                ))}
            </Swiper>
          </View>
        </View>
        {layout &&
          layout.map((item) => (
            <HorizontalList
              key={item.category}
              cardType={item.type}
              category={item.category}
              data={item.data}
              navigation={navigation}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaw: {
    marginTop: 40,
    backgroundColor: 'gainsboro',
  },
  background: {
    height: '100%',
    width: '100%',
    padding: 10,
    flexDirection: 'column',
    paddingBottom: 30,
  },
  categoryContainer: {
    flexDirection: 'column',
    width: '100%',
    marginVertical: 10,
  },
  category: {
    width: '100%',
    marginTop: 10,
  },
  swiper: {
    marginTop: 10,
    height: 400,
    width: '100%',
  },
  wrapper: {
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
  },
  subTitlesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
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
  headerText: {
    fontSize: 17,
  },
  headerButton: {
    marginRight: 16,
  },
});
