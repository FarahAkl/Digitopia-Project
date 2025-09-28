import { useState } from "react";
import Star from "./Star";

interface IProps {
  maxRating: number;
  color: string;
  size: number;
  onSetRating: (rating: number) => void;
}

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  onSetRating,
}: IProps) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating: number) {
    setRating(rating);
    onSetRating(rating);
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-1">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => {
              setTempRating(i + 1);
            }}
            onHoverOut={() => {
              setTempRating(0);
            }}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p className={`text-[${size / 1.5}px] m-0 leading-0 ${color}`}>
        {tempRating || rating || ""}
      </p>
    </div>
  );
}
