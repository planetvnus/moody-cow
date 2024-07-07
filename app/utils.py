from openai import OpenAI
import fitz
import requests
import os
openai_key = os.environ.get('OPEN_AI_API') or "api_key"
#uncomment below and add api_key
# api_key=""
client = OpenAI(api_key=openai_key)

# Provide the URL to the PDF and your OpenAI API key
pdf_url = "https://corporate.lululemon.com/~/media/Files/L/Lululemon/our-impact/reporting-and-disclosure/lululemon-2022-impact-report.pdf"

# # Step 1: Fetch the PDF from the URL
def download_pdf(url):
    response = requests.get(url)
    pdf_path = "/tmp/report.pdf"  # Temporary path to save the PDF
    with open(pdf_path, "wb") as f:
        f.write(response.content)
    print("download done")
    return pdf_path

# # Step 2: Extract text from the PDF using PyMuPDF
# def extract_text_from_pdf(pdf_path):
#     text = ""
#     doc = fitz.open(pdf_path)
#     for page_num in range(len(doc)):
#         page = doc.load_page(page_num)
#         text += page.get_text()
#     print("extraction done")
#     return text

# # Step 3: Analyze text with OpenAI API in chunks
# def analyze_text_with_openai(text):
#     max_chunk_size = 3000  # Adjust based on token limit
#     results = []

#     for i in range(0, len(text), max_chunk_size):
#         chunk = text[i:i + max_chunk_size]
#         response = api_key.Completion.create(
#             engine="text-davinci-003",
#             prompt="Analyze the following text: " + chunk,
#             max_tokens=1500
#         )
#         results.append(response.choices[0].text)
    
#     return "\n".join(results)


# Execute the steps
# pdf_path = download_pdf(pdf_url)
# pdf_text = extract_text_from_pdf(pdf_path)
# analysis_result = analyze_text_with_openai(pdf_text, api_key)


def generate_description(input):
    messages = [
        # 1. analyse pdf report
        {
            "role": "user",
            # "content": """As the user is an ethically concious shopper focused on environmental
            # and social impact, give a rating for each of the materials in this item of clothing where
            # green is good, orange is ok, and red is bad. For each rating, give evidence as to why.
            # If no specific brand or clothing is specified, make it up.
            # """
            "content": """given this url, https://corporate.lululemon.com/~/media/Files/L/Lululemon/our-impact/reporting-and-disclosure/lululemon-2022-impact-report.pdf \n
            analyse their uses of the clothing fabrics and materials they use and assign a red (bad), orange (ok) or green (good) to each material in terms
            of their environmental and social impact. for each rating, give brief evidence as to why."""
        },
        # 2. get composition and product description
        # 3. collate
        # 4. look for alternatives (optional)
        {
            "role":"system", "message":"you always answer in json format and are helpful"
        }
        
    ]
    # you can use "role":"assistant" to provide answers to specific "user" questions to better inform model
    messages.append({"role": "user", "content": f"{input}"})
    
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=messages)
    
    reply = completion.choices[0].message.content
    return reply
