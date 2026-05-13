from flask import Flask, request, jsonify
import numpy as np

app = Flask(__name__)

# ===================================
# AI REVENUE FORECAST ENGINE
# ===================================
@app.route('/predict', methods=['POST'])
def predict():

    data = request.json

    revenue = data.get("revenue", [])

    # Prevent empty data
    if len(revenue) < 2:
        return jsonify({
            "forecast": revenue
        })

    # Growth calculation
    growth = (
        revenue[-1] - revenue[0]
    ) / (revenue[0] or 1)

    # 7-day prediction
    forecast = [
        revenue[-1] * (1 + growth * i)
        for i in range(1, 8)
    ]

    return jsonify({
        "forecast": forecast
    })

# ===================================
# START SERVER
# ===================================
if __name__ == '__main__':
    app.run(port=5001)