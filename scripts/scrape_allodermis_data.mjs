import fs from 'fs';
import path from 'path';

async function fetchProducts() {
  console.log('Fetching products...');
  const res = await fetch('https://allodermis.com/products.json?limit=250');
  const data = await res.json();
  return data.products;
}

async function fetchText(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.text();
  } catch (err) {
    console.error(`Failed ${url}:`, err.message);
    return null;
  }
}

function cleanHtml(html) {
  if (!html) return '';
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function main() {
  const dataDir = path.join(process.cwd(), 'src', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // 1. Products
  const products = await fetchProducts();
  console.log(`Fetched ${products.length} products.`);
  fs.writeFileSync(path.join(dataDir, 'products.json'), JSON.stringify(products, null, 2));

  // 2. Doctors info
  const doctorHandles = [
    'dr-alok-sahoo-allodermis',
    'dr-shivani-biswal-allodermis',
    'dr-pranomita-allodermis',
    'dr-narayanan-allodermis',
    'dr-sanjay-allodermis',
    'dr-archana-allodermis',
    'dr-karthik-l-allodermis'
  ];

  const doctors = [];
  for (const handle of doctorHandles) {
    const html = await fetchText(`https://allodermis.com/pages/${handle}`);
    if (html) {
      // Extract title
      const titleMatch = html.match(/<title>(.*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1].replace(/– Allodermis|- Allodermis|Allodermis/gi, '').trim() : handle;
      
      // Extract main images
      const imgMatches = [...html.matchAll(/src=["'](https:\/\/allodermis\.com\/cdn\/shop\/files\/[^"']+)["']/g)].map(m => m[1]);
      
      // Extract meta description
      const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
      const description = descMatch ? descMatch[1] : '';

      doctors.push({
        id: handle,
        name: title || handle,
        handle,
        description,
        images: [...new Set(imgMatches)].slice(0, 3),
        url: `https://allodermis.com/pages/${handle}`
      });
    }
  }
  console.log(`Fetched ${doctors.length} doctors.`);
  fs.writeFileSync(path.join(dataDir, 'doctors.json'), JSON.stringify(doctors, null, 2));

  // 3. Treatment pages
  const treatmentHandles = [
    { handle: 'acne-pimple', title: 'Acne & Pimple Treatment', category: 'Medical Dermatology' },
    { handle: 'acne-scar-treatment', title: 'Acne Scar Treatment (MNRF & Subcision)', category: 'Advanced Aesthetics' },
    { handle: 'laser-hair-reduction', title: 'Laser Hair Reduction (US-FDA Approved)', category: 'Laser & Energy' },
    { handle: 'chemical-peel', title: 'Clinical Chemical Peels', category: 'Medical Aesthetics' },
    { handle: 'skin-pigmentation', title: 'Skin Pigmentation & Melasma Treatment', category: 'Pigmentation' },
    { handle: 'botox', title: 'Anti-Wrinkle Injections (Botox)', category: 'Injectables' },
    { handle: 'dermal-fillers', title: 'Dermal Fillers & Facial Contouring', category: 'Injectables' },
    { handle: 'pdrn-skin-booster', title: 'PDRN Salmon DNA Skin Booster', category: 'Skin Rejuvenation' },
    { handle: 'profhilo', title: 'Profhilo Bioremodeling', category: 'Skin Rejuvenation' },
    { handle: 'hifu', title: 'HIFU Non-Surgical Skin Tightening', category: 'Lifting & Tightening' },
    { handle: 'carbon-laser-peel', title: 'Carbon Laser Peel (Hollywood Glow)', category: 'Laser & Energy' },
    { handle: 'allopecia', title: 'Alopecia & Hair Loss Treatments', category: 'Hair Restoration' },
    { handle: 'dark-circle', title: 'Dark Circle Removal & Under Eye Care', category: 'Medical Aesthetics' },
    { handle: 'open-pores', title: 'Open Pores & Skin Texture Refinement', category: 'Skin Rejuvenation' },
    { handle: 'ageing-issues', title: 'Premature Ageing & Fine Lines Solutions', category: 'Anti-Ageing' },
    { handle: 'stretch-marks', title: 'Stretch Marks & Collagen Induction', category: 'Body Aesthetics' }
  ];

  const treatments = [];
  for (const t of treatmentHandles) {
    const html = await fetchText(`https://allodermis.com/pages/${t.handle}`);
    let desc = '';
    let imgs = [];
    if (html) {
      const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
      desc = descMatch ? descMatch[1] : '';
      imgs = [...html.matchAll(/src=["'](https:\/\/allodermis\.com\/cdn\/shop\/files\/[^"']+)["']/g)].map(m => m[1]);
    }
    treatments.push({
      id: t.handle,
      handle: t.handle,
      title: t.title,
      category: t.category,
      description: desc || `Comprehensive dermatologist-led treatment for ${t.title.toLowerCase()} at Allodermis.`,
      images: [...new Set(imgs)].slice(0, 4)
    });
  }
  console.log(`Fetched ${treatments.length} treatments.`);
  fs.writeFileSync(path.join(dataDir, 'treatments.json'), JSON.stringify(treatments, null, 2));

  console.log('Data extraction complete.');
}

main().catch(console.error);
