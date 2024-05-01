const { TOKEN_SECRET } = require("../config");
const jwt =require("jsonwebtoken")

exports.CreateAccessToken=(payload)=>{
    return new Promise((resolve,reject)=>{
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn:"1d",
            },
            (error, token) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(token)
                }
              }      
            )
    })
}