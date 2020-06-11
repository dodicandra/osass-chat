import {speaker} from 'assets';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {colors} from 'utils';

interface ProfileProps {
  source?: ImageSourcePropType;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  onPress?(val: any): void;
}

const Profile: React.FC<ProfileProps> = ({
  source,
  left,
  right,
  top,
  bottom,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          marginLeft: left,
          marginRight: right,
          marginTop: top,
          marginBottom: bottom,
        },
      ]}>
      <Image defaultSource={speaker} source={source} style={styles.img} />
    </TouchableOpacity>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    overflow: 'hidden',
    borderColor: colors.border.input,
    borderWidth: 2,
    backgroundColor: colors.background.white,
    height: 64,
    width: 64,
  },
  img: {height: 64, width: 64, resizeMode: 'contain'},
});
