import React, {useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import {colors, Fonts, Icons} from 'utils';

interface InputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  phoneCode?: boolean;
  title?: string;
  titlePosition?: 'top' | 'bottom';
  borderColor?: string;
  borderWidth?: number;
  onlyText?: boolean;
  name?: string | null;
  numberOfLines?: number;
  onPresText?(any: any): any;
  secureTextEntry?: boolean;
  fontSize?: number;
}

const Input: React.FC<InputProps> = ({
  containerStyle,
  phoneCode,
  title,
  titlePosition,
  borderColor,
  borderWidth,
  onlyText,
  name,
  numberOfLines,
  onPresText,
  secureTextEntry,
  fontSize,
  ...props
}) => {
  const [active, setActive] = useState(true);

  return (
    <View style={containerStyle}>
      {titlePosition === 'top' && <Text style={styles.title}>{title}</Text>}
      <View
        style={[
          styles.container,
          {borderColor: borderColor, borderWidth: borderWidth}
        ]}>
        {phoneCode && <Text style={styles.prefix}>+62</Text>}
        {onlyText ? (
          <Text
            onPress={onPresText}
            numberOfLines={numberOfLines}
            style={styles.text}>
            {name}
          </Text>
        ) : (
          <>
            <TextInput
              style={[styles.input, {fontSize}]}
              numberOfLines={1}
              secureTextEntry={secureTextEntry && active}
              {...props}
            />
            {secureTextEntry && (
              <TouchableOpacity
                onPress={() => setActive(!active)}
                style={{marginRight: 15}}>
                <Icons.Entypo
                  name={active ? 'eye' : 'eye-with-line'}
                  size={30}
                />
              </TouchableOpacity>
            )}
          </>
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
  fontSize: 30
};

export default Input;

const styles = StyleSheet.create({
  container: {
    borderRadius: 7,
    backgroundColor: colors.background.white,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    fontFamily: Fonts.Monstserrat.M,
    maxWidth: 350
  },
  text: {
    fontSize: 30,
    flex: 1,
    fontFamily: Fonts.Monstserrat.M,
    maxWidth: 350,
    paddingVertical: 10
  },
  title: {
    fontSize: 14,
    color: colors.text.greey,
    fontFamily: Fonts.Monstserrat.R
  },
  prefix: {
    fontSize: 30,
    marginLeft: 10,
    fontFamily: Fonts.Monstserrat.M
  }
});
