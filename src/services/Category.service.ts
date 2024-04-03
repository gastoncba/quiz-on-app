import { Category } from '../models';
import { get } from './Fetch.service';

const SERVICE_ENDPOINT = 'category';

export const CategoryServices = (() => {
  const getCategories = async (params?: string) => {
    try {
      const categories: Category[] = await get(SERVICE_ENDPOINT, params);
      return categories;
    } catch (error) {
      throw newError('GET-CATEGORIES-FAIL', error);
    }
  };

  type CategoryServiceError = 'GET-CATEGORIES-FAIL';

  const newError = (code: CategoryServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { getCategories };
})();
