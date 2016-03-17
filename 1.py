from collections import defaultdict
import inflection
import re

file = open('infovis-definitions.txt', 'r')
data = file.read()
# Replace all non alphabetic or spaces with spaces
data = re.sub(r'\[[^\]]*\]', ' ', data)
data = re.sub(r'[^\w ]', ' ', data)
# Replace multiple spaces with just 1 space
data = re.sub(r'\s\s+', ' ', data)

words = list(filter(lambda d: len(d) > 3, map(lambda word: inflection.singularize(word), data.lower().split())))

d = defaultdict(int)

for word in words:
    d[word] += 1

print(list(filter(lambda item: item[1] > 2, map(lambda item: list(item), d.items()))))
