import { Star } from "lucide-react";
import { Review } from "@/types";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="card p-5">
      {/* Rating Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={18}
            className={
              index < review.rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }
          />
        ))}
      </div>

      {/* Review Content */}
      <p className="text-text-secondary mb-4 line-clamp-3">{review.content}</p>

      {/* Reviewer Info */}
      <div className="flex items-center justify-between text-sm">
        <div>
          <span className="font-medium text-text-primary">{review.userName}</span>
          <span className="text-text-muted mx-2">|</span>
          <span className="text-text-muted">{review.productName}</span>
        </div>
        <span className="text-text-muted">{review.createdAt}</span>
      </div>
    </div>
  );
}
