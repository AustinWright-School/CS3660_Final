module.exports = app => {
    const team = require("../controllers/team.controller.js");
  
    app.post("/teams", team.validate(), (req,res) => team.create(req,res));
    app.get("/teams", team.findAll);
    app.get("/teams/:teamId", team.findOne);
    app.put("/teams/:teamId", team.validate, (req,res) => team.update(req,res));
    app.delete("/teams/:teamId", team.delete);
    app.delete("/teams", team.deleteAll);
  };