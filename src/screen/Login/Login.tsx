import {firebase} from '@react-native-firebase/auth';
import {StackScreenProps} from '@react-navigation/stack';
import {IconLogin} from 'assets';
import {Button, Input} from 'components';
import React, {useRef, useState} from 'react';
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {multiply} from 'react-native-reanimated';
import {colors, Fonts, tm1, useKeyBoard} from 'utils';

const IMG_HEIGHT = 230;
const IMG_WIDTH = 230;
const DURATION = 300;

type StackProps = StackScreenProps<StackAuth, 'Login'>;

interface RegisterProps extends StackProps {}

export const Login: React.FC<RegisterProps> = ({navigation}) => {
  const height = useRef(new Animated.Value(IMG_HEIGHT)).current;
  const width = useRef(new Animated.Value(IMG_WIDTH)).current;

  const [user, setUser] = useState({email: '', password: ''});
  const disabled = user.email.length > 0 && user.password.length > 0;

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

  useKeyBoard(KeyboardShow, KeyboardHide);

  const signIn = async () => {
    try {
      if (user.email.trim() === '' && user.password.trim() === '') return;

      const auth = await firebase
        .auth()
        .signInWithEmailAndPassword(user.email?.trim(), user.password?.trim());

      if (auth?.user) {
        return;
        // navigation.replace('Register', {});
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.containerText}>
            <Text style={styles.text}>
              Selamat datang di Ossas! Temapt bercakap dengan siapapun!..
            </Text>
          </View>
          <View style={styles.containerInput}>
            <Animated.Image
              resizeMethod="scale"
              resizeMode="contain"
              style={[styles.Image, {height, width}]}
              source={IconLogin}
            />
            <Input
              containerStyle={styles.input}
              onChangeText={(value) => setUser({...user, ['email']: value})}
              title={'Email'}
              phoneCode={false}
              keyboardType="default"
            />
            <Input
              keyboardType="default"
              phoneCode={false}
              containerStyle={styles.input}
              onChangeText={(value) => setUser({...user, ['password']: value})}
              title={'Password'}
              secureTextEntry
            />
            <View style={{marginTop: 20}}>
              <Button disabled={!disabled} onPress={signIn} title="submit" />
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.register}>Belum Punya Akun? Daftar disini</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.yellow,
  },
  Image: {alignSelf: 'center', marginTop: 80},
  containerText: {
    width: 274,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  input: {width: '90%'},
  text: {fontSize: 18, fontFamily: Fonts.Monstserrat.M},
  containerInput: {
    alignItems: 'center',
    flex: 1,
  },
  register: {
    fontSize: 13,
    fontFamily: Fonts.Monstserrat.R,
    marginTop: 75,
    textAlign: 'center',
  },
});
