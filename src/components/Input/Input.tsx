import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import {colors, Fonts} from 'utils';

interface InputProps {
  containerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onChange?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
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
