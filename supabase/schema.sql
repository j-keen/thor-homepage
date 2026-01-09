-- Thor Phone Shop Database Schema
-- Run this SQL in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- PRODUCTS TABLE
-- =====================
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  image TEXT,
  original_price INTEGER NOT NULL,
  final_price INTEGER NOT NULL DEFAULT 0,
  discount_rate INTEGER NOT NULL DEFAULT 0,
  carrier TEXT[] DEFAULT '{}',
  subscription_type TEXT[] DEFAULT '{}',
  discount_type VARCHAR(50),
  colors JSONB DEFAULT '[]',
  storage TEXT[] DEFAULT '{}',
  monthly_payment INTEGER DEFAULT 0,
  additional_discount INTEGER DEFAULT 0,
  common_discount INTEGER DEFAULT 0,
  is_hot BOOLEAN DEFAULT FALSE,
  is_best BOOLEAN DEFAULT FALSE,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================
-- USERS TABLE
-- =====================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(20) DEFAULT 'user',
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- =====================
-- ORDERS TABLE
-- =====================
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  user_name VARCHAR(100),
  user_phone VARCHAR(20),
  user_email VARCHAR(255),
  product_id INTEGER REFERENCES products(id),
  product_name VARCHAR(255),
  carrier VARCHAR(20),
  subscription_type VARCHAR(50),
  selected_color VARCHAR(100),
  selected_storage VARCHAR(20),
  monthly_payment INTEGER,
  status VARCHAR(20) DEFAULT 'pending',
  memo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================
