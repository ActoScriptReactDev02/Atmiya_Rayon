import {configureStore} from '@reduxjs/toolkit';
import { AuthReducers } from './Reducers';


const Store = configureStore({
  reducer: {
    Auth: AuthReducers,
  },
});

export default Store;
