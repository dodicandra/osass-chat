import {IconLogin} from 'assets';
import {Button, Input} from 'components';
import React from 'react';
import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import {colors, Fonts} from 'utils';

export const Login = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.flex1}>
          <View style={styles.containerText}>
            <Text style={styles.text}>
              Selamat datang di Ossas! Temapt bercakap dengan siapapun!..
            </Text>
          </View>
          <View style={styles.containerInput}>
            <Image
              resizeMode="contain"
              style={styles.Image}
              source={IconLogin}
            />
            <Input containerStyle={styles.input} placeholder="8xx..." />
            <Button onPress={() => Alert.alert('Halloo')} title="submit" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.yellow,
  },
  Image: {width: 250, height: 250, alignSelf: 'center'},
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
