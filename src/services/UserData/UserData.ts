import {firebase as auth} from '@react-native-firebase/auth';
import {firebase as storage} from '@react-native-firebase/storage';
import {ImageTypes} from 'screen';

// TODO sudah jalan tapi hanya di real devices
export async function uploadImageUser(data: ImageTypes) {
  try {
    const fileRef = await storage.storage().ref();
    const user = await auth.auth().currentUser;
    const reference = await fileRef
      .child(`image/User${user?.uid}`)
      .putFile(`${data.uri}`);
    console.log(reference.metadata.fullPath);
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}
