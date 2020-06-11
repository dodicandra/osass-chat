import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, Fonts} from 'utils';

interface ButtonProps {
  title: string;
  onPress?(): void;
  top?: number;
  bottom?: number;
}

const Button = ({title, onPress, top, bottom}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {marginTop: top, marginBottom: bottom}]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.greey,
    width: 246,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
  },
  text: {
    fontSize: 36,
    color: colors.text.yellow,
    fontFamily: Fonts.Monstserrat.B,
  },
});
