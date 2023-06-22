import styles from '../styles/login.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                email: email,
                pwd: password
            }, { withCredentials: true });

            // Handle response or redirect to another page
            router.push("/review/1");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
             <div className={styles.formContainer}>
            <h1 className={styles.title}>Login</h1> <br />
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={handleEmailChange} 
                        required
                        className={styles.input} 
                    />
                </div>
                <div className={styles.inputGroup}> 
                    <label className={styles.label}>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={handlePasswordChange} 
                        required 
                        className={styles.input} 
                    />
                </div>
                <button type="submit" className={styles.button}>Login</button>
            </form>
            </div>
        </div>
    );
};