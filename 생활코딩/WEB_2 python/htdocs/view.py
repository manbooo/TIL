import os, html_sanitizer

def getList():
    sanitizer = html_sanitizer.Sanitizer()
    files = os.listdir('data')
    #print(files)

    listStr = ''

    for item in files:
        item = sanitizer.sanitize(item)
        listStr = listStr + '<li><a href="index.py?id={name}">{name}</a></li>'.format(name = item)

    return listStr
