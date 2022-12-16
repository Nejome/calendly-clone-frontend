import * as yup from "yup";

export const schema = yup.object({
    email: yup.string().email('The email field must valid email address').required('The email field is required'),
    password: yup.string().required('The password field is required'),
}).required();