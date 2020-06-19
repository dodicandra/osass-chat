import {DrawerScreenProps} from '@react-navigation/drawer';
import {Input, List} from 'components';
import React, {useEffect, useState} from 'react';
import {
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllUsers} from 'services';
import {RootState} from 'store';
import {colors} from 'utils';

type Navigation = DrawerScreenProps<DrawerStack, 'AllUsers'>;
type EventInput = NativeSyntheticEvent<TextInputChangeEventData>;

interface Props extends Navigation {}

export const AllUser: React.FC<Props> = ({navigation}) => {
  const User = useSelector((state: RootState) => state.User.users);

  const [datafilter, setDatafilter] = useState(User);

  const dispatch = useDispatch();

  const filter = (e: EventInput) => {
    e.preventDefault();
    const inputs = e.nativeEvent.text;
    const text = inputs.trim().toLowerCase();
    const data = User.filter((item) => item.name?.toLowerCase().match(text));

    setDatafilter(data);
  };

  useEffect(() => {
    navigation.addListener('focus', async () => {
      dispatch(getAllUsers());
    });
  }, [dispatch, navigation]);

  useEffect(() => {
    setDatafilter(User);
  }, [User]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Input
          fontSize={20}
          placeholder="Search by name.."
          title=""
          keyboardType="default"
          containerStyle={styles.contentStyle}
          phoneCode={false}
          onChange={filter}
        />
      </View>
      <ScrollView
        contentContainerStyle={{paddingTop: 8}}
        showsVerticalScrollIndicator={false}
        style={styles.scroll}>
        {datafilter.map((user) => (
          <List
            titlePress={() => navigation.navigate('UserVisited', user)}
            title={user.name}
            key={user.id}
            desc=""
            imgUrl={{uri: user.imgUrl}}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
  },
  searchContainer: {
    backgroundColor: colors.background.yellow,
    justifyContent: 'center',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  contentStyle: {
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: -10,
  },
  scroll: {
    flex: 1,
    marginTop: -7,
    backgroundColor: colors.background.white,
    zIndex: -99,
    marginHorizontal: 15,
  },
});
