module.exports = app => {
    const person = require("../controllers/person.controller.js");
  
    app.post("/people", person.validate(), (req,res) => person.create(req,res));
    app.get("/people", person.findAll);
    app.get("/people/:personId", person.findOne);
    app.put("/people/:personId", person.validate(), (req,res) => person.update(req,res));
    app.delete("/people/:personId", person.remove);
    app.delete("/people", person.removeAll);
    
    app.post("/players", person.validate(), (req,res) => person.createPlayer(req,res));
    app.get("/players", person.findAllPlayers);
    app.get("/players/:personId", person.findPlayer);
    app.put("/players/:personId", person.validate(), (req,res) => person.updatePlayer(req,res));
    app.delete("/players/:personId", person.deletePlayer);
    app.delete("/players", person.deleteAllPlayers);

    app.post("/coaches", person.validate(), (req,res) => person.createCoach(req,res));
    app.get("/coaches", person.findAllCoaches);
    app.get("/coaches/:personId", person.findCoach);
    app.put("/coaches/:personId", person.validate(), (req,res) => person.updateCoach(req,res));
    app.delete("/coaches/:personId", person.deleteCoach);
    app.delete("/coaches", person.deleteAllCoaches);
  };