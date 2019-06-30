import * as fluence from 'fluence';

let privateKey = '569ae4fed4b0485848d3cf9bbe3723f5783aadd0d5f6fd83e18b45ac22496859'; // Authorization private key
let contract = '0xeFF91455de6D4CF57C141bD8bF819E5f873c1A01';                         // Fluence contract address
let appId = 268;                                                                      // Deployed database id
let ethereumUrl = 'http://geth.fluence.one:8545';                                    // Ethereum light node URL

export async function initFluence () {
  window.session = await fluence.connect(contract, appId, ethereumUrl, privateKey);
}
