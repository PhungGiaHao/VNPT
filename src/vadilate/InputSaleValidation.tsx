import * as yup from 'yup';

export const InputSaleValidation = yup.object().shape({
  selectedEmployeeId: yup.string().required('Nhân viên không được bỏ trống.'),
  deliveryQuantity: yup
    .number()
    .typeError('Số lượng giao không được là số thập phân')
    .integer('Số lượng giao phải là một số nguyên.')
    .positive('Số lượng giao phải lớn hơn 0.')
    .required('Số lượng giao không được bỏ trống.'),
  realQuantity: yup
    .number()
    .typeError('Số lượng thực hiện không được là số thập phân')
    .integer('Số lượng thực hiện phải là một số nguyên.')
    .min(0, 'Số lượng thực hiện phải lớn hơn hoặc bằng 0.')

    .required('Số lượng thực hiện không được bỏ trống.'),
  revenue: yup
    .number()
    .typeError('Sai định dạng tiền tệ')
    .min(0, 'Doanh Thu phải lớn hơn hoặc bằng 0.')
    .required('Doanh Thu không được bỏ trống.'),
  note: yup.string().optional(),
});
