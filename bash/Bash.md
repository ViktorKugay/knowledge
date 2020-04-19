# Useful BASH notes

## Tutorial about useful Bash utilities

## Kill process which listened particular port

`lsof -ti tcp:8080 | xargs kill` - 1. list of all procesess which use port 2. take all args from lsof and kill all procesess.

## xargs

Command use standart input and execute handle command with input used like argument.

`echo hello | xargs rm`

## grep

- `r` рекурсивный search includes directories
- `exclude-dir`
- `-i` ignore case
- `-c`count line
- `-v` invert match
- `-w` use reqExp
- `-l` return only names files with searching string

## curl

_curl options url_

### Common options

- `-v` shows all information about request and also shows info about response. Especially useful with redirect response
- `-o` write content page to file

### Coockies

- `-b` save cookies to file
- `-c` send cookie to server from file

### Methods and data

- `-d` send data using POST method. Template **'{"example": "placeholder"}'**. Configure method with -X options
- `-G` if exists all data sended with -d options will be send like GET request
- `-X` specifies type of request. Example: -X POST
- `-u` add user credentials to auth user on the server. Example: **"-u "client_id:client_password"**
- `-f` send data like as form
- `-T` send file to server

### Headers

- `-H` add header to request
- `-e` set Referer URL
- `-l` show only headers

## find

- `-iname ""` multiregester search
- `-type f` search only file
- `-type d` search only directories
- `-not-name` except selected name
- `-o` OR operator. Example: **find -name "_.html" -o -name "_.php"**
- `-maxdepth` max depth search
- **-exec `some action command` {} \;** - execute some action to files

- `yarn workspace @specials/cli add` - добавить зависимость в workspace
- `find` - поиск файлов в ФС
- `realpath` - конструктор абсолютных путей
- `grep` - поиск по содержимому файла
- `echo` - печать на экран
- `cat` - печать на экран содержимого файла
- `HOME` - HOME переменная
- `sudo openvpn --config ~/Documents/datamind.ru_v.kugay_servers.ovpn`
