import { View } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Text,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Share,
} from 'react-native';
import { RootState, useAppSelector } from '../../../../redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CoachNavigatorParamsList } from '../../../../navigation/types';

const CoachSupport = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<CoachNavigatorParamsList, 'Support'>;
}) => {
  const coach = useAppSelector((state: RootState) => state.coach);
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.tab}>
        <Icon
          onPress={() => navigation.goBack()}
          color="gray"
          name="arrowleft"
          size={20}
        />
        <Text style={styles.headerTitle}>Support Me</Text>
        <View />
      </View>
      <View style={styles.imgContainer}>
        <Image source={{ uri: coach.img }} style={styles.img} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Sharing appreciated &#128588;</Text>
        <Text style={styles.subtitle}>
          Subscriptions financially support my content creation.
        </Text>
        <Pressable
          style={styles.button}
          onPress={() =>
            Share.share({ message: `Try my new coach: ${coach.firstname}` })
          }
        >
          <Icon color="white" name="upload" />
          <Text style={styles.buttonText}>Share with Friends</Text>
        </Pressable>
        <Text>Thanks for the support!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignContent: 'center',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  tab: {
    paddingTop: 10,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  contentContainer: {
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitle: {
    width: '60%',
    textAlign: 'center',
  },
  imgContainer: {
    width: '100%',
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 15,
  },
  button: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    width: '45%',
    backgroundColor: '#EE3E79',
    borderRadius: 10,
    color: 'white',
    height: 30,
    justifyContent: 'center',
    textAlign: 'center',
    marginVertical: 15,
  },
  buttonText: {
    marginLeft: 7,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 150,
  },
});

export default CoachSupport;
