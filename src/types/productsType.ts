export type GENDER = 'men' | 'women';
export type WOMENCATEGORIES = 'skirt' | 'heels' | 'blouse';
export type MENCATEGORIES = 'shoes' | 'pants' | 'shirt' | 't-shirt';

export type PRODUCT = {
  _id: string;
  name: string;
  gender: GENDER;
  category: WOMENCATEGORIES | MENCATEGORIES;
  description: string;
  price: number;
  size: string[];
  image: string;
  featured: boolean;
  sales: number;
};

const VALID_GENDERS: readonly GENDER[] = ['men', 'women'];
const VALID_WOMEN_CATEGORIES: readonly WOMENCATEGORIES[] = [
  'skirt',
  'heels',
  'blouse',
];
const VALID_MEN_CATEGORIES: readonly MENCATEGORIES[] = [
  'shoes',
  'pants',
  'shirt',
  't-shirt',
];

export function isGender(value: unknown): value is GENDER {
  return VALID_GENDERS.includes(value as GENDER);
}

export function isWomenCategory(value: unknown): value is WOMENCATEGORIES {
  return VALID_WOMEN_CATEGORIES.includes(value as WOMENCATEGORIES);
}

export function isMenCategory(value: unknown): value is MENCATEGORIES {
  return VALID_MEN_CATEGORIES.includes(value as MENCATEGORIES);
}
