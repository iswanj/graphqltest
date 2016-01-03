# graphqltest
Simple graphql server and IDE Portal


### To start server

need iojs or >= Node.js v0.12.x

#### Install dependencies
```
npm install
```
#### Seed data base
```
npm run seed
```
#### Start server
```
npm start
```
Server will start on [http://localhost:3000](http://localhost:3000)

### To Start client IDE

#### Go to the client directory
```
cd src/client
```

### Install dependencies
```
npm install
```

### run portal
```
npm run watch
```
Portal will start on [http://localhost:8080](http://localhost:8080)


## Sample Queries

* Get user
```
{
    user(id: "559645cd1a38532d14349240") {
      fullname,
      username,
      email,
      account {
          name,
          balance
      }
    }
}
```
