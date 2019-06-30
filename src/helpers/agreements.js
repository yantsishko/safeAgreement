import { dataToJson } from './responseParser';

export async function getUserAgreements(userId) {
  const userAgreements = await window.session.request(`SELECT agreements.id as id, agreements.userid as userid, agreements.customhtml as customhtml, agreements.pathtopdf as pathtopdf, agreements.participantname as participantname FROM agreements LEFT JOIN users ON (users.id = agreements.userid) WHERE users.id='%${userId}%'`).result();
  const data = dataToJson(userAgreements.asString());

  const promises = data.map(async (i, ind) => {
    data[ind].createDate = 'In Progress';
    if (!i.pathtopdf) {
      return;
    }

    const status = await window.arweave.transactions.getStatus(i.pathtopdf);

    if (status.status === 200) {
      const blockHash = (await (await fetch(`http://arweave.net/tx/${i.pathtopdf}/status`)).json()).block_indep_hash;
      const status = await (await fetch(`http://arweave.net/block/hash/${blockHash}`)).json();

      data[ind].createDate = new Date(status.timestamp * 1000).toLocaleString();
    }
  });

  await Promise.all(promises);
  return data;
}

export async function getAllAgreements() {
  const agreements = await window.session.request(`SELECT * FROM agreements`).result();
  const data = dataToJson(agreements.asString());

  return data;
}

export async function getAggreementById (id) {
  const agreement = await window.session.request(`SELECT * FROM agreements WHERE id='%${id}%' `).result();

  const data = dataToJson(agreement.asString());

  return data;
}


/*
  userId: string,
  data: object
  {
    customHtml: string,
    pathToPdf: string,
    participantName: string
  }
 */
export async function saveAgreement(userId, data) {
  const allAgreements = await getAllAgreements();
  const nextId = +allAgreements.length + 1;

  await window.session.request(`INSERT INTO agreements VALUES ('%${nextId}%', '%${userId}%', '%${data.customHtml}%', '%${data.pathToPdf}%', '%${data.participantName}%')`).result();
}

export async function addPdfLink (id, transaction) {
  await window.session.request(`UPDATE agreements SET pathtopdf='%${transaction.id}%' WHERE id='%${id}%' `).result();
}
