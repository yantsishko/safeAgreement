import Arweave from 'arweave/web/index';
import { createPdf } from "./pdfCreator";
import jwk from '../key'

let arweave = null

export function initArweave () {
  arweave = Arweave.init({
    host: 'arweave.net',
    port: 80,
    protocol: 'https',
    timeout: 20000,
    logging: false,
  });
}

export async function uploadFile (data) {
  const transaction = await arweave.createTransaction({ data }, jwk);

  // transaction.addTag('Content-Type', 'application/pdf');

  await arweave.transactions.sign(transaction, jwk);

  const response = await arweave.transactions.post(transaction);
  console.log(response, transaction)
}