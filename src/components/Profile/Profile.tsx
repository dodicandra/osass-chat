import {speaker, UserDefault} from 'assets';
import React from 'react';
import {ActivityIndicator, Image, ImageSourcePropType, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from 'utils';

interface ProfileProps {
  source: ImageSourcePropType;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  onPress?: (val: any) => void;
  size?: number;
  loading?: boolean;
}

const Profile: React.FC<ProfileProps> = ({source, left, right, top, bottom, onPress, size, loading}) => {
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
          width: size
        }
      ]}>
      <Image defaultSource={speaker} source={source} style={[styles.img, {height: size, width: size}]} />
      {loading && (
        <ActivityIndicator size="large" color={colors.background.yellow} style={{position: 'absolute'}} />
      )}
    </TouchableOpacity>
  );
};

Profile.defaultProps = {
  size: 64,
  source: UserDefault,
  loading: false
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    overflow: 'hidden',
    borderColor: colors.border.input,
    borderWidth: 1,
    backgroundColor: colors.background.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {resizeMode: 'contain'}
});
