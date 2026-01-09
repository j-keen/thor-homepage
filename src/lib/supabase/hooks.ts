"use client";

import { useState, useEffect } from "react";
import { createClient } from "./client";
import { Product } from "@/types";

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

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProducts((data || []).map(transformProduct));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}

export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProduct(transformProduct(data));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  return { product, loading, error };
}
