import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import { colors } from 'utils';

interface Props {
  visible: boolean;
}

const Splash: React.FC<Props> = ({ visible }) => {
  return (
    <Modal visible={visible} transparent animated animationType="fade">
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.background.white} />
      </View>
    </Modal>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.yellow
  }
});
