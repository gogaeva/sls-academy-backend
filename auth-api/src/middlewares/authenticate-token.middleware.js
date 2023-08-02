import jwt from 'jsonwebtoken'
import { ForbiddenError, UnauthorizedError } from '../utils/errors.js'
import log from '../utils/logger.js'

const { ACCESS_TOKEN_SECRET } = process.env

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (!token)
    throw new UnauthorizedError('Authorization header required')
  
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) 
      throw new ForbiddenError('Invalid access token')
    log.debug(user)
    req.user = user
    next()
  })
}