// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []

  static #count = 0

  constructor(img, title, description, category, price){
    this.id = ++Product.#count
    this.img = img
    this.title = title
    this.description = description
    this.category = category
    this.price = price
  }

  static add = (
    img,
    title,
    description,
    category,
    price,
  ) => {
    const newProduct = new Product(
      img,
      title,
      description,
      category,
      price,
    )
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
  
)

Product.add(
  
  'https://picsum.photos/200/300',
  `Computer DarWeider FD 125/5487 AMD Decleron`,
  `AMD Decleron 655 HDD 3600 HHz/ RAV 256/ HDD 1 Tb`,
  [{id: 2, text: 'Top sales'},],
  48520,

)

Product.add(
  
  'https://picsum.photos/200/300',
  `Computer BuzzLighter FD 125/5487 AMD Decleron`,
  `AMD Decleron 655 HDD 3600 HHz/ RAV 256/ HDD 1 Tb`,
  [
    {id: 1, text: 'Ready to go'},
    
  ],
  18260,

)


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
router.get('/purchase-list', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-list ',

    data: {
      list: Purchase.getList(),
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
router.post('/purchase-create', function (req, res) {
  const id = Number(req.query.id)// res.render генерує нам HTML сторінку
  const amount = Number(req.body.amount)

  console.log(id, amount)
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
// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
