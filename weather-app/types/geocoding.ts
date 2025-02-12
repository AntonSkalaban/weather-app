interface AdministrativeLevel {
    name: string;
    description: string;
    isoName?: string; // Optional because it's missing in some Informative entries
    order: number;
    adminLevel?: number; // Only present in Administrative entries
    isoCode?: string; // Only present in Administrative entries
    wikidataId: string;
    geonameId?: number; // Only present in Administrative entries
  }
  
  interface LocalityInfo {
    administrative: AdministrativeLevel[];
    informative: AdministrativeLevel[];
  }
  
  export interface GeoData {
    latitude: number;
    longitude: number;
    localityLanguageRequested: string;
    continent: string;
    continentCode: string;
    countryName: string;
    countryCode: string;
    principalSubdivision: string;
    principalSubdivisionCode: string;
    city: string;
    locality: string;
    postcode: string;
    plusCode: string;
    localityInfo: LocalityInfo;
  }