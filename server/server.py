#Man python servers are so weird, why would they write it like that
from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import chess
import chess.engine
engine = chess.engine.SimpleEngine.popen_uci(r"server/stockfish7")

hostName = "localhost"
serverPort = 8081


class MyServer(BaseHTTPRequestHandler):
    #set cors headers
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super(MyServer, self).end_headers()

    #handle get
    def do_POST(self):
        self.find_move()

    #handle post
    # def do_POST(self):

    def find_move(self):
        length = int(self.headers.get('content-length'))
        data = self.rfile.read(length).decode('utf-8')
        board = chess.Board(data)
        move = engine.play(board, chess.engine.Limit(time=0.1))
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        print(move.move.uci())
        self.wfile.write(bytes(move.move.uci(), "utf-8"))

if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))
    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
