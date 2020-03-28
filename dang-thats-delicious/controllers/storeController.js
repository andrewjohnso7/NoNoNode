const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const multer = require('multer');
const jimp = require('jimp');
const uuid= require('uuid');


const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter (req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\t allowed :/ '}, false);
    }
  }
};


exports.homePage = (req, res) => {
  console.log(req.name)
  res.render('index')
}

exports.addStore = (req, res) => {
  res.render('editStore', {title: 'Add Store' })
}

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  console.log(req.file)
}

exports.createStore = async (req, res) => {
    const store = await (new Store(req.body)).save();
    req.flash('success', `Sucessfully Created ${store.name}. Care to leave a review?`);
    res.redirect(`/store/${store.slug}`)
}

exports.getStores = async (req, res) => {
  // 1. Query the database for a list of all stores
  const stores = await Store.find();
  res.render('stores', { title: 'Stores', stores })
}

exports.editStore = async (req, res) => {
  // 1. find the store given the id
  const _id = req.params.id
  const store = await Store.findOne({ _id });
  // 2. confirm that they are the owner of the store
  // 3. Render the edit form so that the user can update the store
  res.render('editStore', {title: `Edit ${store.name}`, store })
}

exports.updateStore = async (req, res) => {
  // set the location data to be a point
  req.body.location.type = 'Point';
  // find and update the store
  const store = await Store.findOneAndUpdate({ _id: req.params.id, }, req.body, {
    new:true, // returns the new store instead of the old one
    runValidators: true
  }).exec()
  req.flash('success', `Succesfully updated <strong>${store.name}</strong>.<a href="/stores/${store.slug}> Vie Store</a>`)
  // redirect them to the store and tell them it worked

  res.redirect(`/stores/${store.id}/edit`)
}
