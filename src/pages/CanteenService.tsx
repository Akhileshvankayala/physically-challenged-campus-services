import React, { useState, useContext } from 'react';
import { Coffee, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const MENU_ITEMS: MenuItem[] = [
  // Breakfast
  {
    id: '1',
    name: 'Masala Dosa',
    price: 60,
    category: 'Breakfast',
    description: 'Crispy rice crepe with spiced potato filling'
  },
  {
    id: '2',
    name: 'Idli Sambar',
    price: 40,
    category: 'Breakfast',
    description: 'Steamed rice cakes with lentil soup'
  },
  {
    id: '3',
    name: 'Poha',
    price: 30,
    category: 'Breakfast',
    description: 'Flattened rice with vegetables and peanuts'
  },
  {
    id: '4',
    name: 'Upma',
    price: 35,
    category: 'Breakfast',
    description: 'Savory semolina porridge with vegetables'
  },

  // Snacks
  {
    id: '5',
    name: 'Samosa',
    price: 20,
    category: 'Snacks',
    description: 'Deep-fried pastry with spiced potato filling'
  },
  {
    id: '6',
    name: 'Vada Pav',
    price: 25,
    category: 'Snacks',
    description: 'Spiced potato fritter in a bun'
  },
  {
    id: '7',
    name: 'Pakora',
    price: 30,
    category: 'Snacks',
    description: 'Assorted vegetable fritters'
  },
  {
    id: '8',
    name: 'Bread Pakora',
    price: 25,
    category: 'Snacks',
    description: 'Stuffed bread fritters'
  },

  // Main Course
  {
    id: '9',
    name: 'Veg Thali',
    price: 120,
    category: 'Main Course',
    description: 'Complete meal with roti, rice, dal, and sabzi'
  },
  {
    id: '10',
    name: 'Veg Biryani',
    price: 100,
    category: 'Main Course',
    description: 'Fragrant rice dish with mixed vegetables'
  },
  {
    id: '11',
    name: 'Chole Bhature',
    price: 80,
    category: 'Main Course',
    description: 'Spiced chickpeas with fried bread'
  },
  {
    id: '12',
    name: 'Dal Makhani',
    price: 90,
    category: 'Main Course',
    description: 'Creamy black lentils with rice'
  },

  // Beverages
  {
    id: '13',
    name: 'Masala Chai',
    price: 15,
    category: 'Beverages',
    description: 'Indian spiced tea with milk'
  },
  {
    id: '14',
    name: 'Coffee',
    price: 20,
    category: 'Beverages',
    description: 'Fresh brewed coffee'
  },
  {
    id: '15',
    name: 'Lassi',
    price: 30,
    category: 'Beverages',
    description: 'Sweet yogurt drink'
  },
  {
    id: '16',
    name: 'Buttermilk',
    price: 20,
    category: 'Beverages',
    description: 'Spiced churned yogurt drink'
  }
];

const CATEGORIES = ['Breakfast', 'Snacks', 'Main Course', 'Beverages'];

export default function CanteenService() {
  const [name, setname] = useState('');
  const [location, setLocation] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Breakfast');

  const addToCart = (item: MenuItem) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...currentCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === itemId);
      if (existingItem?.quantity === 1) {
        return currentCart.filter(item => item.id !== itemId);
      }
      return currentCart.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleOrder = async () => {
    if (cart.length === 0) {
      toast.error('Please add items to your cart first');
      return;
    }

    if (!location) {
      toast.error('Please enter your location');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/place_order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          location: location,
          order: cart,
        }),
      });

      if (response.ok) {
        toast.success('Order placed successfully');
        clearCart();
      } else {
        const errorData = await response.json();
        toast.error(`Failed to place order: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <Coffee className="h-8 w-8 text-indigo-600 mr-2" />
              <h1 className="text-2xl font-bold">Canteen Menu</h1>
            </div>
            
            <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                    ${selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {MENU_ITEMS.filter(item => item.category === selectedCategory).map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                      <p className="text-indigo-600 font-medium mt-2">₹{item.price}</p>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="flex items-center justify-center p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <ShoppingCart className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-xl font-semibold">Your Cart</h2>
              </div>
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Your cart is empty</p>
            ) : (
              <>
              <input
              type="text"
              id="location"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter your location"
            />
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="The person to whom it has to be delivered"
            />
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">₹{item.price} × {item.quantity}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-gray-500 hover:text-red-600"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="p-1 text-gray-500 hover:text-indigo-600"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-lg">₹{calculateTotal()}</span>
                  </div>
                  <button
                    onClick={handleOrder}
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}