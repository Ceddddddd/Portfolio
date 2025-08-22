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
Birthday: August 6, 2003
Role: Python AI Developer
Location: Taguig City, Philippines
Skills:
- Python, AI/ML, Large Language Models (LLMs), Multi-LLM Systems
- RAG, Embeddings, FAISS
- Django, Next.js, FastAPI, React Native
- MySQL, DBeaver, DigitalOcean, Linux, Git

Experience:
- Fullstack Developer — Ice Bear Solution — Part-time — Remote (Germany) — Mar 2025 - Aug 2025 (6 mos)
  * Partnered with cross-functional teams (Design, Legal, Marketing, Data) to deliver a production-ready web app.
  * Refactored legacy codebase to enhance modularity, maintainability, and performance.
  * Ensured cohesive integration of UI/UX and core functionality across the platform.
  * Benchmarked base LLMs for domain tasks to establish baselines for future fine-tuning.

- Python Developer — AK Holding (AI-driven Tech Startup) — Nov 2024 - Apr 2025
  * Refactored legacy code to improve reliability, scalability, and maintainability.
  * Built a high-performance data processing pipeline handling millions of records.
  * Implemented Langgraph within a tight one-week timeline.
  * Utilized AI tools: Windsurf, Claude, OpenAI, Langgraph Studio.

- Freelance Developer — Department of Tourism — Dec 2024 - Jan 2025
  * Built a comprehensive Booking Web Application (Django) for tourist spots, hotels, and resorts in Guinayangan, Quezon.
  * Enabled seamless booking and reservation management to improve UX and operations.

Projects:
- Tourism Website (Guinayangan Booking System)
  URL: https://www.guinayangan.site/
  Stack: Django, Bootstrap
  Highlights: Dynamic tourism website with integrated booking; deployed and optimized for performance and responsiveness.

- TranscribeTitan (AI-powered voice-to-text translation)
  URL: https://TranscribeTitan.pythonanywhere.com
  Stack: Django, AI/ML
  Highlights: Converts voice input to text and translates into multiple languages in real time.

- Elementary Learning Platform
  URL: https://Ceddddddd.pythonanywhere.com
  Stack: Django, HTML, CSS, JavaScript
  Highlights: Digital learning platform for elementary students; delivered as a paid project and used for research insights.

- Croptopia Mobile App (Farming predictions and recommendations)
  URL: https://expo.dev/artifacts/eas/cH2HGSiJMkYozZ8wGEbp3K.apk
  Stack: React Native, Django, Expo, XGBoost, Pandas, Weather API, Plant API
  Highlights: Predicts local market prices and provides crop recommendations using predictive analytics and real-time data.

Education:
- Polytechnic University of the Philippines — Bachelor of Science in Information Technology — Aug 2021 - 2025

Contact:
- Email: antoniojhancedric@gmail.com
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
