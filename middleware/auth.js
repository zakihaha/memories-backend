import jwt, { decode } from "jsonwebtoken";

// like a post
// click the like button => auth middleware (next) => like controller

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const isCustomAuth = token.length < 500

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'zaki')
            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub // spesific id google user
        }

        next()
    } catch (error) {
        console.log(error);
    }
}

export default auth