/* eslint-disable react-hooks/exhaustive-deps */
import {UserVer} from 'assets';
import {Button, Input} from 'components';
import React, {useEffect, useRef} from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  KeyboardEventName,
} from 'react-native';
import Animated, {multiply} from 'react-native-reanimated';
import {colors, tm1} from 'utils';

const IMG_HEIGHT = 220;
const IMG_WIDTH = 274;
const DURATION = 300;

export const UserNameVerifikasi = () => {
  const height = useRef(new Animated.Value(IMG_HEIGHT)).current;
  const width = useRef(new Animated.Value(IMG_WIDTH)).current;

  useEffect(() => {
    let Show: KeyboardEventName;
    let Hide: KeyboardEventName;

    Hide = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

    Show = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';

    Keyboard.addListener(Show, KeyboardShow);
    Keyboard.addListener(Hide, KeyboardHide);

    return () => {
      Keyboard.removeListener(Show, () => {});
      Keyboard.removeListener(Hide, () => {});
    };
  }, []);

  const KeyboardShow = () => {
    multiply(
      tm1(height, IMG_HEIGHT / 2, DURATION),
      tm1(width, IMG_WIDTH / 2, DURATION),
    );
  };
  const KeyboardHide = () => {
    multiply(
      tm1(height, IMG_HEIGHT, DURATION),
      tm1(width, IMG_WIDTH, DURATION),
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
    marginTop: 20,
  },
  input: {width: '80%', marginBottom: 50, marginTop: 30},
});
