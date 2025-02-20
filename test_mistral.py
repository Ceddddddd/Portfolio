from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from dotenv import load_dotenv
import os

def test_mistral_api():
    # Load the API key from .env
    load_dotenv()
    api_key = os.getenv("MISTRAL_API_KEY")
    print(f"Using API key: {api_key[:8]}...{api_key[-4:]}")  # Show partial key for verification

    try:
        # Initialize the client
        client = MistralClient(api_key=api_key)
        
        # Simple test message
        messages = [
            ChatMessage(role="user", content="Hi, can you hear me?")
        ]

        # Try to get a response
        print("Testing API connection...")
        response = client.chat(
            model="mistral-tiny",  # Using the basic model
            messages=messages
        )

        print("\nSuccess! API is working.")
        print("Response:", response.choices[0].message.content)
        
    except Exception as e:
        print("\nError occurred:")
        print(e)
        print("\nPossible issues:")
        print("1. API key might not be activated yet (usually takes a few minutes)")
        print("2. The API key might be incorrect")
        print("3. Network connection issues")

if __name__ == "__main__":
    test_mistral_api()