-- BOARD POSTS TABLE
-- =====================
CREATE TABLE board_posts (
  id SERIAL PRIMARY KEY,
  board_type VARCHAR(20) NOT NULL, -- 'notice', 'review', 'qna'
  title VARCHAR(255) NOT NULL,
  content TEXT,
  author VARCHAR(100),
  user_id UUID REFERENCES users(id),
  view_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  rating INTEGER, -- For reviews
  product_id INTEGER REFERENCES products(id), -- For reviews
  product_name VARCHAR(255), -- For reviews
  answer TEXT, -- For Q&A
  answered_at TIMESTAMP WITH TIME ZONE, -- For Q&A
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================
-- BANNERS TABLE
-- =====================
CREATE TABLE banners (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  image TEXT,
  link VARCHAR(255),
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================
-- ROW LEVEL SECURITY
-- =====================

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE board_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

-- Products: Anyone can read, only authenticated users can modify
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Products are insertable by authenticated users" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Products are updatable by authenticated users" ON products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Products are deletable by authenticated users" ON products FOR DELETE USING (auth.role() = 'authenticated');

-- Users: Users can only see their own data
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- Orders: Users can see their own orders
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Board Posts: Anyone can read, authenticated users can create
CREATE POLICY "Board posts are viewable by everyone" ON board_posts FOR SELECT USING (true);
CREATE POLICY "Board posts are insertable by authenticated users" ON board_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Banners: Anyone can read active banners
CREATE POLICY "Active banners are viewable by everyone" ON banners FOR SELECT USING (is_active = true);

-- =====================
-- INDEXES
-- =====================
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_hot ON products(is_hot);
CREATE INDEX idx_products_is_best ON products(is_best);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_board_posts_type ON board_posts(board_type);
CREATE INDEX idx_banners_active ON banners(is_active);

-- =====================
-- SAMPLE DATA
-- =====================

-- Insert sample products
INSERT INTO products (name, brand, category, image, original_price, final_price, discount_rate, carrier, subscription_type, discount_type, colors, storage, monthly_payment, additional_discount, common_discount, is_hot, is_best, stock, created_at)
VALUES
  ('Galaxy S24 Ultra', 'Samsung', 'flagship', 'https://picsum.photos/seed/s24ultra/400/400', 1787400, 0, 100, ARRAY['SKT', 'KT', 'LGU+'], ARRAY['신규', '번호이동', '기기변경'], '공시지원', '[{"name": "티타늄 블랙", "hex": "#1C1C1C"}, {"name": "티타늄 그레이", "hex": "#8E8E8E"}]', ARRAY['256GB', '512GB', '1TB'], 65000, 500000, 800000, true, true, 50, '2024-01-17'),
  ('Galaxy S24+', 'Samsung', 'flagship', 'https://picsum.photos/seed/s24plus/400/400', 1353000, 0, 100, ARRAY['SKT', 'KT', 'LGU+'], ARRAY['신규', '번호이동', '기기변경'], '공시지원', '[{"name": "오닉스 블랙", "hex": "#1C1C1C"}, {"name": "마블 그레이", "hex": "#A0A0A0"}]', ARRAY['256GB', '512GB'], 55000, 400000, 600000, true, true, 30, '2024-01-17'),
  ('iPhone 15 Pro Max', 'Apple', 'flagship', 'https://picsum.photos/seed/ip15promax/400/400', 1900000, 100000, 95, ARRAY['SKT', 'KT', 'LGU+'], ARRAY['신규', '번호이동', '기기변경'], '공시지원', '[{"name": "블랙 티타늄", "hex": "#1C1C1C"}, {"name": "화이트 티타늄", "hex": "#F5F5F0"}]', ARRAY['256GB', '512GB', '1TB'], 70000, 450000, 850000, true, true, 40, '2023-09-22'),
  ('iPhone 15 Pro', 'Apple', 'flagship', 'https://picsum.photos/seed/ip15pro/400/400', 1550000, 50000, 97, ARRAY['SKT', 'KT', 'LGU+'], ARRAY['신규', '번호이동', '기기변경'], '공시지원', '[{"name": "블랙 티타늄", "hex": "#1C1C1C"}, {"name": "블루 티타늄", "hex": "#394E5C"}]', ARRAY['128GB', '256GB', '512GB', '1TB'], 60000, 400000, 700000, true, false, 35, '2023-09-22'),
  ('Galaxy Z Flip5', 'Samsung', 'foldable', 'https://picsum.photos/seed/zflip5/400/400', 1399200, 100000, 93, ARRAY['SKT', 'KT', 'LGU+'], ARRAY['신규', '번호이동', '기기변경'], '공시지원', '[{"name": "그라파이트", "hex": "#4A4A4A"}, {"name": "크림", "hex": "#F5E6D3"}]', ARRAY['256GB', '512GB'], 45000, 350000, 550000, true, false, 25, '2023-07-26'),
  ('Galaxy A54', 'Samsung', 'mid-range', 'https://picsum.photos/seed/a54/400/400', 599500, 0, 100, ARRAY['SKT', 'KT', 'LGU+'], ARRAY['신규', '번호이동', '기기변경'], '공시지원', '[{"name": "어썸 그라파이트", "hex": "#4A4A4A"}, {"name": "어썸 화이트", "hex": "#F5F5F5"}]', ARRAY['128GB', '256GB'], 25000, 200000, 300000, true, false, 60, '2023-03-17');

-- Insert sample banners
INSERT INTO banners (title, subtitle, image, link, "order", is_active, start_date, end_date)
VALUES
  ('Galaxy S24 Ultra 출시!', '최신 AI 스마트폰을 만나보세요', NULL, '/phones?brand=Samsung', 1, true, '2024-01-01', '2024-12-31'),
  ('iPhone 15 시리즈', '혁신적인 티타늄 디자인', NULL, '/phones?brand=Apple', 2, true, '2024-01-01', '2024-12-31'),
  ('신규가입 특별 혜택', '번호이동시 최대 100만원 할인', NULL, '/phones?filter=hot', 3, true, '2024-01-01', '2024-12-31');

-- Insert sample board posts
INSERT INTO board_posts (board_type, title, content, author, view_count, is_pinned, created_at)
VALUES
  ('notice', '토르폰 서비스 오픈 안내', '안녕하세요. 토르폰이 새롭게 오픈하였습니다.', '관리자', 150, true, NOW()),
  ('notice', '배송 안내', '주문 후 2-3일 이내 배송됩니다.', '관리자', 89, false, NOW());
