export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const NEED_VERIFICATION = 'NEED_VERIFICATION';
export const SET_SUCCESS = 'SET_SUCCESS';

export type User = {
  firstName: string;
  email: string;
  id: string;
  createdAt: any;
};

export type AuthState = {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  error: string;
  needVerification: boolean;
  success: string;
};

export type SignUpData = {
  firstName: string;
  email: string;
  password: string;
};

export type SignInData = {
  email: string;
  password: string;
};

type SetUserAction = {
  type: typeof SET_USER;
  payload: User;
};

type SetLoadingAction = {
  type: typeof SET_LOADING;
  payload: boolean;
};

type SignOutAction = {
  type: typeof SIGN_OUT;
};

type SetErrorAction = {
  type: typeof SET_ERROR;
  payload: string;
};

type NeedVerificationAction = {
  type: typeof NEED_VERIFICATION;
};

type SetSuccessAction = {
  type: typeof SET_SUCCESS;
  payload: string;
};

export type AuthAction =
  | SetUserAction
  | SetLoadingAction
  | SignOutAction
  | SetErrorAction
  | NeedVerificationAction
  | SetSuccessAction;
