// app/page.js or app/home/page.js (Client Component)

'use client';

import 'react-multi-carousel/lib/styles.css';
import HomePageWrapper from './HomePageWrapper';
export interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string;
}

export default function Page() {
  return <HomePageWrapper />;
}

