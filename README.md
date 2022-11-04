# Busker Donation Plataform

## Description

- En un mundo donde se utiliza cada vez menos el dinero en efectivo, los músicos, artistas y trabajadores que sustentan su vida pidiendo en las calles, son los más afectados.
- Este proyecto busca ofrecer a estas personas un sistema de cobro digital y descentralizado para facilitar la donación de los espectadores que no cuentan con dinero en efectivo.
- A través de un código QR, que el artista pueda tener impreso en la calle, se podrá acceder directamente a su cuenta digital para realizar una donación.

## MVP

Este proyecto de desarrollado diseñado, desarrollado, probado y desplegado en la Testnet del Protocolo de NEWAR para el **_NEAR Certified Developer 31/11/22_**, es un contrato simple que puede:

1. Crear y sumar nuevos perfiles de artistas callejeros a una collección.
2. Obtener una lista de todos los perfiles de artistas callejeros registrados.
3. Donar a uno de los artistas callejeros de la lista a elección.

## Diagram

![](https://i.imgur.com/CJKx4K2.png)

# Smart Contract

Esta plataforma cuenta con un modelo de contrato administrador que gestiona una colección de perfiles de artistas registrados en la blockchain.

## NEAR AccountId

El contrato ya se encuentra desplegado en la cuenta [buskerdapp2.hueeerta.testnet](https://stats.gallery/testnet/buskerdapp2.hueeerta.testnet/contract?t=all). Y con la [NEAR CLI](https://docs.near.org/tools/near-cli) ya puedes interactuar con el.

Para obtener la lista de perfiles de artistas registrados, puedes llamar al metodo get_buskers()

```
near view buskerdapp2.hueeerta.testnet get_buskers --accountId tu.cuenta.testnet
```

Para sumar tu perfil a la lista de perfiles de artistas, puedes llamar al metodo set_busker()

```
near call buskerdapp2.hueeerta.testnet set_busker '{"account_id":"tu.cuenta.testnet","name":"Nombre Artístico","category": "Malabarismo","location": "-34.584525,-58.404998","img":"https://ovallehoy.cl/wp-content/uploads/2017/01/Raul-malabarista.jpg","qr":"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1920px-QR_code_for_mobile_English_Wikipedia.svg.png"}' --accountId hueeerta.testnet
```

## Initialization

Para inicializar el contrato, primero debes de compilar el archivo de Rust a WebAssembly:

```
./build.sh
```

Luego debes desplegar el contrato generado en una cuenta en Testnet:

```
near deploy --accountId deploy.account.testnet --wasmFile target/wasm32-unknown-unknown/release/ncd_busker_project.wasm
```

Finalmente ya puedes interactuar con el contrato desde el NEAR CLI o dando `npm start` para interactuar desde el frontend.

# NEAR dApp

This app was initialized with [create-near-app]

# Quick Start

If you haven't installed dependencies during setup:

    npm install

Build and deploy your contract to TestNet with a temporary dev account:

    npm run deploy

Test your contract:

    npm test

If you have a frontend, run `npm start`. This will run a dev server.

# Exploring The Code

1. The smart-contract code lives in the `/contract` folder. See the README there for
   more info. In blockchain apps the smart contract is the "backend" of your app.
2. The frontend code lives in the `/frontend` folder. `/frontend/index.html` is a great
   place to start exploring. Note that it loads in `/frontend/index.js`,
   this is your entrypoint to learn how the frontend connects to the NEAR blockchain.
3. Test your contract: `npm test`, this will run the tests in `integration-tests` directory.

# Deploy

Every smart contract in NEAR has its [own associated account][near accounts].
When you run `npm run deploy`, your smart contract gets deployed to the live NEAR TestNet with a temporary dev account.
When you're ready to make it permanent, here's how:

## Step 0: Install near-cli (optional)

[near-cli] is a command line interface (CLI) for interacting with the NEAR blockchain. It was installed to the local `node_modules` folder when you ran `npm install`, but for best ergonomics you may want to install it globally:

    npm install --global near-cli

Or, if you'd rather use the locally-installed version, you can prefix all `near` commands with `npx`

Ensure that it's installed with `near --version` (or `npx near --version`)

## Step 1: Create an account for the contract

Each account on NEAR can have at most one contract deployed to it. If you've already created an account such as `your-name.testnet`, you can deploy your contract to `near-blank-project.your-name.testnet`. Assuming you've already created an account on [NEAR Wallet], here's how to create `near-blank-project.your-name.testnet`:

1. Authorize NEAR CLI, following the commands it gives you:

   near login

2. Create a subaccount (replace `YOUR-NAME` below with your actual account name):

   near create-account near-blank-project.YOUR-NAME.testnet --masterAccount YOUR-NAME.testnet

## Step 2: deploy the contract

Use the CLI to deploy the contract to TestNet with your account ID.
Replace `PATH_TO_WASM_FILE` with the `wasm` that was generated in `contract` build directory.

    near deploy --accountId near-blank-project.YOUR-NAME.testnet --wasmFile PATH_TO_WASM_FILE

## Step 3: set contract name in your frontend code

Modify the line in `src/config.js` that sets the account name of the contract. Set it to the account id you used above.

    const CONTRACT_NAME = process.env.CONTRACT_NAME || 'near-blank-project.YOUR-NAME.testnet'

# Troubleshooting

On Windows, if you're seeing an error containing `EPERM` it may be related to spaces in your path. Please see [this issue](https://github.com/zkat/npx/issues/209) for more details.

[create-near-app]: https://github.com/near/create-near-app
[node.js]: https://nodejs.org/en/download/package-manager/
[jest]: https://jestjs.io/
[near accounts]: https://docs.near.org/concepts/basics/account
[near wallet]: https://wallet.testnet.near.org/
[near-cli]: https://github.com/near/near-cli
[gh-pages]: https://github.com/tschaub/gh-pages
