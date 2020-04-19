# Docker

## Useful commands

- `docker -v` - версия установленного docker

- `docker run [container-name]` - старт контейнера
- `--rm` - удаление контейнера и окружения после выхода из контейнера
- `-ti` - открыть интерактивный терминал после старта контейнера
- `docker run -ti --rm [image-name] bin/bash` - старт нового контейнера на основе образа и последующий запуск bash

- `docker ps aux` - список процессов системы
- `docker ps` - список запущенных контейнеров, с флагом **-a** - список всех установленных контейнеров
- `docker images` - список всех установленных образов на машину
- `docker pull Ubuntu:12.10` - старт контейнера из отдельного образа

- `docker run [options] [image] [command] [arguments]` - общий паттерн старта docker контейнера

- `-t` - start TTY session
- `-i` - start interactive container
- `-d` - start process in deamon mode

- `--name` - set name of container
- `docker stop` - остановить контейнер
- `docker attach` - re-connect to the container
- `docker rm -f [name]` - принудительное удаление контейнера

- `docker run -v [hostname]:[containername]` - монтирование дирректорий с данными
- `docker run -v [path]` - монтирование директории внутри контейнера. Дирректория будет жить до тех пор, пока
  контейнер не будет удален.
- `docker create -v /root --name some_name busybox` - создания пустого контейнера для хранения данных
- `docker run --volums-from [docker_container_name]` - монтирование дирректорий из другого контейнера
- `docker create -v /root --name [docker_container_name] busybox` - создание нового раздела в контейнере для хранения данных

- `docker inspect / 2 -f "{{.NetworkSettings.IPAddress}}" [container_name]` - порт, который слушает контейнер
- `docker-machine ip default` - тоже самое, но для windows и macOS
- `--link [name]:[alias]` - слинковывание постороннего контейнера
- `--expose=80` - setup port
- `-p 80` - тоже задаем порт, но рандомный
- `-p [hostport]:[port]` - сетапит порт

## Dockerfile

- `FROM` - образ для контейнера
- `MAINTAINER` - set author
- `RUN ["executable", "param1", "param2"]` - запуск bush скриптов. Каждый новый run добавляет новый слой, так что
  надо стараться уместить все в один run.
- `COPY` - перемещает внутри контейнера. Работает только внутри контейнера
- `ADD` - может читать .tar файлы
- `CMD ["executable", "param1", "param2"]` - выполнение команд после старта контейнера
- `ENTRYPOINT ["executable", "param1", "param2"]` - надо узнать!!!
- `EXPOSE` - ????
- `VOLUME ["/path/inside/image"]` - монтирование разделов с информацией

- `docker build -t [docker_container_name] .` - создание нового docker образа c помощью docker file

## Вопросы

- Что такое ENTRYPOINT в docker file
- Чем отличаются _--expose=80_ от _-p80_ и _-p 8080:80_
- В чем разница между _COPY_ и _ADD_
- EXPOSE ?????
- Что делает флаг _-t_
