import {speaker} from 'assets';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from 'utils';
import {ImgType} from 'components/type';

interface ProfileProps {
  source?: ImgType | any;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  onPress?(val: any): void;
  size?: number;
}

const Profile: React.FC<ProfileProps> = ({
  source,
  left,
  right,
  top,
  bottom,
  onPress,
  size,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={[
        styles.container,
        {
          marginLeft: left,
          marginRight: right,
          marginTop: top,
          marginBottom: bottom,
          height: size,
          width: size,
        },
      ]}>
      <Image
        defaultSource={speaker}
        source={source}
        style={[styles.img, {height: size, width: size}]}
      />
    </TouchableOpacity>
  );
};

Profile.defaultProps = {
  size: 64,
  source: speaker,
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    overflow: 'hidden',
    borderColor: colors.border.input,
    borderWidth: 1,
    backgroundColor: colors.background.white,
  },
  img: {resizeMode: 'contain'},
});
