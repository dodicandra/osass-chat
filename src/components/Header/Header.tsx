/* eslint-disable react-native/no-inline-styles */
import {speaker} from 'assets';
import Profile from '../Profile/Profile';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ImageSourcePropType,
  Text,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {colors, Fonts} from 'utils';

interface HeaderProps {
  imgProfile?: ImageSourcePropType;
  icon?: 'ios-arrow-back' | 'ios-menu';
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({imgProfile, icon, title}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={{marginLeft: 20}}>
        <Icons
          name={icon === 'ios-menu' ? 'ios-menu' : 'ios-arrow-back'}
          size={60}
          color={colors.background.white}
        />
      </TouchableOpacity>
      <Text
        textBreakStrategy="highQuality"
        numberOfLines={1}
        style={styles.title}>
        {title}
      </Text>
      <Profile right={20} source={imgProfile} />
    </View>
  );
};

Header.defaultProps = {
  imgProfile: speaker,
  icon: 'ios-menu',
  title: '',
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.background.yellow,
    height: 83,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 30,
    fontFamily: Fonts.Monstserrat.R,
    width: 260,
    marginLeft: 10,
  },
});
