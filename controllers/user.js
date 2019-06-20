import User from '../models/user'
import JwtAuthenticate from '../utils/jwt'



class UserController {
    static async registerUser(req, res){
        try {   
            const foundUser = await User.findByEmail(req.body.email)
            if(foundUser.length){
                return res.status(400).json({
                    success: false,
                    message: 'Email unavailable'
                })
            }
            const newUser = await User.createUser(req.body)
            const token = JwtAuthenticate.generateToken(newUser[0])
            return res.status(200).json({
                success: true,
                message: 'User successfully signed',
                data: newUser[0],
                token
            })

        } catch(error){
            return res.status(500).json({
                success: false,
                error: 'Server error',
                message: process.env.NODE_ENV === 'production'? 'Server down Please try again later' : error.message
            })
        }
    }


}

export default UserController;
