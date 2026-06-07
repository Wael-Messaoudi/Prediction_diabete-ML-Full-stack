from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# ======================================================
# 📥 Charger les artefacts (UNE SEULE FOIS)
# ======================================================
print("Chargement du modèle...")
model = joblib.load('diabetes.pkl')
scaler = joblib.load('scaler (1).pkl')
feature_names = joblib.load('feature_names.pkl')
print("✅ Modèle chargé avec succès !")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # 1️⃣ Récupérer les valeurs dans le bon ordre
    try:
        input_array = np.array([[
            float(data[feature]) for feature in feature_names
        ]])
    except KeyError as e:
        return jsonify({
            "error": f"Feature manquante : {str(e)}"
        }), 400

    # 2️⃣ Appliquer le même scaling
    input_scaled = scaler.transform(input_array)

    # 3️⃣ Prédiction
    prediction = int(model.predict(input_scaled)[0])
    prediction_proba = model.predict_proba(input_scaled)[0]

    # 4️⃣ Interprétation
    outcome = "Diabétique" if prediction == 1 else "Non diabétique"
    risk_level = "Élevé" if prediction == 1 else "Faible"

    # 5️⃣ Réponse JSON (Angular-friendly)
    return jsonify({
        "prediction": outcome,
        "risk_level": risk_level,
        "probabilities": {
            "non_diabetic": round(float(prediction_proba[0]), 4),
            "diabetic": round(float(prediction_proba[1]), 4)
        }
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)