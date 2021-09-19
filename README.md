# Running the setup

## Start base-app 
```
cd base-app 
yarn install 
yarn run build
npx serve -s build
```
## Start express app for data
```
cd sample-express-app
yarn install 
yarn start
```

## Start iframe-app 
```
cd iframe-app 
yarn install 
yarn run start
```

### About this repo 
It has 3 components. 
1. *iframe-app* : It is the application which servers tha iframes as a final consumer application. 
2. *base-app*: It is the application which gets served inside each iframe. It has the business logic to call the API and 
stich the response to UI. It also has the logic for API data sharing and update syncronisation with the help of `brodcast-channel` 
and `react-query`.
3. *sample-express-app*: It is the application acting like a backend and serving the response. 