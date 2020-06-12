import {Profile, Input} from 'components';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {colors, Fonts} from 'utils';

export const UserProfile = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.wraper}>
          <Profile left={17} size={95} />
          <Text style={styles.title}>Dodi candra</Text>
        </View>
        <TouchableOpacity
          importantForAccessibility="yes"
          style={styles.btnIcon}>
          <Icons name="camera-retro" size={40} color={colors.text.greey} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, paddingTop: 50}}>
        <Text style={styles.textAkun}>Akun</Text>
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
  title: {
    fontSize: 30,
    fontFamily: Fonts.Monstserrat.M,
    marginBottom: 20,
    marginLeft: 16,
  },
  profileContainer: {
    height: 200,
    backgroundColor: colors.background.yellow,
    justifyContent: 'center',
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
    backgroundColor: colors.background.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 73 / 2,
    borderWidth: 2,
    borderColor: colors.background.yellow,
    position: 'absolute',
    bottom: -30,
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
