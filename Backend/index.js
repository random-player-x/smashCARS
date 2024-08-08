const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');
const { Votes } = require('./database');
app.use(cors());

app.get('/images/:id', async (req, res) => {
  const voteid = req.params.id;
  const imagePath = path.join(__dirname, `/images/${voteid}.jpg`);

  // Check if the image file exists and serve it
  fs.readFile(imagePath, async (err, data) => {
    if (err) {
      res.status(500).send('Error reading image');
      return;
    }

    res.writeHead(200, {
      'Content-Type': 'image/jpg',
      'Content-Length': data.length,
    });
    res.end(data);

    try {
      // Use upsert option to ensure the document is created only if it doesn't exist
      await Votes.updateOne(
        { id: voteid },
        { $setOnInsert: { id: voteid, votes: 0 } },
        { upsert: true }
      );
    } catch (error) {
      console.error('Error:', error);
    }
  });
});


app.get('/votes/:id', async(req,res)=>{
  const voteid = req.params.id;
    try {
      const image = await Votes.findOne({ id: voteid });
      if (!image) {
        return res.status(404).send("Image not found");
      }

      // Update the votes count
      const Votesupdated = await Votes.findOneAndUpdate(
        { id: voteid },
        { $set: { votes: image.votes + 1 } },
        { new: true } // Return the updated document
      );
      res.send("votes increased");

      
      }catch (error) {
        res.status(500).send("Internal server error");
      }
  }      
)

app.get('/leaderboard', async (req, res) => {
  try {
    const gals = await Votes.find()
      .sort({ votes: -1 })

    res.json(gals);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Error fetching leaderboard' }); // Send an error response with a 500 status code
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
