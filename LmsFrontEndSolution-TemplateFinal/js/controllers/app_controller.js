/* AppService Class-Complete */
/* We will be using a new approach that uses hash routing to load the views into a single
div container 
The AppController will handle all of the semantic actions of the app.  We will be using a 'hash routing' scheme
to load the Player and Team lists and forms:
        Load Player List:  #/players
        Load Player Create Form:  #/players/create
        Load Player Edit Form:  #/players/edit/:id
        Load Team List:  #/teams
        Load Team Edit Form:  #/teams/edit/:id
        Load Team Create Form:  #/teams/create

        Load a list with sorting:  #/teams?sort_col=first_name&sort_dir=asc
        Load a list with filtering:  #/teams?filter_col=first_name&filter_str=Ke
        Load a list with paging:  #/players?limit=10&offset=10
*/

/* AppService Class-Complete */
class AppController {
        constructor(window, appViewModel, playerViewModel, teamViewModel) {
                this.appViewModel = appViewModel;
                //Create APIs
                this.playerApi=new RestStorageService(appViewModel, playerViewModel);
                this.teamApi=new RestStorageService(appViewModel, teamViewModel);
                //Create Player Views
                this.playerListView = new ListView(playerViewModel, appViewModel, this.playerApi);
                this.playerFormView = new FormView(playerViewModel, appViewModel, this.playerApi);
                //Create Team Views
                this.teamListView = new ListView(teamViewModel, appViewModel, this.teamApi);
                this.teamFormView = new FormView(teamViewModel, appViewModel, this.teamApi);

                this.initRoutes();
               // window.location.hash=appViewModel.defaultHash;
        }
        initRoutes() {
                //if hash in route, load
                this.loadHash();
                $(window).on("hashchange", e => {
                       this.loadHash();
                });
        }
        loadHash(){
                let urlObj=this.parseHash(window.location.hash);
                if (urlObj.api){
                        this.loadView(urlObj);
                }
        }
        loadView(urlObj){
                
                switch (urlObj.api) {
                        case "players":
                                switch(urlObj.action){
                                        case 'edit':
                                                this.editPlayer(urlObj.id);
                                        break;
                                        case 'create':
                                                this.createPlayer();
                                        break;
                                        
                                        default:
                                                this.listPlayers(urlObj.query);
                                        break;
                                }
                                
                                break;
                        case "teams":
                                switch(urlObj.action){
                                        case 'edit':
                                                this.editTeam(urlObj.id);
                                        break;
                                        case 'create':
                                                this.createTeam();
                                        break;
                                       
                                        default:
                                                this.listTeams(urlObj.query);
                                        break;
                                }
                                break;

                }
        }
        /* The following methods represent the semantic actions/business logic for the app*/
        async listTeams(options) {
                
                this.teamListView.render(options);
        }
        async editTeam(id) {
                
                this.teamFormView.edit(id)
        }
        async createTeam() {
                this.teamFormView.create();
        }
        
        async listPlayers(options) {
               
                this.playerListView.render(options);
        }
        async editPlayer(id) {
                
                this.playerFormView.edit(id)
        }
        async createPlayer() {
                this.playerFormView.create();
        }
        
        /* Utility function for parsing out api, action, id, and query string params from URL*/
        
        parseHash(hash){
                let urlObj={
                        api: null,
                        action: null,
                        id:null,
                        query: {
                          sort_col: null,
                          sort_dir:null,
                          limit: null,
                          offset:null,
                        filter_col: null,
                        filter_str: null,
                        
                        }
                }
                if (!hash.includes("#")){
                        return urlObj;
                }
                let parts = hash.split('/');
                let querysplit=parts[1].split("?")
                if (querysplit.length>1){
                        let items = querysplit[1].split("&");
                        for(let item of items){
                                let arr=item.split("=");
                                urlObj.query[arr[0]]=arr[1];
                        }
                        parts[1]=querysplit[0];
                }
                
                urlObj.api=parts[1];
                urlObj.action=parts.length>2?parts[2]:null;
                urlObj.id=parts.length>3?parts[3]:null;
              return urlObj;
        }
}