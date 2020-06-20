import React from 'react';
import {ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {colors, Fonts} from 'utils';
import Profile from '../Profile/Profile';
import moment from 'moment';

interface BubleChatProps {
  sender?: boolean | string;
  content?: string | number | undefined;
  imgLeft?: ImageSourcePropType;
  time?: string | number | undefined | null;
}

const BubleChat: React.FC<BubleChatProps> = ({
  sender,
  content,
  imgLeft,
  time,
}) => {
  return !sender ? (
    <View style={styles.wraper}>
      <Profile source={imgLeft} right={10} size={40} />
      <View>
        <View style={styles.container}>
          <Text lineBreakMode="head" selectable style={styles.content}>
            {content}
          </Text>
        </View>
        <Text style={styles.time}>{moment(time).format('LT')}</Text>
      </View>
    </View>
  ) : (
    <View style={styles.wraperSender}>
      <View>
        <View style={styles.containerSender}>
          <Text lineBreakMode="head" selectable style={styles.content}>
            {content}
          </Text>
        </View>
        <Text style={styles.timeSender}>{moment(time).format('LT')}</Text>
      </View>
    </View>
  );
};

BubleChat.defaultProps = {
  sender: false,
  content:
    'haloo selamat menikmati chattingmu.. saya disini akan menemanimu sampai kamu nagantuk',
};

export default BubleChat;

const styles = StyleSheet.create({
  wraper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  wraperSender: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  containerSender: {
    backgroundColor: colors.background.greey,
    maxWidth: 230,
    borderRadius: 12,
    borderBottomRightRadius: 0,
  },
  container: {
    backgroundColor: colors.background.yellow,
    maxWidth: 230,
    borderRadius: 12,
    borderBottomLeftRadius: 0,
  },
  content: {
    fontSize: 12,
    fontFamily: Fonts.Monstserrat.R,
    padding: 15,
    letterSpacing: 0.5,
    textAlign: 'left',
    color: colors.text.black,
  },
  time: {
    fontSize: 10,
    fontFamily: Fonts.Monstserrat.R,
    color: colors.text.black,
    marginTop: 8,
  },
  timeSender: {
    fontSize: 10,
    fontFamily: Fonts.Monstserrat.R,
    color: colors.text.black,
    marginTop: 8,
    textAlign: 'right',
  },
});
