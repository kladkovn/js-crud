// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []

  static #count = 0

  constructor(img, title, description, category, price, amount = 0,){
    this.id = ++Product.#count
    this.img = img
    this.title = title
    this.description = description
    this.category = category
    this.price = price
    this.amount = amount
  }

  static add = (...data) => {
    const newProduct = new Product(...data)

    this.#list.push(newProduct)
  }

  static getList = () => {
    return this.#list
  }

  static getById = (id) => {
    return this.#list.find((product) => product.id === id)
  }

  static getRandomList = (id) => {
    const filteredList = this.#list.filter(
      (product) => product.id !== id,
    )
    const shuffledList = filteredList.sort(
      () => Math.random() - 0.5,
    )

    return shuffledList.slice(0, 3)
  }
}

Product.add(
  
    'https://picsum.photos/200/300',
    `Computer AtrMaster FD 125/5487 AMD Decleron`,
    `AMD Decleron 655 HDD 3600 HHz/ RAV 256/ HDD 1 Tb`,
    [
      {id: 1, text: 'Ready to go'},
      {id: 2, text: 'Top sales'},
    ],
    27560,
    5,
  
)

Product.add(
  
  'https://picsum.photos/200/300',
  `Computer DartWeider FD 125/5487 AMD Decleron`,
  `AMD Decleron 655 HDD 3600 HHz/ RAV 256/ HDD 1 Tb`,
  [{id: 2, text: 'Top sales'},],
  48520,
  78,

)

Product.add(
  
  'https://picsum.photos/200/300',
  `Computer BuzzLighter FD 125/5487 AMD Decleron`,
  `AMD Decleron 655 HDD 3600 HHz/ RAV 256/ HDD 1 Tb`,
  
    {id: 1, text: 'Ready to go'},
    
  
  18260,
  3,

)
Product.add(
  
  'https://picsum.photos/200/300',
  `Computer DE PFazzighter FD 125/5487 AMD Decleron`,
  `AMD Decleron 655 HDD 3600 HHz/ RAV 256/ HDD 1 Tb`,
  
    {id: 1, text: 'Ready to go'},
    
  
  22260,
  3,

)

class Purchase {
  static DELIVERY_PRICE = 150
  static #BONUS_FACTOR = 0.1

  static #count = 0
  static #list = []

  static #bonusAccount = new Map()

  static getBonusBalance = (email) => {
    return Purchase.#bonusAccount.get(email) || 0
  }
  static calcBonusAmount = (value) => {
    return value * Purchase.#BONUS_FACTOR
  }
  static updateBonusBalance = (
    email,
    price,
    bonusUse = 0,
  ) => {
    const amount = this.calcBonusAmount(price)

    const currentBalance = Purchase.getBonusBalance(email)
    const updatedBalance = currentBalance + amount - bonusUse


    Purchase.#bonusAccount.set(email, updatedBalance)

    console.log(email, updatedBalance)
    return amount
  }

  constructor(data, product){
    this.id = ++Purchase.#count

    this.firstname = data.firstname
    this.lastname = data.lastname

    this.phone = data.phone
    this.email = data.email

    this.comment = data.comment || null

    this.bonus = data.bonus || 0

    this.promocode = data.promocode || null

    this.totalPrice = data.totalPrice
    this.productPrice = data.productPrice
    this.deliveryPrice = data.deliveryPrice
    this.amount = data.amount
    this.product = product
  }
  static add = (...arg) => {
    const newPurchase = new Purchase(...arg)
    this.#list.push(newPurchase)
    return newPurchase
  }

  static getList = () => {
    return Purchase.#list.reverse()
  }

  static getById = () => {
    return Purchase.#list.find((item) => item.id === id)
  }
  static updateById = (id, data) => {
    const purchase = Purchase.getById(id)

      if (purchase){
        if(data.firstname) purchase.firstname = data.firstname
        if(data.lastname) purchase.lastname = data.lastname
        if(data.phone) purchase.phone = data.phone
        if(data.email) purchase.email = data.email

        return true
        
      } else {
        return false
      }

  }
}
class Promocode {
  static #list = []

  constructor(name, factor){
    this.name = name
    this.factor = factor
  }

  static add = (name, factor) => {
    const newPromoCode = new Promocode(name, factor)
    Promocode.#list.push(newPromoCode)
    return newPromoCode
  }
  static getByName = (name) => {
    return this.#list.find((promo) => promo.name === name)
  }
  static calc = (promo, price) => {
    return price * promo.factor
  }
}

Promocode.add('SUMMER2023', 0.9)
Promocode.add('DISCOUNT50', 0.5)
Promocode.add('SALES25', 0.75)

