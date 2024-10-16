import Link from 'next/link';
import styles from './Navbar.module.css';
import logo from '../public/navbar-logo.png';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Link href="/" className={styles.logoContainer}>
          <Image className={styles.logo} src={logo} alt="Game Hub Logo" width={50} height={50} />
          <span className={styles.gamehub}>Game Hub</span>
        </Link>
        <ul className={styles.navLinks}>
          <li><Link href="/login">Sign in</Link></li>
          <li><Link href="/signup">Sign up</Link></li>
          <li><Link href="/explore">Explore games</Link></li>
          <li><Link href="/about">About us</Link></li>
          <li><Link href="/contact">Contact</Link></li> 
        </ul>
      </div>
    </nav>
  );
}