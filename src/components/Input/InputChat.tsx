import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  GestureResponderEvent
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import { colors, Fonts } from 'utils';

interface InputChatProps {
  disabled?: boolean;
  onChangeText?: ((text: string) => void) | undefined;
  value?: string;
  onSubmit?: ((event: GestureResponderEvent) => void) | undefined;
}

const InputChat: React.FC<InputChatProps> = ({
  disabled,
  onChangeText,
  value,
  onSubmit
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        autoCompleteType="off"
        style={styles.input}
        multiline
        placeholder="Type Hire.."
        onChangeText={onChangeText}
        value={value}
      />
      <TouchableOpacity
        disabled={disabled}
        onPress={onSubmit}
        style={[
          styles.send,
          {
            backgroundColor: disabled
              ? colors.border.input
              : colors.background.yellow
          }
        ]}>
        <Icons
          name="send"
          size={25}
          color={disabled ? colors.background.white : colors.text.greey}
        />
      </TouchableOpacity>
    </View>
  );
};

InputChat.defaultProps = {
  disabled: false
};

export default InputChat;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 7
  },
  input: {
    borderWidth: 1,
    minWidth: 270,
    maxWidth: 270,
    minHeight: 50,
    borderRadius: 10,
    borderColor: colors.border.input,
    fontFamily: Fonts.Monstserrat.R,
    fontSize: 16,
    letterSpacing: 1.4,
    padding: 5,
    textDecorationLine: 'none'
  },
  send: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    paddingRight: 3
  }
});
