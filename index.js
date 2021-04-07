const path = require('path');
const axios = require('axios');
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/jobs', async (req, res) => {
  try {
    let { description, full_time, location, page, markdown } = req.query;

    const result = await axios.get('https://jobs.github.com/positions.json', {
      params: {
        markdown,
        page,
        description,
        full_time,
        location,
      },
    });
    res.send(result.data);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error while getting list of jobs.Try again later.' });
  }
});

app.get('/:id', async (req, res) => {
  const jobId = req.params.id;
  try {
    const result = await axios.get(
      `https://jobs.github.com/positions/${jobId}.json?markdown=true`
    );
    res.send(result.data);
  } catch (error) {
    const { status, statusText } = error.response;
    res.status(status).json({ message: statusText });
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
