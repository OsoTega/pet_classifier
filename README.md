# Pet Classification Frontend

This repository contains a Next.js frontend application for classifying pet images using a backend server.

## Description

This frontend application allows users to select an image, which is then processed and classified by a backend server. The server, in turn, calls a Python backend to perform the classification.

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/OsoTega/pet_classifier.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to access the application.

## Frontend Components

- **UploadComponent**: The main component responsible for selecting and processing the image. It uses Canvas API to display the selected image and sends the processed data to the backend server for classification.

## Backend Servers

The frontend application communicates with two backend servers:

1. **Node.js Backend**: Receives image data from the frontend, processes it, and sends it to the Python backend for classification.

2. **Python Backend**: Performs the image classification using a pre-trained model and returns the classification result to the Node.js backend.

## Configuration

Ensure that the environment variable `NEXT_PUBLIC_API_SERVER_URL` is set to the URL of the Node.js backend server.

## Dependencies

- `react`: JavaScript library for building user interfaces.
- `canvas`: Node.js canvas library for creating images.
- `@tensorflow/tfjs`: TensorFlow.js library for machine learning in JavaScript.
- `axios`: Promise-based HTTP client for making requests to the backend server.

## Directory Structure

- **pages/**: Contains Next.js pages.
- **components/**: Contains React components used in the application.
- **public/**: Contains public assets such as images and fonts.

## Author

- **Author**: Tega Osowa
- **Email**: stevetega.osowa11@gmail.com
- **GitHub**: [OsoTega](https://github.com/OsoTega)

## License

This project is open source and free to use.
