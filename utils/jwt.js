import Jwt from 'jsonwebtoken'


class JwtAuthenticate {
    static generateToken(user){
        return Jwt.sign({ id: user.id}, process.env.JWT_SECRET)
    }

}

export default JwtAuthenticate
