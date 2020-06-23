import Animated, {Easing, timing} from 'react-native-reanimated';

export const tm1 = (
  val: Animated.Value<number>,
  toValue: number,
  duration: number
): any => {
  timing(val, {
    toValue: toValue,
    duration: duration,
    easing: Easing.inOut(Easing.ease)
  }).start();
};
