// ─────────────────────────────────────────────────────────────────────────────
//  Popular AU model seed
//
//  Drives the auto-generated /cars/[make]/[model] SEO pages and the sitemap.
//  These are the ~80 models that account for the bulk of "how much is a X
//  worth" search volume in Australia, mixed across:
//    - top-selling new cars (Hilux, Ranger, RAV4, X-Trail, …)
//    - prestige resale staples (LandCruiser 200/300, 911, M3, …)
//    - JDM imports under the 25-yr rule (R32–R34 GT-R, Supra, RX-7, …)
//
//  To extend: just add rows. Each row produces one indexable page + one
//  sitemap entry. Slugs are computed from `${make}-${model}` lowercased.
// ─────────────────────────────────────────────────────────────────────────────

export interface PopularModel {
  make: string;
  model: string;
  segment:
    | 'mainstream_petrol'
    | 'mainstream_diesel'
    | 'mainstream_hybrid'
    | 'ev_premium'
    | 'ev_mainstream'
    | 'luxury_european'
    | 'luxury_japanese'
    | 'ute_4wd'
    | 'sports_modern'
    | 'classic_appreciating';
  bodyType: string;
  // SEO copy hooks
  shortDescription: string;
  // Years currently in active resale market — drives the "popular years" widget.
  yearsActive: [number, number];
  // Ballpark price band today (AUD) used as fallback when API is unavailable.
  fallbackPriceBand: { low: number; mid: number; high: number };
}

