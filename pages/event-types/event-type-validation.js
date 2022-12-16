import * as yup from "yup";

export const schema = yup.object({
    name: yup.string().required('The name field is required'),
    from: yup.string().required('The from field is required'),
    to: yup.string().required('The to field is required'),
    duration: yup.string().required('The duration field is required')
}).required();