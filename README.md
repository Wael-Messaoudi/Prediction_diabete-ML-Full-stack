# Diabetes Prediction Full-Stack Application
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/Wael-Messaoudi/Prediction_diabete-ML-Full-stack)

This repository contains a full-stack web application designed to predict the likelihood of diabetes based on medical diagnostic measurements. It leverages a machine learning model served via a Flask backend and an interactive user interface built with Angular.

## Project Structure

The project is organized into three main directories:

-   `Front-end _ Angular/`: Contains the Angular application that provides the user interface for data input and result visualization.
-   `Back-end _ Falsk/`: Includes the Flask API that loads the trained machine learning model and exposes a prediction endpoint.
-   `Model ML diabete/`: Contains the Jupyter notebook (`Diabet_Model.ipynb`) used for data analysis, model training, and evaluation, along with the dataset (`diabetes.csv`) and the serialized model artifacts (`.pkl` files).

## Technology Stack

-   **Frontend**: Angular, TypeScript, HTML, CSS
-   **Backend**: Python, Flask, Flask-CORS
-   **Machine Learning**: Scikit-learn, Pandas, NumPy, Imbalanced-learn (SMOTE)
-   **Dataset**: Pima Indians Diabetes Dataset

## Features

-   An intuitive web form to input the required medical features.
-   Real-time prediction of diabetes risk using a trained Random Forest model.
-   Displays the prediction (Diabetic/Non-diabetic), risk level, and the associated probabilities.
-   A clear separation of concerns between the frontend, backend, and machine learning components.

## How It Works

1.  **Model Training**: The Jupyter Notebook in `Model ML diabete/` details the process of training the model. It involves:
    -   Loading the Pima Indians Diabetes dataset.
    -   Handling class imbalance using the SMOTE (Synthetic Minority Over-sampling Technique).
    -   Scaling features with `StandardScaler`.
    -   Training and tuning a `RandomForestClassifier` using `GridSearchCV` to find the optimal hyperparameters.
    -   Serializing the trained model (`diabetes.pkl`), the scaler (`scaler (1).pkl`), and the feature names (`feature_names.pkl`) for production use.

2.  **Backend API**: The Flask application in `Back-end _ Falsk/` serves the model.
    -   On startup, it loads the serialized model, scaler, and feature names.
    -   It exposes a `/predict` endpoint that receives medical data from the frontend via a POST request.
    -   The incoming data is preprocessed using the loaded scaler to match the training conditions.
    -   The model predicts the outcome and the probabilities, which are then returned to the client as a JSON response.

3.  **Frontend Interface**: The Angular application provides the user experience.
    -   A user navigates to the "Predict" page and fills out a form with their medical data (e.g., Glucose, BMI, Age).
    -   Upon submission, an HTTP request containing the form data is sent to the Flask backend.
    -   The application receives the prediction result and navigates to the "Result" page to display the outcome, risk level, and probabilities to the user.

## Getting Started

To run this project locally, follow the steps below.

### Prerequisites

-   Python 3.8+ and Pip
-   Node.js and npm

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Wael-Messaoudi/Prediction_diabete-ML-Full-stack.git
    cd Prediction_diabete-ML-Full-stack
    ```

2.  **Prepare Backend Artifacts:**
    Move the machine learning model files from the `Model ML diabete/` directory to the `Back-end _ Falsk/` directory.
    ```bash
    # From the root of the project
    mv "Model ML diabete/diabetes.pkl" "Back-end _ Falsk/"
    mv "Model ML diabete/scaler (1).pkl" "Back-end _ Falsk/"
    mv "Model ML diabete/feature_names.pkl" "Back-end _ Falsk/"
    ```

### Running the Backend (Flask)

1.  **Navigate to the backend directory:**
    ```bash
    cd "Back-end _ Falsk"
    ```

2.  **Create a virtual environment and activate it:**
    ```bash
    # For Unix/macOS
    python3 -m venv venv
    source venv/bin/activate

    # For Windows
    python -m venv venv
    .\venv\Scripts\activate
    ```

3.  **Install the required Python packages:**
    ```bash
    pip install Flask Flask-Cors joblib numpy scikit-learn
    ```

4.  **Start the Flask server:**
    ```bash
    python app.py
    ```
    The backend server will be running on `http://localhost:5000`.

### Running the Frontend (Angular)

1.  **Open a new terminal** and navigate to the frontend directory:
    ```bash
    cd "Front-end _ Angular"
    ```

2.  **Install the npm packages:**
    ```bash
    npm install
    ```

3.  **Start the Angular development server:**
    ```bash
    ng serve
    ```

4.  **Access the application:**
    Open your web browser and navigate to `http://localhost:4200/`.

## API Endpoint

The backend provides a single endpoint for making predictions.

-   **URL**: `/predict`
-   **Method**: `POST`
-   **Description**: Takes a JSON object with patient data and returns the diabetes prediction.
-   **Request Body**:
    ```json
    {
        "Pregnancies": 6,
        "Glucose": 148,
        "BloodPressure": 72,
        "SkinThickness": 35,
        "Insulin": 0,
        "BMI": 33.6,
        "DiabetesPedigreeFunction": 0.627,
        "Age": 50
    }
    ```
-   **Success Response**:
    ```json
    {
      "prediction": "Diabétique",
      "risk_level": "Élevé",
      "probabilities": {
        "non_diabetic": 0.3200,
        "diabetic": 0.6800
      }
    }
