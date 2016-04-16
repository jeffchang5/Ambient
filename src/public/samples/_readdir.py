from os import listdir

array_of_files = listdir('.')[3:]
with open('_file_list.txt', 'w') as f:
    for i, val in enumerate(array_of_files):
        f.write(array_of_files[i] + '\n')

