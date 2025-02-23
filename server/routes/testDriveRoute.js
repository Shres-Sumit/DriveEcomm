const express = require('express')
const { requireSign } = require('../helper/jwt')
const { createTestDrive, getAllTestDrive } = require('../controller/testDriveController')
const testDriveRoute = express.Router()

testDriveRoute.post('/book-test-drive', requireSign, createTestDrive)
testDriveRoute.get('/book-test-drive', requireSign, requireSign, getAllTestDrive)


module.exports = testDriveRoute