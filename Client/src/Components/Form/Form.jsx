import { useState } from "react";
import "./Form.css";
import useFetchCountries from "./fetchCountries";

export default function ReviewForm() {
  const [roaster, setRoaster] = useState("");
  const [country, setCountry] = useState("");
  const [processing, setProcessing] = useState("");
  const [score, setScore] = useState(1);
  const [comments, setComments] = useState("");
  const { countries } = useFetchCountries(); // Removed isLoading and error
  const processings = ["Natural", "Washed", "Anaerobic"];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roaster,
        country_id: country,
        process: processing,
        score,
        comments,
      }),
    });

    const data = await response.json();
    console.log("Review submitted successfully:", data);
    alert("Review Submitted successfully");

    setRoaster("");
    setCountry("");
    setProcessing("");
    setScore(1);
    setComments("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="roaster">Roaster:</label>
          <input
            type="text"
            id="roaster"
            value={roaster}
            onChange={(e) => setRoaster(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="processing">Processing:</label>
          <select
            id="processing"
            value={processing}
            onChange={(e) => setProcessing(e.target.value)}
          >
            <option value="">Select Processing</option>
            {processings.map((processing) => (
              <option key={processing} value={processing}>
                {processing}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="score">Score (1-5):</label>
          <input
            type="number"
            id="score"
            min="1"
            max="5"
            value={score}
            onChange={(e) => setScore(parseInt(e.target.value) || 1)}
          />
        </div>

        <div>
          <label htmlFor="comments">Comments:</label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
