from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

# Simple placeholder AI answer function
def get_notes_answer(query):
    """
    This is a very basic example using Wikipedia search.
    Later you can add NCERT PDFs parsing, Google scraping, etc.
    """
    url = f"https://en.wikipedia.org/wiki/{query.replace(' ', '_')}"
    response = requests.get(url)
    if response.status_code != 200:
        return "Sorry, I couldn't find notes on that topic."
    
    soup = BeautifulSoup(response.text, "html.parser")
    
    # Get first paragraph
    p = soup.find("p")
    if p:
        return p.text.strip()
    return "Sorry, no detailed notes found."

# API endpoint
@app.route("/api/get_notes", methods=["POST"])
def api_get_notes():
    data = request.json
    query = data.get("query", "")
    if not query:
        return jsonify({"answer": "Please provide a topic or question."})
    
    answer = get_notes_answer(query)
    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)
