import {Input, ModalCustome, Profile} from 'components';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ImagePick from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {getUserBio, updateBio, updateUserName, uploadImageUser} from 'services';
import {RootState} from 'store';
import {colors, Fonts, Icons, useForm} from 'utils';

export interface ImageTypes {
  uri?: string;
  filename?: string;
  path?: string;
}

export const UserProfile = () => {
  const User = useSelector((state: RootState) => state.User);
  const UI = useSelector((state: RootState) => state.UI);
  const dispatch = useDispatch();

  const [form, onChange] = useForm({name: '', bio: ''});
  const [visibleName, setVisibleName] = useState(false);
  const [visibleBio, setVisibleBio] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<ImageTypes>({
    uri: '',
    filename: '',
    path: ''
  });

  useEffect(() => {
    dispatch(getUserBio());
  }, [dispatch]);

  const upload = async () => {
    ImagePick.launchImageLibrary(
      {
        quality: 1,
        mediaType: 'photo',
        allowsEditing: true
      },
      async (res) => {
        if (!res.didCancel) {
          const src: ImageTypes = {
            uri: res.uri,
            filename: res.fileName,
            path: res.path
          };
          setImage(src);
        }
      }
    );
  };

  const uploadFoto = async () => {
    try {
      setLoading(true);
      await dispatch(
        uploadImageUser({
          uri: image.uri,
          filename: image.filename
        })
      );

      setImage({...image, uri: ''});
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateName = async () => {
    await dispatch(updateUserName(form.name));
    setVisibleName(false);
  };

  const updatebio = async () => {
    await dispatch(updateBio(form.bio));
    setVisibleBio(false);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.wraper}>
          <Profile
            loading={loading}
            source={{uri: image.uri ? image.uri : User.user?.imgUrl!}}
            left={17}
            size={95}
          />
          <Text style={styles.title}>{User.user?.name}</Text>
        </View>
        {image.uri!.length > 0 ? (
          <TouchableOpacity onPress={uploadFoto} style={styles.upload}>
            <Text style={styles.textUpload}>Upload</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <TouchableOpacity onPress={upload} importantForAccessibility="yes" style={styles.btnIcon}>
        <Icons.FontAwesome5 name="camera-retro" size={40} color={colors.text.greey} />
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
          name={User.user!.name}
          borderWidth={0}
          numberOfLines={1}
          onPresText={() => setVisibleName(true)}
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
          name={User.user?.bio}
          onPresText={() => setVisibleBio(true)}
        />
        <ModalCustome
          onType={(val) => onChange('name', val)}
          visible={visibleName}
          onSubmit={updateName}
          overlayPress={() => setVisibleName(false)}
          value={form.name}
          title="edit name"
          disabled={UI.loading}
        />
        <ModalCustome
          onType={(val) => onChange('bio', val)}
          visible={visibleBio}
          onSubmit={updatebio}
          overlayPress={() => setVisibleBio(false)}
          value={form.bio}
          title="edit bio"
          disabled={UI.loading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 30,
    fontFamily: Fonts.Monstserrat.M,
    marginBottom: 20,
    marginLeft: 16
  },
  profileContainer: {
    height: 200,
    backgroundColor: colors.background.yellow,
    justifyContent: 'center',
    elevation: 6,
    position: 'relative'
  },
  wraper: {
    flexDirection: 'row',
    alignItems: 'center'
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
    elevation: 6
  },
  textAkun: {
    fontSize: 24,
    fontFamily: Fonts.Monstserrat.M,
    marginLeft: 30,
    marginBottom: 20
  },
  username: {
    marginHorizontal: 30,
    marginBottom: 20,
    borderBottomColor: colors.border.input,
    borderBottomWidth: 2
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
    elevation: 3
  },
  textUpload: {
    fontFamily: Fonts.Monstserrat.M,
    color: colors.background.white
  }
});
