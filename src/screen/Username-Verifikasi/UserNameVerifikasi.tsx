import {UserVer} from 'assets';
import {Button, Input} from 'components';
import React, {useRef} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Animated, {multiply} from 'react-native-reanimated';
import {colors, Fonts, tm1, useForm, useKeyBoard, fire} from 'utils';

const IMG_HEIGHT = 220;
const IMG_WIDTH = 274;
const DURATION = 300;

export const UserNameVerifikasi = () => {
  const height = useRef(new Animated.Value(IMG_HEIGHT)).current;
  const width = useRef(new Animated.Value(IMG_WIDTH)).current;

  const [form, onChange] = useForm({name: ''});

  const KeyboardShow = () => {
    multiply(
      tm1(height, IMG_HEIGHT / 2, DURATION),
      tm1(width, IMG_WIDTH / 2, DURATION)
    );
  };
  const KeyboardHide = () => {
    multiply(
      tm1(height, IMG_HEIGHT, DURATION),
      tm1(width, IMG_WIDTH, DURATION)
    );
  };

  useKeyBoard(KeyboardShow, KeyboardHide);

  const changeDisplayName = async () => {
    const user = await fire.auth().currentUser;

    const token = await user?.getIdTokenResult(true).then((t) => t);

    const curenUser = user
      ?.updateProfile({displayName: form.name})
      .then((res) => res);

    Promise.all([user, token, curenUser]).then((res) => console.log(res));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.text}>Buat User Name Kamu..</Text>
        <Animated.Image
          source={UserVer}
          style={[styles.img, {height, width}]}
        />
        <Input
          phoneCode={false}
          title="Username"
          containerStyle={styles.input}
          keyboardType="default"
          value={form.name}
          onChangeText={(val) => onChange('name', val)}
        />
        <Button onPress={changeDisplayName} title="Lanjut" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.yellow,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  img: {
    resizeMode: 'contain',
    marginTop: 20
  },
  input: {width: '80%', marginBottom: 50, marginTop: 30},
  text: {
    fontSize: 23,
    fontFamily: Fonts.Monstserrat.M,
    marginTop: 20,
    marginLeft: 20,
    alignSelf: 'flex-start'
  }
});
