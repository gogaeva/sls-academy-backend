import crypto from 'node:crypto'

const secret = crypto.randomBytes(64).toString('hex')

// process.env.JWT_SECRET = secret
console.log(secret)