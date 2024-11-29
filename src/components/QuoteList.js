import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const QuoteList = ({token: passedToken}) => {
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuotes();
  }, [offset]);

  const fetchQuotes = async () => {
    if (!hasMore) return;

    try {
      const response = await axios.get(
        `https://assignment.stage.crafto.app/getQuotes?limit=20&offset=${offset}`,
        {
          headers: { Authorization: passedToken },
        }
      );
      console.log(response)
      const quotesData = response.data.data; // Adjust this based on API structure
    if (!Array.isArray(quotesData) || quotesData.length === 0) {
      setHasMore(false); // Stop pagination if no more data
    } else {
      setQuotes((prev) => [...prev, ...quotesData]); // Append new quotes to existing ones
    }
  } catch (error) {
    console.error('Error fetching quotes:', error);
  }
  };

  const handleCreateQuote = () => {
    // Navigate to QuoteCreationPage (to be implemented)
    navigate('/createQuote',{ state: { token: passedToken } });
  };

  return (
    <div className="quote-list-page">
      <div className="quote-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
  {quotes.map((quote, index) => (
    <div
      key={index}
      className="quote-item border rounded p-4 shadow bg-white flex flex-col items-center"
    >
      <img
        src={quote.mediaUrl}
        alt="Quote"
        className="w-[200px] h-[200px] rounded mb-4"
      />
      <div className="text-center text-xl font-bold mb-2">{quote.text}</div>
      <p className="text-gray-600">- {quote.username}</p>
      <p className="text-gray-400 text-sm">{quote.created_at}</p>
    </div>
  ))}
</div>
      {hasMore && (
        <button
          onClick={() => setOffset((prev) => prev + 20)}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
        >
          Load More
        </button>
      )}
      <button
        onClick={handleCreateQuote}
        className="floating-action-button bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-700"
      >
        Create Quote
      </button>
    </div>
  );
}

  export default QuoteList;