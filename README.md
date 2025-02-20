# AI Developer Portfolio

A professional portfolio website showcasing my experience and projects as a Python AI Developer. Features an interactive AI chatbot that can answer questions about my background and experience.

## Features
- 🎨 Modern, responsive design with animations
- 💬 AI-powered chatbot using Mistral AI
- 🌟 Interactive particle effects
- 📱 Mobile-friendly interface
- 🚀 Dynamic project showcase
- 💼 Detailed experience timeline
- 🛠️ Skills visualization

## Technologies Used
### Frontend
- HTML5
- CSS3 (with animations and modern design)
- JavaScript (for interactivity)
- Bootstrap 5 (for responsive design)
- Font Awesome (for icons)
- AOS (Animate On Scroll library)

### Backend
- Python 3.10+
- Flask (web framework)
- Mistral AI (for chatbot functionality)
- python-dotenv (for environment variables)

## Setup Instructions

### Prerequisites
- Python 3.10 or higher
- A Mistral AI API key (get it from [console.mistral.ai](https://console.mistral.ai))

### Installation
1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd portfolio
   ```

2. Create and activate a virtual environment (recommended):
   ```bash
   python -m venv .venv
   # On Windows
   .venv\Scripts\activate
   # On macOS/Linux
   source .venv/bin/activate
   ```

3. Install Python requirements:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the root directory and add your Mistral AI API key:
   ```
   MISTRAL_API_KEY=your_api_key_here
   ```

5. Run the application:
   ```bash
   python app.py
   ```

6. Open your browser and navigate to `http://localhost:5000`

## Features in Detail

### AI Chatbot
The portfolio includes an interactive chatbot powered by Mistral AI that can:
- Answer questions about my background
- Provide information about my skills and experience
- Discuss my projects in detail
- Respond in a natural, conversational manner

### Responsive Design
- Fully responsive layout that works on all devices
- Dynamic resizing of components
- Mobile-optimized navigation
- Adaptive hero section for different screen sizes

### Interactive Elements
- Particle effect background
- Smooth scroll animations
- Dynamic typing effect
- Project cards with hover effects

## Project Structure
```
portfolio/
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── templates/
│   └── index.html
├── app.py
├── requirements.txt
└── README.md
```

## Customization
To customize this portfolio:
1. Update the personal information in `app.py`
2. Modify the styling in `static/css/style.css`
3. Add your own projects in `templates/index.html`
4. Customize the chatbot responses by updating the PERSONAL_INFO variable in `app.py`

## Contributing
Feel free to fork this project and customize it for your own use. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License
This project is open source and available under the [MIT License](LICENSE).

## Contact
- Name: Jhan Cedric Antonio
- Email: antoniojhancedric@gmail.com
- LinkedIn: [Jhan Cedric Antonio](https://www.linkedin.com/in/jhan-cedric-antonio-435666297/)
