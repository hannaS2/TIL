const _ = require("lodash");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const {
    jwtSecret
} = require("../config");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const {
    ClientError,
    NotFoundError
} = require("../error");

const User = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    }
}, {
        versionKey: false  // __v: 0 제거
    });

// Mongoose 에서는 model에 새로운 기능을 추가할 수 있습니다.
// signUp
// User.signUp: static method (signUp전에는 user가 존재하지 않기때문에)
// user.signUp: instance method

User.statics.findOneByEmail = async function (email) {
    // User.findOne
    // this대신 User쓰면 에러남 (밖에서 사용하는 것이기 때문)
    return this.findOne({
        email
    }).exec();
}

User.statics.signUp = async function (data) {
    const {
        email,
        password,
    } = data;

    const exist = await this.findOneByEmail(email);
    if (!_.isNil(exist)) {
        throw new ClientError("Already exist email");
    }

    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new this({
        ...data,
        password: passwordHash,
    });

    await user.save();
    const ret = user.toObject();
    delete ret.password;

    return ret;
}

// User 객체에 대한 함수
User.methods.verifyPassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

User.methods.generateToken = function () {
    return token = jwt.sign({
        data: {
            user: this._id,
        }
    }, jwtSecret, {
            expiresIn: '3h'
        });
}

// User 모델에 대한 함수
User.statics.signIn = async function (data) {
    const {
        email,
        password
    } = data;

    const user = await this.findOneByEmail(email);
    if (_.isNil(user)) {
        throw new NotFoundError("User not found");
    }

    const verified = await user.verifyPassword(password);  // 여기서 user 대신 this 사용하지 않도록 !
    if (!verified) {
        throw new ClientError("Invalid password");
    }

    return user.generateToken();
}

User.methods.verifyToken = function (token) {
    const bearerToken = token.authorization.split(" ")[1];
    return decodedToken = jwt.verify(bearerToken, jwtSecret);
}

User.statics.updateUser = async function (token, data) {
    const user = new this({
        ...data
    });
    const ret = user.toObject();
    delete ret._id;

    const verified = user.verifyToken(token);
    await this.findByIdAndUpdate(verified.data.user, ret);
    return ret;
}

User.statics.getOwnUser = async function (token) {
    const user = new this();
    const verified = user.verifyToken(token);

    const ret = await this.findById(verified.data.user).lean();
    delete ret.password;
    return ret;
    // return await this.findById(verified.data.user);
}


module.exports = mongoose.model("User", User);