//=================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',

    data: {
      message: 'Успішне виконання дії',
      info: 'Замовлення успішно створено',
      link: '/test-path',
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
router.get('/purchase-index', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-index',

    data: {
      list: Product.getList(),
    },
   
  })
  // ↑↑ сюди вводимо JSON дані
})
router.get('/purchase-product', function (req, res) {
  const id = Number(req.query.id)// res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-product', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-product',

    data: {
      list: Product.getRandomList(id),
      product: Product.getById(id),

    },
  })
  // ↑↑ сюди вводимо JSON дані
})
router.post('/purchase-product', function (req, res) {
  const id = Number(req.query.id)// res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-product', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-product',

    data: {
      list: Product.getRandomList(id),
      product: Product.getById(id),

    },
  })
  // ↑↑ сюди вводимо JSON дані
})
router.get('/purchase-create', function (req, res) {
  const id = Number(req.query.id)// res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-create',
    
    data: {
      list: Product.getRandomList(id),
      product: Product.getById(id),

    },
  })
  // ↑↑ сюди вводимо JSON дані
})
router.post('/purchase-create', function (req, res) {
  const id = Number(req.query.id)// res.render генерує нам HTML сторінку
  const amount = Number(req.body.amount)
  if(amount < 1){
    return res.render('alert', {
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Некоректна кількість товару',
        link: `/purchase-product?id=${id}`,
      },
    })
  }

  const product = Product.getById(id);
  if(product.amount < 1){
    return res.render('alert', {
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Немає в наявності товару',
        link: `/purchase-product?id=${id}`,
      },
    })
  }
  console.log(product, amount)

  const productPrice = product.price * amount
  const totalPrice = productPrice + Purchase.DELIVERY_PRICE
  const bonus = Purchase.calcBonusAmount(totalPrice)

  res.render('purchase-create', {
    style: 'purchase-create',
    data: {

      id: product.id,

      cart: [
        {
          text: `${product.title} (${amount} шт)`,
          price: productPrice,
        },
        {
          text: `Доставка`,
          price: Purchase.DELIVERY_PRICE,
        },
      ],
      totalPrice,
      productPrice,
      deliveryPrice: Purchase.DELIVERY_PRICE,
      amount,
      bonus,
    },
  })
  

  res.render('purchase-product', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-product',

    data: {
      list: Product.getRandomList(id),
      product: Product.getById(id),

    },
  })
  // ↑↑ сюди вводимо JSON дані
})
router.post('/purchase-submit', function (req, res) {
  const id = Number(req.query.id)

  let {
    totalPrice,
    productPrice,
    deliveryPrice,
    amount,

    firstname,
    lastname,
    phone,
    email,
    comment,
    promocode,
    bonus,
  } = req.body

  const product = Product.getById(id)

  if(!product){
    return res.render('alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'alert',
  
      data: {
        message: 'Помилка',
        info: 'Товар не знайдено',
        link: '/purchase-list',
  
      },
    })
  }
  if(product.amount < amount){
    return res.render('alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'alert',
  
      data: {
        message: 'Помилка',
        info: 'Товару немає в наявності',
        link: '/purchase-list',
  
      },
    })
  }
  totalPrice = Number(totalPrice)
  productPrice = Number(productPrice)
  deliveryPrice = Number(deliveryPrice)
  amount = Number(amount)
  bonus = Number(bonus)

  if (
    isNaN(totalPrice) ||
    isNaN(productPrice) ||
    isNaN(deliveryPrice) ||
    isNaN(amount) ||
    isNaN(bonus)
  ) {
    return res.render('alert',{
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'alert',
  
      data: {
        message: 'Помилка',
        info: 'Некоректні дані',
        link: '/purchase-list',
  
      },
    })
  }
  if (!firstname || !lastname || !phone || !email) {
    return res.render('alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'alert',
  
      data: {
        message: `'Заповніть обо'вязкові поля'`,
        info: 'Некоректні дані',
        link: '/purchase-list',
  
      },
    })
  }
  if (bonus || bonus > 0){
    const bonusAmount = Purchase.getBonusBalance(email)

    console.log(bonusAmount)

    if (bonus > bonusAmount){
      bonus = bonusAmount
    }

    Purchase.updateBonusBalance(email, totalPrice, bonus)

    totalPrice -= bonus
  } else {
    Purchase.updateBonusBalance(email, totalPrice, 0)
  }

  if (promocode){
    promocode = Promocode.getByName(promocode)

    if(promocode){
      totalPrice = Promocode.calc(promocode, totalPrice)
    }
  }
  if(totalPrice < 0) totalPrice = 0

  const purchase = Purchase.add(
    {
      totalPrice,
      productPrice,
      deliveryPrice,
      amount,
      bonus,

      firstname,
      lastname,
      phone,
      email,

      promocode,
      comment,
    },
    product,
  )

  console.log(purchase)
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',

    data: {
      message: 'Успішно',
      info: 'Замовлення успішно створено',
      link: '/purchase-list',

    },
  })
  // ↑↑ сюди вводимо JSON дані
})
router.get('/purchase-list', function (req, res) {
  
   
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-list',

    // data: {
      
    //   list: Purchase.getList(id, totalPrice, bonus),
    //   product: Product.getlist(title),
      
    // },
    
  })
  // ↑↑ сюди вводимо JSON дані
})
router.get('/purchase-info', function (req, res) {
  
   
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-info', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-info',

    // data: {
    //   id: randomID,
    //   list: Purchase.getList(),
      

    // },
    
  })
  // ↑↑ сюди вводимо JSON дані
})
router.get('/purchase-change', function (req, res) {
  
   
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-change', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-change',

    // data: {
    //   id: randomID,
    //   list: Purchase.getList(),
      

    // },
    
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
