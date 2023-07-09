import { useState } from 'react';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const CoolButton = (props) => {
  const [coolCount, setCoolCount] = useState(props.coolCount);
  const [isCooled, setIsCooled] = useState(props.isCooled);

  const handleClick = () => {
    if ( isCooled ) {
      setCoolCount(coolCount - 1);
      setIsCooled(!isCooled);
      props.onClick();
    } else {
      setCoolCount(coolCount + 1);
      setIsCooled(!isCooled);
      props.onClick();
    }
  };

  return (
    <div>
      {isCooled ? (
        <Button onClick={handleClick} variant="outlined" startIcon={<ThumbUpIcon />}>
          {coolCount}
        </Button>
      ) : (
        <Button onClick={handleClick} startIcon={<ThumbUpIcon />}>
          {coolCount}
        </Button>
      )}
    </div>
  );
};

export default CoolButton;