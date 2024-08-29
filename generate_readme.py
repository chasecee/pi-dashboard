import os
import glob
import argparse
from anthropic import Anthropic

client = Anthropic(api_key=os.environ['ANTHROPIC_API_KEY'])

# Get a list of files in the repository
files = glob.glob('**/*', recursive=True)
file_list = "\n".join(files)

# Add command-line argument parsing
parser = argparse.ArgumentParser(description="Generate README for Pi Dashboard project")
parser.add_argument('--output', default='README.md', help='Output file name (default: README.md)')
args = parser.parse_args()

message = client.messages.create(
    model="claude-3-haiku-20240307",
    max_tokens=1000,
    messages=[
        {
            "role": "user",
            "content": f"""Here's a list of files in my project:

{file_list}

Repo is called Pi Dashboard, git url is https://github.com/chasecee/pi-dashboard
include basic instructions on how to run the next js dev.
mention its hosted on vercel at https://pi-dashboard-one.vercel.app/
Based on this information, generate a clean, well-formatted README.md file for my project. Use proper Markdown syntax for headings, lists, and code blocks. Include the following sections:

1. Project Title with fun decorations (top level heading)
2. Project Overview (brief description)
3. Features (use a bullet list)
4. File Structure (use a code block for the file tree)
5. Installation (if applicable)
6. Usage (if applicable)
7. Contributing (brief guidelines)
8. License (if known)

Also, add a warning at the top of the README stating that it's automatically generated and may be overwritten.

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

with open(args.output, 'w') as readme_file:
    readme_file.write(readme_content)

print(f"{args.output} has been generated successfully with improved formatting.")