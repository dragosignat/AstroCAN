"""
    FastAPI application entry point
"""
from fastapi import FastAPI 
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from base64 import b64decode
from image_processing import process_image, generate_video
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
import boto3
import os
import uuid

# DEBUG = True 
DEBUG = False
HARD_CODED = True
HARD_CODED = False 


app = FastAPI()


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Csokolom Mitzi!"}


class ImageScheme(BaseModel):
    """
        Base64 encoded image
    """
    base64_image: str

@app.post("/image")
async def upload(uploaded_image: ImageScheme):
    """
        Upload a Base64 encoded image and return a link to the image 
         that was uploaded to a CDN (after processing).
    """
    
    print("Processing image...")

    # Decode image and save it to disk
    img_path = "image.jpeg"
    img = b64decode(uploaded_image.base64_image)
    with open("image.jpeg", "wb") as f:
        f.write(img)
    # Open the image with openCV
    img = cv2.imread(img_path)


    # Display the image (optional)
    if DEBUG:
        cv2.imshow('Image', img)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
    

    # Process image and convert it to sound
    output_file = "sound.wav"
    process_image(img, output_file)

    # Save the image to disk

    # Make the sound into a video
    #video_file = generate_video(img_path, output_file)
    video_file = output_file
    

    # Upload the video to S3 and get a link to it
    if HARD_CODED:
        url = "https://nasa-hackathon-cluj.s3.eu-north-1.amazonaws.com/2a429303-cbd7-424e-bf9e-01e3843dcc66_video.mp4"
        res = JSONResponse(content={"message": "Video uploaded successfully", "video_url": url})
    else:
        res = upload_to_s3(video_file)

    # Return link to image
    return res

def upload_to_s3(video_file):
    """
        Upload the video to S3 and get a link to it
    """

    print("Uploading video to S3...")
    
    # Set up S3 client

    # Initialize the Amazon S3 client
    s3 = boto3.client('s3', region_name='eu-north-1', aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"], aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"])

    # Your S3 bucket name
    bucket_name = 'nasa-hackathon-cluj'


    try:

        # Generate a unique filename
        filename = str(uuid.uuid4()) + "_" + video_file 

        # Upload the video file to S3
        with open(video_file, 'rb') as video_file:
            s3.upload_fileobj(video_file, bucket_name, filename)

        # Generate a link to the uploaded video
        video_url = f"https://{bucket_name}.s3.amazonaws.com/{filename}"

        return JSONResponse(content={"message": "Video uploaded successfully", "video_url": video_url})

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
