import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Login() {
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete('http://localhost:3000/api/auth/logout', {withCredentials: true});

            // Handle response or redirect to another page
            router.push("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button type="submit" onClick={handleSubmit}>Logout</button>
        </div>
    );
};