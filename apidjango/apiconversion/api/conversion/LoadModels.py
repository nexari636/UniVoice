import whisper
from transformers import BlipProcessor, BlipForConditionalGeneration
from transformers import AutoTokenizer, MarianMTModel
from transformers import pipeline
import torch

BASE_MODEL="Salesforce/blip-image-captioning-base"
LARGE_MODEL="Salesforce/blip-image-captioning-large"

class LoadModels:
    def __init__(self):
        print("cargando modelos.......")
        self.model_whisper=whisper.load_model("small")
        self.image_processor = BlipProcessor.from_pretrained(LARGE_MODEL, use_fast=False)
        self.image_model = BlipForConditionalGeneration.from_pretrained(LARGE_MODEL)    
        self.tokenizer_en_to_es = AutoTokenizer.from_pretrained('Helsinki-NLP/opus-mt-en-es')
        self.model_en_to_es= MarianMTModel.from_pretrained('Helsinki-NLP/opus-mt-en-es')
        self.tokenizer_es_to_en = AutoTokenizer.from_pretrained('Helsinki-NLP/opus-mt-es-en')
        self.model_es_to_en = MarianMTModel.from_pretrained('Helsinki-NLP/opus-mt-es-en')
        self.model_ollama_1b=pipeline("text-generation",model="meta-llama/Llama-3.2-1B-Instruct", torch_dtype=torch.float32, device_map="auto",)
        self.multiple_translation_model = pipeline("translation",model="facebook/nllb-200-distilled-600M", device=-1)
        print("carga finalizada.......")