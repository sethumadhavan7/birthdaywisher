import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BirthdayWishes = () => {
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    const fetchWishes = async () => {
      const response = await axios.get('http://localhost:5000/wishes');
      setWishes(response.data);
    };
    fetchWishes();
  }, []);

  return (
    <div>
      <h2>Birthday Wishes</h2>
      <ul>
        {wishes.map((wish, index) => (
          <li key={index}>{wish}</li>
        ))}
      </ul>
    </div>
  );
};

export default BirthdayWishes;
