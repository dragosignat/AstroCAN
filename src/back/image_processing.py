import cv2
import numpy as np
import soundfile as sf
import moviepy.editor as mp
import sys

DEBUG = False


def process_image(image, output_file='sound.wav'):
    """
    Process the image and convert it to sound.
    Save the sound to a file, at the specified path.
    :param image: The image to process (numpy array)
    :param output_file: The path to the output file
    :return: None

    """
    # Load the image
    #im = cv2.imread(image)
    im = image

    # Apply Gaussian blur
    im = cv2.GaussianBlur(im, (0, 0), 3)

    # Display the image (optional)
    if DEBUG:
        cv2.imshow('Image', im)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    # Convert to grayscale
    if not np.iscomplexobj(im):
        if len(im.shape) > 2:
            img = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
        else:
            sys.exit("ERROR: image is not a grayscale image")
        _, BW = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    else:
        BW = im

    # Invert the binary image
    #BW = cv2.bitwise_not(BW)

    if DEBUG:
        cv2.imshow('Image', BW)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    combined_sound = np.array([])

    # Find contours
    contours, _ = cv2.findContours(BW, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

    # Initialize audio settings
    fs = 44100

    for k, contour in enumerate(contours):
        X = contour[:, 0, 1]
        Y = contour[:, 0, 0]

        max_y = max(X)
        min_y = min(X)

        max_x = max(Y)
        min_x = min(Y)

        contur = [X, Y]

        t = np.linspace(0, 1, fs)  # Adjust the duration as needed

        sin_sound, _ = calculate_sin(im, [min_x, max_x, min_y, max_y], t)

        # Append the sound to the combined sound
        combined_sound = np.append(combined_sound, sin_sound)
    
    # Save the sound to a file
    sf.write(output_file, combined_sound, fs)


def calculate_sin(im, limits, t):
    """
    Calculate the sine wave for the given image and limits.
    :param im: The image
    :param limits: The limits of the image
    :param t: The time
    """
    n = im.shape
    norm = n[0] * n[1]
    dim = (limits[1] - limits[0]) * (limits[3] - limits[2])

    amp = dim / norm * 4
    if amp < 0.5:
        amp = 0.5

    dim_sin = np.sin(2 * np.pi * t)

    obj = im[int(limits[0]):int(limits[1]), int(limits[2]):int(limits[3])]
    blue_freq = np.sum(np.sum(obj[:, :, 2])) / dim * 30
    blue_sin = np.sin(2 * np.pi * blue_freq * t)

    green_freq = np.sum(np.sum(obj[:, :, 1])) / dim * 10
    green_sin = np.sin(2 * np.pi * green_freq * t)

    red_freq = np.sum(np.sum(obj[:, :, 0])) / dim * 3
    red_sin = np.sin(2 * np.pi * red_freq * t)

    sound_sin = amp * (red_sin + green_sin + blue_sin)

    return sound_sin, t


def make_frame(t):
    im = mp.ImageClip('images/stele.jpg')
    return im


def generate_video(image, sound):
    """
    Generate a video from the image and the sound.
    :param image: The image
    :param sound: The sound
    :return: path to the video 
    """

    # RUTODEL FUNCTIA ASTA E HARD CODATA, TREBUIE SA O FACI TU
    # Primesti imaginea si sunetul si generezi un video din ele
    # fa si un visualizer pentru sunet
    # Returneaza path-ul catre video (salveaza-l pe disk, local)

    # Take an image and a sound and generate a video from them

    audio = mp.AudioFileClip(sound)
    # Image is a openCV image
    video = mp.VideoFileClip(image)

    video = video.set_audio(audio)
    video = video.set_duration(audio.duration)
    video.fps = 30

    video.write_videofile('video.mp4', codec='libx264', audio_codec='aac')

    return "video.mp4"

def generate_video_with_line(image_path, sound_path, output_path):
    # Load the image and sound
    image = mp.VideoFileClip(image_path)
    audio = mp.AudioFileClip(sound_path)

    # Create a line animation video clip
    line_animation = mp.VideoClip(make_frame_with_line, duration=audio.duration)
    line_animation = line_animation.set_audio(audio)

    # Composite the line animation onto the image
    result_video = mp.CompositeVideoClip([image, line_animation])

    # Write the final video to the output path
    result_video.write_videofile(output_path, codec='libx264', audio_codec='aac', fps=30)


def make_frame_with_line(t, line_color=(255, 0, 0), line_thickness=5):
    # Create a frame (numpy array) with the line animation
    w, h = 2400, 1200  # Adjust for your video dimensions
    # Set the frame color to white
    frame = np.full((h, w, 3), 255, dtype='uint8')

    # Calculate the position of the line based on time 't'
    line_x = int(t * (w - line_thickness))
    line_y1 = 0
    line_y2 = line_thickness  # Adjust for line thickness

    # Draw the line on the frame
    cv2.line(frame, (line_x, line_y1), (line_x + line_thickness, line_y2), line_color, line_thickness)

    return frame

def main():
    #process_image('images/stele.jpg')
    generate_video("images/stele.jpg", "piano.wav")

    image_path = 'images/stele.jpg'
    sound_path = 'piano.wav'
    output_path = 'output_video.mp4'
    generate_video_with_line(image_path, sound_path, output_path)


if __name__ == "__main__":
    main()

