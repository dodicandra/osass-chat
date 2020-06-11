import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {colors, Fonts} from 'utils';
import {OnChange} from './type';

interface InputProps {
  containerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  onChangeText?(text: string): void;
  onChange?: OnChange;
}

const Input = ({
  containerStyle,
  placeholder,
  onChange,
  onChangeText,
}: InputProps) => {
  return (
    <View style={containerStyle}>
      <Text style={styles.title}>Phone</Text>
      <View style={styles.container}>
        <Text style={styles.prefix}>+62</Text>
        <TextInput
          placeholder={placeholder}
          maxLength={12}
          style={styles.input}
          onChangeText={onChangeText}
          onChange={onChange}
          keyboardType="number-pad"
        />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 7,
    borderColor: colors.border.input,
    backgroundColor: colors.background.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 30,
    flex: 1,
    fontFamily: Fonts.Monstserrat.M,
  },
  title: {
    fontSize: 14,
    color: colors.text.greey,
    fontFamily: Fonts.Monstserrat.R,
  },
  prefix: {
    fontSize: 30,
    marginLeft: 10,
    fontFamily: Fonts.Monstserrat.M,
  },
});
