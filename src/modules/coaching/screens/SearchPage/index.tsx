import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';
import { DiscoveryNavigatorParamsList } from '../../../../navigation/types';
import { RootState, useAppSelector } from '../../../../redux';

type SearchPageProps = {
  navigation: NativeStackNavigationProp<
    DiscoveryNavigatorParamsList,
    'SearchPage'
  >;
};

const SearchPage = ({ navigation }: SearchPageProps) => {
  const [search, setSearch] = useState('');
  const [showTags, setShowTags] = useState(true);
  const [coachs, setCoachs] = useState<
    Array<{ img: string; tags: string[]; name: string }>
  >([]);

  const tags = useAppSelector((state: RootState) => state.tags);

  useEffect(() => {
    async function getCoachs() {
      const coachCollection = await firestore().collection('coaches').get();
      if (coachCollection?.docs?.length) {
        const coachDocs = [];
        for (const fCoach of coachCollection.docs) {
          const img = await (
            await storage().ref(`coaches/${fCoach.id}`).list()
          ).items[0].getDownloadURL();
          coachDocs.push({
            img,
            tags: fCoach.data().tags?.map((tag: string) => {
              const findCoach = tags.tags.find((sTag) => sTag.id === tag);
              return findCoach?.name;
            }) as string[],
            name: `${fCoach.data().firstname} ${fCoach.data().lastname}`,
          });
        }
        setCoachs(coachDocs);
      }
    }

    getCoachs().catch(() => {});
  }, [tags]);

  const clearSearchInput = useCallback(() => {
    setSearch('');
    setShowTags(true);
  }, []);

  const tagOnClick = useCallback((tag: string) => {
    setSearch(tag);
    setShowTags(false);
  }, []);

  const onCHange = useCallback((text: string) => {
    setSearch(text);
    setShowTags(true);
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Icon
          onPress={() => navigation.goBack()}
          color="gray"
          name="arrowleft"
          size={20}
          style={styles.leftIcon}
        />
        <TextInput
          value={search}
          onChangeText={onCHange}
          style={styles.input}
          placeholder="Search by partners or goals"
        />
        {search.length ? (
          <Icon
            onPress={clearSearchInput}
            color="gray"
            name="closecircle"
            size={20}
            style={styles.leftIcon}
          />
        ) : null}
      </View>
      {showTags &&
      tags.tags.some((tag) => tag.name.includes(search.toLocaleLowerCase())) ? (
        <>
          <Text style={styles.tagTitle}>TAGS</Text>
          <View style={styles.tagContainer}>
            {tags.tags.map((tag) => {
              if (
                search.length > 0 &&
                !tag.name.includes(search.toLocaleLowerCase())
              ) {
                return;
              }
              return (
                <Pressable
                  key={tag.id}
                  style={styles.tag}
                  onPress={() => tagOnClick(tag.name)}
                >
                  <Text style={styles.tagText}>{tag.name}</Text>
                </Pressable>
              );
            })}
          </View>
        </>
      ) : null}
      {search?.length > 0 && coachs?.length > 0 && (
        <View>
          <Text style={styles.tagTitle}>PARTNERS</Text>
          <View style={styles.coachsContainer}>
            {coachs.map((coach) => {
              if (
                coach.name?.includes(search) ||
                coach.tags?.some((tag) => tag.includes(search))
              ) {
                return (
                  <Pressable style={styles.coachItem} key={coach?.name}>
                    <Image
                      style={styles.coachImg}
                      source={{ uri: coach?.img }}
                    />
                    <Text style={styles.coachTitle}>{coach.name}</Text>
                  </Pressable>
                );
              } else {
                return null;
              }
            })}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginLeft: 10,
    width: '70%',
  },
  coachsContainer: {
    flexDirection: 'column',
    paddingLeft: 10,
  },
  coachItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  coachImg: {
    borderRadius: 10,
    height: 70,
    width: 70,
    marginRight: 10,
  },
  coachTitle: {
    fontSize: 15,
    fontWeight: '400',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
  },
  leftIcon: {
    marginLeft: 20,
  },
  tagContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagTitle: {
    marginLeft: 10,
    marginTop: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  tag: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  tagText: {
    fontSize: 10,
    color: 'blue',
  },
});
export default SearchPage;
