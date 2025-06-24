const express = require('express')
const { requireSign } = require('../helper/jwt')
const { createTestDrive, getAllTestDrive, UpdateTestDriveStatus, getUserTestDrives } = require('../controller/testDriveController')
const testDriveRoute = express.Router()

testDriveRoute.post('/book-test-drive', requireSign, createTestDrive)
testDriveRoute.get('/book-test-drive', requireSign, requireSign, getAllTestDrive)
testDriveRoute.put('/update-status/:id', UpdateTestDriveStatus)
testDriveRoute.get('/:user_id', getUserTestDrives)



module.exports = testDriveRoute