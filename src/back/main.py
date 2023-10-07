import numpy as np
from scipy.io import wavfile

# Generate a sine wave
duration = 5  # duration in seconds0
frequency = 440  # frequency of the sine wave
amplitude = 0.3  # amplitude of the sine wave
sampling_rate = 44100  # number of samples per second

t = np.linspace(0, duration, int(duration * sampling_rate), endpoint=False)
audio_data = amplitude * np.sin(2 * np.pi * frequency * t)

# Write the audio data to a WAV file
file_name = "output.wav"
wavfile.write(file_name, sampling_rate, audio_data)