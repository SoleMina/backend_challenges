import jwt from "jsonwebtoken";
const generateToken = (user, expire) => {
    return jwt.sign(
        {email: user},
        process.env.SECRET_JWT,
        { expiresIn: expire }
    )
}
export default generateToken;