import os

def rename(level):
    for healthCondition in ['abnormal', 'normal']:
        dir_path = f"sounds/{level}/{healthCondition}"
        files_list = os.listdir(dir_path)
        for i in range(len(files_list)):
            prefix = str(i).rjust(8, '0')
            os.rename(f"{dir_path}/{files_list[i]}", f"{dir_path}/{prefix}.wav")

if __name__=="__main__":
    for level in ["Level_1", "Level_2", "Level_3"]:
        rename(level)