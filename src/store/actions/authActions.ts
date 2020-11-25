import { ThunkAction } from 'redux-thunk';
import {
  SignUpData,
  AuthAction,
  SET_USER,
  SET_SUCCESS,
  SET_LOADING,
  SET_ERROR,
  User,
  SIGN_OUT,
  SignInData,
  NEED_VERIFICATION,
} from '../types';
import { RootState } from '../';
import firebase from '../../firebase/config';

export const signup = (
  data: SignUpData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);
      if (user) {
        const userData: User = {
          email: data.email,
          firstName: data.firstName,
          id: user.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        await firebase
          .firestore()
          .collection('/users')
          .doc(user.uid)
          .set(userData);
        await user.sendEmailVerification();

        dispatch({
          type: NEED_VERIFICATION,
        });
        dispatch({
          type: SET_USER,
          payload: userData,
        });
      }
    } catch (e) {
      onError();
      dispatch(setError(e.message));
    }
  };
};

export const getUserById = (
  id: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const user = await firebase.firestore().collection('users').doc(id).get();
      if (user.exists) {
        const userData = user.data() as User;

        dispatch({
          type: SET_USER,
          payload: userData,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const setLoading = (
  value: boolean
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: value,
    });
  };
};

export const signin = (
  data: SignInData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
    } catch (e) {
      onError();
      dispatch(setError(e.message));
    }
  };
};

export const setError = (
  msg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_ERROR,
      payload: msg,
    });
  };
};

export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await firebase.auth().signOut();
      dispatch({
        type: SIGN_OUT,
      });
    } catch (e) {
      dispatch(setLoading(false));
    }
  };
};

export const setNeedVerification = (): ThunkAction<
  void,
  RootState,
  null,
  AuthAction
> => {
  return (dispatch) =>
    dispatch({
      type: NEED_VERIFICATION,
    });
};

export const setSuccess = (
  msg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) =>
    dispatch({
      type: SET_SUCCESS,
      payload: msg,
    });
};

export const sendPasswordResetEmail = (
  email: string,
  successMsg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      dispatch(setSuccess(successMsg));
    } catch (e) {
      dispatch(setError(e.message));
    }
  };
};
