const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')
const {generateToken} = require('../utils/generateToken')
const jwt = require('jsonwebtoken')
const Token = require('../models/Token')


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/api/auth/google/callback', // Replace with your callback URL
        
        },
        async (accessToken, refreshToken, profile, done)=>{
            try{
                console.log('Google Profile:', profile);
                let user = await User.findOne({ googleId: profile.id });
                
                if(!user)
                {
                    
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                    })

                    const token = generateToken(user._id)
                    await Token.create({ token, user: user._id });
                    const redirectUrl = `${process.env.FRONTEND_URL}/complete-profile?userId=${user._id}&token=${token}&email=${user.email}&name=${user.name}`;
                    return done(null, {redirectUrl});

                }
                // fi 7alt ma 3ndouch role

                if(!user?.role)
                {
                        const redirectUrl = `${process.env.FRONTEND_URL}/complete-profile?userId=${user._id}&token=${token}&email=${user.email}&name=${user.name}`;
                        return done(null, {redirectUrl})
                }
                const token = generateToken(user._id)
                // fi 7alt 3ndou compte w 3ndou role ra7 ydir login
                return done(null, { user, token });
            }catch (error) {
                return done(error, null);
              }
        }
    )
)






