import md5 from 'md5';
import Arweave from 'arweave/web/index';
import jwk from '../key';

let arweave = null;

export function initArweave () {
  arweave = Arweave.init({
    host: 'arweave.net',
    port: 80,
    protocol: 'https',
    timeout: 20000,
    logging: false,
  });

  window.arweave = arweave;
}

export async function uploadFile (data, participantname) {
  const transaction = await arweave.createTransaction({ data: `${data}` }, jwk);

  transaction.addTag('Participant', md5(participantname));

  await arweave.transactions.sign(transaction, jwk);

  await arweave.transactions.post(transaction);

  return transaction;
}

export async function findDocuments (participantname) {
  const hash = md5(participantname);

  const list = await arweave.arql({
    op: "equals",
    expr1: "Participant",
    expr2: hash
  });

  return list
}
