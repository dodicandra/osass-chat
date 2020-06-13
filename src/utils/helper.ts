/* eslint-disable react-hooks/exhaustive-deps */
import {EffectCallback, useEffect, useState} from 'react';
import {Keyboard, KeyboardEventName, Platform} from 'react-native';

export const useKeyBoard = (
  callbackShow: EffectCallback,
  calbackHide: EffectCallback,
) => {
  useEffect(() => {
    let Show: KeyboardEventName;
    let Hide: KeyboardEventName;
    Hide = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
    Show = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';

    Keyboard.addListener(Show, callbackShow);
    Keyboard.addListener(Hide, calbackHide);

    return () => {
      Keyboard.removeListener(Hide, () => {});
      Keyboard.removeListener(Show, () => {});
    };
  }, []);
};

export function useForm(initialState = {}) {
  const [state, setState] = useState(initialState);

  const handleChange: any = (val: string, key: string) => {
    setState({...state, [val]: key});
  };

  return [state, handleChange];
}
