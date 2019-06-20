import queryDB from './query'
import Password from '../utils/password'

class User{
    static async findByEmail(email){
        const sql = 'SELECT * FROM users WHERE email = $1;'
        const params = [email]

       return await queryDB(sql, params)
    }

    static async createUser(user){
        const password = Password.hashPassword(user.password)
        const {email, firstName, lastName} = user
        const sql = 'INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING *';
        const params = [firstName, lastName, email, password]
      return await queryDB(sql, params)

    }
}

export default User
