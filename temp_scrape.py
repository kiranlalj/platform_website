import urllib.request
import re

html = urllib.request.urlopen("https://plat-form.framer.ai/").read().decode("utf-8")
links = re.findall(r'https://framerusercontent\.com/(?:assets|images)/[^"]+', html)
for link in sorted(list(set(links))):
    print(link)
