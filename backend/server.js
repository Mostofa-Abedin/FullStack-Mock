import http from 'http';
import app from './index.js'; // Ensure the file extension is included

const PORT = process.env.PORT || 5000;

// Start the server ONLY if not in test mode
if (process.env.NODE_ENV !== 'test') {
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}
