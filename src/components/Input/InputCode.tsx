import React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
  TextInputKeyPressEventData,
} from 'react-native';
import {colors, Fonts} from 'utils';

interface InputProps {
  onChangeText?: (e: any) => void;
  autoFocus?: boolean;
  onChange?:
    | ((e: NativeSyntheticEvent<TextInputChangeEventData>) => void | undefined)
    | any;
  value?: string;
  onKeyPress?:
    | ((e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void)
    | undefined;
}

const InputCode = React.forwardRef(
  (
    {onChangeText, value, onChange, onKeyPress}: InputProps,
    ref:
      | string
      | ((instance: TextInput | null) => void)
      | React.RefObject<TextInput>
      | null
      | undefined,
  ) => {
    return (
      <View style={styles.containerRoot}>
        <View style={styles.container}>
          <TextInput
            onChangeText={onChangeText}
            maxLength={1}
            style={styles.input}
            keyboardType="phone-pad"
            ref={ref}
            value={value}
            returnKeyType="next"
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
        </View>
      </View>
    );
  },
);

export default InputCode;

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: colors.border.input,
    backgroundColor: colors.background.white,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 35,
    fontFamily: Fonts.Monstserrat.M,
    width: '100%',
    textAlign: 'center',
  },
  containerRoot: {
    justifyContent: 'space-evenly',
  },
});
