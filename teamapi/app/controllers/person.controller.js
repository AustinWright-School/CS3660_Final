const Person = require("../models/person.model.js");
const { body, validationResult } = require('express-validator');

// Create and Save a new Person
exports.create = (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(422).json({ errors: errors.array() });
    return;
  }
  
  // Create a Perosn
  const person = new Person(req.body);

  // Save person in the database
  Person.create(person, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Person."
      });
    else res.status(201).send(data);
  });
};

// Retrieve all people from the database.
exports.findAll = (req, res) => {
  Person.getAll(req.query, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving people."
      });
    else res.send(data);
  });
};

// Find a single person with a personId
exports.findOne = (req, res) => {
  Person.findById(req.params.personId, req.query, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Person with id ${req.params.personId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Person with id " + req.params.personId
        });
      }
    } else res.send(data);
  });
};

// Update a Person identified by the PersonID in the request
exports.update = (req, res) => {
  // Validate Request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(422).json({ errors: errors.array() });
    return;
  }

  Person.updateById(
    req.params.personId, req.query,
    new Person(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Person with id ${req.params.personId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Person with id " + req.params.personId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Person with the specified personId in the request
exports.remove = (req, res) => {
  Person.remove(req.params.personId, req.query, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Person with id ${req.params.personId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Person with id " + req.params.personId
        });
      }
    } else res.send({ message: `Person was deleted successfully!` });
  });
};

// Delete all People from the database.
exports.removeAll = (req, res) => {
  Person.removeAll(req.query, (err, data) => {
    console.log(err);
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all People."
      });
    else res.send({ message: `All People were deleted successfully!` });
  });
};

exports.createPlayer = (req, res) => {
  req.body.person_type = "player";
  this.create(req, res);
};
exports.findAllPlayers = (req, res) => {
  req.query.person_type = "player";
  this.findAll(req, res);
};
exports.findPlayer = (req, res) => {
  req.query.person_type = "player";
  this.findOne(req, res);
};
exports.updatePlayer = (req, res) => {
  req.query.person_type = "player";
  this.update(req, res);
};
exports.deletePlayer = (req, res) => {
  req.query.person_type = "player";
  this.remove(req, res);
};
exports.deleteAllPlayers = (req, res) => {
  req.query.person_type = "player";
  this.removeAll(req, res);
};
exports.createCoach = (req, res) => {
  req.body.person_type = "coach";
  this.create(req, res);
};
exports.findAllCoaches = (req, res) => {
  req.query.person_type = "coach";
  this.findAll(req, res);
};
exports.findCoach = (req, res) => {
  req.query.person_type = "coach";
  this.findOne(req, res);
};
exports.updateCoach = (req, res) => {
  req.query.person_type = "coach";
  this.update(req, res);
};
exports.deleteCoach = (req, res) => {
  req.query.person_type = "coach";
  this.remove(req, res);
};
exports.deleteAllCoaches = (req, res) => {
  req.query.person_type = "coach";
  this.removeAll(req, res);
};

exports.validate = () => {
  return [
    body('first_name').exists().trim().escape(),
    body('last_name').exists().trim().escape(),
    body('phone').exists().trim().escape().isNumeric().isLength({ min: 10, max: 11}),
    body('address1').exists().trim().escape(),
    body('city').exists().trim().escape(),
    body('state').exists().trim().escape(),
    body('zip').exists().trim().escape().isNumeric().isLength({ min: 5, max: 5}),
    body('email').exists().trim().escape().normalizeEmail().isEmail(),
    body('phone').exists().trim().escape(),
    body('password').exists().trim().escape(),
    body('user_name').exists().trim().escape(),
    body('person_type').trim().escape().isIn(['coach', 'player', 'admin']),
  ]
}
