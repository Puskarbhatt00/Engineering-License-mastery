import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/Progress.css';

const Progress = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch('/api/results', { credentials: 'include' });
        if (!response.ok) {
          throw new Error('Failed to fetch progress data');
        }
        const data = await response.json();
        const chartData = data.map(item => ({
          timestamp: new Date(item.createdAt).toLocaleDateString(),
          score: item.score
        }));
        setProgressData(chartData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  if (loading) return <div className="progress-container">Loading progress...</div>;
  if (error) return <div className="progress-container">Error: {error}</div>;

  return (
    <div className="progress-container">
      <h2>Growth Trajectory</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={progressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Progress;
