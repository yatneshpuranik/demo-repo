// 
import { FaStar , FaStarHalfAlt , FaRegStar } from 'react-icons/fa'

const Rating = ({ value, text }) => (
  <div className='rating' >
    {[1,2,3,4,5].map(i => (
      <span key={i}>
        {value >= i ? <FaStar /> : value >= i-0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
      </span>
    ))}
    <span className='rating-text'>{text}</span>
  </div>
);

export default Rating;
