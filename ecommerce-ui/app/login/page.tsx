import styles from './Login.module.css';

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.formCard}>
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign In</button>
          <div className={styles.links}>
            <a href="/forgot-password" className={styles.link}>Forgot password?</a>
            <a href="/signup" className={styles.link}>New here? Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
}