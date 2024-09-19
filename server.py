import os
import shutil
from http.server import HTTPServer, SimpleHTTPRequestHandler
import cgi
import json

class UploadHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Используем функциональность SimpleHTTPRequestHandler для обработки GET-запросов
        super().do_GET()

    def do_POST(self):
        try:
            form = cgi.FieldStorage(
                fp=self.rfile,
                headers=self.headers,
                environ={'REQUEST_METHOD': 'POST', 'CONTENT_TYPE': self.headers['Content-Type']}
            )

            destination_folder = form['destinationFolder'].value
            if not os.path.exists(destination_folder):
                os.makedirs(destination_folder)

            files = form['files[]']
            sizes = form['sizes[]']

            copied_count = 0
            skipped_count = 0
            if not isinstance(files, list):
                files = [files]
            if not isinstance(sizes, list):
                sizes = [sizes]        

            for file, size in zip(files, sizes):
                if file.filename:
                    file_path = os.path.join(destination_folder, file.filename)
                    file_dir = os.path.dirname(file_path)
                    if not os.path.exists(file_dir):
                        os.makedirs(file_dir)

                    # Проверка, существует ли файл и его размер
                    if os.path.exists(file_path):
                        existing_file_size = os.path.getsize(file_path)
                        if existing_file_size == int(size.value):
                            print(f"File {file.filename} already exists with the same size, skipping.")
                            skipped_count += 1
                            continue

                    with open(file_path, 'wb') as f:
                        shutil.copyfileobj(file.file, f)
                    copied_count += 1

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {
                'copied': copied_count,
                'skipped': skipped_count
            }
            self.wfile.write(json.dumps(response).encode('utf-8'))
        except Exception as e:
            print(str(e))

if __name__ == '__main__':
    server_address = ('', 8080)
    httpd = HTTPServer(server_address, UploadHandler)
    print('Starting server on port 8080...')
    httpd.serve_forever()