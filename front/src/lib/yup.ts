import * as yup from "yup"

export const SchemaPwd = yup.object({
    old: yup.string().required('Please fill in the field')
    .min(6, 'Password must be at least six characters long')
    .max(15, 'Password must be no more than fifteen'),
    newpwd: yup.string().required('Please fill in the field')
    .min(6, 'Password must be at least six characters long').
    max(15, 'Password must be no more than fifteen')
})

export const SchemaLog = yup.object({
    password: yup.string().required('Please fill in the field')
    .min(6, 'Password must be at least six characters long').
    max(15, 'Password must be no more than fifteen'),
    login: yup.string().required('Please fill in the field')
    .min(6, 'Login must be at least six characters long').
    max(15, 'Login must be no more than fifteen')
})

export const SchemaSignUp = yup.object({
    name: yup.string().required().min(4).max(10).test(
        'is-first-letter-capital',
        'First letter must be capitalized',
        value => value ? /^[A-Z]/.test(value) : false
    ),
    surname: yup.string().required().min(6).max(15).test(
        'is-first-letter-capital',
        'First letter must be capitalized',
        value => value ? /^[A-Z]/.test(value) : false
    ),
    login: yup.string().required().min(6).max(15),
    password: yup.string().required().min(6).max(15)
})