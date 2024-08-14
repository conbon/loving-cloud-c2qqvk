import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

const NyxAssistant = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [nyxClient, setNyxClient] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const client = process.env.NYX_CLIENT;
    setNyxClient(client);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (nyxClient) {
      try {
        const response = await fetch(nyxClient, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });
        const data = await response.json();
        setResponse(data.message);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="h-screen flex flex-col justify-between"
      style={{ backgroundColor: 'rgb(240, 242, 245)' }}
    >
      <h1 className="text-3xl font-bold text-gray-900 text-center p-4">
        Nyx. Assistant
      </h1>
      <div className="flex-1 overflow-y-auto p-4">
        {response && (
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="text-gray-600">{response}</p>
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center p-4 border-t border-gray-200"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question..."
          className="w-full p-2 pl-10 text-sm text-gray-700"
        />
        {loading ? (
          <div className="ml-2">
            <svg
              className="animate-spin h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        ) : (
          <button type="submit" className="ml-2">
            <Send size={24} color="blue" />
          </button>
        )}
      </form>
    </div>
  );
};

export default NyxAssistant;