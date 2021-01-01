import axios from 'axios';
import {auth} from 'config/fire-base';

export const httpToken = async (body: any) => {
  const options = {
    headers: {
      Authorization: auth.token, // tokan dari firebase message: setelan projek => clund messaging => token
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: JSON.stringify(body)
  };

  try {
    const result = await axios({
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: options.headers,
      data: options.data,
      method: 'POST'
    });
    return result.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
