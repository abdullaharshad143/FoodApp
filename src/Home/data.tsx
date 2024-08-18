// import { IProduce } from "../core/types"

// export const foodData: IProduce[] = [
//     // Fruits
//     { id: 'apple', name: 'Apple', price: 199, marketPrice: '250', subText: 'Fresh and juicy', category: 'Fruit', weight: '1kg', image: require('../assets/apples.jpg') },
//     { id: 'banana', name: 'Banana', price: 180, marketPrice: '200', subText: 'Rich in potassium', category: 'Fruit', weight: '1dozen', image: require('../assets/banana.jpg') },
//     { id: 'mango', name: 'Mango', price: 250, marketPrice: '300', subText: 'Sweet and seedless', category: 'Fruit', weight: '1kg', image: require('../assets/mango.jpg') },
//     { id: 'apricot', name: 'Apricot', price: 130, marketPrice: '180', subText: 'Rich in Vitamin C', category: 'Fruit', weight: '1kg', image: require('../assets/apricots.jpg') },
//     { id: 'peach', name: 'Peach', price: 200, marketPrice: '220', subText: 'Rich in Vitamin B', category: 'Fruit', weight: '1kg', image: require('../assets/peach.jpg') },
//     { id: 'cherry', name: 'Cherries', price: 500, marketPrice: '900', subText: 'Sweet', category: 'Fruit', weight: '1kg', image: require('../assets/cherries.jpg') },
//     { id: 'plum', name: 'Plums', price: 290, marketPrice: '330', subText: 'Sweet and Sour', category: 'Fruit', weight: '500g', image: require('../assets/plum.jpg') },

//     // Vegetables
//     { id: 'carrot', name: 'Carrot', price: 79, marketPrice: '95', subText: 'High in Vitamin A', category: 'Vegetable', weight: '1kg', image: require('../assets/carrots.jpg') },
//     { id: 'broccoli', name: 'Broccoli', price: 230, marketPrice: '300', subText: 'Nutrient-rich', category: 'Vegetable', weight: '1kg', image: require('../assets/broccoli.jpg') },
//     { id: 'tomatoes', name: 'Tomatoes', price: 120, marketPrice: '160', subText: 'Tender and flavorful', category: 'Vegetable', weight: '1kg', image: require('../assets/tomatoes.jpg') },
//     { id: 'spinach', name: 'Onions', price: 110, marketPrice: '149', subText: 'Rich in iron', category: 'Vegetable', weight: '1Kg', image: require('../assets/onions.jpg') },
//     { id: 'potato', name: 'Potatoes', price: 80, marketPrice: '100', subText: 'Rich in iron', category: 'Vegetable', weight: '1Kg', image: require('../assets/potatoes.jpg') },
//     { id: 'bell-pepper', name: 'Bell Pepper', price: 199, marketPrice: '2.29', subText: 'Colorful and crunchy', category: 'Vegetable', weight: '500g', image: require('../assets/bell-pepper.jpg') },
//     { id: 'capsicum', name: 'Capsicum', price: 299, marketPrice: '380', subText: 'Colorful and crunchy', category: 'Vegetable', weight: '500g', image: require('../assets/capsicum.jpg') },

//     // Dairy Products
//     { id: 'olpers', name: 'Olpers Milk', price: 279, marketPrice: '300', subText: 'Rich in calcium', category: 'Dairy', weight: '1L', image: require('../assets/olpersmilk.jpg') },
//     { id: 'cheese', name: 'Cheese', price: 500, marketPrice: '650', subText: 'Creamy and flavorful', category: 'Dairy', weight: '250g', image: require('../assets/cheese.jpg') },
//     { id: 'cream', name: 'Cream', price: 199, marketPrice: '2.99', subText: 'Perfect for cooking', category: 'Dairy', weight: '250ml', image: require('../assets/cream.jpg') },

//    // Meat & Poultry
//     { id: 'qeema', name: 'Qeema', price: 650, marketPrice: '700', subText: 'Lean and versatile', category: 'Meat & Poultry', weight: '500g', image: require('../assets/qeema.jpg') },
//     { id: 'boneless', name: 'Boneless', price: 650, marketPrice: '700', subText: 'Rich in protein', category: 'Meat & Poultry', weight: '1kg', image: require('../assets/boneless.jpg') },

//     // Grains
//     { id: 'rice', name: 'Basmati Rice', price: 350, marketPrice: '370', subText: 'Versatile staple', category: 'Grains', weight: '1kg', image: require('../assets/rice.jpg') },
//     { id: 'wheat', name: 'Wheat', price: 1300, marketPrice: '1500', subText: 'Rich in fiber', category: 'Grains', weight: '5kg', image: require('../assets/wheat.jpg') },
//     { id: 'oats', name: 'Oats', price: 550, marketPrice: '600', subText: 'Heart-healthy', category: 'Grains', weight: '1kg', image: require('../assets/oats.jpg') },

//     // Beverages
//     { id: 'colanext', name: 'Cola Next', price: 170, marketPrice: '180', subText: 'Rich and aromatic', category: 'Beverages', weight: '1.5L', image: require('../assets/colanext.jpg') },
//     { id: 'fizupnext', name: 'Fiz Up', price: 170, marketPrice: '180', subText: 'Calming and refreshing', category: 'Beverages', weight: '1L', image: require('../assets/fizup.jpg') },
//     { id: 'juice', name: 'Juice', price: 210, marketPrice: '250', subText: 'Freshly squeezed', category: 'Beverages', weight: '1L', image: require('../assets/juice.jpg') },
//     { id: 'water', name: 'Water', price: 100, marketPrice: '110', subText: 'Pure and refreshing', category: 'Beverages', weight: '1.5L', image: require('../assets/water.jpg') },

//       // Snacks
//       { id: 'lays', name: 'Lays', price: 100, marketPrice: '120', subText: 'Crunchy and addictive', category: 'Snacks', weight: '20g', image: require('../assets/frenchcheeselays.jpg') },
//       { id: 'kurleez', name: 'Kurleez', price: 90, marketPrice: '100', subText: 'Healthy snacking', category: 'Snacks', weight: '20g', image: require('../assets/kurleez.jpg') },
//       { id: 'popcorn', name: 'Popcorn', price: 79, marketPrice: '1.29', subText: 'Classic movie snack', category: 'Snacks', weight: '200g', image: require('../assets/popcorn.jpg') },
//       { id: 'chocolate', name: 'Chocolate', price: 399, marketPrice: '450', subText: 'Irresistibly sweet', category: 'Snacks', weight: '100g', image: require('../assets/dairymilk.jpeg') },
  
//       // Condiments
//       { id: 'ketchup', name: 'Ketchup', price: 160, marketPrice: '190', subText: 'Classic dipping sauce', category: 'Condiments', weight: '500ml', image: require('../assets/ketchup.jpg') },
//       { id: 'chillisauce', name: 'Chilli Sauce', price: 110, marketPrice: '120', subText: 'Chilli and versatile', category: 'Condiments', weight: '250ml', image: require('../assets/chilliSauce.jpg') },
//       { id: 'soyasauce', name: 'Soya Sauce', price: 120, marketPrice: '130', subText: 'Enhance your dishes', category: 'Condiments', weight: '250ml', image: require('../assets/soyaSauce.jpg') },
//       { id: 'vinegar', name: 'Vinegar', price: 99, marketPrice: '1.99', subText: 'Adds acidity to dishes', category: 'Condiments', weight: '500ml', image: require('../assets/vinegar.jpg') },
// ]