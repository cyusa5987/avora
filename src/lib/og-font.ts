export async function loadGoogleFont(
  family: string,
  weight: number,
  text: string,
): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weight}&text=${encodeURIComponent(text)}`
  const css = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; U; Android 2.3.4)',
    },
  }).then((r) => r.text())

  const match = css.match(/src:\s*url\(([^)]+)\)/)
  if (!match) throw new Error(`Could not resolve font URL for ${family} ${weight}`)

  return fetch(match[1]).then((r) => r.arrayBuffer())
}
