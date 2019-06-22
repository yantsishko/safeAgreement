import nanoid from 'nanoid'
import html2pdf from 'html2pdf.js';

export function createPdf (customHtml) {
  const id = nanoid();
  const opt = {
    margin:       1,
    filename:     `${id}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(customHtml).save();
}