import React, { useState, useEffect } from 'react';
import { Sun, Moon, CloudRain, Snowflake, Sparkles } from 'lucide-react';

export default function WeatherSync() {
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night'>('day');
  const [weather, setWeather] = useState<'sunny' | 'rainy' | 'snowy'>('sunny');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 19 || hour < 6) {
      setTimeOfDay('night');
    } else {
      setTimeOfDay('day');
    }
  }, []);

  return (
    <div
      style={{
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '20px 24px',
        maxWidth: '440px',
        width: '100%',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ fontSize: '2rem' }}>
          {timeOfDay === 'day' ? (weather === 'rainy' ? '🌧️' : weather === 'snowy' ? '❄️' : '☀️') : '🌙'}
        </div>
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>
            {timeOfDay === 'day' ? 'Daytime Companion Mode' : 'Cozy Nightfall Mode'}
          </h4>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            Environment: <strong style={{ color: '#f59e0b' }}>{weather.toUpperCase()}</strong>
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '6px' }}>
        <button
          onClick={() => setWeather('sunny')}
          style={{
            padding: '6px',
            borderRadius: '8px',
            background: weather === 'sunny' ? 'rgba(245, 158, 11, 0.25)' : '#0f172a',
            border: `1px solid ${weather === 'sunny' ? '#f59e0b' : '#334155'}`,
            color: '#fff',
            cursor: 'pointer'
          }}
          title="Sunny"
        >
          <Sun size={16} color="#f59e0b" />
        </button>

        <button
          onClick={() => setWeather('rainy')}
          style={{
            padding: '6px',
            borderRadius: '8px',
            background: weather === 'rainy' ? 'rgba(59, 130, 246, 0.25)' : '#0f172a',
            border: `1px solid ${weather === 'rainy' ? '#3b82f6' : '#334155'}`,
            color: '#fff',
            cursor: 'pointer'
          }}
          title="Rainy"
        >
          <CloudRain size={16} color="#3b82f6" />
        </button>

        <button
          onClick={() => setWeather('snowy')}
          style={{
            padding: '6px',
            borderRadius: '8px',
            background: weather === 'snowy' ? 'rgba(16, 185, 129, 0.25)' : '#0f172a',
            border: `1px solid ${weather === 'snowy' ? '#10b981' : '#334155'}`,
            color: '#fff',
            cursor: 'pointer'
          }}
          title="Snowy"
        >
          <Snowflake size={16} color="#38bdf8" />
        </button>
      </div>
    </div>
  );
}
