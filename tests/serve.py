"""No-cache static server for local development and testing."""
import http.server
import socketserver
import os

PORT = 8767
# Serve from the project root (one level up from tests/)
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        '.js': 'text/javascript',
        '.mjs': 'text/javascript',
        '.css': 'text/css',
        '.webmanifest': 'application/manifest+json',
        '.json': 'application/json',
        '.svg': 'image/svg+xml',
        '.webp': 'image/webp',
    }

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()


class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True


if __name__ == '__main__':
    with ReusableTCPServer(('', PORT), NoCacheHandler) as httpd:
        print(f'WinTools dev server running at http://localhost:{PORT}/ (no-cache)')
        httpd.serve_forever()
