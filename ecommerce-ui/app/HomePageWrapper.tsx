// app/HomePageWrapper.tsx
import HomePage from '../components/HomePage';
import mockData from './mocks/mockGames.json';

async function getGames() {
  if (process.env.NODE_ENV === 'development') {
    return mockData;
  }

  const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  const res = await fetch(`https://api.rawg.io/api/games?ordering=-released&page_size=8&key=${API_KEY}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch games from RAWG API");
  }

  const data = await res.json();
  return data.results;
}

export default async function HomePageWrapper() {
  const games = await getGames();
  return <HomePage games={games} />;
}
