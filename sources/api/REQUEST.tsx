import Axios from 'axios';
import {Functions} from '../utils';
import URL from './URL';

const REQUEST = async ({
  Method,
  EndPoint,
  Params,
  IsformData = false,
  NeedToken = true,
}) => {
  const appData = await Functions.getUserData();
  const Headers = Header(NeedToken, appData?.AuthorizationKey, IsformData);
  const options = {
    method: Method,
    headers: Headers,
    data: Params,
    url: URL.AppUrl + EndPoint,
  };
  // console.log('options -> ', JSON.stringify(options, null, 2));
  // const response = await Axios(options);
  // return response.data;

  // fetch method......
  try {
    const responseJson = await Axios({
      method: Method,
      data: Params,
      headers: Headers,
      url: options.url,
      responseType: 'json',
    });
    //const response = await responseJson?.json();
    if (responseJson.status == 200) {
      return responseJson.data;
    }
  } catch (error) {
    console.log('request error-->', error.response.data);
    throw error?.response
      ? {
          responseMSG: error?.response?.data,
          responseCode: error?.response?.status,
        }
      : error;
  }
};
const Header = (NeedToken, Token, IsformData) => {
  let apiHeaders = {
    Accept: '*/*',
    'Content-Type': IsformData ? 'multipart/form-data' : 'application/json',
  };
  if (NeedToken) {
    apiHeaders = {...apiHeaders, Authorization: `Bearer ${Token}`};
  }
  return apiHeaders;
};
export default REQUEST;
