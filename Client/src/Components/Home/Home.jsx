import { useState, useEffect } from "react";
import "./Home.css"; // Ensure you import the CSS file

function Home() {
  const [reviews, setReviews] = useState([]);
  const [countries, setCountries] = useState({});

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsResponse = await fetch("https://coffee-review-app.onrender.com/reviews");
      const reviewsData = await reviewsResponse.json();

      const countryPromises = reviewsData.map((review) =>
        fetch(`https://coffee-review-app.onrender.com/countries/${review.country_id}`).then(
          (response) => response.json()
        )
      );

      const countriesData = await Promise.all(countryPromises);
      const countriesMap = {};
      countriesData.forEach((country) => {
        countriesMap[country.id] = country.country;
      });

      setCountries(countriesMap);
      setReviews(reviewsData);
    };

    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`https://coffee-review-app.onrender.com/reviews/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setReviews(reviews.filter((review) => review.id !== id));
    } else {
      console.error("Failed to delete review");
    }
  };

  return (
    <div>
      <h1>All Reviews</h1>
      <div>
        {reviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              <h3>{review.roaster}</h3>
              <div className="review-fields">
                <p className="review-field">
                  Country: {countries[review.country_id] || "Loading..."}
                </p>
                <p className="review-field">Process: {review.process}</p>
                <p className="review-field">Score: {review.score}</p>
                <p className="review-field">Comments: {review.comments}</p>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(review.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
