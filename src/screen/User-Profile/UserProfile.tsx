import {Input, Profile} from 'components';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePick from 'react-native-image-picker';
import {uploadImageUser} from 'services';
import {colors, Fonts, Icons} from 'utils';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store';

export interface ImageTypes {
  uri?: string;
  filename?: string;
  path?: string;
}

export const UserProfile = () => {
  const User = useSelector((state: RootState) => state.User);
  const dispatch = useDispatch();

  const [image, setImage] = useState<ImageTypes>({
    uri: '',
    filename: '',
    path: '',
  });

  const upload = async () => {
    ImagePick.launchImageLibrary(
      {quality: 1, mediaType: 'photo', allowsEditing: true},
      async (res) => {
        if (!res.didCancel) {
          const src: ImageTypes = {
            uri: res.uri,
            filename: res.fileName,
            path: res.path,
          };
          setImage(src);
        }
      },
    );
  };

  const uploadFoto = async () => {
    try {
      await dispatch(
        uploadImageUser({
          uri: image.uri,
          filename: image.filename,
        }),
      );

      setImage({...image, uri: ''});
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log(image.uri);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.wraper}>
          <Profile source={{uri: User.user?.imgUrl}} left={17} size={95} />
          <Text style={styles.title}>Dodi candra</Text>
        </View>
        {image.uri!.length > 0 ? (
          <TouchableOpacity onPress={uploadFoto} style={styles.upload}>
            <Text style={styles.textUpload}>Upload</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <TouchableOpacity
        onPress={upload}
        importantForAccessibility="yes"
        style={styles.btnIcon}>
        <Icons.FontAwesome5
          name="camera-retro"
          size={40}
          color={colors.text.greey}
        />
      </TouchableOpacity>
      <View style={{flex: 1, paddingTop: 50}}>
        <Text style={styles.textAkun}>Akun</Text>
        <Input
          title="username"
          titlePosition="bottom"
          keyboardType="default"
          containerStyle={styles.username}
          phoneCode={false}
          onlyText
          name="Dodi candra"
          borderWidth={0}
          numberOfLines={1}
        />
        <Input
          title="Bio"
          titlePosition="top"
          keyboardType="default"
          containerStyle={styles.username}
          phoneCode={false}
          borderWidth={0}
          editable={false}
          onlyText
          name="Aku ingin menjadi sesuatu yang..."
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontFamily: Fonts.Monstserrat.M,
    marginBottom: 20,
    marginLeft: 16,
  },
  profileContainer: {
    height: 200,
    backgroundColor: colors.background.yellow,
    justifyContent: 'center',
    elevation: 6,
    position: 'relative',
  },
  wraper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnIcon: {
    height: 73,
    width: 73,
    backgroundColor: colors.background.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 73 / 2,
    borderWidth: 2,
    borderColor: colors.background.yellow,
    position: 'absolute',
    top: 160,
    right: 20,
    elevation: 6,
  },
  textAkun: {
    fontSize: 24,
    fontFamily: Fonts.Monstserrat.M,
    marginLeft: 30,
    marginBottom: 20,
  },
  username: {
    marginHorizontal: 30,
    marginBottom: 20,
    borderBottomColor: colors.border.input,
    borderBottomWidth: 2,
  },
  upload: {
    position: 'absolute',
    bottom: 20,
    left: 35,
    backgroundColor: colors.background.greey,
    width: 60,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  textUpload: {
    fontFamily: Fonts.Monstserrat.M,
    color: colors.background.white,
  },
});
