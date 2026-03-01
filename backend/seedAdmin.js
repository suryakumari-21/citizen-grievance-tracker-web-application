require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');


async function seed(){
await mongoose.connect(process.env.MONGO_URI);
const existing = await User.findOne({ email: 'admin@example.com' });
if(existing){ console.log('Admin exists'); process.exit(0); }
const passwordHash = await bcrypt.hash('admin123', 10);
const admin = new User({ name: 'Admin', email: 'admin@example.com', passwordHash, role: 'admin' });
await admin.save();
console.log('Admin created: admin@example.com / admin123');
process.exit(0);
}
seed().catch(err=>{ console.error(err); process.exit(1); });