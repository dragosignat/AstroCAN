"""
    FastAPI application entry point
"""
from fastapi import FastAPI 
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from base64 import b64decode
from image_processing import process_image, generate_video
import numpy as np
import cv2
import boto3
import os
import uuid

# DEBUG = True 
DEBUG = False
HARD_CODED = True


app = FastAPI()

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
    
    # Decode image
    img_np = np.frombuffer(b64decode(uploaded_image.base64_image), dtype=np.uint8)
    # Convert the numpy array to an image
    img = cv2.imdecode(img_np, cv2.IMREAD_UNCHANGED)

    # Display the image (optional)
    if DEBUG:
        cv2.imshow('Image', img)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
    

    # Process image and convert it to sound
    output_file = "sound.wav"
    process_image(img, output_file)

    # Make the sound into a video
    video_file = generate_video(img, output_file)
    

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
