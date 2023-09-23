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
const eventRoute = require('./routes/Events');
// const userRoute = require('./routes/getUser');
const userDetails = require('./routes/userDetails');
const Attendance = require('./routes/markAttendance');
const allEvents = require('./routes/fetchAllEvents');
const fetchAllUserByEvent = require('./routes/fetchAllUsersByEvents');
// const sendcertificateRoute = require('./routes/showCertificate');
const userAndEvents = require('./routes/userByEvent');
// const markAttendace = require('./routes/markAttendance')
// const markResult = require('./routes/result');
// Assigning the route handlers to specific paths
app.use('/api', eventRoute);
// app.use('/api/users', userRoute);
app.use('/api', userDetails);
app.use('/api', Attendance);
app.use('/api', allEvents);
app.use('/api', fetchAllUserByEvent);
app.use('/api',userAndEvents)
// app.use('/api', sendcertificateRoute);
// app.use('/api/attendance', markAttendace);
// app.use('/api/result', markResult);
// Start the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
