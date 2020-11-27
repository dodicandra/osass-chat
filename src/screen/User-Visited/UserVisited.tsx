import {StackScreenProps} from '@react-navigation/stack';
import {Input} from 'components';
import React from 'react';
import {ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {UsersDataTypes} from 'store';
import {colors, Fonts, Icons} from 'utils';

type UserProps = StackScreenProps<StackMainApp<UsersDataTypes>, 'UserVisited'>;

export const UserVisited: React.FC<UserProps> = ({navigation, route}) => {
  const data = route.params;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <ImageBackground source={{uri: data?.imgUrl}} resizeMode="contain" style={styles.profileContainer}>
        <Text style={styles.userTitle}>{data?.name}</Text>
      </ImageBackground>
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat', data)}
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
          name={data?.name}
          borderWidth={0}
          numberOfLines={1}
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
          name={data?.bio}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  userTitle: {
    fontSize: 30,
    fontFamily: Fonts.Monstserrat.M,
    position: 'absolute',
    bottom: 55,
    left: 20,
    color: colors.background.white,
    textShadowColor: 'black',
    textShadowRadius: 3
  },
  title: {
    fontSize: 30,
    fontFamily: Fonts.Monstserrat.M,
    marginBottom: 20,
    marginLeft: 16
  },
  profileContainer: {
    height: 270,
    backgroundColor: 'black',
    elevation: 6,
    position: 'relative'
  },
  wraper: {
    flexDirection: 'row',
    alignItems: 'center'
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
    elevation: 6
  },
  textAkun: {
    fontSize: 24,
    fontFamily: Fonts.Monstserrat.M,
    marginLeft: 30,
    marginBottom: 20
  },
  username: {
    marginHorizontal: 30,
    marginBottom: 20,
    borderBottomColor: colors.border.input,
    borderBottomWidth: 2
  }
});
