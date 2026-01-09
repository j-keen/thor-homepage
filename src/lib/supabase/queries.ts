import { createClient } from './server';
import { Product, Banner, BoardPost } from '@/types';

// =====================
// PRODUCTS
// =====================
export async function getProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return transformProducts(data || []);
}

export async function getProductById(id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return transformProduct(data);
}

export async function getHotProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_hot', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching hot products:', error);
    return [];
  }

  return transformProducts(data || []);
}

export async function getBestProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_best', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching best products:', error);
    return [];
  }

  return transformProducts(data || []);
}

// =====================
// BANNERS
// =====================
export async function getActiveBanners() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .eq('is_active', true)
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching banners:', error);
    return [];
  }

  return transformBanners(data || []);
}

export async function getAllBanners() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching banners:', error);
    return [];
  }

  return transformBanners(data || []);
}

// =====================
// BOARD POSTS
// =====================
export async function getBoardPosts(boardType: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('board_posts')
    .select('*')
    .eq('board_type', boardType)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching board posts:', error);
    return [];
  }

  return transformBoardPosts(data || []);
}

export async function getBoardPostById(id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('board_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching board post:', error);
    return null;
  }

  return transformBoardPost(data);
}

// =====================
// ORDERS (Admin)
// =====================
export async function getOrders() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }

  return data || [];
}

export async function getOrderStats() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('orders')
    .select('status, monthly_payment');

  if (error) {
    console.error('Error fetching order stats:', error);
    return {
      total: 0,
      pending: 0,
      confirmed: 0,
      processing: 0,
      completed: 0,
      cancelled: 0,
      totalRevenue: 0,
    };
  }

  const orders = data || [];
  return {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    processing: orders.filter(o => o.status === 'processing').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    totalRevenue: orders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + (o.monthly_payment || 0), 0),
  };
}

// =====================
// USERS (Admin)
// =====================
export async function getUsers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }

  return data || [];
}

// =====================
// TRANSFORM HELPERS
// =====================
function transformProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    category: row.category,
    image: row.image || '',
    originalPrice: row.original_price,
    finalPrice: row.final_price,
    discountRate: row.discount_rate,
    carrier: row.carrier || [],
    subscriptionType: row.subscription_type || [],
    discountType: row.discount_type || '',
    colors: typeof row.colors === 'string' ? JSON.parse(row.colors) : (row.colors || []),
    storage: row.storage || [],
    monthlyPayment: row.monthly_payment,
    additionalDiscount: row.additional_discount,
    commonDiscount: row.common_discount,
    isHot: row.is_hot,
    isBest: row.is_best,
    stock: row.stock,
    createdAt: row.created_at,
  };
}

function transformProducts(rows: any[]): Product[] {
  return rows.map(transformProduct);
}

function transformBanner(row: any): Banner {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    image: row.image,
    link: row.link || '',
    order: row.order,
    isActive: row.is_active,
    startDate: row.start_date,
    endDate: row.end_date,
  };
}

function transformBanners(rows: any[]): Banner[] {
  return rows.map(transformBanner);
}

function transformBoardPost(row: any): BoardPost {
  return {
    id: row.id,
    type: row.board_type,
    title: row.title,
    content: row.content,
    author: row.author || '익명',
    createdAt: row.created_at,
    views: row.view_count,
    isPinned: row.is_pinned,
    rating: row.rating,
    productId: row.product_id,
    productName: row.product_name,
    answer: row.answer,
    answeredAt: row.answered_at,
  };
}

function transformBoardPosts(rows: any[]): BoardPost[] {
  return rows.map(transformBoardPost);
}
