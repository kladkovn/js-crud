// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================
class Track {
  static #list = []

  constructor(name, author, image) {
    this.id = Math.floor(1000 + Math.random() * 9000)
    this.name = name
    this.author = author
    this.image = image

  }

  static create(name, author, image){
    const newTrack = new Track(name, author, image)
    this.#list.push(newTrack)
    return newTrack
  }

  static getList(){
    return this.#list.reverse()
  }
}
Track.create(
  'Kickstart my heart',
  'Motley Crue',
  'https://picsum.photos/100/100'
)
Track.create(
  '18 and life',
  'Skid Row',
  'https://picsum.photos/100/100'
)
Track.create(
  'Paranoid',
  'Black Sabbath',
  'https://picsum.photos/100/100'
)
Track.create(
  'No more tears',
  'Ozzi Osbourn',
  'https://picsum.photos/100/100'
)
Track.create(
  'No more i love you',
  'Ann Lenox',
  'https://picsum.photos/100/100'
)
console.log(Track.getList())

class PlayList {
  static #list = []

  constructor(name){
    this.id = Math.floor(1000 + Math.random() * 9000)
    this.name = name
    this.tracks = []
    this.image = 'https://picsum.photos/100/100'
  }

  static create(name){
    const newPlayList = new PlayList(name)
    this.#list.push(newPlayList)
    return newPlayList
  }

  static getList(){
    return this.#list.reverse()
  }

  static makeMix(playlist){
    const allTracks = Track.getList()

    let randomTracks = allTracks
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)

    playlist.tracks.push(...randomTracks)
  }

  static getById(id){
    return (
      PlayList.#list.find(
        (playlist) => playlist.id === id,
      ) || null
    )
  }

  deleteTrackById(trackId){
    this.tracks = this.tracks.filter(
      (track) => track.id !== trackId,
    )
  }
  

  static findListByValue(name){
    return this.#list.filter((playlist)=>
      playlist.name
        .toLowerCase()
        .includes(name.toLowerCase()),
    )
  }
}

PlayList.makeMix(PlayList.create('Test'))
PlayList.makeMix(PlayList.create('Bubamara'))
PlayList.makeMix(PlayList.create('Lets Rock'))
//=================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-choose', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify-choose',

    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})
router.get('/spotify-playlist', function (req, res) {
  const id = Number(req.query.id)

  const playlist = PlayList.getById(id)

  if (!playlist) {
    return res.render('alert', {
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Такого плейлиста не знайдено',
        link: `/spotify-playlist?id=${playlistId}`,
      },
    })
  }

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-playlist', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify-playlist',

    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
router.get('/spotify-create', function (req, res) {
  const isMix = !!req.query.isMix
  console.log(isMix)
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify-create',

    data: {
      isMix,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
router.post('/spotify-create', function (req, res) {
  
  const isMix = !!req.query.isMix
  console.log(isMix)
  const name = req.body.name

  if (!name){
    return res.render('alert', {
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Введіть назву плейлиста',
        link: isMix
        ?'/spotify-create?isMix=true'
        :'/spotify-create',
      },
    })
  }

  const playlist = PlayList.create(name)

  if (isMix) {
    PlayList.makeMix(playlist)
  }
  console.log(playlist)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-playlist', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify-playlist',

    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
router.get('/spotify-track-delete', function (req, res) {
  const playlistId = Number(req.query.playlistId)
  const trackId = Number(req.query.trackId)

  const playlist = PlayList.getById(playlistId)
  if (!playlist) {
    return res.render('alert', {
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Такого плейлиста не знайдено',
        link: `/spotify-playlist?id=${playlistId}`,
      },
    })
  }

  playlist.deleteTrackById(trackId)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-playlist', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify-playlist',

    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
router.get('/spotify-track-add', function (req, res) {
  const playlistId = Number(req.query.playlistId)
  const trackId = Number(req.query.trackId)

  const playlist = PlayList.getById(playlistId)
  // if (!playlist) {
  //   return res.render('alert', {
  //     style: 'alert',
  //     data: {
  //       message: 'Помилка',
  //       info: 'Такого плейлиста не знайдено',
  //       link: `/spotify-playlist?id=${playlistId}`,
  //     },
  //   })
  // }

  // playlist.deleteTrackById(trackId)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-playlist-add', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify-playlist-add',

    data: {
      playlistId: playlist.id,
      tracks: Track.getList(),
      name: playlist.name,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
router.get('/spotify-search', function (req, res) {
  // res.render генерує нам HTML сторінку
  const value = req.body.value || ''

  const list = PlayList.findListByValue(value)
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-search', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify-search',

    data: {
      list: list.map(({ tracks, ...rest }) => ({
        ...rest,
        amount: tracks.length,

      })),
      value,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
router.post('/spotify-search', function (req, res) {
  const value = req.body.value || ''

  const list = PlayList.findListByValue(value)

  console.log(value)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-search', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify-search',

    data: {
      list: list.map(({ tracks, ...rest }) => ({
        ...rest,
        amount: tracks.length,

      })),
      value,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
