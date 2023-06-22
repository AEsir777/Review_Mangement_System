import { useState } from 'react';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const ThumbsUp = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div>
      <Button variant="outlined" startIcon={<ThumbUpIcon />}>
        800
      </Button>
    </div>
  );
};

export default ThumbsUp;