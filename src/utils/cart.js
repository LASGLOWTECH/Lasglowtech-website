const CART_KEY = "lasglowtech_catalogue_cart";

export const readCart = () => {
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

export const writeCart = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const addToCart = (item) => {
  if (!item?.slug) return;
  const cart = readCart();
  const next = cart.some((entry) => entry.slug === item.slug)
    ? cart.map((entry) => (entry.slug === item.slug ? { ...entry, ...item } : entry))
    : [...cart, item];

  writeCart(next);
};

export const removeFromCart = (slug) => {
  const cart = readCart();
  const next = cart.filter((item) => item.slug !== slug);
  writeCart(next);
};

export const isInCart = (slug) => readCart().some((item) => item.slug === slug);

export const clearCart = () => {
  writeCart([]);
};

export const getCartCount = () => readCart().length;
