import os

def getList():
    files = os.listdir('data')
    #print(files)

    listStr = ''

    for item in files:
        listStr = listStr + '<li><a href="index.py?id={name}">{name}</a></li>'.format(name = item)

    return listStr
