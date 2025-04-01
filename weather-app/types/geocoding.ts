// interface AdministrativeLevel {
//     name: string;
//     description: string;
//     isoName?: string; // Optional because it's missing in some Informative entries
//     order: number;
//     adminLevel?: number; // Only present in Administrative entries
//     isoCode?: string; // Only present in Administrative entries
//     wikidataId: string;
//     geonameId?: number; // Only present in Administrative entries
//   }
  
//   interface LocalityInfo {
//     administrative: AdministrativeLevel[];
//     informative: AdministrativeLevel[];
//   }
  
//   export interface GeoData {
//     latitude: number;
//     longitude: number;
//     localityLanguageRequested: string;
//     continent: string;
//     continentCode: string;
//     countryName: string;
//     countryCode: string;
//     principalSubdivision: string;
//     principalSubdivisionCode: string;
//     city: string;
//     locality: string;
//     postcode: string;
//     plusCode: string;
//     localityInfo: LocalityInfo;
//   }

interface Component {
  kind: "country" | "province" | "area" | "locality";
  name: string;
}

interface Address {
  country_code: string;
  formatted: string;
  Components: Component[];
}

interface AddressDetails {
  Country: {
      AddressLine: string;
      CountryNameCode: string;
      CountryName: string;
      AdministrativeArea: {
          AdministrativeAreaName: string;
          SubAdministrativeArea: {
              SubAdministrativeAreaName: string;
              Locality: {
                  LocalityName: string;
              };
          };
      };
  };
}

interface GeocoderMetaData {
  precision: "exact" | "number" | "near" | "range" | "street" | "other";
  text: string;
  kind: "country" | "province" | "area" | "locality" | "street" | "house";
  Address: Address;
  AddressDetails: AddressDetails;
}

interface GeocoderResponseMetaData {
  request: string;
  results: string;
  found: string;
}

interface MetaDataProperty {
  GeocoderMetaData?: GeocoderMetaData;
  GeocoderResponseMetaData?: GeocoderResponseMetaData;
}

interface Envelope {
  lowerCorner: string;
  upperCorner: string;
}

interface BoundedBy {
  Envelope: Envelope;
}

interface Point {
  pos: string;
}

interface GeoObject {
  metaDataProperty: MetaDataProperty;
  name: string;
  description: string;
  boundedBy: BoundedBy;
  uri: string;
  Point: Point;
}

interface FeatureMember {
  GeoObject: GeoObject;
}

interface GeoObjectCollection {
  metaDataProperty: MetaDataProperty;
  featureMember: FeatureMember[];
}

interface Response {
  GeoObjectCollection: GeoObjectCollection;
}

export interface GeocodeResponse {
  response: Response;
}

