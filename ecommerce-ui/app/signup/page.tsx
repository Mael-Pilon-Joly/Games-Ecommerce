import styles from './Signup.module.css';

export default function SignupPage() {
  return (
    <div className={styles.signupPage}>
      <div className={styles.leftSection}>
        <div className={styles.gradientLineContainer}>
          <div className={styles.lineTop}></div>
          <div className={styles.imageWrapper}>
            <img
              src="/angular-auth-logo.png" 
              alt="Middle Image"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className={styles.lineBottom}></div>
        </div>
      </div>

      <div className={styles.centerSection}>
        <h2>Sign Up</h2>
        <form>
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className={styles.rightSection}></div>
    </div>
  );
}
