export const PRODUCT_SLUG = 'css-cause-map';
export const LICENSE_KEY = `sb_license:${PRODUCT_SLUG}`;
export const LICENSE_CACHE_KEY = `sb_license_cache:${PRODUCT_SLUG}`;
export const BILLING_BASE = 'https://api.sociobot.in/api/v1';
export const BUY_URL = `${BILLING_BASE}/products/${PRODUCT_SLUG}/checkout`;

export interface LicenseVerdict {
  valid: boolean;
  reason: 'ok' | 'invalid' | 'expired' | 'revoked' | 'wrong_product' | 'offline';
  checkedAt: number;
  expires_at?: string | null;
}

export function captureReturnedLicense(storage: Storage = localStorage, current = new URL(location.href)): string | null {
  const token = current.searchParams.get('license');
  if (!token) return storage.getItem(LICENSE_KEY);
  storage.setItem(LICENSE_KEY, token);
  current.searchParams.delete('license');
  history.replaceState({}, '', `${current.pathname}${current.search}${current.hash}`);
  return token;
}

export function cachedVerdict(storage: Storage = localStorage): LicenseVerdict | null {
  try {
    const value = storage.getItem(LICENSE_CACHE_KEY);
    return value ? JSON.parse(value) as LicenseVerdict : null;
  } catch { return null; }
}

export async function verifyLicense(token: string, storage: Storage = localStorage, force = false): Promise<LicenseVerdict> {
  const cached = cachedVerdict(storage);
  if (!force && cached && Date.now() - cached.checkedAt < 86_400_000) return cached;
  try {
    const response = await fetch(`${BILLING_BASE}/products/${PRODUCT_SLUG}/verify?license=${encodeURIComponent(token)}`);
    if (!response.ok) throw new Error('Verification service unavailable');
    const body = await response.json() as Omit<LicenseVerdict, 'checkedAt'>;
    const verdict: LicenseVerdict = { ...body, checkedAt: Date.now() };
    storage.setItem(LICENSE_CACHE_KEY, JSON.stringify(verdict));
    return verdict;
  } catch {
    return cached ?? { valid: false, reason: 'offline', checkedAt: Date.now() };
  }
}

export function saveLicense(token: string, storage: Storage = localStorage): void {
  storage.setItem(LICENSE_KEY, token.trim());
  storage.removeItem(LICENSE_CACHE_KEY);
}
