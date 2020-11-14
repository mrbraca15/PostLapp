# PostLapp

 Documentacion del api:
 https://documenter.getpostman.com/view/2403637/TVep8TBV
 
 la aplicación se encuentra desplegada en una instancia ec2 de amazon usando node js, la aplicación corre bajo un protocolo seguro en https://aqualapp.com:9000
La base de datos utilizada también está instalada en la instancia ec2

Para correr el proyecto en modo desarrollo o loca, es necesario instalar algunas dependencias globales usando npm, entre ellas tenemos:
- npm install -g nodemon
- npm install -g typescript@3.5.1

después de la instalación de las dependencias mencionadas anteriormente, ubicarse en la raíz de la aplicación desde una terminal o consola e instalar las dependencias usando el comando npm install, luego correr el proyecto usando el comando npm start, sera ejecutando en el puerto configurado en el archivo .env

Nota: Es necesario instalar un motor de base de datos mysql, para efectos de esta prueba se utilizó el mysql que viene incluido con xamp

Nota: en el archivo .env se deben configurar las credenciales de aws s3 y las credenciales de conexión de base de datos para correr local.


