import React from 'react';
import {Modal, StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {colors} from 'utils';
import Button from '../Button/Button';
import Input from '../Input/Input';

interface Props {
  visible: boolean;
  onSubmit?: () => void;
  overlayPress: () => void;
  onType?: (val: any) => void;
  value?: string;
  title?: string | undefined;
  disabled?: boolean;
}

const CustomeModal: React.FC<Props> = ({
  visible,
  onSubmit,
  overlayPress,
  onType,
  value,
  title,
  disabled,
}) => {
  return (
    <Modal visible={visible} transparent animated animationType="slide">
      <TouchableWithoutFeedback onPress={overlayPress}>
        <View style={styles.modalContainer}>
          <View style={styles.modalWraper}>
            <Input
              onChangeText={onType}
              phoneCode={false}
              title=""
              value={value}
              containerStyle={{width: '90%'}}
              keyboardType="default"
            />
            <Button disabled={disabled} onPress={onSubmit} title={title} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomeModal;

const styles = StyleSheet.create({
  modalWraper: {
    backgroundColor: colors.background.white,
    borderRadius: 8,
    height: 200,
    width: '80%',
    marginBottom: 200,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.background.treansparet,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
