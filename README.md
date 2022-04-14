### Starting Application

```bash
# Install Dependencies
$ yarn

## Add the necessary Keys the .env.* file

# Launch the project
$ yarn start

# Launch the project with nodemon
$ yarn dev
```

## Usage

Create a .env file on the ROOT directory and add below variables

```bash
ETH_NETWORK=
BSC_NETWORK=
SOLANA_NETWORK=
```

## Get wallet balance

**You send:** The address and network.
**You get:** An address balance.

**Request:**

```bash
GET /api/balance/:address?network=eth HTTP/1.1
Accept: application/json

Address example: 0x35801B4D3c9728A6B1AfA896cB7cfA7922fAfc88
Network example: eth, solana, bsc
```

## Verify Contract Owner

**You send:** The contract address, the account address and network.

**You get:** A boolean, if the account address is the owner of the contract you will get {"status":true}

**Request:**

```bash

GET /api/owner/:contract/:address?network=eth HTTP/1.1
Accept: application/json

Contract Address example: 0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e
Account Address example: 0x5a019874F4Fae314b0eAA4606Be746366e661306
Network example: eth, solana, bsc

http://localhost:7000/api/owner/0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e/0x5a019874F4Fae314b0eAA4606Be746366e661306?network=eth

```
