import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/StarDistribution.module.css';

const StarDistribution = (props) => {
  axios.defaults.withCredentials = true;
  const [starDistribution, setStarDistribution] = useState(null);
  const [totalReview, setTotalReview] = useState(0);

  useEffect(() => {
    const fetchDistribution = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/business/${props.bid}/starDistribution`);
            console.log(response.data);
            setStarDistribution([response.data.starDistribution.zeroStar, response.data.starDistribution.oneStar, 
              response.data.starDistribution.twoStar, response.data.starDistribution.threeStar,
              response.data.starDistribution.fourStar, response.data.starDistribution.fiveStar]);
            setTotalReview(response.data.starDistribution.zeroStar + response.data.starDistribution.oneStar + response.data.starDistribution.twoStar +
              response.data.starDistribution.threeStar + response.data.starDistribution.fourStar + response.data.starDistribution.fiveStar);
        } catch (error) {
            console.error(error);
        }
    };

    fetchDistribution();
}, []);

  return (
    <div>
      {starDistribution? (
        <div>
          <h3>Star Distribution</h3>
          <p> Total ratings: {totalReview} </p>
          <div className={styles.starDistribution}>
            {starDistribution.map((count, index) => (
              <div key={index} className={styles.star}>
                <div className={styles.starFilled} style={{ width: `${count / totalReview}%` }}></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p> loading ... </p>
      )}
    </div>
  );
};

export default StarDistribution;