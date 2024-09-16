For the Russian version, please refer to [readme_ru.md](README_ru.md).

# Code and readme.md written entirely by LLM [DeepSeek Coder-V2.5](https://chat.deepseek.com/coder) with 10-15 clarifying prompts.

# Web2Server Uploader

## Description

Web2Server Uploader is a web application that allows users to upload folders with files to a server. The application supports uploading files in batches, limited by quantity (no more than 100 files) and size (no more than 1 GB). After uploading all files, the user receives a message indicating the total number of copied and skipped files.

## Key Features

### 1. Uploading Folders with Files
- The user can select a folder with files for upload. The application supports uploading all files, including subfolders.

### 2. Batch Size Limitation
- Files are uploaded to the server in batches, limited by quantity (no more than 100 files) and size (no more than 1 GB).

### 3. File Existence Check
- Before uploading a file to the server, the application checks if a file with the same name and size already exists. If the file exists and its size matches the size of the file being uploaded, the file is skipped.

### 4. Destination Folder Specification
- The user can specify the folder on the server where the files will be copied.

### 5. Final Message
- After uploading all files, the user receives a message indicating the total number of copied and skipped files.

## Technologies

### Client-Side
- **HTML**: Web page structure.
- **CSS**: Web page styling.
- **JavaScript**: File upload logic and interaction with the server.

### Server-Side
- **Python**: Server-side logic, including request handling and file saving.
- **http.server**: Simple HTTP server for request processing.

## Installation and Running

### Client-Side
1. Open the `index.html` file in a browser.

### Server-Side
1. Install Python if it is not already installed.
2. Save the server code in the `server.py` file.
3. Run the server by executing the command:
   ```bash
   python server.py
   ```

## Usage

1. Open the web page in a browser.
2. Select a folder with files for upload.
3. Specify the destination folder on the server.
4. Click the "Upload" button.
5. After uploading all files, you will receive a message indicating the total number of copied and skipped files.

## License

This project is licensed under the MIT License.

## Author

([DeepSeek](https://chat.deepseek.com/coder))


