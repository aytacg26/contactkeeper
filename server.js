import express from 'express';
import helmet from 'helmet';
import UsersRouter from './routes/users.js';
import AuthRouter from './routes/auth.js';
import ContactsRouter from './routes/contacts.js';
import connectDB from './config/db.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
//Connect Database:
connectDB();

//init middleware:
app.use(express.json({ extended: false }));

//Use helmet package:
app.use(helmet());

//Define Routes
app.use('/api/users', UsersRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/contacts', ContactsRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
