import { CustomError } from '../utils/errors.js'
import log from '../utils/logger.js'

const respond = (res, statusCode, message) => {
    return res.status(statusCode).send({
        success: false,
        error: message,
    })
}

const errorHandler = (err, req, res, next) => {
    log.error(err)
    if (err instanceof CustomError) 
        return respond(res, err.statusCode, err.message)
    else if (err)
        return respond(res, 500, 'Unexpected error occured')
}

export default errorHandler