import { AirtableRecord } from './AirtableRecord';
import { Asset } from './Asset';
import { Customer } from './Customer';

export type Product = {
  ref?: string;
  customer?: AirtableRecord<Customer> | string[]; // Stored as an array of strings on AT API, converted to a Customer object once sanitised
  description?: string; // i18n field auto computed
  descriptionEN?: string;
  descriptionFR?: string;
  images?: AirtableRecord<Asset>[];
  imagesTitle?: string[];
  slug?: string; // i18n field auto computed
  slugEN?: string;
  slugFR?: string;
  title?: string; // i18n field auto computed
  titleEN?: string;
  titleFR?: string;
  price?: number;
  gender?: 'MEN' | 'WOMEN';
  matter?: 'LEATHER' | 'STEEL' | 'OTHER';
  status?: 'PUBLISHED' | 'DRAFT';
};
