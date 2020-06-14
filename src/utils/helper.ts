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

export function useForm<State>(initialState: State) {
  const [state, setState] = useState<State>(initialState);

  const handleChange = <T extends keyof State>(key: T, val: string): any => {
    setState({...state, [key]: val});
  };

  return [state, handleChange] as const;
}
