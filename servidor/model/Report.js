const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Report = new Schema({
  nome: {
    type: String
  },
  cargo: {
    type: String
  },
  gravidade: {
    type: String
  },
  horario: {
    type: String
  },
  local: {
    type: String
  },
  descricao: {
    type: String
  }
},{
    collection: 'report'
});

module.exports = mongoose.model('Report', Report);