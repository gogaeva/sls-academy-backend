import pg from 'pg'
const { Pool } = pg
import { ConflictError, NotFoundError } from '../utils/errors.js'
import { UserInfo } from '../models/user.model.js'
import log from '../utils/logger.js'

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sls_academy',
    password: 'qwerty',
    port: 5555,
})

async function createUser(userId, email, passwordHash) { 
    try {
        log.debug('repo layer')
        const res = await pool.query('INSERT INTO users (user_id, email, password_hash) VALUES ($1, $2, $3) RETURNING *', [userId, email, passwordHash])
        log.debug(res)
        return res.rows.pop()
    } catch (err) {
        log.error(err)
        if (err.code === '23505') { //Unique constraint violated
            throw new ConflictError(`User with email ${email} already exists`)
        }
        throw err
    }
}

async function getUserByEmail(email) {
    const res = await pool.query('SELECT * FROM users WHERE email=$1', [email])
    if (!res.rows.length) 
        throw new NotFoundError('User with provided email does not exist')
    const user = res.rows.pop()
    return UserInfo.fromPostgres(user)
}

export default {
    createUser,
    getUserByEmail,
}