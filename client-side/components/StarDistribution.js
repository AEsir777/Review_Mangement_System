import { useState, useEffect } from 'react';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import styles from '../styles/StarDistribution.module.css';
import { Box, Rating, Typography } from '@mui/material';

const StarDistribution = (props) => {
  axios.defaults.withCredentials = true;
  const [starDistribution, setStarDistribution] = useState(null);
  const [totalReview, setTotalReview] = useState(0);

  useEffect(() => {
    const fetchDistribution = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/business/${props.bid}/starDistribution`);
            setStarDistribution([response.data.starDistribution.fiveStar, response.data.starDistribution.fourStar, 
              response.data.starDistribution.threeStar, response.data.starDistribution.twoStar,
              response.data.starDistribution.oneStar]);
            setTotalReview(response.data.starDistribution.zeroStar + response.data.starDistribution.oneStar + response.data.starDistribution.twoStar +
              response.data.starDistribution.threeStar + response.data.starDistribution.fourStar + response.data.starDistribution.fiveStar);
        } catch (error) {
            console.error(error);
        }
    };

    fetchDistribution();
}, []);

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#34cea9' : '#308fe8',
  },
}));

  return (
    <div>
      {starDistribution? (
        <div>
          <h3>Star Distribution</h3>
          <Box
            sx={{
              width: 200,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Rating value={props.avg} readOnly precision={0.1} />
            <Box sx={{ ml: 1 }}>{Math.round(props.avg * 10) / 10} out of 5</Box>
          </Box>
          <p className={styles.total}> Total ratings: {totalReview} </p>
          <div className={styles.starDistribution}>
            {starDistribution.map((count, index) => (
              <div key={5 - index} className={styles.star}>
                <Box display="flex" alignItems="center">
                  <Box>
                  <Typography className={styles.text}>{5 - index} stars</Typography>
                  </Box>
                  <Box width="80%">
                  <BorderLinearProgress variant="determinate" value={Math.round(count / totalReview * 100)} className={styles.bar} />
                  </Box>
                  <Box>
                    <Typography className={styles.text}>{Math.round(count / totalReview * 100)}%</Typography>
                  </Box>
                </Box>
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