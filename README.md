# Installation

Server uses jwt for authentication. Also uses nodemon, so server gets automatically restarted whenever theres changes.

```
$ cd server 
$ yarn
$ yarn run dev
```


## ReactJS Application

Came from create-react-app. However i ported it to webpack 4 because it is 90% faster than webpack 3.
As a tradeoff existing test  setups are gone. 

Form Serializer - Use to parse forms so that all forms should be uncontrolled and using default value. 
ReactStrap - in order to quickly make ui, i used reactstrap which is react version for twbs.
Noty - lesser dependency notification alert system
Apollo Client - i use this for connecting to my graphQL server.
Prettier + Husky - setting up a coding standard is time consuming so i just used husky and prettier to make code formatting alot easier.

I think the structure is pretty straight forward and very easy to follow at a the first glance.

```
$ cd client
$ yarn
$ npm run start
```