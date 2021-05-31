# Сборка и работа с приложением nestjs - postgreSql

## старт postgreSql

- `docker-compose up -d`

- `sudo apt-get install postgresql-client`

## Сборка контейнера

```bash
    POSTGRES_USER=user                     # пользователь базы данных
    POSTGRES_PASSWORD=password             # пароль базы данных
    POSTGRES_DB=generatordb                # название базы данных
    POSTGRES_HOST=database                 # ВАЖНО! host будет определён на стадии старта контейнера
    POSTGRES_PORT=5432                     # порт
```

- сконфигурировать переменные для подключения к базе данных

- запустить сборку приложения

- `docker build .`

```bash
Sending build context to Docker daemon  234.1MB
Step 1/7 : FROM node:10
 ---> bb78c02ca3bf
Step 2/7 : WORKDIR /opt/app
 ---> Using cache
 ---> 158bb0bb898d
Step 3/7 : RUN mkdir -p /opt/app &&    addgroup app &&    adduser app --ingroup app --disabled-password -q &&    chown -R app /opt/app
 ---> Using cache
 ---> 45b355709806
Step 4/7 : ADD ./ /opt/app
 ---> 173d0bf14efc
Step 5/7 : USER app
 ---> Running in 92019de7f272
Removing intermediate container 92019de7f272
 ---> 541d6e0a273c
Step 6/7 : EXPOSE 3000
 ---> Running in c7ef330aa9b4
Removing intermediate container c7ef330aa9b4
 ---> fffa5ba1a19d
Step 7/7 : CMD [ "npm", "start" ]
 ---> Running in 58c25f548e5c
Removing intermediate container 58c25f548e5c
 ---> 610b4460d207
Successfully built 610b4460d207               # ID собранного образа
```

## Старт контейнера

- `docker run -p 3000:3000 --add-host=database:172.20.0.1 container_id`, где **-p** матчинг внутреннего порта контейнера с внешним, **--add-host** - линк контейнера к внешнему контейнеру с базой данных

- `docker exec -ti container_id bash` - запуск bash внутри выбранного контейнера

## Conclusion

Приложение стартует на сматченном порту, подключается к указанному хосту в качестве базы данных, после чего с приложением можно работать в командной строке
