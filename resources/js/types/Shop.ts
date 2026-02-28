export type Product = {
  imageUrl: string;
  title: string;
  price: string;
  shopName?: string;
  links: ProductLink[];
};

export type ProductLink = {
  type: string;
  url: string;
  label: string;
};
