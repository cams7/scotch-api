# Exemplo de API usando o LoopBack

* Autor: César Magalhães
* Tecnologias: LoopBack, Node JS
* Resumo: API usando o LoopBack
* Linguagens: JavaScript
* Fonte: <https://github.com/cams7/scotch-api>
* Site: <https://morning-peak-36018.herokuapp.com/explorer/>
* Linkedin: <https://br.linkedin.com/in/cams7>

## Qual a finalidade desses exemplos?

Esses exemplos foram estudados e testados com intuíto de aprender um pouco mais sobre o LoopBack.

## Sistemas requeridos

* [Microsoft Windows 10](https://www.microsoft.com/pt-br/software-download/windows10)
* [Ubuntu 16.04.5 LTS](http://releases.ubuntu.com/16.04/)
* [Git](https://git-scm.com/downloads)
* [LoopBack](https://loopback.io/)
* [Node JS](https://nodejs.org/en/)
* [Visual Studio Code](https://code.visualstudio.com/)

## Para testa o exemplo

* Instale o Git
* Instale o Node JS
* Instale o Visual Studio Code

-------------------

```sh
sudo npm install -g strongloop

cd ~/Dev/Angular2/Exemplos/scotch

mkdir scotch-api
cd ~/Dev/Angular2/Exemplos/scotch/scotch-api

slc loopback

slc run
#Go to http://0.0.0.0:3000/explorer
#CTR-C
```

```sh
lb model

Enter the model name: comment
Select the datasource to attach comment to: db ...
Select model's base class PersistedModel
Expose comment via the REST API? Yes
Common model or server only? common

Property name: author
Property type: string
Required? Yes

Property name: text
Property type: string
Required? Yes

Property name: postDate
Property type: date
Required? Yes
```

```sh
sudo -i -u postgres
psql -d template1 -U postgres
CREATE USER scotch_admin WITH PASSWORD '12345';
CREATE DATABASE scotch;
GRANT ALL PRIVILEGES ON DATABASE scotch to scotch_admin;
\q
exit

lb datasource

Enter the datasource name: scotchDS
Select the connector for scotchDS: PostgreSQL ...
Connection String url to override other settings (eg: postgres://username:password@localhost/database):
host: 127.0.0.1
port: 5432
user: scotch_admin
password:12345
database: scotch
Install loopback-connector-postgresql@^2.4 Yes

npm install async -save
```

```sh
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ "username": "admin", "email": "admin@teste.com", "password": "12345" }' 'http://0.0.0.0:3000/api/Users'
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"username":"admin", "password":"12345"}' 'http://0.0.0.0:3000/api/Users/login'
curl -X PATCH --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{}' 'http://0.0.0.0:3000/api/Users/1?access_token=TOKEN'
```

```sh
cd ~/Dev/Angular2/Exemplos/scotch/scotch-http
ng build --prod

rm -r  ~/Dev/Angular2/Exemplos/scotch/scotch-api/client/*
cp -r ~/Dev/Angular2/Exemplos/scotch/scotch-http/dist/*  ~/Dev/Angular2/Exemplos/scotch/scotch-api/client
```

## Para fazer o build da aplicação do Loopback no Heroku, acesse o [passo a passo](https://elements.heroku.com/buildpacks/strongloop/strongloop-buildpacks)

```sh
cd /home/cams7/Dev/Angular2/Exemplos/scotch/scotch-api


heroku create <Nome da aplicação>
heroku addons:add heroku-postgresql:hobby-dev

heroku pg:psql DATABASE_URL --app <Nome da aplicação>

git push heroku master

heroku open
```