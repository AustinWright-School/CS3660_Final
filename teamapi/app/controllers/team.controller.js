const Team = require("../models/team.model.js");
const { body, validationResult } = require('express-validator');

// Create and Save a new Team
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Perosn
      const team = new Team(req.body);
    
      // Save Team in the database
      Team.create(team, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Team."
          });
        else res.status(201).send(data);
    });
};

// Retrieve all people from the database.
exports.findAll = (req, res) => {
    Team.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Teams."
        });
      else res.send(data);
    });
};

// Find a single team with a id
exports.findOne = (req, res) => {
    Team.findById(req.params.teamId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Team with id ${req.params.teamId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Team with id " + req.params.teamId
          });
        }
      } else res.send(data);
    });
};

// Update a Team identified by the ID in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Team.updateById(
      req.params.teamId,
      new Team(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Team with id ${req.params.teamId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Team with id " + req.params.teamId
            });
          }
        } else res.send(data);
      }
    );
};

// Delete a Team with the specified ID in the request
exports.delete = (req, res) => {
    Team.remove(req.params.teamId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Team with id ${req.params.teamId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Team with id " + req.params.teamId
          });
        }
      } else res.send({ message: `Team was deleted successfully!` });
    });
  };

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  Team.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Teams."
      });
    else res.send({ message: `All Teams were deleted successfully!` });
  });
};

exports.validate = () => {
  return [
    body('name').exists(),
    body('coach_id').exists(),
    body('league_id').exists(),
  ]
}