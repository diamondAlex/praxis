#Man python servers are so weird, why would they write it like that
from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import chess

hostName = "localhost"
serverPort = 8080
board = chess.Board()

class MyServer(BaseHTTPRequestHandler):
    #set cors headers
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super(MyServer, self).end_headers()

    #handle get
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(bytes("<div> sup </div>", "utf-8"))

    #handle post
    def do_POST(self):
        print("IN do_POST")
        length = int(self.headers.get('content-length'))
        print(length)
        data = self.rfile.read(length).decode('utf-8')
        print(data)
        legal_moves = list(board.legal_moves)
        if chess.Move.from_uci(data) in legal_moves:
            print("legal")
        else:
            print("not legal")
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(bytes("hi", "utf-8"))

if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))
    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
