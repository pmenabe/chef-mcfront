
# Chef McFront

Chef Mc Front is a PoC of a RestFul API service based on a distributed continuous integration system to improve the developer experience with Microfrontends Architecture.

With this service together with Waiter Mc Front Service and the Chef Mc Front client application, the developer will be able to request the construction of micro-applications from other development teams according to specific commits of the version control system of each team. These buildings will be available only to him. In this way, each developer will be able to obtain a customized development environment.

## Requirements

- [Nodejs](https://nodejs.org/) (v10 and above)
- [MariaDB](https://mariadb.org/) or [MySQL](https://www.mysql.com/)
- [Redis](https://redis.io/)
- [Nvm](https://github.com/nvm-sh/nvm)
- [Git](https://git-scm.com/)

## Installation

```
$ git clone https://github.com/pmenabe/chef-mcfront.git
$ cd chef-mcfront
$ npm install
``` 

## Configuration

The configuration file is config.js and it is located in the root directory.

| Parámetro | Tipo | Default | descripción |
| :--------: | :--: | :-----: | :---------- |
|PORT|Integer|3001|Port from which the api service will listen|
|WEBSOCKET_PORT|Integer|8081|Port from which the websocket service will listen|
|APP_CLIENT_URL|String|null|URL of client app|
|DATABASE|Object|{}|Entity of configuration of Database|
|DATABASE.HOST|String|null|Host of Database|
|DATABASE.NAME|String|null|Name of Database|
|DATABASE.USER|String|null|User of Database|
|DATABASE.PASS|String|null|Password of Database|
|DATABASE.BUILD|Boolean|false|Builds database schema|
|USER|OBJECT|{}|Parameters of users|
|USER.ADMIN_USER|String|null|Email of admin user|
|BUILT_PATH|String|null|Path to store builts|
|MAIL|Object|{}|Email service configuration|
|MAIL.SERVICE|Object|{}|Email service (Services accepted in [nodemailer](https://www.npmjs.com/package/nodemailer))|
|MAIL.USER|Object|{}|Email user|
|MAIL.TOKEN|Object|{}|Email token|

 
## Run

In the root directory:

```
$ npm run start
```