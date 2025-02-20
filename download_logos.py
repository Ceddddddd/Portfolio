import os
import requests

LOGOS = {
    'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'ai': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    'pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    'html5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'css3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'django': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    'git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    'docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'windsurf': 'https://raw.githubusercontent.com/codeium/windsurf/main/windsurf.svg',
    'langgraph': 'https://raw.githubusercontent.com/langchain-ai/langchain/master/docs/static/img/langchain.svg',
    'claude': 'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/oghqjjpkjp4dutjdzlya.png',
    'chatgpt': 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    'ollama': 'https://raw.githubusercontent.com/ollama/ollama/main/docs/ollama.svg'
}

def download_logo(name, url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(f'static/img/skills/{name}.svg', 'wb') as f:
                f.write(response.content)
            print(f'Downloaded {name} logo')
        else:
            print(f'Failed to download {name} logo: Status {response.status_code}')
    except Exception as e:
        print(f'Error downloading {name} logo: {str(e)}')

def main():
    # Create the directory if it doesn't exist
    os.makedirs('static/img/skills', exist_ok=True)
    
    # Download each logo
    for name, url in LOGOS.items():
        download_logo(name, url)

if __name__ == '__main__':
    main()
