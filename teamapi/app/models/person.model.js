const sql = require("./db.js");

// constructor
const Person = function(person) {
  this.id = person.id;
  this.first_name = person.first_name;
  this.last_name = person.last_name;
  this.address1 = person.address1;
  this.address2 = person.address2;
  this.city = person.city;
  this.state = person.state;
  this.zip = person.zip;
  this.notes = person.notes;
  this.team_id = person.team_id;
  this.email = person.email;
  this.phone = person.phone;
  this.password = person.password;
  this.user_name = person.user_name;
  this.license_level_id = person.license_level_id;
  this.person_type = person.person_type;
};

Person.create = (newPerson, result) => {
  sql.query("INSERT INTO people SET ?", newPerson, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created person: ", { id: res.insertId, ...newPerson });
    result(null, { id: res.insertId, ...newPerson });
  });
};

Person.findById = (personId, query, result) => {
  sql.query(`SELECT * FROM people WHERE id = "${personId}"${QueryToString(false, query)}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found person: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Person.getAll = (query, result) => {
  sql.query(`SELECT * FROM people ${QueryToString(true, query)}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("people: ", res);
    result(null, res);
  });
};

Person.updateById = (id, query, person, result) => {
  sql.query(
    `UPDATE people SET first_name = ?, last_name = ?, address1 = ?, address2 = ?, `
    + `notes = ?, city = ?, state = ?, zip = ?, team_id = ?, email = ?, phone = ?, `
    + `password = ?, user_name = ?, license_level_id = ?, person_type = ? `
    + `WHERE id = "${id}"${QueryToString(false, query)}`,
    [person.first_name, person.last_name, person.address1, person.address2,
      person.notes, person.city, person.state, person.zip, person.team_id, person.email, person.phone,
      person.password, person.user_name, person.license_level_id, person.person_type],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found person with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated person: ", { id: id, ...person });
      result(null, { id: id, ...person });
    }
  );
};

Person.remove = (id, query, result) => {
  sql.query(`DELETE FROM people WHERE id = "${id}"${QueryToString(false, query)}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found perosn with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted person with id: ", id);
    result(null, res);
  });
};

Person.removeAll = (query, result) => {
  sql.query(`DELETE FROM people ${QueryToString(true, query)}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} people`);
    result(null, res);
  });
};

module.exports = Person;

QueryToString = (addWhere, query) => {
  var queryString = "";
  var whereForFilter = addWhere;
  var limit, offset, sort_col, sort_dir, filter_col, filter_str;
  for (let member in query) {
    switch (member){
      case "sort_col":
        sort_col = query[member];
        break;
      case "sort_dir":
        sort_dir = query[member];
        break;
      case "limit":
        limit = query[member];
        break;
      case "offset":
        offset = query[member];
        break;
      case "filter_col":
        filter_col = query[member];
        break;
      case "filter_str":
        filter_str = query[member];
        break;
      default:
        if (addWhere){
          queryString += `WHERE ${member} = "${query[member]}"`;
          addWhere = false;
        } else {
          queryString += ` AND ${member} = "${query[member]}"`;
        }
        break;
    }
  }
  if (filter_col && filter_str) {
    if (whereForFilter && addWhere){
      queryString += `WHERE ${filter_col} LIKE "%${filter_str}%"`;
    } else {
      queryString += ` AND ${filter_col} LIKE "%${filter_str}%"`;
    }
  }
  if (sort_col){
    if (sort_dir) {
      queryString += ` ORDER BY ${sort_col} ${sort_dir}`;
    } else {
      queryString += ` ORDER BY ${sort_col}`;
    }
  }
  if (limit) {
    if (offset) {
      queryString += ` LIMIT ${offset}, ${limit}`;
    } else {
      queryString += ` LIMIT ${limit}`;
    }
  }
  return queryString;
}