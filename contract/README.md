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