export const POPULAR_MODELS: PopularModel[] = [
  // ── Top-selling utes ───────────────────────────────────────────────────────
  { make: 'Toyota',     model: 'Hilux',         segment: 'ute_4wd',          bodyType: 'Ute',      shortDescription: 'Australia\'s best-selling vehicle. Legendary resale, deep trade demand.', yearsActive: [2010, 2026], fallbackPriceBand: { low: 28_000, mid: 52_000, high: 92_000 } },
  { make: 'Ford',       model: 'Ranger',        segment: 'ute_4wd',          bodyType: 'Ute',      shortDescription: 'The Hilux\'s biggest competitor. Wildtrak/Raptor command strong premiums.', yearsActive: [2011, 2026], fallbackPriceBand: { low: 25_000, mid: 55_000, high: 110_000 } },
  { make: 'Isuzu',      model: 'D-MAX',         segment: 'ute_4wd',          bodyType: 'Ute',      shortDescription: 'Diesel workhorse, growing fleet share, steady values.', yearsActive: [2012, 2026], fallbackPriceBand: { low: 22_000, mid: 45_000, high: 78_000 } },
  { make: 'Mazda',      model: 'BT-50',         segment: 'ute_4wd',          bodyType: 'Ute',      shortDescription: 'D-MAX-based; sharper styling, similar value proposition.', yearsActive: [2012, 2026], fallbackPriceBand: { low: 21_000, mid: 42_000, high: 70_000 } },
  { make: 'Volkswagen', model: 'Amarok',        segment: 'ute_4wd',          bodyType: 'Ute',      shortDescription: 'Premium European ute; current generation Ranger-shared platform.', yearsActive: [2012, 2026], fallbackPriceBand: { low: 26_000, mid: 58_000, high: 105_000 } },
  { make: 'Mitsubishi', model: 'Triton',        segment: 'ute_4wd',          bodyType: 'Ute',      shortDescription: 'Value play in the dual-cab segment; new generation 2024.', yearsActive: [2010, 2026], fallbackPriceBand: { low: 18_000, mid: 38_000, high: 68_000 } },
  { make: 'GWM',        model: 'Cannon',        segment: 'ute_4wd',          bodyType: 'Ute',      shortDescription: 'Disruptive Chinese ute with diesel + PHEV variants.', yearsActive: [2020, 2026], fallbackPriceBand: { low: 25_000, mid: 38_000, high: 55_000 } },

  // ── Top-selling SUVs ───────────────────────────────────────────────────────
  { make: 'Toyota',     model: 'RAV4',          segment: 'mainstream_hybrid', bodyType: 'SUV',     shortDescription: 'Hybrid variant has 12+ month wait lists; resale up to 100% of MSRP.', yearsActive: [2013, 2026], fallbackPriceBand: { low: 22_000, mid: 42_000, high: 68_000 } },
  { make: 'Toyota',     model: 'LandCruiser 300', segment: 'ute_4wd',         bodyType: 'SUV',     shortDescription: 'King of AU long-range touring. 3-yr waitlist, premium over MSRP common.', yearsActive: [2021, 2026], fallbackPriceBand: { low: 95_000, mid: 145_000, high: 220_000 } },
  { make: 'Toyota',     model: 'LandCruiser 200', segment: 'ute_4wd',         bodyType: 'SUV',     shortDescription: 'Last V8 LandCruiser; appreciating since 300-series launch.', yearsActive: [2008, 2021], fallbackPriceBand: { low: 55_000, mid: 95_000, high: 165_000 } },
  { make: 'Toyota',     model: 'Prado',         segment: 'ute_4wd',          bodyType: 'SUV',     shortDescription: 'Mid-size 4WD touring staple; new 250-series launched 2024.', yearsActive: [2010, 2026], fallbackPriceBand: { low: 35_000, mid: 65_000, high: 115_000 } },
  { make: 'Mazda',      model: 'CX-5',          segment: 'mainstream_petrol', bodyType: 'SUV',     shortDescription: 'AU mid-size SUV benchmark; consistent resale band.', yearsActive: [2012, 2026], fallbackPriceBand: { low: 18_000, mid: 35_000, high: 55_000 } },
  { make: 'Mazda',      model: 'CX-30',         segment: 'mainstream_petrol', bodyType: 'SUV',     shortDescription: 'Compact SUV; strong city-buyer demand.', yearsActive: [2020, 2026], fallbackPriceBand: { low: 22_000, mid: 32_000, high: 45_000 } },
  { make: 'Hyundai',    model: 'Tucson',        segment: 'mainstream_petrol', bodyType: 'SUV',     shortDescription: 'Refreshed design language; warranty advantage on resale.', yearsActive: [2015, 2026], fallbackPriceBand: { low: 16_000, mid: 32_000, high: 50_000 } },
  { make: 'Kia',        model: 'Sportage',      segment: 'mainstream_petrol', bodyType: 'SUV',     shortDescription: '7-yr warranty drives strong second-owner demand.', yearsActive: [2015, 2026], fallbackPriceBand: { low: 16_000, mid: 30_000, high: 48_000 } },
  { make: 'Nissan',     model: 'X-Trail',       segment: 'mainstream_petrol', bodyType: 'SUV',     shortDescription: 'New generation 2023 with ePower hybrid option.', yearsActive: [2014, 2026], fallbackPriceBand: { low: 14_000, mid: 30_000, high: 52_000 } },
  { make: 'Subaru',     model: 'Forester',      segment: 'mainstream_petrol', bodyType: 'SUV',     shortDescription: 'Hybrid Forester gaining ground; AWD as standard.', yearsActive: [2013, 2026], fallbackPriceBand: { low: 17_000, mid: 32_000, high: 48_000 } },
  { make: 'Subaru',     model: 'Outback',       segment: 'mainstream_petrol', bodyType: 'Wagon',   shortDescription: 'Lifestyle wagon staple; XT turbo variants in demand.', yearsActive: [2013, 2026], fallbackPriceBand: { low: 18_000, mid: 36_000, high: 55_000 } },
  { make: 'Mitsubishi', model: 'Outlander',     segment: 'mainstream_hybrid', bodyType: 'SUV',     shortDescription: 'PHEV variant a key fleet adoption story.', yearsActive: [2013, 2026], fallbackPriceBand: { low: 14_000, mid: 32_000, high: 55_000 } },

  // ── EVs ────────────────────────────────────────────────────────────────────
  { make: 'Tesla',      model: 'Model Y',       segment: 'ev_mainstream',    bodyType: 'SUV',     shortDescription: 'AU\'s top-selling EV. Used market softening as supply normalises.', yearsActive: [2022, 2026], fallbackPriceBand: { low: 38_000, mid: 55_000, high: 78_000 } },
  { make: 'Tesla',      model: 'Model 3',       segment: 'ev_mainstream',    bodyType: 'Sedan',   shortDescription: 'Refreshed 2024; strong Performance variant demand.', yearsActive: [2019, 2026], fallbackPriceBand: { low: 32_000, mid: 48_000, high: 72_000 } },
  { make: 'BYD',        model: 'Atto 3',        segment: 'ev_mainstream',    bodyType: 'SUV',     shortDescription: 'Disruptive pricing; resale curve still being established.', yearsActive: [2022, 2026], fallbackPriceBand: { low: 28_000, mid: 38_000, high: 50_000 } },
  { make: 'BYD',        model: 'Seal',          segment: 'ev_mainstream',    bodyType: 'Sedan',   shortDescription: 'Model 3 alternative; strong launch pricing.', yearsActive: [2023, 2026], fallbackPriceBand: { low: 38_000, mid: 50_000, high: 62_000 } },
  { make: 'Polestar',   model: '2',             segment: 'ev_premium',       bodyType: 'Sedan',   shortDescription: 'Premium European EV; sharp depreciation curve.', yearsActive: [2021, 2026], fallbackPriceBand: { low: 35_000, mid: 55_000, high: 75_000 } },
  { make: 'Hyundai',    model: 'Ioniq 5',       segment: 'ev_premium',       bodyType: 'SUV',     shortDescription: 'V2L tech hook; design-led EV.', yearsActive: [2022, 2026], fallbackPriceBand: { low: 45_000, mid: 65_000, high: 85_000 } },
  { make: 'Kia',        model: 'EV6',           segment: 'ev_premium',       bodyType: 'SUV',     shortDescription: 'GT variant the standout; Ioniq 5 platform-share.', yearsActive: [2022, 2026], fallbackPriceBand: { low: 50_000, mid: 70_000, high: 95_000 } },

  // ── Sedans + hatches still trading meaningfully ───────────────────────────
  { make: 'Toyota',     model: 'Camry',         segment: 'mainstream_hybrid', bodyType: 'Sedan',   shortDescription: 'Hybrid Camry the rideshare default; consistent resale.', yearsActive: [2012, 2026], fallbackPriceBand: { low: 14_000, mid: 28_000, high: 48_000 } },
  { make: 'Toyota',     model: 'Corolla',       segment: 'mainstream_hybrid', bodyType: 'Hatch',   shortDescription: 'Hybrid hatch + sedan; consistent volume.', yearsActive: [2012, 2026], fallbackPriceBand: { low: 12_000, mid: 26_000, high: 38_000 } },
  { make: 'Mazda',      model: '3',             segment: 'mainstream_petrol', bodyType: 'Hatch',   shortDescription: 'Premium-feel small car; still strong resale.', yearsActive: [2012, 2026], fallbackPriceBand: { low: 11_000, mid: 24_000, high: 38_000 } },
  { make: 'Hyundai',    model: 'i30',           segment: 'mainstream_petrol', bodyType: 'Hatch',   shortDescription: 'N variant has cult following; mainstream i30 a value pick.', yearsActive: [2012, 2026], fallbackPriceBand: { low: 9_000, mid: 22_000, high: 48_000 } },
  { make: 'Volkswagen', model: 'Golf',          segment: 'mainstream_petrol', bodyType: 'Hatch',   shortDescription: 'GTI/R variants the resale stars.', yearsActive: [2013, 2026], fallbackPriceBand: { low: 12_000, mid: 28_000, high: 65_000 } },

  // ── Luxury European ───────────────────────────────────────────────────────
  { make: 'BMW',        model: 'X5',            segment: 'luxury_european',  bodyType: 'SUV',     shortDescription: 'Premium SUV staple; M50i/M Comp variants premium.', yearsActive: [2014, 2026], fallbackPriceBand: { low: 35_000, mid: 80_000, high: 165_000 } },
  { make: 'BMW',        model: 'X3',            segment: 'luxury_european',  bodyType: 'SUV',     shortDescription: 'Mid-size luxury SUV; M40i a sleeper performance pick.', yearsActive: [2014, 2026], fallbackPriceBand: { low: 25_000, mid: 55_000, high: 110_000 } },
  { make: 'BMW',        model: 'M3',            segment: 'sports_modern',    bodyType: 'Sedan',   shortDescription: 'F80/G80 generations; CSL appreciating as instant classic.', yearsActive: [2014, 2026], fallbackPriceBand: { low: 65_000, mid: 130_000, high: 240_000 } },
  { make: 'Mercedes-Benz', model: 'C-Class',    segment: 'luxury_european',  bodyType: 'Sedan',   shortDescription: 'AMG variants the pick; standard C-Class depreciates fast.', yearsActive: [2014, 2026], fallbackPriceBand: { low: 22_000, mid: 55_000, high: 140_000 } },
  { make: 'Mercedes-Benz', model: 'GLE',        segment: 'luxury_european',  bodyType: 'SUV',     shortDescription: 'Mid-size luxury SUV; AMG 53/63 sought after.', yearsActive: [2014, 2026], fallbackPriceBand: { low: 38_000, mid: 90_000, high: 180_000 } },
  { make: 'Audi',       model: 'Q5',            segment: 'luxury_european',  bodyType: 'SUV',     shortDescription: 'SQ5 the value play in mid-size luxury.', yearsActive: [2014, 2026], fallbackPriceBand: { low: 25_000, mid: 55_000, high: 105_000 } },
  { make: 'Audi',       model: 'RS3',           segment: 'sports_modern',    bodyType: 'Sedan',   shortDescription: '5-cylinder soundtrack; cult resale on low-km cars.', yearsActive: [2017, 2026], fallbackPriceBand: { low: 55_000, mid: 95_000, high: 145_000 } },
  { make: 'Volvo',      model: 'XC60',          segment: 'luxury_european',  bodyType: 'SUV',     shortDescription: 'Recharge hybrid models leading resale.', yearsActive: [2018, 2026], fallbackPriceBand: { low: 35_000, mid: 65_000, high: 95_000 } },
  { make: 'Land Rover', model: 'Defender',      segment: 'luxury_european',  bodyType: 'SUV',     shortDescription: 'New-gen Defender (2020+) commanding strong resale.', yearsActive: [2020, 2026], fallbackPriceBand: { low: 75_000, mid: 130_000, high: 230_000 } },

  // ── Sports / performance ──────────────────────────────────────────────────
  { make: 'Porsche',    model: '911',           segment: 'sports_modern',    bodyType: 'Coupe',   shortDescription: 'Blue-chip resale; 992 GT3 + 991 GT3 RS pulling comps up.', yearsActive: [2012, 2026], fallbackPriceBand: { low: 95_000, mid: 250_000, high: 750_000 } },
  { make: 'Porsche',    model: 'Cayman',        segment: 'sports_modern',    bodyType: 'Coupe',   shortDescription: '981/982 GT4 + GT4 RS the standouts.', yearsActive: [2014, 2026], fallbackPriceBand: { low: 65_000, mid: 130_000, high: 380_000 } },
  { make: 'Porsche',    model: 'Macan',         segment: 'luxury_european',  bodyType: 'SUV',     shortDescription: 'GTS/Turbo variants hold value better than base.', yearsActive: [2014, 2026], fallbackPriceBand: { low: 45_000, mid: 90_000, high: 165_000 } },
  { make: 'Toyota',     model: 'Supra',         segment: 'sports_modern',    bodyType: 'Coupe',   shortDescription: 'A90 (BMW-platform) revival; manual variants a 2024 highlight.', yearsActive: [2019, 2026], fallbackPriceBand: { low: 75_000, mid: 105_000, high: 165_000 } },
  { make: 'Subaru',     model: 'WRX',           segment: 'sports_modern',    bodyType: 'Sedan',   shortDescription: 'STI variants discontinued; appreciating as future classic.', yearsActive: [2014, 2026], fallbackPriceBand: { low: 22_000, mid: 50_000, high: 120_000 } },
  { make: 'Honda',      model: 'Civic Type R',  segment: 'sports_modern',    bodyType: 'Hatch',   shortDescription: 'FK8/FL5; sub-1k AU allocation makes resale strong.', yearsActive: [2017, 2026], fallbackPriceBand: { low: 55_000, mid: 75_000, high: 95_000 } },

  // ── JDM imports / classics in active AU trade ────────────────────────────
  { make: 'Nissan',     model: 'Skyline GT-R',  segment: 'classic_appreciating', bodyType: 'Coupe', shortDescription: 'R32 1989+ now legal; R33 + R34 staggered AU import 2020–2027.', yearsActive: [1989, 2002], fallbackPriceBand: { low: 65_000, mid: 165_000, high: 650_000 } },
  { make: 'Nissan',     model: 'Silvia',        segment: 'classic_appreciating', bodyType: 'Coupe', shortDescription: 'S13/S14/S15 all rising; clean S15 Spec R the halo.', yearsActive: [1989, 2002], fallbackPriceBand: { low: 25_000, mid: 55_000, high: 165_000 } },
  { make: 'Mazda',      model: 'RX-7',          segment: 'classic_appreciating', bodyType: 'Coupe', shortDescription: 'FD generation the blue-chip; condition-sensitive market.', yearsActive: [1992, 2002], fallbackPriceBand: { low: 50_000, mid: 95_000, high: 220_000 } },
  { make: 'Honda',      model: 'NSX',           segment: 'classic_appreciating', bodyType: 'Coupe', shortDescription: 'NA1 + NA2; AU-delivered cars carry strong premium.', yearsActive: [1990, 2005], fallbackPriceBand: { low: 95_000, mid: 195_000, high: 450_000 } },

  // ── Australian muscle staples ─────────────────────────────────────────────
  { make: 'Holden',     model: 'Commodore',     segment: 'mainstream_petrol', bodyType: 'Sedan',  shortDescription: 'VE/VF SS/SS-V Redline + HSV variants the resale story.', yearsActive: [2006, 2017], fallbackPriceBand: { low: 12_000, mid: 30_000, high: 95_000 } },
  { make: 'Ford',       model: 'Falcon',        segment: 'mainstream_petrol', bodyType: 'Sedan',  shortDescription: 'XR6 Turbo + XR8 + FPV GT variants strongly appreciating.', yearsActive: [2002, 2016], fallbackPriceBand: { low: 10_000, mid: 28_000, high: 95_000 } },
  { make: 'Holden',     model: 'Monaro',        segment: 'classic_appreciating', bodyType: 'Coupe', shortDescription: 'CV8/CV8-Z + HSV GTS coupe; modern Monaro halo cars.', yearsActive: [2001, 2006], fallbackPriceBand: { low: 35_000, mid: 75_000, high: 165_000 } },
];

export function modelSlug(make: string, model: string): string {
  return `${make} ${model}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function findPopularModelBySlugs(makeSlug: string, modelSlug: string): PopularModel | null {
  const target = `${makeSlug}/${modelSlug}`.toLowerCase();
  return POPULAR_MODELS.find((m) => {
    const ms = m.make.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const md = m.model.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return `${ms}/${md}` === target;
  }) ?? null;
}

export function makeSlugFor(m: PopularModel): string {
  return m.make.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function modelPathFor(m: PopularModel): string {
  const ms = makeSlugFor(m);
  const md = m.model.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `/cars/${ms}/${md}`;
}
