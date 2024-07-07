class ChatGPTErr(Exception):
    def __init__(self, message):
        super().__init__(f"Unable to call ChatGPT api: {message}")

class ChatGPTFormatErr(Exception):
    def __init__(self):
        super().__init__(f"Chat gpt didn't respond in the correct format. Unable to process response. ")

class ImageConvertionErr(Exception): 
    def __init__(self):
        super().__init__(f"Unable to convert image from URL to inary format")
