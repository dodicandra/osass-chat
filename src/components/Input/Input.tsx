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
import {OnChange, KybType} from './type';

interface InputProps {
  containerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  onChangeText?(text: string): void;
  onChange?: OnChange;
  phoneCode?: boolean;
  title?: string;
  keyboardType?: KybType;
  titlePosition?: 'top' | 'bottom';
  borderColor?: string;
  borderWidth?: number;
  maxLength?: number;
  editable?: boolean;
  value?: string;
  onlyText?: boolean;
  name?: string;
  numberOfLines?: number;
}

const Input: React.FC<InputProps> = ({
  containerStyle,
  placeholder,
  onChange,
  onChangeText,
  phoneCode,
  title,
  keyboardType,
  titlePosition,
  borderColor,
  borderWidth,
  maxLength,
  editable,
  value,
  onlyText,
  name,
  numberOfLines,
}) => {
  return (
    <View style={containerStyle}>
      {titlePosition === 'top' && <Text style={styles.title}>{title}</Text>}
      <View
        style={[
          styles.container,
          {borderColor: borderColor, borderWidth: borderWidth},
        ]}>
        {phoneCode && <Text style={styles.prefix}>+62</Text>}
        {onlyText ? (
          <Text numberOfLines={numberOfLines} style={styles.text}>
            {name}
          </Text>
        ) : (
          <TextInput
            placeholder={placeholder}
            maxLength={maxLength}
            style={styles.input}
            onChangeText={onChangeText}
            onChange={onChange}
            keyboardType={keyboardType}
            editable={editable}
            value={value}
            numberOfLines={1}
          />
        )}
      </View>
      {titlePosition === 'bottom' && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

Input.defaultProps = {
  title: 'Phone',
  keyboardType: 'phone-pad',
  titlePosition: 'top',
  phoneCode: true,
  borderColor: colors.border.input,
  borderWidth: 2,
};

export default Input;

const styles = StyleSheet.create({
  container: {
    borderRadius: 7,
    backgroundColor: colors.background.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 30,
    flex: 1,
    fontFamily: Fonts.Monstserrat.M,
    maxWidth: 350,
  },
  text: {
    fontSize: 30,
    flex: 1,
    fontFamily: Fonts.Monstserrat.M,
    maxWidth: 350,
    paddingVertical: 10,
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
