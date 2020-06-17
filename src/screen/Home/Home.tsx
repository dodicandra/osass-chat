import {DrawerScreenProps} from '@react-navigation/drawer';
import {StackScreenProps} from '@react-navigation/stack';
import {Header, List} from 'components';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {colors} from 'utils';

type MainStackApp = StackScreenProps<StackMainApp, 'Home'>;
type Drawer = DrawerScreenProps<DrawerStack>;

type HomeProps = MainStackApp & Drawer;

export const Home: React.FC<HomeProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header onPress={() => navigation.openDrawer()} title="Ossas" />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        style={styles.bodyContainer}>
        <List
          profilePress={() => navigation.navigate('UserVisited')}
          titlePress={() => navigation.navigate('Chat')}
        />
        <List />
        <List />
        <List />
        <List />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
  },
  bodyContainer: {
    flex: 1,
    zIndex: -1,
    marginHorizontal: 8,
    marginTop: -10,
    backgroundColor: colors.background.white,
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});
