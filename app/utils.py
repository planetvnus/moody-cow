from openai import OpenAI

#put api_key
client = OpenAI(api_key="")


def generate_description(input):
    messages = [
        {"role": "user",
         "content": """As a Product Description Generator, Generate multi paragraph rich text product description with emojis from the information provided to you' \n"""},
    ]

    messages.append({"role": "user", "content": f"{input}"})
    completion = client.chat.completions.create(model="gpt-3.5-turbo",
    messages=messages)
    reply = completion.choices[0].message.content
    return reply
