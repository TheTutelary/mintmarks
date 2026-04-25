export const getApiUrl = (path: string) => {
  // 1. Check for manual override in localStorage (Handy for testing published site vs local API)
  if (typeof window !== 'undefined') {
    const override = localStorage.getItem('MINTMARKS_API_OVERRIDE');
    if (override) {
      return `${override.replace(/\/$/, '')}${path}`;
    }
  }

  // 2. Check for environment variable (Production Build)
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl) {
    return `${envUrl.replace(/\/$/, '')}${path}`;
  }

  // Fallback to dynamic local resolution (Development/LAN testing)
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  
  // Note: Most production environments use HTTPS on port 443, 
  // but for local testing we use port 4000.
  // If we are on a public domain (github.io), we shouldn't be using port 4000.
  const isLocal = hostname === 'localhost' || hostname.startsWith('192.168.') || hostname.startsWith('127.0.0.');
  const port = isLocal ? ':4000' : '';
  const protocol = isLocal ? 'http' : 'https';

  return `${protocol}://${hostname}${port}${path}`;
};
