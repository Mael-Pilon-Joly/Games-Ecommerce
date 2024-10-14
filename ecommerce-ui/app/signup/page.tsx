'use client';

import { useState } from 'react';
import styles from './Signup.module.css';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [errors, setErrors] = useState({ email: '', username: '', password: '' });

    const validateEmail = async (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return 'Please enter a valid email address';
        }
    
        // Check if email is unique
        try {
            const response = await fetch(`https://localhost:5001/api/auth/check-email?email=${email}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
          const data = await response.json();
          return data.isUnique ? '' : 'Email is already taken';
        } catch (error) {
          return 'Error validating email';
        }
      };

      const handleEmailBlur = async () => {
        const emailError = await validateEmail(email);
        setErrors((prev) => ({ ...prev, email: emailError }));
      };
      
    
      const validateUsername = async (username: string) => {
        if (username.trim() === '') {
          return 'Username is required';
        }
    
        // Check if username is unique
        try {
            const response = await fetch(`https://localhost:5001/api/auth/check-username?username=${username}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
          const data = await response.json();
          return data.isUnique ? '' : 'Username is already taken';
        } catch (error) {
          return 'Error validating username';
        }
      };

      const handleUsernameBlur = async () => {
        const usernameError = await validateUsername(username);
        setErrors((prev) => ({ ...prev, username: usernameError }));
      };

      const validatePassword = (password: string) => {
        const errors = [];
        if (password.length < 8) {
          errors.push('Password must be at least 8 characters long');
        }
        if (!/[A-Z]/.test(password)) {
          errors.push('Password must have at least one uppercase letter');
        }
        if (!/[0-9]/.test(password)) {
          errors.push('Password must have at least one digit');
        }
        if (!/[^a-zA-Z0-9]/.test(password)) {
          errors.push('Password must have at least one non-alphanumeric character');
        }
        return errors.join(', ');
      };

      const handlePasswordBlur = (e: any) => {
        const value = e.target.value;
        setPassword(value);
        setErrors((prevErrors) => ({ ...prevErrors, password: validatePassword(value) }));
      };

      const handleSubmit = async (e: any) => {
        e.preventDefault();
    
        const emailError = await validateEmail(email);
        const usernameError = await validateUsername(username);
        const passwordError = validatePassword(password);
    
        if (emailError || usernameError || passwordError) {
          setErrors({ email: emailError, username: usernameError, password: passwordError });
          return;
        }
    
        // Proceed with sign-up logic
        try {
          const response = await fetch('https://localhost:5001/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password }),
          });
          const data = await response.json();
          if (data.success) {
            // Handle successful signup (e.g., redirect or show success message)
            console.log("Success: " + data);
            setSignupSuccess(true);
        } else {
            // Handle signup failure
            console.error("Error: " + data);
          }
        } catch (error) {
          console.error('Error during sign-up:', error);
        }
      };

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
         {signupSuccess ? (
          // Success message and "Sign In" button
          <div className={styles.successMessage}>
            <h2>Successful account creation!</h2>
            <button onClick={() => window.location.href = '/login'}>Sign In</button>
          </div>
        ) : (
        <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={handleUsernameBlur}
            />
            {errors.username && <span className={styles.error}>{errors.username}</span>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>

          <button type="submit">Sign Up</button>
          </form>
          </div>
        )}
      </div>
      
      <div className={styles.rightSection}></div>
    </div>
  );
}
