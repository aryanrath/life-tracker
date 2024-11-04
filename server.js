const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // To parse JSON bodies
app.use(express.static('public')); // Serve static files from the 'public' directory

app.get('/calculate', (req, res) => {
    const { dob, lifespan } = req.query;

    const birthDate = new Date(dob);
    const currentDate = new Date();

    // Calculate the end date based on the desired lifespan
    const endDate = new Date(birthDate);
    endDate.setFullYear(birthDate.getFullYear() + Number(lifespan));

    // Calculate the difference in milliseconds
    const timeDiff = endDate - currentDate;

    // Calculate total seconds from the difference
    const totalSeconds = Math.floor(timeDiff / 1000);

    // Calculate each time component
    const years = Math.floor(totalSeconds / (3600 * 24 * 365));
    const months = Math.floor((totalSeconds % (3600 * 24 * 365)) / (3600 * 24 * 30));
    const weeks = Math.floor((totalSeconds % (3600 * 24 * 30)) / (3600 * 24 * 7));
    const days = Math.floor((totalSeconds % (3600 * 24 * 7)) / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Prepare the response string
    const responseMessage = `${years} years, ${months} months, ${weeks} weeks, ${days} days, ${hours} hours, ${minutes} mins & ${seconds} secs is all you got!`;

    res.json({ message: responseMessage });
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Serve the index.html file
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
