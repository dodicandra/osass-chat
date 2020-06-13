/* eslint-disable react-hooks/exhaustive-deps */
import {StackScreenProps} from '@react-navigation/stack';
import {IconLogin} from 'assets';
import {Button, Input} from 'components';
import React, {useEffect, useRef} from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  KeyboardEventName,
} from 'react-native';
import Animated, {multiply} from 'react-native-reanimated';
import {colors, Fonts, tm1} from 'utils';

const IMG_HEIGHT = 250;
const IMG_WIDTH = 250;
const DURATION = 300;

type StackProps = StackScreenProps<StackAuth, 'Register'>;

interface RegisterProps extends StackProps {}

export const Register: React.FC<RegisterProps> = ({navigation}) => {
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
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.flex1}>
          <View style={styles.containerText}>
            <Text style={styles.text}>
              Selamat datang di Ossas! Temapt bercakap dengan siapapun!..
            </Text>
          </View>
          <View style={styles.containerInput}>
            <Animated.Image
              resizeMode="contain"
              style={[styles.Image, {height, width}]}
              source={IconLogin}
            />
            <Input
              maxLength={12}
              containerStyle={styles.input}
              placeholder="8xx..."
            />
            <Button
              onPress={() => navigation.navigate('VerifikasiCode')}
              title="submit"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.yellow,
  },
  Image: {alignSelf: 'center'},
  containerText: {width: 274, marginTop: 20, marginLeft: 20},
  input: {width: '90%', marginBottom: 30},
  text: {fontSize: 18, fontFamily: Fonts.Monstserrat.M},
  containerInput: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  flex1: {
    flex: 1,
  },
});
