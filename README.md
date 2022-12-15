# Electronic Voting Mechanism Using Ethereum Blockchain

## Instructions to run:

1. Change the election committee members in smart contract `Election.js` by selecting any three account addresses from your Ganache workspace. Also, make sure to add these addresses to your Metamask.

2. Compile the smart contracts
```
truffle compile
```

3. Deploy the smart contracts onto Ganache
- Note: Make sure that the chain is running on port `7545` and network id is `5777`.
```
truffle migrate --reset
```

4. Once the smart contract is deployed, run the frontend server by running:
   ```
    cd src;
    node server
   ```
5. To access the frontend, goto http://127.0.0.1:3000.