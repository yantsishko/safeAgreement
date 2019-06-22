import Arweave from 'arweave/node/index';

export function initArweave () {
  window.arweave = Arweave.init({
    host: 'arweave.net',
    port: 80,
    protocol: 'https',
    timeout: 20000,
    logging: false,
  });
}

export function uploadFile (pdfFile) {

}