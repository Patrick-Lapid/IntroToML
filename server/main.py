from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import cv2
import imutils
from imutils.contours import sort_contours
import tensorflow as tf

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://intro-to-ml.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class_mapping = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ'
model = tf.keras.models.load_model("model.h5")

def preprocess_and_extract_characters(image_path):
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError("Image not found or path is incorrect")
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edged = cv2.Canny(blurred, 30, 150)
    cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)
    cnts = sort_contours(cnts, method="left-to-right")[0]
    chars = []

    for c in cnts:
        (x, y, w, h) = cv2.boundingRect(c)
        if (w >= 5 and w <= 150) and (h >= 15 and h <= 120):
            roi = gray[y:y + h, x:x + w]
            thresh = cv2.threshold(roi, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]
            (tH, tW) = thresh.shape
            if tW > tH:
                thresh = imutils.resize(thresh, width=28)
            else:
                thresh = imutils.resize(thresh, height=28)
            (tH, tW) = thresh.shape
            dX = int((28 - tW) / 2.0)
            dY = int((28 - tH) / 2.0)
            padded = cv2.copyMakeBorder(thresh, top=dY + 5, bottom=dY + 5, left=dX + 5, right=dX + 5,
                                        borderType=cv2.BORDER_CONSTANT, value=(0, 0, 0))
            padded = cv2.resize(padded, (28, 28))
            padded = padded.astype("float32") / 255.0
            padded = np.expand_dims(padded, axis=0)
            padded = np.expand_dims(padded, axis=-1)
            chars.append((padded, (x, y, w, h)))

    return image, chars

def predict_characters(image, chars, model):
    predicted_chars = []
    for char, _ in chars:
        predicted_index = np.argmax(model.predict(char))
        predicted_letter = class_mapping[predicted_index]
        predicted_chars.append(predicted_letter)
    return predicted_chars

def read_imagefile(file) -> Image.Image:
    image = Image.open(file)
    return image

@app.post("/predict-image/")
async def predict_image(file: UploadFile = File(...)):
    fileContent = file.file.read()
    print("File Content: ", fileContent)
    image = read_imagefile(fileContent)
    image.save("temp.jpg")
    original_image, extracted_chars = preprocess_and_extract_characters("temp.jpg")
    predicted_chars = predict_characters(original_image, extracted_chars, model)
    return {"predicted_characters": predicted_chars}


    return JSONResponse(content={"error": "This file isn't an image."}, status_code=400)