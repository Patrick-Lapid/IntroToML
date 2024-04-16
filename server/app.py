from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import numpy as np
from io import BytesIO
from PIL import Image
import pickle

app = FastAPI()

# Loads ML model
# with open('model.pkl', 'rb') as model_file:
#     model = pickle.load(model_file)

def read_imagefile(file) -> Image.Image:
    image = Image.open(BytesIO(file))
    return image

@app.post("/predict-image/")
async def predict_image(file: UploadFile = File(...)):
    if file.content_type.startswith('image/'):
        image = read_imagefile(await file.read())
        # Assuming model expects numpy array
        image_np = np.array(image)
        prediction = model.predict(image_np.reshape(1, -1))
        return JSONResponse(content={"prediction": prediction.tolist()}, status_code=200)
    return JSONResponse(content={"error": "This file isn't an image."}, status_code=400)

@app.get("/hello-world/")
async def hello_world():
    return {"message": "Hello World"}