import axios from 'axios';
import { useState, useEffect } from 'react';
import CoolButton from '../components/CoolButton';

export default function test() {
    const [a, setA] = useState(null);

/*     useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/auth/test`, { withCredentials: true });
                setA(response.data.message);
            } catch (error) {
                console.error(error);
            }
        };

        fetchReview();
    }, []);
 */

    return (
        <div>
            <CoolButton  ></CoolButton>
        </div>
    );
}