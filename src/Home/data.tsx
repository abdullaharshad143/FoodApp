import { IProduce } from "../core/types"

export const foodData: IProduce[] = [
    // Fruits
    { id: 'apple', name: 'Apple', price: 199, marketPrice: '2.49', subText: 'Fresh and juicy', category: 'Fruit', weight: '1kg', image: require('../assets/apples.jpg') },
    { id: 'banana', name: 'Banana', price: 99, marketPrice: '1.29', subText: 'Rich in potassium', category: 'Fruit', weight: '1dozen', image: require('../assets/banana.jpg') },
    { id: 'orange', name: 'Orange', price: 149, marketPrice: '1.99', subText: 'Source of Vitamin C', category: 'Fruit', weight: '1dozen', image: require('../assets/oranges.jpg') },
    { id: 'grape', name: 'Grape', price: 249, marketPrice: '3.29', subText: 'Sweet and seedless', category: 'Fruit', weight: '500g', image: require('../assets/grapes.jpg') },
    { id: 'kiwi', name: 'Kiwi', price: 79, marketPrice: '1.09', subText: 'Rich in Vitamin C', category: 'Fruit', weight: '1kg', image: require('../assets/kiwi.jpg') },

    // Vegetables
    { id: 'carrot', name: 'Carrot', price: 79, marketPrice: '0.99', subText: 'High in Vitamin A', category: 'Vegetable', weight: '1kg', image: require('../assets/carrots.jpg') },
    { id: 'broccoli', name: 'Broccoli', price: 129, marketPrice: '1.79', subText: 'Nutrient-rich', category: 'Vegetable', weight: '1kg', image: require('../assets/broccoli.jpg') },
    { id: 'asparagus', name: 'Asparagus', price: 299, marketPrice: '3.99', subText: 'Tender and flavorful', category: 'Vegetable', weight: '1kg', image: require('../assets/asparagus.jpg') },
    { id: 'spinach', name: 'Spinach', price: 129, marketPrice: '1.49', subText: 'Rich in iron', category: 'Vegetable', weight: '500g', image: require('../assets/spinach.jpg') },
    { id: 'bell-pepper', name: 'Bell Pepper', price: 199, marketPrice: '2.29', subText: 'Colorful and crunchy', category: 'Vegetable', weight: '500g', image: require('../assets/bell-pepper.jpg') },

    // Dairy Products
    { id: 'milk', name: 'Milk', price: 79, marketPrice: '1.29', subText: 'Rich in calcium', category: 'Dairy', weight: '1L', image: require('../assets/milk.jpg') },
    { id: 'cheese', name: 'Cheese', price: 249, marketPrice: '3.49', subText: 'Creamy and flavorful', category: 'Dairy', weight: '250g', image: require('../assets/cheese.jpg') },
    // { id: 'yogurt', name: 'Yogurt', price: 99, marketPrice: '1.49', subText: 'Probiotic-rich', category: 'Dairy', weight: '500g', image: require('../assets/yogurt.png') },
    { id: 'butter', name: 'Butter', price: 149, marketPrice: '2.29', subText: 'Rich and creamy', category: 'Dairy', weight: '250g', image: require('../assets/butter.jpg') },
    // { id: 'cream', name: 'Cream', price: 199, marketPrice: '2.99', subText: 'Perfect for cooking', category: 'Dairy', weight: '250ml', image: require('../assets/cream.png') },

    // Meat & Poultry
    // { id: 'chicken', name: 'Chicken', price: 349, marketPrice: '4.99', subText: 'Lean and versatile', category: 'Meat & Poultry', weight: '1kg', image: require('../assets/chicken.png') },
    // { id: 'beef', name: 'Beef', price: 499, marketPrice: '7.99', subText: 'Rich in protein', category: 'Meat & Poultry', weight: '1kg', image: require('../assets/beef.png') },
    // { id: 'sausage', name: 'Sausage', price: 199, marketPrice: '3.29', subText: 'Perfect for grilling', category: 'Meat & Poultry', weight: '500g', image: require('../assets/sausage.png') },

    // Grains
    { id: 'rice', name: 'Rice', price: 99, marketPrice: '1.49', subText: 'Versatile staple', category: 'Grains', weight: '1kg', image: require('../assets/rice.jpg') },
    { id: 'wheat', name: 'Wheat', price: 149, marketPrice: '2.99', subText: 'Rich in fiber', category: 'Grains', weight: '1kg', image: require('../assets/wheat.jpg') },
    { id: 'oats', name: 'Oats', price: 129, marketPrice: '1.79', subText: 'Heart-healthy', category: 'Grains', weight: '1kg', image: require('../assets/oats.jpg') },
    // { id: 'barley', name: 'Barley', price: 199, marketPrice: '3.49', subText: 'Nutrient-dense', category: 'Grains', weight: '1kg', image: require('../assets/barley.png') },

    // Beverages
    { id: 'coffee', name: 'Coffee', price: 199, marketPrice: '4.49', subText: 'Rich and aromatic', category: 'Beverages', weight: '500g', image: require('../assets/coffee.jpg') },
    { id: 'tea', name: 'Tea', price: 99, marketPrice: '2.99', subText: 'Calming and refreshing', category: 'Beverages', weight: '100g', image: require('../assets/tea.jpg') },
    { id: 'juice', name: 'Juice', price: 129, marketPrice: '2.99', subText: 'Freshly squeezed', category: 'Beverages', weight: '1L', image: require('../assets/juice.jpg') },
    // { id: 'water', name: 'Water', price: 49, marketPrice: '0.99', subText: 'Pure and refreshing', category: 'Beverages', weight: '1.5L', image: require('../assets/water.png') },

      // Snacks
      { id: 'chips', name: 'Chips', price: 99, marketPrice: '1.49', subText: 'Crunchy and addictive', category: 'Snacks', weight: '200g', image: require('../assets/chips.jpg') },
      { id: 'nuts', name: 'Nuts', price: 299, marketPrice: '4.99', subText: 'Healthy snacking', category: 'Snacks', weight: '250g', image: require('../assets/nuts.jpg') },
      { id: 'popcorn', name: 'Popcorn', price: 79, marketPrice: '1.29', subText: 'Classic movie snack', category: 'Snacks', weight: '200g', image: require('../assets/popcorn.jpg') },
      { id: 'chocolate', name: 'Chocolate', price: 199, marketPrice: '2.99', subText: 'Irresistibly sweet', category: 'Snacks', weight: '100g', image: require('../assets/chocolate.jpg') },
  
      // Condiments
      { id: 'ketchup', name: 'Ketchup', price: 99, marketPrice: '1.49', subText: 'Classic dipping sauce', category: 'Condiments', weight: '500ml', image: require('../assets/ketchup.jpg') },
      // { id: 'mayonnaise', name: 'Mayonnaise', price: 149, marketPrice: '2.49', subText: 'Creamy and versatile', category: 'Condiments', weight: '250ml', image: require('../assets/mayonnaise.png') },
      // { id: 'sauce', name: 'Sauce', price: 199, marketPrice: '2.99', subText: 'Enhance your dishes', category: 'Condiments', weight: '250ml', image: require('../assets/sauce.png') },
      // { id: 'vinegar', name: 'Vinegar', price: 99, marketPrice: '1.99', subText: 'Adds acidity to dishes', category: 'Condiments', weight: '500ml', image: require('../assets/vinegar.png') },
]