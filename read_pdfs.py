import os
from pypdf import PdfReader

pdfs = [
    "AI 개발 워크플로우.pdf",
    "뉴스스탠드-기획디자인.pdf",
    "뉴스스탠드-디자인시스템.pdf"
]

with open("pdf_contents.txt", "w", encoding="utf-8") as f:
    for pdf in pdfs:
        try:
            reader = PdfReader(pdf)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            f.write(f"--- {pdf} ---\n")
            f.write(text + "\n\n")
        except Exception as e:
            f.write(f"Error reading {pdf}: {e}\n\n")
