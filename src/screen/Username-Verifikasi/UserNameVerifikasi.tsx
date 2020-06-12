import {UserVer} from 'assets';
import {Button, Input} from 'components';
import React, {useEffect, useRef} from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {Easing, multiply, timing} from 'react-native-reanimated';
import {colors} from 'utils';

const IMG_HEIGHT = 220;
const IMG_WIDTH = 274;
const DURATION = 300;

export const UserNameVerifikasi = () => {
  const height = useRef(new Animated.Value(IMG_HEIGHT)).current;
  const width = useRef(new Animated.Value(IMG_WIDTH)).current;

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', KeyboardShow);
    Keyboard.addListener('keyboardDidHide', KeyboardHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', () => {});
      Keyboard.removeListener('keyboardDidHide', () => {});
    };
  });

  const KeyboardShow = () => {
    multiply(
      timing(height, {
        toValue: IMG_HEIGHT / 2,
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      }).start(),
      timing(width, {
        toValue: IMG_WIDTH / 2,
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      }).start(),
    );
  };
  const KeyboardHide = () => {
    multiply(
      timing(height, {
        toValue: IMG_HEIGHT,
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      }).start(),
      timing(width, {
        toValue: IMG_WIDTH,
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      }).start(),
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Animated.Image
          source={UserVer}
          style={[styles.img, {height, width}]}
        />
        <Input
          phoneCode={false}
          placeholder="user.."
          title="Username"
          containerStyle={styles.input}
          keyboardType="default"
        />
        <Button title="Lanjut" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.yellow,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  img: {
    resizeMode: 'contain',
    // height: 220,
    // width: 274,
    marginTop: 20,
  },
  input: {width: '80%', marginBottom: 50, marginTop: 30},
});
