import glob
import os
import pandas as pd
import numpy as np
from tqdm import tqdm
from utils import extract_feature


def main():
    dirname = "data"

    if not os.path.isdir(dirname):
        os.mkdir(dirname)

    csv_files = glob.glob("*.csv")

    for j, csv_file in enumerate(csv_files):
        print("[+] Preprocessing", csv_file)
        df = pd.read_csv(csv_file)
        # only take filename and gender columns
        new_df = df[["filename", "gender"]]
        print("Previously:", len(new_df), "rows")
        # take only male & female genders (i.e dropping NaNs & 'other' gender)
        new_df = new_df[np.logical_or(new_df['gender'] == 'female', new_df['gender'] == 'male')]
        print("Now:", len(new_df), "rows")
        new_csv_file = os.path.join(dirname, csv_file)
        # save new preprocessed CSV
        new_df.to_csv(new_csv_file, index=False)
        # get the folder name
        folder_name, _ = csv_file.split(".")
        audio_files = glob.glob(f"{folder_name}/{folder_name}/*")
        all_audio_filenames = set(new_df["filename"])
        for i, audio_file in tqdm(list(enumerate(audio_files)), f"Extracting features of {folder_name}"):
            splited = os.path.split(audio_file)
            audio_filename = f"{os.path.split(splited[0])[-1]}/{splited[-1]}"
            if audio_filename in all_audio_filenames:
                src_path = f"{folder_name}/{audio_filename}"
                target_path = f"{dirname}/{audio_filename}"
                # create that folder if it doesn't exist
                if not os.path.isdir(os.path.dirname(target_path)):
                    os.mkdir(os.path.dirname(target_path))
                # extract features and save it in the target path
                features = extract_feature(src_path, mel=True)
                target_filename = target_path.split(".")[0]
                np.save(target_filename, features)
