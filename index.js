import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from "dotenv";
dotenv.config();

//importing routes
import DashboardRoutes from './routes/DashboardRoutes.js';
import AuthRoutes from './routes/auth/AuthRoutes.js'
import UserRoutes from './routes/UserRoutes.js';
import UsergroupRoutes from './routes/UsergroupRoutes.js';
import StudentRoutes from './routes/StudentRoutes.js';

//middleware
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/dashboard', DashboardRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/users', UserRoutes);
app.use('/usergroups', UsergroupRoutes);
app.use('/students', StudentRoutes);



app.listen(process.env.PORT, () => {
   console.log('Zetharium is running in',process.env.PORT);
});
