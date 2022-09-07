const express = require('express')

const {
  deleteProject, uploadAllureReports, allureInfo, createProject
} = require('../controllers/allureController')

const router = express.Router()

router.route('/remove_project').post(deleteProject)
router.route('/upload').post(uploadAllureReports)
router.route('/info').get(allureInfo)
router.route('/project').post(createProject)

module.exports = router
