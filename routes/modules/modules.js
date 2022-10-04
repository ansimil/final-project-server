const router = require('express').Router()
const Module = require('../../models/Module')
const { isAdmin } = require('../../middleware/isAdmin.middleware'); 

router.get("/modules", (req, res, next) => {
    Module.find()
    .then(response => {
      res.status(200).json(response)  
    })
    .catch(err => console.log(err))
  });

  router.get("/module/:moduleId", (req, res, next)=>{
    const moduleId = req.params.moduleId
    Module.findById(moduleId)
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err))
  })

  router.put("/dashboard/:moduleId/edit", isAdmin, (req, res, next) => {
    const moduleId = req.params.moduleId
    console.log(req.body)
    Module.findByIdAndUpdate(moduleId, req.body.newModule, {new: true})
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err))
  })

  router.delete("/dashboard/:moduleId/delete", isAdmin, (req, res, next)=>{
    const moduleId = req.params.moduleId
    Module.findByIdAndRemove(moduleId)
    .then((response) => res.status(200).json(response))
    .catch(err => console.log(err)) 
  })

  router.post("/dashboard/add", isAdmin, (req, res, next) => {
    console.log(req.body)
      Module.create(req.body.newModule)
      .then(response => res.json(response))
      .catch(err => console.log(err))
  })

router.put('module/:moduleId/addtocart', (req, res, next) => {
    
})

  module.exports = router;