import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CoachNavigatorParamsList } from '../../../../navigation/types';
import { RootState } from '../../../../redux';

type HeaderProps = {
  navigation: NativeStackNavigationProp<CoachNavigatorParamsList, 'TabScreen'>;
};

const Header = ({ navigation }: HeaderProps) => {
  const coach = useSelector((state: RootState) => state.coach);
  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.tab}>
        <Icon
          onPress={() => navigation.goBack()}
          color="gray"
          name="arrowleft"
          size={20}
          style={styles.leftIcon}
        />
        <Text style={styles.title}>
          {coach.firstname} {coach.lastname}
        </Text>
        <Icon name="staro" color="gray" size={20} style={styles.rightIcon} />
      </View>
      <View style={styles.headerSection}>
        <TouchableOpacity style={styles.headerIconContainer}>
          <View style={styles.headerIcon}>
            <IconFeather name="mail" color={'rgb(235, 64, 52)'} size={20} />
          </View>
          <Text style={styles.headerText}>Message</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: coach.img }}
          style={styles.profilPicture}
          resizeMode="cover"
          resizeMethod="scale"
        />
        <TouchableOpacity style={styles.headerIconContainer}>
          <View style={styles.headerIcon}>
            <Icon name="hearto" color={'rgb(235, 64, 52)'} size={20} />
          </View>
          <Text style={styles.headerText}>Support Me</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  tab: {
    paddingTop: 10,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  leftIcon: {
    marginLeft: 20,
  },
  rightIcon: {
    marginRight: 20,
  },
  header: {
    height: 200,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  headerSection: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 45,
    height: 100,
    justifyContent: 'space-around',
  },
  profilPicture: {
    height: 70,
    width: 70,
    borderRadius: 50,
    top: -10,
  },
  headerIconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerIcon: {
    height: 50,
    width: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff2f5',
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'grey',
  },
});

export default Header;
