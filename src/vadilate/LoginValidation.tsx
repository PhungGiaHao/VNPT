import * as yup from 'yup';

export const LoginValidation = yup.object().shape({
  username: yup.string().required('Tài khoản không được để trống'),
  password: yup.string().required('Mật khẩu không được để trống'),
});
