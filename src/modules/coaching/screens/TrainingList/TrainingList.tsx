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
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import Swiper from 'react-native-swiper';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import HorizontalList from '../../components/ListComponents/HorizontalList/HorizontalList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DiscoveryNavigatorParamsList } from '../../../../navigation/types';
import { CardType } from '../../components/ListComponents/types';
import { addId } from '../../../../redux/coachReducer';

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

type ProgramProps = {
  key: string;
  media: string;
  name: string;
  tag: string;
  coach: FirebaseFirestoreTypes.DocumentData | null;
  coachId: string;
  featured: boolean;
};

const fromSnapShotsToProgram = async (
  docs: FirebaseFirestoreTypes.QueryDocumentSnapshot[],
) => {
  const ret: ProgramProps[] = [];
  for (const doc of docs) {
    const { name, featured, tag, coach } = doc.data();
    const tCoach = await firestore().collection('coaches').doc(coach).get();
    const tCoachData = tCoach.data();
    const img = await (
      await storage().ref(`programs/${doc.id}`).list()
    ).items[0].getDownloadURL();
    ret.push({
      key: doc.id,
      coach: { ...tCoachData },
      coachId: tCoach.id,
      name,
      tag,
      featured,
      media: img,
    });
  }
  return ret;
};

export default function HomePage({ navigation }: HomePageProps) {
  const [programs, setPrograms] = useState<Array<ProgramProps>>([]);
  const [categories, setCategories] = useState<
    { name: string; cardType: CardType }[]
  >([]);

  const dispatch = useDispatch();

  const renderHeaderButton = useCallback(
    (title: string) => <HeaderButton title={title} />,
    [],
  );

  const onPress = useCallback(
    (id: string) => {
      dispatch(addId(id));
      navigation.navigate('CoachPage', {
        id,
      });
    },
    [navigation, dispatch],
  );

  useEffect(() => {
    async function getData() {
      const programCollection = await firestore().collection('programs').get();
      const categoriesCollection = await firestore()
        .collection('program_categories')
        .get();
      if (categoriesCollection?.docs?.length) {
        const categoryDocs = categoriesCollection.docs.map((cat) => ({
          name: cat.data().name,
          cardType: cat.data().cardType,
        }));
        setCategories(categoryDocs);
      }
      if (programCollection?.docs?.length) {
        const convert = await fromSnapShotsToProgram(programCollection.docs);
        setPrograms(convert);
      }
    }
    getData();
  }, []);

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
            {programs && (
              <Swiper
                containerStyle={styles.wrapper}
                showsButtons={false}
                dotColor="gray"
                activeDotColor="lightgray"
              >
                {programs
                  .filter((elm) => elm.featured)
                  .map((item) => (
                    <Pressable
                      key={item.key}
                      onPress={() => onPress(item.coachId)}
                    >
                      <Image
                        source={{ uri: item.media }}
                        resizeMode="cover"
                        style={styles.img}
                      />
                    </Pressable>
                  ))}
              </Swiper>
            )}
          </View>
        </View>
        {categories &&
          programs &&
          categories.map((category) => (
            <HorizontalList
              key={category.name}
              cardType={category.cardType}
              category={category.name}
              data={programs
                .filter((elm) => elm.tag === category.name)
                .map((prog) => ({
                  img: prog.media,
                  coach: `${prog?.coach?.firstname} ${prog?.coach?.lastname}`,
                  title: prog.name,
                }))}
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
  testImg: {
    height: '50%',
    width: '100%',
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
