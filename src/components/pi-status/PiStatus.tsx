'use client';
import { useState } from 'react';
import './pi-status.css';

export default function PiStatusPage() {
  const [isOnline, setIsOnline] = useState<boolean | null>(true);

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Raspberry Pi Status Monitor</h1>

        <div className="status-card">
          <div className="status-indicator">
            <div
              className={`status-dot ${
                isOnline === null ? 'checking' : isOnline ? 'online' : 'offline'
              }`}
            />
            <span className="status-text">
              {isOnline === null
                ? 'Checking status...'
                : isOnline
                ? 'Raspberry Pi is Online'
                : 'Raspberry Pi is Offline'}
            </span>
          </div>
        </div>

        <div className="instructions">
          <h2 className="instructions-title">Connection Instructions</h2>
          <div className="code-block">
            {`# Open terminal and enter these commands:

ssh raspberrypi@msaber.duckdns.org  # remote access using ssh
yes         # just type yes :)
raspberrypi # password`}
          </div>
          <div className="notes">
            <p>Notes:</p>
            <ul className="notes-list">
              <li>Make sure you're connected to the internet</li>
              <li>The password is case-sensitive</li>
              <li>If you can't connect, check if the Pi is online</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
