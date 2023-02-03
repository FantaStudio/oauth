import * as yup from "yup";

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .required("Введите email")
        .email("Введите корректный email"),
    password: yup
        .string()
        .required("Введите пароль")
        .min(8, "Пароль должен содержать минимум 8 символов")
        .matches(
            /^[a-zA-Z0-9]+$/,
            "Пароль может состоять только из английских букв и цифр"
        )
        .matches(
            /(?=.*[A-Z])(?=.*\d).*/,
            "Пароль должен содержать хотя-бы 1 заглавную букву и хотя-бы 1 цифру"
        ),
});
export default loginSchema;
