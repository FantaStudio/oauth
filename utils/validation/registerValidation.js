import * as yup from "yup";
import loginSchema from "./loginValidation.js";

const registerSchema = loginSchema.shape({
    username: yup.string().required("Введите имя пользователя"),
    passwordConfirmation: yup
        .string()
        .required("Повторите пароль")
        .oneOf([yup.ref("password")], "Пароли не совпадают"),
    policyConfirmation: yup.boolean().oneOf([true], "Подтвердите согласие"),
});

export default registerSchema;
