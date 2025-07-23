export function extrairPublicId(url: string) {
  if (!url) return null;

  try {
    const urlObj = new URL(url);
    const partes = urlObj.pathname.split('/upload/');

    if (partes.length < 2) return null;

    const partesCaminho = partes[1].split('/');
    if (partesCaminho[0].startsWith('v') && /^\d+$/.test(partesCaminho[0].substring(1))) {
      partesCaminho.shift();
    }

    let publicId = partesCaminho.join('/');
    if (publicId.endsWith('.png.png')) {
      publicId = publicId.slice(0, -4);
    }

    return publicId;
  } catch {
    return null;
  }
}