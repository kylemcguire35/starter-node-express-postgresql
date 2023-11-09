const knex = require("../db/fixtures/connection");

function list() {
  return knex("categories").select("*");
}

module.exports = {
  list,
};
