### Starting Application

```bash
# Install Dependencies
$ yarn

## Add the necessary Keys the .env.* file

# Lunch the project
$ yarn start

# Lunch the project with nodemon
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
