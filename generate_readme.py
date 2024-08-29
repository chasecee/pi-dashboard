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
            "content": f"""Here's a list of files in my project:

{file_list}

Based on this information, generate a clean, well-formatted README.md file for my project. Use proper Markdown syntax for headings, lists, and code blocks. Include the following sections:

1. Project Title (use a top-level heading)
2. Project Overview (brief description)
3. Features (use a bullet list)
4. File Structure (use a code block for the file tree)
5. Installation (if applicable)
6. Usage (if applicable)
7. Contributing (brief guidelines)
8. License (if known)

Keep it concise and ensure proper Markdown formatting throughout. """
        }
    ]
)

# Extract the README content from the response
readme_content = message.content[0].text

# Clean up the content (remove any potential wrapper markdown code blocks)
readme_content = readme_content.strip()
if readme_content.startswith("```markdown"):
    readme_content = readme_content[len("```markdown"):].strip()
if readme_content.endswith("```"):
    readme_content = readme_content[:-3].strip()

with open('README.md', 'w') as readme_file:
    readme_file.write(readme_content)

print("README.md has been generated successfully with improved formatting.")