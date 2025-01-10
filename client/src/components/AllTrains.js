import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TrainList.css"; // We'll create this next

const TrainList = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/trains/all");
      if (response.data.success) {
        setTrains(response.data.trains);
      } else {
        setError("Failed to fetch trains");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching trains");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading trains...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="train-list-container">
      <h2>Available Trains</h2>
      {trains.length === 0 ? (
        <p>No trains available</p>
      ) : (
        <div className="train-grid">
          {trains.map((train) => (
            <div key={train.id} className="train-card">
              <h3>Train #{train.train_number}</h3>
              <div className="train-details">
                <p>
                  <strong>From:</strong> {train.source}
                </p>
                <p>
                  <strong>To:</strong> {train.destination}
                </p>
                <p>
                  <strong>Total Seats:</strong> {train.total_seats}
                </p>
                <p>
                  <strong>Available Seats:</strong> {train.available_seats}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainList;
