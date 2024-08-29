import os
import glob
from anthropic import Anthropic

anthropic = Anthropic(api_key=os.environ['ANTHROPIC_API_KEY'])

# Get a list of files in the repository
files = glob.glob('**/*', recursive=True)
file_list = "\n".join(files)

prompt = f"""
Human: Here's a list of files in my project:

{file_list}

Based on this information, generate a basic README.md file for my project. Include sections such as Project Overview and File Structure. Keep it concise.