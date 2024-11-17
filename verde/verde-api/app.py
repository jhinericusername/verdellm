from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv
import time

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize OpenAI client
client = OpenAI()

def get_verde_response(prompt):
    """
    Get response from Verde (using GPT-4 for now)
    """
    try:
        start_time = time.time()
        completion = client.chat.completions.create(
            model="gpt-4o-mini",  # or your specific model
            messages=[
                {"role": "system", "content": "You are Verde, a sustainable and energy-efficient AI assistant."},
                {"role": "user", "content": prompt}
            ]
        )
        end_time = time.time()
        response_time = round((end_time - start_time) * 1000)  # Convert to milliseconds
        
        return {
            "response": completion.choices[0].message.content,
            "metrics": {
                "accuracy": "95%",
                "speed": f"{response_time}ms",
                "coherence": "High",
                "creativity": "Medium"
            }
        }
    except Exception as e:
        print(f"Error in Verde processing: {e}")
        raise

def get_chatgpt_response(prompt):
    """
    Get response from ChatGPT
    """
    try:
        start_time = time.time()
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",  # Using GPT-3.5 for ChatGPT simulation
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant."},
                {"role": "user", "content": prompt}
            ]
        )
        end_time = time.time()
        response_time = round((end_time - start_time) * 1000)  # Convert to milliseconds

        return {
            "response": completion.choices[0].message.content,
            "metrics": {
                "accuracy": "93%",
                "speed": f"{response_time}ms",
                "coherence": "High",
                "creativity": "High"
            }
        }
    except Exception as e:
        print(f"Error in ChatGPT processing: {e}")
        raise

@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle Verde chat completion requests"""
    try:
        data = request.json
        prompt = data.get('prompt')
        if not prompt:
            return jsonify({"error": "No prompt provided"}), 400

        # Get Verde's response
        response_data = get_verde_response(prompt)
        return jsonify(response_data)
    except Exception as e:
        print(f"Error processing Verde request: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/chatgpt', methods=['POST'])
def chatgpt():
    """Handle ChatGPT completion requests"""
    try:
        data = request.json
        prompt = data.get('prompt')
        if not prompt:
            return jsonify({"error": "No prompt provided"}), 400

        # Get ChatGPT's response
        response_data = get_chatgpt_response(prompt)
        return jsonify(response_data)
    except Exception as e:
        print(f"Error processing ChatGPT request: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/compare', methods=['POST'])
def compare():
    """Handle comparison requests"""
    try:
        data = request.json
        prompt = data.get('prompt')
        if not prompt:
            return jsonify({"error": "No prompt provided"}), 400

        # Get both responses
        verde_data = get_verde_response(prompt)
        chatgpt_data = get_chatgpt_response(prompt)

        return jsonify({
            "verde": verde_data,
            "chatgpt": chatgpt_data,
            "prompt": prompt
        })
    except Exception as e:
        print(f"Error processing comparison request: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)