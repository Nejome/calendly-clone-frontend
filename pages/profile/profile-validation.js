import * as yup from "yup";

export const schema = yup.object({
    name: yup.string().required('The name field is required'),
    email: yup.string().email('The email field must valid email address').required('The email field is required'),
    password_confirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'The password confirmation does not match')
}).required();