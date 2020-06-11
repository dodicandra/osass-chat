import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import {speaker} from 'assets';
import {Fonts, colors} from 'utils';
import Profile from '../Profile/Profile';

interface InputProps {
  title?: string;
  desc?: string;
  imgUrl?: ImageSourcePropType;
}

const List: React.FC<InputProps> = ({title, desc, imgUrl}) => {
  return (
    <View style={styles.container}>
      <Profile source={imgUrl} />
      <TouchableOpacity style={styles.containerText}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={1} style={styles.desc}>
          {desc}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

List.defaultProps = {
  title: 'Dodi candra',
  desc: 'Haloo selamat malam bisa bicara dengan dodi candra',
  imgUrl: speaker,
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.Monstserrat.M,
    color: colors.text.black,
    maxWidth: 300,
  },
  desc: {
    fontSize: 19,
    fontFamily: Fonts.Monstserrat.R,
    color: colors.text.greey,
    marginBottom: 20,
    maxWidth: 200,
  },
  containerText: {
    marginLeft: 13,
    borderBottomWidth: 1,
    flex: 1,
    borderBottomColor: colors.border.input,
  },
});
