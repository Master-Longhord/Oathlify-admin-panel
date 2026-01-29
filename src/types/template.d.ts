export interface Template {
  id: string;
  name: string;
  price: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTemplateDTO {
  name: string;
  price: number;
  content: string;
}
