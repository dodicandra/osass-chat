import {UserDefault} from 'assets';
import React from 'react';
import {
  GestureResponderEvent,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {colors, Fonts} from 'utils';
import moment from 'moment';
import Profile from '../Profile/Profile';

interface InputProps {
  title?: string | null | undefined;
  desc?: string;
  imgUrl?: ImageSourcePropType | undefined | any;
  profilePress?: ((event: GestureResponderEvent) => void) | undefined;
  titlePress?: ((event: GestureResponderEvent) => void) | undefined;
  time?: string;
}

const List: React.FC<InputProps> = ({
  title,
  desc,
  imgUrl,
  profilePress,
  titlePress,
  time
}) => {
  return (
    <View style={styles.container}>
      <Profile onPress={profilePress} source={imgUrl} />
      <TouchableOpacity onPress={titlePress} style={styles.containerText}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={1} style={styles.desc}>
          {desc}
        </Text>
        {time && (
          <Text numberOfLines={1} style={styles.time}>
            {moment(time).fromNow(true)}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

List.defaultProps = {
  title: 'Dodi candra',
  desc: 'Haloo selamat malam bisa bicara dengan dodi candra',
  imgUrl: UserDefault
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.Monstserrat.M,
    color: colors.text.black,
    maxWidth: 300
  },
  desc: {
    fontSize: 19,
    fontFamily: Fonts.Monstserrat.R,
    color: colors.text.greey,
    marginBottom: 20,
    maxWidth: 200
  },
  containerText: {
    marginLeft: 13,
    borderBottomWidth: 1,
    flex: 1,
    borderBottomColor: colors.border.input
  },
  time: {
    position: 'absolute',
    right: 10,
    fontSize: 10,
    fontFamily: Fonts.Monstserrat.R,
    maxWidth: 50
  }
});
