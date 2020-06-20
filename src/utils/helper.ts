import {EffectCallback, useEffect, useState} from 'react';
import {Keyboard, KeyboardEventName, Platform} from 'react-native';
import {getToLocal} from './asycnStorage';
import {store, setToken} from 'store';
import moment from 'moment';

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
  }, [calbackHide, callbackShow]);
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

export const getYear = moment().format('YYYY-MM-DD');
export const getTime = moment().format('hh-mm-ss A');
