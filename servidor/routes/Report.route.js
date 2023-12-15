const express = require('express');
const app = express();
const reportRoutes = express.Router();

let Report = require('../model/Report');

// api to add report
reportRoutes.route('/add').post(function (req, res) {
  let report = new Report(req.body);
  report.save()
  .then(report => {
    res.status(200).json({'status': 'success','mssg': 'report added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get reports
reportRoutes.route('/').get(function (req, res) {
  Report.find(function (err, reports){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','reports': reports});
    }
  });
});

// api to get report
reportRoutes.route('/report/:id').get(function (req, res) {
  let id = req.params.id;
  Report.findById(id, function (err, report){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','report': report});
    }
  });
});

// api to update route
reportRoutes.route('/update/:id').put(function (req, res) {
    Report.findById(req.params.id, function(err, report) {
    if (!report){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        report.nome = req.body.nome;
        report.cargo = req.body.cargo;
        report.gravidade = req.body.gravidade;
        report.horario = req.body.horario;
        report.local = req.body.local;
        report.descricao = req.body.descricao;

        report.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
reportRoutes.route('/delete/:id').delete(function (req, res) {
  Report.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = reportRoutes;