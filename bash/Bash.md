# Useful BASH notes

## Tutorial about useful Bash utilities

## Убить процесс на порту

`lsof -ti tcp:8080 | xargs kill`

## xargs

использовать стандартный поток ввода/вывода

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

- `-v` показать всю информацию о запросе
- `-o` записать лог в файл

### Cookies

- `-b` сохранить куки в файл
- `-c` добавить куки из файла

### Методы и данные

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

- `find` - поиск файлов в ФС
- `realpath` - конструктор абсолютных путей
- `grep` - поиск по содержимому файла
- `echo` - печать на экран
- `cat` - печать на экран содержимого файла
- `HOME` - HOME переменная
