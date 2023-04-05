const express = require('express');
const mongoose = require('mongoose')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(require('./routes/api/index'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Use this to log mongo queries being excuted!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));