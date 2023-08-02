//abstract class
export class CustomError extends Error {
    statusCode
    
    constructor(message) {
        super(message)
    } 
}

export class ValidationError extends CustomError {
    constructor(message, statusCode = 400) {
        super(message)
        this.name = 'ValidationError'
        this.statusCode = statusCode
    }

    static fromJoi(joiError, statusCode = 400) {
        let message = []
        for (const detail of joiError.details)
            message.push(detail.message)
        return new ValidationError(message.join('\n'), statusCode)
    }
}

export class ConflictError extends CustomError {
    constructor(message, statusCode = 409) {
        super(message)
        this.name = 'ConflictError'
        this.statusCode = statusCode
    }
}

export class NotFoundError extends CustomError {
    constructor(message, statusCode = 404) {
        super(message)
        this.name = 'NotFoundError'
        this.statusCode = statusCode
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message, statusCode = 401) {
        super(message)
        this.name = 'UnauthorizedError'
        this.statusCode = statusCode
    }
}

export class ForbiddenError extends CustomError {
    constructor(message, statusCode = 403) {
        super(message)
        this.name = 'ForbiddenError'
        this.statusCode = statusCode
    }
}
