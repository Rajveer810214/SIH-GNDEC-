// Importing the route handlers
const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const app = express();
app.use(express.json())
app.use(cors());
// Connect to MongoDB
connectToMongo();
// Route Handlers
const eventRoute = require('./routes/UserMode/Events/Events');
const SignUp = require('./routes/UserMode/Authentication/Auth');
const userDetails = require('./routes/UserMode/userDetails');
const Attendance = require('./routes/AdminMode/Attendance/markAttendance');
const markResult = require('./routes/AdminMode/Result/MarkResult');
const allEvents = require('./routes/AdminMode/fetchEvents/fetchAllEvents');
const fetchAllUserByEvent = require('./routes/AdminMode/fetchEvents/fetchAllUsersByEvents');
const verify = require('./routes/UserMode/Authentication/verify');
const userAndEvents = require('./routes/AdminMode/fetchEvents/userByEvent');
const passwordResetRoute = require('./routes/UserMode/password/resetPassword');
const makeAdmin = require('./routes/AdminMode/makeAdmin');
// Assigning the route handlers to specific paths
app.use('/api', eventRoute);
// app.use('/api/users', userRoute);
app.use('/api', userDetails);
app.use('/api', Attendance);
app.use('/api', allEvents);
app.use('/api', fetchAllUserByEvent);
app.use('/api', userAndEvents)
app.use('/api', SignUp)
app.use('/api', verify);
app.use('/api', passwordResetRoute);
app.use('/api', makeAdmin);
app.use('/api', markResult);


// app.use('/api/attendance', markAttendace);
// Start the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
