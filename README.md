# mern-ecommerce

[Live link](https://quiet-cat-ecom.netlify.app/).

## Built With
* Node.js
* Express.js
* MongoDB
* React.js

## Requirements

For development, you will only need Node.js v16+ installed in your environnement.

## Install 
    using SSH:
    $ git clone git@github.com:knrbokhari/mern-ecommerce.git
    or using HTTPS:
    $ git clone https://github.com/knrbokhari/mern-ecommerce.git
    $ cd mern-ecommerce/client
    $ npm install
    $ cd ..
    $ cd server
    $ npm install

Open `server/.env` then You will need to give your MONGO_DB URL, CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET, STRIPE_SECRET and JWTKEY:

```
MONGO_DB = 
CLOUD_NAME = 
CLOUD_API_KEY =
CLOUD_API_SECRET =
STRIPE_SECRET =
JWTKEY = 
```
### Run Client
    $ npm start

### Run the server with nodemon
    $ npm run start-dev
### Run the server 
    $ npm start
### Run the test 
    $ npm run test

## Technology Used: 
* ReactJS
* Redux
* NodeJS
* ExpressJS
* MongoDB
* Mongoose
* Winston
* Jest
* JWT
* Stripe
* GitHub
* Axios
* Bootstrap
* React-icons
* moment.

### About website
* This website has jwt implemented, email, password, authentication, and a stripe payment system. It has an error log system that stores in MongoDB.
* Users can add items to the cart, change cart quantity, and remove items from the card. it gives users a notification when the order is shipped.
* Admin can update product status and restock, add, and delete products. When users order products then the admin gets a notification from it.
