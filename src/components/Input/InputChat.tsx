import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import {colors, Fonts} from 'utils';

interface InputChatProps {
  disabled?: boolean;
}

const InputChat: React.FC<InputChatProps> = ({disabled}) => {
  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        autoCompleteType="off"
        style={styles.input}
        multiline
        placeholder="Type Hire.."
      />
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.send,
          {
            backgroundColor: disabled
              ? colors.border.input
              : colors.background.yellow,
          },
        ]}>
        <Icons
          name="send"
          size={33}
          color={disabled ? colors.background.white : colors.text.black}
        />
      </TouchableOpacity>
    </View>
  );
};

InputChat.defaultProps = {
  disabled: false,
};

export default InputChat;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    marginTop: 7,
  },
  input: {
    borderWidth: 1,
    width: 317,
    borderRadius: 10,
    borderColor: colors.border.input,
    fontFamily: Fonts.Monstserrat.R,
    fontSize: 16,
    letterSpacing: 1.4,
    padding: 10,
  },
  send: {
    width: 52,
    height: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
