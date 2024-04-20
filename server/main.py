from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import numpy as np
from io import BytesIO
import time
from PIL import Image
import pickle

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://intro-to-ml.vercel.app"],  
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


# Loads ML model
# with open('model.pkl', 'rb') as model_file:
#     model = pickle.load(model_file)

def read_imagefile(file) -> Image.Image:
    image = Image.open(BytesIO(file))
    return image

@app.post("/predict-image/")
async def predict_image(file: UploadFile = File(...)):
    print("HIT ENDPOINT")
    time.sleep(4)
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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