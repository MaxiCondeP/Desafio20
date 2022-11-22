import { Types } from 'mongoose';
import { isValidPassword, createHash } from "../../src/utils/utils.js"
import { User } from "../../src/utils/database.js"




export const  localPassport= async (passport, LocalStrategy) => {
  passport.use("login", new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    let passHash = " ";
    if (user) {
      passHash = user.password;
    }
    if (!user || !isValidPassword(password, passHash)) {
      return done(null, null, { message: "Invalid username or password" });
    } else {
      return done(null, user);
    }
  }));

  passport.use("signup", new LocalStrategy({
    passReqToCallback: true
  }, async (req, username, password, done) => {
    const user = await User.findOne({ username });
    if (user) {
      return done(null, null);
    }

    const hashedPassword = createHash(password);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    return done(null, newUser);
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    id = Types.ObjectId(id);
    const user = await User.findById(id);
    done(null, user);
  });




}

