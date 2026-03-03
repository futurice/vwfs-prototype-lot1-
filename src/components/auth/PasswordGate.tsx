import { useState, useEffect, type FormEvent } from 'react';

// SHA-256 hash of the access password
// Regenerate with: echo -n "YourPassword" | shasum -a 256
const PASSWORD_HASH = 'fec7e4e7674d3e99a2ebdfedf540599b21c6865b15804da1c5007e357aaf2d03';

const SESSION_KEY = 'vwfs-auth';

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

interface PasswordGateProps {
  children: React.ReactNode;
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    const hashed = await hashPassword(password);
    if (hashed === PASSWORD_HASH) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setAuthenticated(true);
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  }

  if (checking) return null;
  if (authenticated) return <>{children}</>;

  return (
    <div className="min-h-screen bg-vwfs-surface flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-card w-full max-w-sm p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-vwfs-brand tracking-wide">VWFS</h1>
          <p className="text-sm text-vwfs-text/60 mt-1">Performance Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="gate-password" className="block text-sm font-medium text-vwfs-text mb-1">
              Password
            </label>
            <input
              id="gate-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Enter access password"
              autoFocus
              autoComplete="off"
            />
          </div>

          {error && <p className="text-vwfs-error text-sm font-medium">{error}</p>}

          <button type="submit" className="btn-primary w-full">
            Access Platform
          </button>
        </form>

        <p className="text-xs text-vwfs-text/40 text-center mt-6">Prototype access only</p>
      </div>
    </div>
  );
}
