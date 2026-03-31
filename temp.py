import urllib.request
import re

url = "https://plat-form.framer.ai"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    links = re.findall(r'https://framerusercontent\.com/images/[a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|webp|mp4|webm)|https://framerusercontent\.com/assets/[a-zA-Z0-9_-]+\.(?:mp4|webm|jpg|png|webp)', html)
    unique_links = list(set(links))
    
    with open('assets.md', 'w') as f:
        for link in unique_links:
            f.write(f"![Asset]({link})\n{link}\n\n")
    print("Saved to assets.md")
except Exception as e:
    print("Error:", e)
