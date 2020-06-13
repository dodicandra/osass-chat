import {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {StackScreenProps} from '@react-navigation/stack';
import {RegisterIntro} from 'assets';
import {Button, Input} from 'components';
import React from 'react';
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colors, Fonts, useForm} from 'utils';

type StackProps = StackScreenProps<StackAuth, 'Register'>;
interface FromData {
  email: string;
  username: string;
  password: string;
}

interface RegisterProps extends StackProps {}

export const Register: React.FC<RegisterProps> = () => {
  const [form, handleChange] = useForm({
    email: '',
    username: '',
    password: '',
  });

  const disabled =
    form.email.length > 0 &&
    form.username.length > 0 &&
    form.password.length > 0;

  const handleSubmit = async () => {
    console.log(form);
    try {
      const register = await firebase
        .auth()
        .createUserWithEmailAndPassword(
          form.email.trim(),
          form.password.trim(),
        );
      if (register.user) {
        console.log(register.user);
        const dbref = await database().ref();
        const respon = await dbref
          .child(`user/${register.user.uid}`)
          .set({name: form.username});
        console.log(respon);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        resizeMode="contain"
        style={styles.container}
        source={RegisterIntro}>
        <Text style={styles.text}>Yuuk Mendaftar di Ossas.</Text>
        <Input
          keyboardType="default"
          containerStyle={styles.input}
          phoneCode={false}
          title="Email"
          onChangeText={(val) => handleChange('email', val)}
        />
        <Input
          keyboardType="default"
          containerStyle={styles.input}
          phoneCode={false}
          title="Username"
          onChangeText={(val) => handleChange('username', val)}
        />
        <Input
          containerStyle={styles.input}
          phoneCode={false}
          title="Password"
          secureTextEntry
          keyboardType="default"
          onChangeText={(val) => handleChange('password', val)}
        />
        <View style={styles.btnWraper}>
          <Button
            disabled={!disabled}
            onPress={handleSubmit}
            title="register"
          />
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.background.yellow,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: Fonts.Monstserrat.M,
    position: 'absolute',
    top: 34,
    left: 30,
  },
  input: {marginHorizontal: 20, marginVertical: 5},
  btnWraper: {alignSelf: 'center', marginTop: 30, marginVertical: 5},
});
