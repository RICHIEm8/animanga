import express from 'express';
import axios from 'axios';
import { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors());

app.use('/search/:category/:query', async (req: Request, res: Response) => {
  try {
    const searchResult = await axios.get(
      `https://api.jikan.moe/v3/search/${req.params.category}?q=${req.params.query}&limit=5`
    );

    return res.status(200).send(searchResult.data.results);
  } catch (error) {
    console.log('Error', error);
    res.status(500).send(error);
  }
});

app.use('/top/:category/:page/:subtype?', async (req: Request, res: Response) => {
  try {
    const topResult = await axios.get(
      `https://api.jikan.moe/v3/top/${req.params.category}/${req.params.page}/${
        req.params.subtype ?? ''
      }`
    );

    return res.status(200).send(topResult.data.top);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.use('/:category/:id/:request?', async (req: Request, res: Response) => {
  try {
    const singleResult = await axios.get(
      `https://api.jikan.moe/v3/${req.params.category}/${req.params.id}/${req.params.request ?? ''}`
    );

    return res.status(200).send(singleResult.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.use('/season', async (req: Request, res: Response) => {
  try {
    const seasonResult = await axios.get(`https://api.jikan.moe/v3/season`);
    return res.status(200).send(seasonResult.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.use('/', async (req: Request, res: Response) => {
  try {
    const seasonResult = await axios.get(`https://api.jikan.moe/v3/schedule`);
    return res.status(200).send(seasonResult.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost${port}`);
});
