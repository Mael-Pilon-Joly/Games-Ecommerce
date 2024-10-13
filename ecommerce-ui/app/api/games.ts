// pages/api/games.ts
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// Helper function to fetch game by ID
async function fetchGameById(id: string) {
  return await axios.get(`https://api.rawg.io/api/games/${id}`, {
    params: { key: process.env.RAWG_API_KEY },
  });
}

// Helper function to fetch games by genre
async function fetchGamesByGenre(genre: string) {
  return await axios.get(`https://api.rawg.io/api/games`, {
    params: { genres: genre, key: process.env.RAWG_API_KEY },
  });
}

// Helper function to fetch games with date and pagination
async function fetchGames(date: string, page: number, page_size: number) {
  return await axios.get(`https://api.rawg.io/api/games`, {
    params: { dates: date, page, page_size, key: process.env.RAWG_API_KEY },
  });
}

// Main handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, genre, date, page = 1, page_size = 20 } = req.query;

  try {
    if (id) {
      // If `id` is provided, fetch game by ID
      const response = await fetchGameById(id as string);
      return res.status(200).json(response.data);
    } else if (genre) {
      // If `genre` is provided, fetch games by genre
      const response = await fetchGamesByGenre(genre as string);
      return res.status(200).json(response.data);
    } else {
      // If neither `id` nor `genre` is provided, fetch games with optional date, page, and page_size
      const response = await fetchGames(date as string, Number(page), Number(page_size));
      return res.status(200).json(response.data);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data.' });
  }
}
