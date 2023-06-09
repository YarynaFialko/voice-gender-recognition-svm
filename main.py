import pyaudio
import wave
import numpy as np
from sys import byteorder
from array import array
from struct import pack
import matplotlib.pyplot as plt
import sklearn
# from sklearn import svm
from utils import extract_mfcc_feature
from svm_without_kernel import SVM # , linear_kernel, polynomial_kernel, gaussian_kernel

THRESHOLD = 500
CHUNK_SIZE = 1024
FORMAT = pyaudio.paInt16
RATE = 16000

SILENCE = 30


def is_silent(snd_data):
    """Returns 'True' if below the 'silent' threshold."""
    return max(snd_data) < THRESHOLD


def normalize(snd_data):
    """Average the volume out"""
    MAXIMUM = 16384
    times = float(MAXIMUM) / max(abs(i) for i in snd_data)

    r = array('h')
    for i in snd_data:
        r.append(int(i * times))
    return r


def trim(snd_data):
    """Trim the blank spots at the start and end"""

    def _trim(snd_data):
        snd_started = False
        r = array('h')

        for i in snd_data:
            if not snd_started and abs(i) > THRESHOLD:
                snd_started = True
                r.append(i)

            elif snd_started:
                r.append(i)
        return r

    # Trim to the left
    snd_data = _trim(snd_data)

    # Trim to the right
    snd_data.reverse()
    snd_data = _trim(snd_data)
    snd_data.reverse()
    return snd_data


def add_silence(snd_data, seconds):
    """Add silence to the start and end of 'snd_data' of length 'seconds' (float)"""
    r = array('h', [0 for i in range(int(seconds * RATE))])
    r.extend(snd_data)
    r.extend([0 for i in range(int(seconds * RATE))])
    return r


def record():
    """
    Record a word or words from the microphone and 
    return the data as an array of signed shorts.
    Normalizes the audio, trims silence from the 
    start and end, and pads with 0.5 seconds of 
    blank sound to make sure VLC et al can play 
    it without getting chopped off.
    """
    p = pyaudio.PyAudio()
    stream = p.open(format=FORMAT, channels=1, rate=RATE,
                    input=True, output=True,
                    frames_per_buffer=CHUNK_SIZE)

    num_silent = 0
    snd_started = False

    r = array('h')

    while 1:
        # little endian, signed short
        snd_data = array('h', stream.read(CHUNK_SIZE))
        if byteorder == 'big':
            snd_data.byteswap()
        r.extend(snd_data)

        silent = is_silent(snd_data)

        if silent and snd_started:
            num_silent += 1
        elif not silent and not snd_started:
            snd_started = True

        if snd_started and num_silent > SILENCE:
            break

    sample_width = p.get_sample_size(FORMAT)
    stream.stop_stream()
    stream.close()
    p.terminate()

    r = normalize(r)
    r = trim(r)
    r = add_silence(r, 0.5)
    return sample_width, r


def record_to_file(path):
    """Records from the microphone and outputs the resulting data to 'path'"""
    sample_width, data = record()
    data = pack('<' + ('h' * len(data)), *data)

    wf = wave.open(path, 'wb')
    wf.setnchannels(1)
    wf.setsampwidth(sample_width)
    wf.setframerate(RATE)
    wf.writeframes(data)
    wf.close()

def RBF(X, gamma):
    # Free parameter gamma
    if gamma == None:
        gamma = 1.0/X.shape[1]
        
    # RBF kernel Equation
    K = np.exp(-gamma * np.sum((X - X[:,np.newaxis])**2, axis = -1))
    
    return K

if __name__ == "__main__":

    from utils import load_data, split_data
    import argparse

    parser = argparse.ArgumentParser(description="""Gender recognition script, this will load the model you trained, 
                                    and perform inference on a sample you provide (either using your voice or a file)""")
    parser.add_argument("-f", "--file", help="The path to the file, preferred to be in WAV format")
    args = parser.parse_args()
    file = args.file
    test = False

    if test:
        data, y = load_data()
        split_data = split_data(data, y)
        X_train, X_test, y_train, y_test = split_data["X_train"], split_data["X_test"], split_data["y_train"], split_data["y_test"]
        print(X_train.shape, X_test.shape, y_train.shape, y_test.shape)
        print(np.sum(y_train))
        # construct the model
        model = SVM()
        # model = svm.SVC(kernel=gaussian_kernel, gamma=0.1)
        model.fit(X_train, y_train)
        print(y_test)
        y_predict = [[x] for x in model.predict(X_test)]
        print(y_predict)
        correct = np.sum(y_predict == y_test)
        print("%d out of %d predictions correct" % (correct, len(y_predict)))
        cm = sklearn.metrics.confusion_matrix(y_test, y_predict)
        disp = sklearn.metrics.ConfusionMatrixDisplay(confusion_matrix=cm)
        disp.plot()
        plt.show()

    # if not file or not os.path.isfile(file):
        # if file not provided, or it doesn't exist, use your voice
        # print("Please talk")
        # put the file name here
        # file = "test.wav"
        # record the file (start talking)
        # record_to_file(file)

    if file:
        model = SVM()
        model.load_vars("svm_info_66k.txt")
        # extract features and reshape it
        features = extract_mfcc_feature(file).reshape(1, -1)
        # predict
        result = model.predict(features)
        if result == 1:
            str_result = "male"
        else:
            str_result = "female"
        print("result:", str_result)
