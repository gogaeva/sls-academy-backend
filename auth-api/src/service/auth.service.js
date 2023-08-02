import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import authRepo from '../repository/auth.repository.js'
import { UserAuthInfo } from '../models/user.model.js'
import { UnauthorizedError } from '../utils/errors.js'
import log from '../utils/logger.js'
import { v4 as uuid } from 'uuid'


async function createUser(email, password) {
    const userId = uuid()
    const accessToken = generateAccessToken(email)
    const refreshToken = generateRefreshToken(email)
    const passwordHash = await hashPassword(password)
    await authRepo.createUser(userId, email, passwordHash)
    log.info(`User ${email} registrated`)
    return new UserAuthInfo(userId, accessToken, refreshToken)
}

async function authenticateUser(email, password) {
    const user = await authRepo.getUserByEmail(email)
    log.debug(user)
    if (!await verifyPassword(password, user.passwordHash)) {
    //!Shouldt be schema or something. Now fields in postgres table and js classes must be the same
        throw new UnauthorizedError('Invalid password')
    } 
    const userId = user.userId
    const accessToken = generateAccessToken(email)
    const refreshToken = generateRefreshToken(email)
    log.info(`User ${email} authenticated`)
    return new UserAuthInfo(userId, accessToken, refreshToken)
}

async function getUserByEmail(email) {
    return await authRepo.getUserByEmail(email)
}


function generateAccessToken(email) {
    return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}

function generateRefreshToken(email) {
    return jwt.sign(email, process.env.REFRESH_TOKEN_SECRET)
}

async function hashPassword(password) {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(password, salt)
}

async function verifyPassword(password, hash) {
    return bcrypt.compare(password, hash)
}

export default {
    createUser,
    authenticateUser,
    getUserByEmail,
}