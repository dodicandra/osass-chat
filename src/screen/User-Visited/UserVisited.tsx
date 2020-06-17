import {Input} from 'components';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
} from 'react-native';
import {colors, Fonts, Icons} from 'utils';
import {speaker} from 'assets';
import {StackScreenProps} from '@react-navigation/stack';

type UserProps = StackScreenProps<StackMainApp, 'Home'>;

export const UserVisited: React.FC<UserProps> = ({navigation}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <ImageBackground
        source={speaker}
        resizeMode="contain"
        style={styles.profileContainer}>
        <Text style={styles.userTitle}>dodi candra</Text>
      </ImageBackground>
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat')}
        importantForAccessibility="yes"
        style={styles.btnIcon}>
        <Icons.Entypo name="chat" size={40} color={colors.text.greey} />
      </TouchableOpacity>
      <View style={{flex: 1, paddingTop: 50}}>
        <Text style={styles.textAkun}>Info</Text>
        <Input
          title="username"
          titlePosition="bottom"
          keyboardType="default"
          containerStyle={styles.username}
          phoneCode={false}
          onlyText
          name="Dodi candra"
          borderWidth={0}
          numberOfLines={1}
          onPresText={() => Alert.alert('Haloo')}
        />
        <Input
          title="Bio"
          titlePosition="top"
          keyboardType="default"
          containerStyle={styles.username}
          phoneCode={false}
          borderWidth={0}
          editable={false}
          onlyText
          name="Aku ingin menjadi sesuatu yang..."
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  userTitle: {
    fontSize: 30,
    fontFamily: Fonts.Monstserrat.M,
    position: 'absolute',
    bottom: 55,
    left: 20,
    color: colors.background.white,
    textShadowColor: 'black',
    textShadowRadius: 3,
  },
  title: {
    fontSize: 30,
    fontFamily: Fonts.Monstserrat.M,
    marginBottom: 20,
    marginLeft: 16,
  },
  profileContainer: {
    height: 270,
    backgroundColor: 'black',
    elevation: 6,
    position: 'relative',
  },
  wraper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnIcon: {
    height: 73,
    width: 73,
    backgroundColor: colors.background.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 73 / 2,
    position: 'absolute',
    top: 233,
    right: 20,
    elevation: 6,
  },
  textAkun: {
    fontSize: 24,
    fontFamily: Fonts.Monstserrat.M,
    marginLeft: 30,
    marginBottom: 20,
  },
  username: {
    marginHorizontal: 30,
    marginBottom: 20,
    borderBottomColor: colors.border.input,
    borderBottomWidth: 2,
  },
});
