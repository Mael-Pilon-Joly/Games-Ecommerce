// components/HomePage.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './HomePage.module.css';
import mockData from '../app/mocks/MockGames.json';

export interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string;
}

export default function HomePage() {
  const [recentGames, setRecentGames] = useState<any| null>(null);
  const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  console.log("HomePage component rendered");

  useEffect(() => {
    async function fetchRecentGames() {
      console.log("useEffect called");
      try {
        if (process.env.NODE_ENV === 'development') {
          setRecentGames(mockData.results); // Set mock data in development mode
          return;
        }

        const res = await fetch(`https://api.rawg.io/api/games?ordering=-rating&page_size=8&key=${API_KEY}`);
        if (!res.ok) throw new Error('Failed to fetch data from RAWG API');

        const data = await res.json();
        setRecentGames(data.results); // Assuming API data structure has a 'results' field
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    }
    fetchRecentGames();
  }, []);

  return (
    <>
      <div className={styles.heroContainer}>
        <div className={styles.overlay}>
        <motion.h1
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 45 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          Be a Hero
        </motion.h1>

        <motion.p
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 45 }}
          transition={{ duration: 1.5, delay: 1.5 }}
        >
          Discover new games and embark on your adventure
        </motion.p>
        </div>
       
      </div>
    
    
      {recentGames && recentGames.length > 0 && (
         <div className={styles.contentSection}>
         <h2 className={styles.sectionTitle}>Most Acclaimed Games</h2>
         <div className={styles.carouselContainer}>
          <Carousel
            additionalTransfrom={0}
             arrows
             autoPlaySpeed={3000}
             centerMode={false}
             className=""
             containerClass="container-with-dots"
             dotListClass=""
             draggable
             focusOnSelect={false}
             infinite
             itemClass=""
             keyBoardControl
             minimumTouchDrag={80}
             pauseOnHover
             renderArrowsWhenDisabled={false}
             renderButtonGroupOutside={false}
             renderDotsOutside={false}
             responsive={{
               desktop: {
                 breakpoint: {
                   max: 3000,
                   min: 1024
                 },
                 items: 3,
                 partialVisibilityGutter: 40
               },
               mobile: {
                 breakpoint: {
                   max: 464,
                   min: 0
                 },
                 items: 1,
                 partialVisibilityGutter: 30
               },
               tablet: {
                 breakpoint: {
                   max: 1024,
                   min: 464
                 },
                 items: 2,
                 partialVisibilityGutter: 30
               }
             }}
             rewind={false}
             rewindWithAnimation={false}
             rtl={false}
             shouldResetAutoplay
             showDots={false}
             sliderClass=""
             slidesToSlide={1}
             swipeable
           >

            {recentGames.map((game: any) => (
              <div key={game.id} className={styles.gameCard}>
                <img src={game.background_image} alt={game.name} className={styles.gameImage} />
                <h3>{game.name}</h3>
                <p>Released on: {game.released}</p>
              </div>
            ))}
          </Carousel>
          </div>
          </div>
          )}
          </>
  );
}
