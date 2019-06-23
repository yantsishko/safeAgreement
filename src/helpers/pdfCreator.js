import nanoid from 'nanoid'
import html2pdf from 'html2pdf.js';

export async function createPdf ({ customhtml, signature, participantname }) {
  const data = `
    <div style="width: 200mm; height: 297mm; margin:0 auto; padding-top: 10mm;">
      ${customhtml}
      <div>${participantname}: <img width="100" height="100" src="${signature}" </div>
    </div>
  `

  const id = nanoid();

  const opt = {
    margin:       1,
    filename:     `${id}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(data).save();

  return data
}