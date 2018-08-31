import express from "express"
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const Schema = mongoose.Schema;

const Account = new Schema({
    username: String,
    password: String,
    created: { type: Date, default: Date.now }
})

// generates hash
Account.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
};

// compares the password
Account.methods.validateHash = function(password) {
    return bcrypt.compareSync(password, this.password);
};


const router = express.Router()

router.post("/signup", (req, res) => {
  res.json({ success: true })
})

router.post("/signin", (req, res) => {
  res.json({ success: true })
})

router.get("/getinfo", (req, res) => {
  res.json({ info: null })
})

router.post("/logout", (req, res) => {
  return res.json({ success: true })
})

export default router

export default mongoose.model('account', Account)
export default mongoose.model('account', Account)