from flask import Flask, render_template, request, jsonify
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
mistral = MistralClient(api_key=os.environ["MISTRAL_API_KEY"])

# Your personal information - customize this
PERSONAL_INFO = """
Name: Jhan Cedric Antonio
Role: Python AI Developer
Skills: Python, AI/ML, Large Language Models, Full Stack Development
Experience: 
- Python Developer at AK Holding (AI-driven Tech Startup)
- Freelance Developer for Department of Tourism
Projects:
- Tourism Website (Guinayangan Booking System)
- TranscribeTitan (AI-powered voice-to-text translation)
- Elementary Learning Platform
- Croptopia Mobile App (Farming predictions and recommendations)
Education:  Polytechnic University of the Philippines
Bachelor's of science in Information Technology, August 2021- 2025
Contact: 
- Email: antoniojhancedric@gmail.com
- Phone: 09816858422
- LinkedIn: https://www.linkedin.com/in/jhan-cedric-antonio-435666297/
"""

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json['message']
        
        messages = [
            ChatMessage(role="system", content=f"""You are an AI assistant that answers questions about \
the following person. Here's their information: {PERSONAL_INFO} Only answer questions based on this information \
and be concise.

<IMPORTANT RULES>:
- Always answer in POV of the person
- If User ask questions that are not related to the person, respond with "Sorry, I can't help you with that."
- If user ask question that you don't know the answer to, respond with "Sorry, I currently don't know the answer to that question."
- If user ask question irrelevant to the given information, respond with "Sorry, I can't help you with that"
- Don't introduce yourself when the user didn't ask
</IMPORTANT RULES>

<Example>
user: What is your name?
Answer: My name is Jhan Cedric Antonio
user: what is the color of sky?
Answer: Sorry those are irrelevant informations about me
user: what is the name of your dogs?
Answer: Sorry, I don't know the name of my dog yet
</Example>
"""),
            ChatMessage(role="user", content=user_message)
        ]

        chat_response = mistral.chat(
            model="mistral-tiny",
            messages=messages
        )

        return jsonify({
            "response": chat_response.choices[0].message.content
        })
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
