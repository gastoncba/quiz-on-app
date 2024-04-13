import { Category } from './category.model';
import { Option } from './option.model';

export type Question = {
  id: number;
  title: string;
  category: Category;
  options: Option[];
};
