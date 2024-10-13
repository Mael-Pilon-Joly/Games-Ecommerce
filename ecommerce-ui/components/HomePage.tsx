// components/HomePage.tsx
'use client';

import { motion } from 'framer-motion';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './HomePage.module.css';

export interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string;
}

export default function HomePage({ games }: { games: Game[] }) {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.overlay}></div>
      <motion.h1
        className={styles.heroTitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        Be a Hero
      </motion.h1>

      <motion.p
        className={styles.heroSubtitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1.5 }}
      >
        Discover new games and embark on your adventure
      </motion.p>

      <div className={styles.carouselContainer}>
        <h2>Recently Released Games</h2>
       {/*  <Carousel
          additionalTransfrom={0}
          arrows
          autoPlay={false}
          autoPlaySpeed={3000}
          centerMode={false}
          containerClass="container-with-dots"
          draggable
          keyBoardControl
          minimumTouchDrag={80}
          responsive={{
            desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
            tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
            mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
          }}
          slidesToSlide={1}
          swipeable
        >
          {games.map((game) => (
            <div key={game.id} className={styles.gameCard}>
              <img src={game.background_image} alt={game.name} className={styles.gameImage} />
              <h3>{game.name}</h3>
              <p>Released on: {game.released}</p>
            </div>
          ))}
        </Carousel> */}
      </div>
    </div>
  );
}
