import { IoMdStar } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";

const ReviewCard = ({ image, name, text, ratings}) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center px-5 py-2 w-[250px] shrink-0 rounded-md shadow border border-blue-200">
      <img src={image} alt='picture' className='object-cover rounded-full' />
      <h5 className="font-bold">{name}</h5>
      <p className="text-center whitespace-normal break-words text-sm">{text}</p>
      <div className="flex items-center">
        {Array(ratings).fill().map((_, i)=>(
            <IoMdStar key={i} className="text-yellow-500" />
        ))}
        {Array(5-ratings).fill().map((_, i)=>(
            <IoMdStarOutline key={i} className="text-black" />
        ))}
        <span className="text-sm ml-2 font-medium">({ratings}/5)</span>
      </div>
    </div>
  )
}

export default ReviewCard
