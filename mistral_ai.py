import os
from openai import OpenAI

# Directly set the API key
MISTRAL_API_KEY = "pluKUnkNEhybByRWkbPPFkJWoaVpybNp"
MISTRAL_MODEL = "mistral-large-latest"

client = OpenAI(
    api_key=MISTRAL_API_KEY,
    base_url="https://api.mistral.ai/v1"
)

def analyze_project_data(project_id: int, metadata: dict, notes: str = ""):
    prompt = f"""
    You are an expert in climate MRV systems.
    Analyze the following project data and give a carbon sequestration estimate.

    Metadata:
    {metadata}

    Extra Notes:
    {notes}

    Respond in valid JSON with keys:
    - carbon_estimate (tons of CO2 per year)
    - confidence (0-100)
    - analysis_notes
    """

    response = client.chat.completions.create(
        model=MISTRAL_MODEL,
        messages=[
            {"role": "system", "content": "You are an AI assistant for carbon MRV."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )

    return response.choices[0].message["content"]
