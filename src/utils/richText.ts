// Convierte el texto de cursos y clases (markdown simple) en HTML seguro.
// Soporta párrafos, saltos de línea, **negrita**, *cursiva* y listas con "-" o "1.".
// Si el texto ya viene en HTML (editor del admin) se devuelve tal cual.

const HTML_TAG = /<\/?[a-z][\s\S]*?>/i

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function inline(value: string): string {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, '$1<em>$2</em>')
}

export function renderRichText(source: string | null | undefined): string {
  const text = (source ?? '').trim()
  if (!text) return ''
  if (HTML_TAG.test(text)) return text

  return text
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map((block) => {
      const lines = block.split('\n').map((line) => line.trim()).filter(Boolean)
      if (lines.every((line) => /^[-•]\s+/.test(line))) {
        return `<ul>${lines.map((line) => `<li>${inline(line.replace(/^[-•]\s+/, ''))}</li>`).join('')}</ul>`
      }
      if (lines.every((line) => /^\d+[.)]\s+/.test(line))) {
        return `<ol>${lines.map((line) => `<li>${inline(line.replace(/^\d+[.)]\s+/, ''))}</li>`).join('')}</ol>`
      }
      return `<p>${lines.map(inline).join('<br>')}</p>`
    })
    .join('')
}
