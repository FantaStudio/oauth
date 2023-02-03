import registerSchema from "../../utils/validation/registerValidation.js";
import db from "../db/db.js";

const userValidation = registerSchema.shape({
    email: registerSchema.fields.email.test(
        "checkEmailUnique",
        "Такой @mail уже зарегистрирован.",
        (value) => !db.findUserByEmail(value)
    ),
});
export default userValidation;
