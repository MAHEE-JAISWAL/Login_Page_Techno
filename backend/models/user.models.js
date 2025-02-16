import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long'],
    },
    usn: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: [3, 'Username must be at least 3 characters long'],
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Email is invalid',
        },
    },
    section: {
        type: String,
        required: true,
        enum: ['A', 'B', 'C', 'D', 'E', 'F'],
    },
    department: {
        type: String,
        required: true,
        enum: ['CSE', 'ETC', 'EE','MECH','AIDS','AIML'],
    },
    mobile: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: 'Mobile number must be an integer',
        },
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false, // Hide password in queries
    },
});

// Hash password before saving user
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;
