import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import multer from "multer";
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/User.js';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import aiRoutes from './routes/ai.js';
import diseaseRoutes from './routes/diseaseRoutes.js';
import scanRoutes from "./routes/scan.js"

const app = express();
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/healthcare', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Mongo error:', err));

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));


// Sessions
app.use(session({
  secret: 'supersecretkey', // change this to env var in prod
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/healthcare' }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return done(null, false, { message: 'No user found' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return done(null, false, { message: 'Incorrect password' });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select('-password');
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Routes
app.use('/api', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/diseases', diseaseRoutes);
app.use('/api/scan', scanRoutes);

// Start
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

