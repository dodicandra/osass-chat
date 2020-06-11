import {ImageSourcePropType, ImageURISource} from 'react-native';
type ImgType =
  | number
  | ImageURISource
  | ImageURISource[]
  | undefined
  | ImageSourcePropType;
