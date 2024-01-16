import { Models } from "appwrite";
import UserPortfolioImages from "./UserPortfolioImages";

interface UserPortfolioProps {
  portfolio: {
    $id: string;
    imageUrl: string;
    caption: string;
    location: string;
    $createdAt: string;
    postId: string;
    portfolios: Models.Document;
  }[];
  id: string;
}

const UserPortfolio: React.FC<UserPortfolioProps> = ({ portfolio, id }) => {
  return (
    <div className="portfolio-grid">
      {portfolio?.map((post, index) => (
        <UserPortfolioImages
          key={index}
          caption={post.caption}
          location={post.location}
          imageUrl={post.imageUrl}
          $createdAt={post.$createdAt}
          postId={post.$id}
          id={id}
        />
      ))}
    </div>
  );
};

export default UserPortfolio;
