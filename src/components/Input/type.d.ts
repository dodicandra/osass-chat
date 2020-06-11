import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputKeyPressEventData,
} from 'react-native';
import {TextInput} from 'react-native';

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
