import Joi from 'joi'
import { UnauthorizedError, ValidationError } from '../utils/errors.js'
import { createUserSchema } from '../schema/user.schema.js'
import authService from '../service/auth.service.js'
import log from '../utils/logger.js'


const respond = (res, data, success = true) => {
    const response = { success }
    if (success) {
      response.data = data
      res.status(200)
    } else {
      response.error = data
      const errName = response.error.name
      const code = codesMapping[errName]
      res.status(code)
    }
    res.json(response)
  }

export async function signUp(req, res, next) {
    const { email, password } = req.body
    try {
      Joi.assert({ email, password }, createUserSchema)
      const result = await authService.createUser(email, password)
      return res.status(200).json({
        success: true,
        data: result,
      })
    } catch (err) {
      if (err instanceof Joi.ValidationError)
        return next(ValidationError.fromJoi(err))
      next(err)
    }    
}

export async function signIn(req, res, next) {
    const { email, password } = req.body
    try {
      Joi.assert({ email, password }, createUserSchema)
      const result = await authService.authenticateUser(email, password)
      // return respond(res, true, result)
      return res.json({ success: true, data: result })
    } catch (err) {
      if (err instanceof Joi.ValidationError)
        return next(ValidationError.fromJoi(err))
      next(err)
    }    
}

export async function me(req, res) {
    const email = req.user.email
    const user = await authService.getUserByEmail(email)
    // TODO: nekrasivo
    delete user.passwordHash
    return res.json({ success: true, data: user })
}