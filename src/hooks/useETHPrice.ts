import { useState, useEffect } from 'react';

export const useETHPrice = () => {
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        setPrice(data.ethereum.usd);
        setError(null);
      } catch (err) {
        setError('Failed to fetch ETH price');
        // Fallback mock price
        setPrice(2500 + Math.random() * 100);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return { price, loading, error };
};