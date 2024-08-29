import os
import glob
from anthropic import Anthropic

client = Anthropic(api_key=os.environ['ANTHROPIC_API_KEY'])

# Get a list of files in the repository
files = glob.glob('**/*', recursive=True)
file_list = "\n".join(files)

message = client.messages.create(
    model="claude-3-haiku-20240307",
    max_tokens=1000,
    messages=[
        {
            "role": "user",
            "content": f"Here's a list of files in my project:\n\n{file_list}\n\nBased on this information, generate a basic README.md file for my project. Include sections such as Project Overview and File Structure. Keep it concise."
        }
    ]
)

# Extract the README content from the response
readme_content = message.content[0].text

with open('README.md', 'w') as readme_file:
    readme_file.write(readme_content)

print("README.md has been generated successfully.")