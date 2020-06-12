import {ImageSourcePropType, ImageURISource} from 'react-native';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputKeyPressEventData,
} from 'react-native';
import {TextInput} from 'react-native';

type ImgType =
  | number
  | ImageURISource
  | ImageURISource[]
  | undefined
  | ImageSourcePropType;

type OnChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;

type OnKeyPress =
  | ((e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void)
  | undefined;

type RefInput =
  | string
  | ((instance: TextInput | null) => void)
  | React.RefObject<TextInput>
  | null
  | undefined;

type KybType =
  | 'number-pad'
  | 'default'
  | 'email-address'
  | 'numeric'
  | 'phone-pad'
  | 'decimal-pad'
  | 'visible-password'
  | 'ascii-capable'
  | 'numbers-and-punctuation'
  | 'url'
  | 'name-phone-pad'
  | 'twitter'
  | 'web-search'
  | undefined;

type TestType = number;
