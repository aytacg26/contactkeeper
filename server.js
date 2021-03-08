import express from 'express';
import helmet from 'helmet';
import UsersRouter from './routes/users.js';
import AuthRouter from './routes/auth.js';
import ContactsRouter from './routes/contacts.js';
import connectDB from './config/db.js';

const app = express();

//Connect Database:
connectDB();

//Use helmet package:
app.use(helmet());

//Define Routes
app.use('/api/users', UsersRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/contacts', ContactsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
