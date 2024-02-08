export interface Product {
  id: number;
  title: string;
  stock: number;
  price: number;
  brand: string;
  category: string;
  description: string;
  discountPercentage?: number;
  images: string[];
  rating: number;
  thumbnail: string;
}
