import {Button, InputCode} from 'components';
import React, {useRef, useState} from 'react';
import {
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colors, Fonts} from 'utils';

const VerifikasiCode = () => {
  const ref = useRef<TextInput>(null);
  const ref1 = useRef<TextInput>(null);
  const ref2 = useRef<TextInput>(null);
  const ref3 = useRef<TextInput>(null);
  const ref4 = useRef<TextInput>(null);

  const [phone, setPhone] = useState('');

  const onChangeInput = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    id: string,
  ) => {
    const teks: string = e.nativeEvent.text;
    if (teks.length > 0) {
      switch (id) {
        case '1':
          return ref1.current?.focus();
        case '2':
          return ref2.current?.focus();
        case '3':
          return ref3.current?.focus();
        case '4':
          return ref4.current?.focus();
        default:
          return;
      }
    }
  };

  const onChange = (val: string) => {
    setPhone((curen) => curen + val);
  };

  const clearInput = () => {
    ref.current?.clear();
    ref1.current?.clear();
    ref2.current?.clear();
    ref3.current?.clear();
    ref4.current?.clear();
    setPhone('');
  };
  console.log(phone);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.text}>Siahkan Masukan Code Verifikasimu..</Text>
        <View style={styles.containerInput}>
          <InputCode
            ref={ref}
            onChangeText={onChange}
            onChange={(e: any) => onChangeInput(e, '1')}
          />
          <InputCode
            onChangeText={onChange}
            ref={ref1}
            onChange={(e: any) => onChangeInput(e, '2')}
          />
          <InputCode
            onChangeText={onChange}
            ref={ref2}
            onChange={(e: any) => onChangeInput(e, '3')}
          />
          <InputCode
            onChangeText={onChange}
            ref={ref3}
            onChange={(e: any) => onChangeInput(e, '4')}
          />
          <InputCode onChangeText={onChange} ref={ref4} />
        </View>
        <TouchableOpacity onPress={clearInput}>
          <Text style={styles.clear}>Bersihkan Semua</Text>
        </TouchableOpacity>
        <Button top={40} title="Verifikasi" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VerifikasiCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: Fonts.Monstserrat.B,
    marginBottom: 50,
  },
  containerInput: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-evenly',
  },
  clear: {
    color: colors.text.greey,
    fontSize: 17,
    fontFamily: Fonts.Monstserrat.B,
    marginTop: 20,
  },
});
