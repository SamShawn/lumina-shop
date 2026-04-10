'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardImage, CardContent, CardTitle, CardPrice } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BouncingCheckbox } from '@/components/ui/BouncingCheckbox';
import type { ProductListItem, SortOption } from '@/types';
import styles from './page.module.css';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'popular', label: 'Most Popular' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState<SortOption>('newest');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.success) {
        setCategories([{ id: 'all', name: 'All', slug: '' }, ...data.data.map((c: { id: string; name: string; slug: string }) => c)]);
      }
    } catch {
      // fallback to default categories
      setCategories([
        { id: 'all', name: 'All', slug: '' },
        { id: '1', name: 'Lighting', slug: 'lighting' },
        { id: '2', name: 'Tableware', slug: 'tableware' },
        { id: '3', name: 'Stationery', slug: 'stationery' },
        { id: '4', name: 'Home', slug: 'home' },
      ]);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        page: String(page),
        sort: selectedSort,
      });
      if (selectedCategory && selectedCategory !== 'All') {
        params.set('category', selectedCategory.toLowerCase());
      }
      if (minPrice) params.set('minPrice', String(parseInt(minPrice, 10) * 100));
      if (maxPrice) params.set('maxPrice', String(parseInt(maxPrice, 10) * 100));
      if (inStockOnly) params.set('inStock', 'true');

      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();

      if (data.success) {
        setProducts(data.data.products);
        setTotal(data.data.total);
        setTotalPages(data.data.totalPages);
      } else {
        setError(data.error || 'Failed to load products');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page, selectedSort, selectedCategory, minPrice, maxPrice, inStockOnly]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  function clearFilters() {
    setSelectedCategory('All');
    setMinPrice('');
    setMaxPrice('');
    setInStockOnly(false);
    setSelectedSort('newest');
    setPage(1);
  }

  const hasActiveFilters = selectedCategory !== 'All' || minPrice || maxPrice || inStockOnly;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>All Products</h1>
          <p className={styles.subtitle}>
            {loading ? 'Loading...' : `${total} products`}
          </p>
        </div>

        <div className={styles.layout}>
          {/* Filters Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.filterGroup}>
              <h2 className={styles.filterTitle}>Categories</h2>
              <div className={styles.filterOptions}>
                {categories.map((cat) => (
                  <label key={cat.id} className={styles.filterOption}>
                    <input
                      type="radio"
                      name="category"
                      value={cat.name}
                      checked={selectedCategory === cat.name}
                      onChange={() => {
                        setSelectedCategory(cat.name);
                        setPage(1);
                      }}
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <h2 className={styles.filterTitle}>Price Range</h2>
              <div className={styles.priceInputs}>
                <input
                  type="number"
                  placeholder="Min"
                  className={styles.priceInput}
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                    setPage(1);
                  }}
                />
                <span className={styles.priceSeparator}>—</span>
                <input
                  type="number"
                  placeholder="Max"
                  className={styles.priceInput}
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            <div className={styles.filterGroup}>
              <h2 className={styles.filterTitle}>Availability</h2>
              <div className={styles.filterOptions}>
                <BouncingCheckbox
                  label="In Stock Only"
                  checked={inStockOnly}
                  onChange={(e) => {
                    setInStockOnly(e.target.checked);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            <Button
              variant="outline"
              className={styles.clearBtn}
              onClick={clearFilters}
              disabled={!hasActiveFilters}
            >
              Clear Filters
            </Button>
          </aside>

          {/* Products Grid */}
          <div className={styles.main}>
            <div className={styles.toolbar}>
              <span className={styles.resultCount}>
                {loading ? 'Loading...' : `${total} Products`}
              </span>
              <div className={styles.sortWrapper}>
                <label htmlFor="sort" className={styles.sortLabel}>Sort by:</label>
                <select
                  id="sort"
                  className={styles.sortSelect}
                  value={selectedSort}
                  onChange={(e) => {
                    setSelectedSort(e.target.value as SortOption);
                    setPage(1);
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {error ? (
              <div className={styles.errorState}>
                <p>{error}</p>
                <Button variant="outline" onClick={fetchProducts}>Retry</Button>
              </div>
            ) : (
              <>
                <div className={styles.grid}>
                  {products.map((product) => (
                    <Link href={`/products/${product.slug}`} key={product.id}>
                      <Card hover className={styles.productCard}>
                        <CardImage src={product.images[0]?.url} alt={product.name} />
                        <CardContent>
                          {product.isFeatured && (
                            <Badge variant="accent" className={styles.productBadge}>
                              Featured
                            </Badge>
                          )}
                          <span className={styles.productCategory}>{product.category.name}</span>
                          <CardTitle>{product.name}</CardTitle>
                          <CardPrice
                            amount={`$${(product.price / 100).toFixed(2)}`}
                            compareAmount={product.comparePrice ? `$${(product.comparePrice / 100).toFixed(2)}` : undefined}
                          />
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className={styles.pagination}>
                    <Button
                      variant="outline"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      Previous
                    </Button>
                    <div className={styles.paginationPages}>
                      <span className={styles.paginationCurrent}>{page}</span>
                      <span className={styles.paginationSeparator}>/</span>
                      <span className={styles.paginationTotal}>{totalPages}</span>
                    </div>
                    <Button
                      variant="outline"
                      disabled={page >= totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
