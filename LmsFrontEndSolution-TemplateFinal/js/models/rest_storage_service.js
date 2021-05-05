/* RestStorageService Class */
/* Use this template as a starter and complete the items that say 'TODO' */ 

class RestStorageService
{
  constructor(appViewModel, viewModel) {
    this.appViewModel = appViewModel;
    this.apiName = viewModel.apiName;
    this._list = null;
    this.viewModel=viewModel;
    
    this.initModel(viewModel.list.options);
    
  }
  initModel(options){
    //options object looks like
    /*{
      sort_col:"first_name",
      sort_dir:"desc",
      limit: 10,
      offset:10,
      filter_col: "first_name",
      filter_str: "Ke" // (note, in your UI I would not call list until at least 3 chars have been typed)
    };*/
    this.model={};

    this.model.options = //set defaults
      {
        sort_col: null,
        sort_dir: 'asc',
        limit: null,
        offset: null,
        filter_col: null,
        filter_str: null,
        is_lookup: null,
        alt_table: null
      }
      this._lookups=this.appViewModel.isMock?this.viewModel.mockLookupData:{};
        
    this.options=options;
  }
  //GETTERS AND SETTERS
  get host() {
    return this.appViewModel.isLocal ? this.appViewModel.localEndPoint : this.appViewModel.remoteEndPoint;
  }
  get sortCol() {
    return this.model.options.sort_col;
  }
  set sortCol(col) {
    this.model.options.sort_col = col;
  }
  get sortDir() {
    return this.model.options.sort_dir;
  }
  set sortDir(dir) {
    this.model.options.sort_dir = dir;
  }
  set filterStr(filterStr) {
    this.model.options.filter_str = filterStr;
  }
  get filterStr() {
    return this.model.options.filter_str;
  }
  set filterCol(filterCol) {
    this.model.options.filter_col = filterCol;
  }
  get filterCol() {
    return this.model.options.filter_col;
  }
  get size() {
    return this.model.data.length;
  }
  set options(opt) {

    //merge any passed in options
    this.model.options = Object.assign(this.model.options, opt);
  }

   get list(){ return this._list }   //getter for last retrieved list, in case you don't want to call list again
   get lookups() {
       return this._lookups;
    
    }   //getter for lookups object

   /* List function-I'm giving this one to you */
   async list(options=this.model.options) {
      /* TODO  Implement the list function as I described in the demo last Thursday */
      var listData;

      if ("is_lookup" in options && options.is_lookup == true){
        await $.ajax({
          method: "GET",
          url: `http://${this.appViewModel.localEndPoint}/${options.alt_table}`
        }).done((data) => {
          //remember to populate the _lookups
          this._lookups[options.alt_table] = data;
          listData = data;
          console.log(`Lookup Data Recieved From Table: ${options.alt_table}`);
        });
      } else {
        //otherwise, just call api for default apiName
        await $.ajax({
          method: "GET",
          url: `http://${this.appViewModel.localEndPoint}/${this.apiName}${this.getQueryString(options)}`
        }).done((data) => {
          console.log(`List Data Recieved From Table: ${this.apiName}`);
          listData = data;
        });

        //if we are doing a lookup, call the api for the lookup (alt_table)
        for (var field of this.viewModel.fields){
          if (field.lookupName) {
            await $.ajax({
              method: "GET",
              url: `http://${this.appViewModel.localEndPoint}/${field.lookupName}`
            }).done((data) => {
              //remember to populate the _lookups
              this._lookups[field.lookupName] = data;
              console.log(`Lookup Data Recieved From Table: ${field.lookupName}`);
            });
          }
        }
      }
      return listData;
   }

    async get(id)
    {
      var record;
      //TODO-call api to get item with 'id'
      await $.ajax({
        url: `http://${this.appViewModel.localEndPoint}/${this.apiName}/${id}`,
        type: 'GET',
      }).done((data) => {
        console.log(data);
        record = data;
      });
      return record;
    }

    async update( id, postData )
    {
      postData.person_type = "player";
      postData.license_level_id = 1;
      //TODO - call api to update item
      await $.ajax({
        url: `http://${this.appViewModel.localEndPoint}/${this.apiName}/${id}`,
        type: 'PUT',
        data: postData
      }).done((data) => {
        console.log(data);
        return data;
      });
    }

    async create(postData) 
    {
      postData.person_type = "player";
      postData.license_level_id = 1;
      await $.ajax({
        url: `http://${this.appViewModel.localEndPoint}/${this.apiName}`,
        type: 'POST',
        data: postData
      }).done((data) => {
        console.log(data);
        return data;
      });
    }

    async delete(id) 
    {    
      await $.ajax({
        url: `http://${this.appViewModel.localEndPoint}/${this.apiName}/${id}`,
        type: 'DELETE',
      }).done((data) => {
        console.log(data);
        return data;
      });
    }
    
    /* getLookup */
    /* This function passes two additional query string params to the 'list' call
       You will need to modify your list code in the REST API to return an array of objects that
       contain  just 'label' (name for Team, first_name+""+last_name for player) and 'value' (id of team/coach)
     
        Here's an example of what this object will look like
         {
             "teams": [{"label":"Raptors","value":"1"}, ....],
             "coaches": [{"label":"John Jenson","value":"2"}, ....]
         }
         As you retrieve lookups, they will be stored in the service so you don't need
         to look them up again.
         
         This will be called from Populate Lookups in the 'View' class
    */
    async getLookup(name) {
      if(!(name in this._lookups)){  //if not cached yet, call
        await this.list({
          is_lookup:true,
          alt_table:name });
      } 
      return this._lookups[name];
     }
     
     /* UTILITY FUNCTIONS */
     getQueryString(options) {     //string to break out options object into a query string
        var stringExists = false;
        var queryString = "?";
        for (var prop in options) if (options[prop]){
            if (stringExists) queryString += "&";
            queryString += `${prop}=${options[prop]}`;
            stringExists = true;
        }
        return queryString;
     }
     cloneObject(obj) {
      return JSON.parse(JSON.stringify(obj));
  }

}