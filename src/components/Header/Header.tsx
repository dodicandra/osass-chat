/* eslint-disable react-native/no-inline-styles */
import {speaker} from 'assets';
import {Profile} from 'components';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icons from 'react-native-vector-icons/Entypo';
import {colors} from 'utils';

export const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={{marginLeft: 20}}>
        <Icons name="menu" size={60} color={colors.background.white} />
      </TouchableOpacity>
      <Profile right={20} source={speaker} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.background.yellow,
    height: 83,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
