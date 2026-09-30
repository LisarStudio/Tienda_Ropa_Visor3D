import { clientData } from '../data/clientData';

export class ProductRepository {
  constructor(apiBaseUrl = import.meta.env.VITE_API_URL || null) {
    this.apiBaseUrl = apiBaseUrl;
  }

  async getProducts({ category = 'todos', searchQuery = '', sortBy = 'featured' } = {}) {
    let items = [...clientData.products];

    if (category && category !== 'all' && category !== 'todos') {
      items = items.filter(p =>
        p.category === category ||
        p.categorySlugs?.includes(category) ||
        p.categorySlug === category
      );
    }

    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(p =>
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price-low') {
      items.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      items.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      items.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }

    return items;
  }

  async getProductById(id) {
    return clientData.products.find(p => p.id === id) || null;
  }

  async getCategories() {
    return clientData.categories;
  }

  getBrandInfo() {
    return clientData.brand;
  }
}

export const productRepository = new ProductRepository();
