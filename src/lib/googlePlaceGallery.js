/**
 * Fetches contributor photos for a business using Google Places API (New) text search.
 * Enable "Places API (New)" in Google Cloud and set VITE_GOOGLE_PLACES_API_KEY (HTTP referrer restricted).
 *
 * @see https://developers.google.com/maps/documentation/places/web-service/place-photos
 * @see https://developers.google.com/maps/documentation/places/web-service/text-search
 */

function collectAttributions(photos) {
  const seen = new Map();
  for (const photo of photos) {
    for (const a of photo.authorAttributions ?? []) {
      if (a.displayName && !seen.has(a.displayName)) {
        seen.set(a.displayName, a.uri ?? null);
      }
    }
  }
  return [...seen.entries()].map(([displayName, uri]) => ({ displayName, uri }));
}

export async function loadGooglePlaceGalleryPhotos({ apiKey, textQuery, maxPhotos = 8, locationBias }) {
  const key = apiKey?.trim();
  const q = textQuery?.trim();
  if (!key || !q) return null;

  const body = {
    textQuery: q,
    languageCode: "en-GB",
    regionCode: "GB",
  };
  if (locationBias) body.locationBias = locationBias;

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "places.displayName,places.photos",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) return null;

  const data = await res.json();
  const place = data.places?.[0];
  const photos = place?.photos;
  if (!photos?.length) return null;

  const slice = photos.slice(0, maxPhotos);
  const label = place.displayName?.text ?? "Business";

  const items = slice.map((photo, i) => ({
    key: `google-photo-${i}`,
    src: `https://places.googleapis.com/v1/${photo.name}/media?maxWidthPx=960&maxHeightPx=960&key=${encodeURIComponent(key)}`,
    alt: `${label} — Google Maps photo ${i + 1}`,
    showPlay: false,
  }));

  return {
    items,
    attributions: collectAttributions(slice),
  };
}
