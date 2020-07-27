import React from 'react';
import {
  GestureResponderEvent,
  ImageURISource,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { speaker } from 'assets';
import { colors, Fonts, Icons } from 'utils';

import Profile from '../Profile/Profile';

interface HeaderProps {
  imgProfile?: number | ImageURISource | ImageURISource[] | undefined;
  icon?: 'ios-arrow-back' | 'ios-menu';
  title?: string | undefined | null;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export const Header: React.FC<HeaderProps> = ({
  imgProfile,
  icon,
  title,
  onPress
}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onPress} style={{ marginLeft: 20 }}>
        <Icons.Ionicons
          name={icon === 'ios-menu' ? 'ios-menu' : 'ios-arrow-back'}
          size={40}
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
  title: ''
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.background.yellow,
    height: 83,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    fontSize: 30,
    fontFamily: Fonts.Monstserrat.R,
    width: 230,
    marginLeft: 10
  }
});
