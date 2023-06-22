import { useState } from 'react';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import IconButton from '@mui/material/IconButton';

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
      <IconButton color={isLiked ? 'primary' : 'default'} onClick={handleLike}>
        <ThumbUpAltIcon />
      </IconButton>
      <span>{likeCount}</span>
    </div>
  );
};

export default ThumbsUp;