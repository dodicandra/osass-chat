import {EffectCallback, useEffect, useState} from 'react';
import {Keyboard, KeyboardEventName, Platform} from 'react-native';
import {setToken, store} from 'store';
import {getToLocal} from './asycnStorage';
import firebase from 'react-native-firebase';

const dispatch = store.dispatch;

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

export function useForm<State extends Record<string, object | string>>(
  initialState: State,
) {
  const [state, setState] = useState<State>(initialState);

  const handleChange = (key: keyof State, val: string): any => {
    setState({...state, [key]: val});
  };

  return [state, handleChange] as const;
}

export const useAuth = () => {
  useEffect(() => {
    (async () => {
      try {
        const token = await getToLocal('token');
        dispatch(setToken(token));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
};

export const findMsg = (err: {message: ''}): string => {
  const msg: string[] = err.message.split(/[^0-9a-zA-Z ]/g);
  let errMsg = msg.filter((t) => t !== '' && t !== ' ');
  return errMsg[errMsg.length - 1];
};

export const fire = firebase;
