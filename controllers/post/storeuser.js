const User= require('../../model/user')
const bcrypt= require('bcrypt')
const flash= require('express-flash')
const jwt= require('jsonwebtoken')


module.exports= (req,res)=>{
    User.create(req.body,(err,user)=>{
        if(err){
            const error=Object.keys(err.errors).map(key => err.errors[key].message)
            console.log(error)
            req.flash("ErrorMessage",error)
            req.redirect('/registration')
        }
        const payload= {_id:user._id}
        //create token 
        jwt.sign(payload,process.env.token_pass, {expiresIn:'1h'},(err,token)=>{
            req.session.userId=token
            res.redirect('homepage')
        })
    })
}