## Used technologies
- React.js
- Fluence for saving data to DB
- Arweave for store agreements with signature

## Available Scripts

In the project directory, you can run:

### `yarn start` - start project for development

### `yarn build` - build production static files

### Deployment to Arweave

- npm install -g arweave-deploy  
- generate key using manual https://github.com/ArweaveTeam/arweave-deploy#Manual
- insert data from your generated key to key.json file
- run **yarn build**
- run **arweave deploy build/index.html --package --key-file {your_path_to_key}/key.json**
- open link http://arweave.net/{transactionID} (it will be accessible after block will be created 5-10 min )


