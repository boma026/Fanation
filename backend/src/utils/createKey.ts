export function createKey(tipoRecorte, nomeModelo, material, cor) {
  return `${tipoRecorte}-${nomeModelo}-${material}-${cor}`
    .toLowerCase()
    .replace(/\s+/g, '_');
}