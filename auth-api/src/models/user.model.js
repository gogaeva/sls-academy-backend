export class User {
    constructor(email, password) {
        // this.id = id
        this.email = email
        this.password = password
    }
}

export class UserAuthInfo {
    constructor(id, accessToken, refreshToken) {
        this.id = id
        this.accessToken = accessToken
        this.refreshToken = refreshToken
    }
}

export class UserInfo {
    constructor(userId, email, passwordHash) {
        this.userId = userId
        this.email = email
        this.passwordHash = passwordHash
    }
    static fromPostgres(user) {
        const { user_id, email, password_hash } = user
        return new UserInfo(user_id, email, password_hash)
    }

    static toClient(user) {
        return new UserInfo(user.userId, user.email)
    }
}