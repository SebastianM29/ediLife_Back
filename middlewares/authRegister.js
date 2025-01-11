import  passport  from "passport";
export const authRegister = (strategy) => {
    return (req,res,next) => {
        passport.authenticate(strategy,(err,user,info)=> {
            if (err) {
                return next(err)
            }
            if (!user) {
                req.authError = info.msg
            }
            req.logIn(user,(err)=>{
                if (err) {
                    return res.status(400).json({ error:"error al iniciar",details:err})
                }
              next()
            })
        })
        (req,res,next)
    }
}