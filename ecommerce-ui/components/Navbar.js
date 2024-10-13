import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <h1 className={styles.logo}>Game Hub</h1>
        <ul className={styles.navLinks}>
          <li><Link href="/signin">Sign in</Link></li>
          <li><Link href="/signup">Sign up</Link></li>
          <li><Link href="/explore">Explore games</Link></li>
          <li><Link href="/about">About us</Link></li>
          <li><Link href="/contact">Contact</Link></li> 
        </ul>
      </div>
    </nav>
  );
}