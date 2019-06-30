export async function createPdf ({ customhtml, signature, participantname }) {
  const data = `
    <div style="width: 200mm; height: 297mm; margin:0 auto; padding-top: 10mm;">
      ${customhtml}
      <div>${participantname}: <img width="100" height="100" src="${signature}" </div>
    </div>
  `;

  return data
}
