import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, Fonts} from 'utils';

interface ButtonProps {
  title: string | undefined;
  onPress?: () => void;
  top?: number;
  bottom?: number;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  top,
  bottom,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        {
          marginTop: top,
          marginBottom: bottom,
          backgroundColor: disabled
            ? colors.background.yellow
            : colors.background.greey,
          elevation: 4,
        },
      ]}>
      <Text
        style={[
          styles.text,
          {color: disabled ? colors.background.greey : colors.text.yellow},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: 246,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
  },
  text: {
    fontSize: 36,
    fontFamily: Fonts.Monstserrat.B,
  },
});
