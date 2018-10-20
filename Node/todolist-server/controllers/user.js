const User = require("../models/User");
const _ = require("lodash");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const {
    jwtSecret
 } = require("../config");

const Joi = require("koa-joi-router").Joi;


const {
    ClientError,
    NotFoundError
} = require("../error");

/* koa-router
const postUser = (ctx) => {
    //console.log(ctx.request.body);

    const {
        email = null,
        name = null
    } = ctx.request.body;
    
    if(_.isNil(email)) {
        ctx.status = 400;
        ctx.body = {
            message: "email field required"
        };
        return;
    }

    if(_.isNil(name)) {
        ctx.status = 400;
        ctx.body = {
            message: "name field required"
        };
        return;
    }

    ctx.body = "ok";
};

module.exports.postUser = postUser;
*/

// Validator = Joi validator
/*
module.exports.postUser = {
    path: "/users",
    method: "POST",
    validate: {
        body: {
            email: Joi.string().email().required(),
            name: Joi.string().required()
        },
        type: "json"
    },
    async handler(ctx) {
        ctx.body = "ok";
    }
};
*/


// User - CRUD
// Task - CRUD
// GTD

// 함수
//  동기: 결과가 바로 반환된다.
//  비동기
//    1. 인자로 callback을 받는다.
//    2. 반환타입이 Promise<T> 이다.

// module.exports.postUser = postUser;
// 비밀번호 조건 => Regex(정규 표현식)
//  1) 6글자 이상
//  2) 반드시 영문자 + 숫자
//  3) 특수 문자
//  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/

// HTTP 통신은 비 암호화 통신입니다.
//  => 반드시 HTTPS 를 이용해야 합니다.

// 암호화
//  1. 단방향(비밀번호, 주민등록번호) - Hash
//     hello -> sdjklajldjalksdjak!2123
//  2. 양방향(RSA)
//     인증서 기반 암호화(RSA)
//         '공개키'  '비공개키'  
//  공개키 : 암호화 할 때 사용한다.
// 비공개키 : 암호를 풀 때 사용한다.

// bcrypt 모듈을 이용하면 됩니다.
//  SHA1, SHA256, SHA512, SHA1024

const passwordRegex = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
const postUser = {
    path: "/users",
    method: "POST",
    validate: {
        body: {
            email: Joi.string().email().required(),
            name: Joi.string().required(),
            password: Joi.string().regex(passwordRegex, "password").required()
        },
        type: "json"
    },
    async handler(ctx) {
        /* controller에서 하지말고 model에 기능 추가
        const { 
            email ,
            password
        } = ctx.request.body;
        // 1. 해당하는 사용자가 이미 존재하는지 여부를 체크해야 한다.
        const exist = await User.findOne({
            email
        }).exec();

        if(!_.isNil(exist)) {
            // 번거롭기 때문에 class 만들어서 사용
            // const error = new Error("Already existed email");
            // error.status = 400;
            // throw error;
            
            throw new ClientError("Already existed email");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        // 1. ctx.request.body.password = passwordHash;  기존 데이터 수정하는 것은 좋은 방법이 아님

        const user = new User({
            ...ctx.request.body,
            password: passwordHash
        });

        const data = (await user.save()).toObject();
        delete data.password;
    
        
        // ctx.body = {
        //     result: "post ok",
        //     data: user,
        // }
        // 역전 앞 (statusCode로 result는 표현되기 때문) 
        ctx.body = data;
        */

        ctx.body = await User.signUp(ctx.request.body);
    }
}

const putUser = {
    path: "/users/:id",
    method: "PUT",
    validate: {
        body: {
            email: Joi.string().email(),
            name: Joi.string(),
            password: Joi.string().regex(passwordRegex, "password")
        },
        type: "json"
    },
    async handler(ctx) {
        // user.id

    }
}

const getUser = {
    path: "/users",
    method: "GET",
    async handler(ctx) {
        await User.find(async function(err, users) {
            console.log('--- Read all ---');
            if (err) console.error(err);
            else ctx.body = users;
        });
    }
}

const deleteUser = {
    path: "/users/:id",
    method: "DELETE",
    async handler(ctx) {
        await User.remove({_id: ctx.request.params.id}, async function (err) {
            console.log("--- Delete ---");
            if (err) console.error(err);
            console.log("--- Deleted ---");
        });
        ctx.body = "delete ok";
    }
}

// POST
//   HTTP - Connection-less
//      => Stateless
// connectionless로 !!상태가 없기!! 때문에 token으로 사용자 확인

// Memory
//    1. CPU Cache
//    2. Memory
//    3. SSD(HDD)
//    4. Network Storage(Database) - MySQL, MongoDB
//       Memory DB(Redis, Memcached) - Session Store
// 하드디스크에 저장하는 것은 scale out으로 서버가 한두대가 아니기 때문에 안된다.
// 세션 저장할 때 DB에다 말고 Memory DB(Redis)에 저장하는 것이 좋음

// User login
//    Access Token: "XXXXXXXXXXXXXXASDQWEQWEQWE"
//
//   {
//      _id: "",
//      expiredAt: "...",
//      permissions: [],
//   }
//   : JSON -> TOKEN -> JSON
//   JWT(Json Web Token)
// JWT에 저장하면 더 이상 Redis같은 것을 사용할 필요 없음

// Login 순서
// 1. User 로그인 요청
// 2. 비밀번호 검증
// 3. 토큰(Access Token) 발급
// 4. Database 저장(CREATE) -> POST

// Logout(GET)
//  1. AccessToken 삭제
// logout은 delete지만 보통 get으로
const signIn = {
    
    path: "/auth/login",
    method: "POST",
    validate: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        },
        type: "json"
    },
    async handler (ctx) {
        /* model로
        const {
            email,
            password
        } = ctx.request.body;

        const user = await User.findOneByEmail(email);
        if (_.isNil(user)) {
            throw new NotFoundError("User not found");
        }

        const verified = await bcrypt.compare(password, user.password);
        if (!verified) {
            throw new ClientError("Invalid password");
        }

        // Token Generate
        const token = jwt.sign({
            data: {
              user: user._id,
            }
        }, jwtSecret, {
            expiresIn: '3h'  // 재로그인이 필요한 시간
        });
        */
        const token = await User.signIn(ctx.request.body);
        ctx.body = {
            token,
        };
    }
};


// 배열로 사용해서 제거하든 추가하든 ./routes 파일 수정할 필요없음
module.exports = [
    postUser,
    putUser,
    getUser,
    deleteUser,
    signIn
];
