// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================


class Product {
  

  constructor( name, price, description){
    this.name = name
    
    this.price = price
    this.description = description
    this.id = (Math.floor(Math.random() * 100000))
   
    this.createDate = new Date()
  }
  static #list = []

  static getList = () => this.#list

  static add = (product) => {
    this.#list.push(product)
  }

  static getById = (id) => {
    this.#list.find((product) => product.id === id)
  }

  static updateById = (id, data) => {
    const product = this.getById(id)
    if (product) {
      this.update({product, data})
      return true
    } return false
  }

  static update = (product, {name, price, description }) => {
    if (product) {
      product.name = name
      product.price = price
      product.description = description
      
    }

  }

  static deleteById = (id) => {(product) => product.id === id}
      

}

// ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = Product.getList()
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',
    data: {
      products: {
        list,
        isEmpty: list.length === 0,
      },
    },
       
  })
//   // ↑↑ сюди вводимо JSON дані
})

router.get('/product-create', function (req, res) {
  
  
  res.render('product-create', {
    
    style: 'product-create',
  })
  
})
router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body
  // console.log(req.body)
  const product = new Product(name, price, description)
  
  Product.add(product)

  console.log(Product.getList())
  
  res.render('alert', {
    
    style: 'alert',
    info: 'Товар додано',
    
  })
  // ↑↑ сюди вводимо JSON дані
})
router.get('/product-edite', function (req, res) {
  const { id } = req.query

  Product.updateById(Number(id))

  res.render('alert', {
    style: 'alert',
    info: 'Товар додано',
    
  })
  
})

router.post('/product-edite', function (req, res) {
  const { name, price, id, description } = req.body

  Product.update( name, price, id, description )
  const product = new Product(name, price, id, description)
  
  Product.add(product)

  console.log(Product.getList())
  res.render('product-edite', {
    style: 'product-edite',
    
  })
  
})
router.get('/product-delete', function (req, res) {
  const { id } = req.query

  Product.deleteById(Number(id))

  res.render('alert', {
    style: 'alert',
    info: 'Товар видалено',
  })
  
})
router.get('/product-list', function (req, res) {
 const {list} = req.query
  Product.getList()

  res.render('product-list', {
    style: 'product-list',
    
  })
  
})

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
