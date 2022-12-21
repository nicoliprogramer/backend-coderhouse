const {options} = require("./options/mysqlconn.js")
const knex = require("knex")(options)

const express = require("express")

