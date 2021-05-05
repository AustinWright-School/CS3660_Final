class ListView extends View {
  constructor(viewModel, appViewModel, storageService) {
    
    super(viewModel, appViewModel, storageService);
    this.templateUrl=appViewModel.listTemplateUrl;
    this.mockData=viewModel.mockListData;
    this.searchWaiter=null;
    this.searchVal="";
  }
  /*getData method is the method overriden by the this subclass to retrieve the data to be rendered */
  async getData(options) {
    this.storage.options = options;
    return await this.storage.list(options);
    
  }

  async render(options) {
    try {

      await this.renderTemplate(options);
      //show default sort column arrow
      $(`#${this.storage.sortCol}-${this.storage.sortDir}`).show();

      if (this.storage.filterStr) {
        $('.searchfield').val(this.storage.filterStr);
      }

    } catch (err) {
      console.log(err);
    }
  }

  detachEvents() {
    
      let data = this._data;
      let that = this;
      data.forEach(function (val) {
       
        let removeId = `#remove${val.id}`;
        $(document).off("click", removeId);
      })

      $("#reset").off("click")

      // set the create new button to edit
      $(document).off("click", "#create");

      $(`.sortable`).off("click");
      $('.searchfield').off("keyup");

      console.log(`${this.viewType} list events detached`);
     
  }
  bindEvents() {
  
      let data = this._data;
      let that = this;

      data.forEach(function (val) {
        let removeId = `#remove${val.id}`;

        $(removeId).click(function (e) {
          that.deleteListItem(val.id);
          that.render();
        });
      });

      $("#reset").on("click", e => {
        $('.searchfield').val("");
        //clear the storage.filterStr and storage.filterCol values
        this.storage.filterStr = "";
        this.storage.filterCol = "";
        //call the navigateToList() function (located in view.js)
        this.navigateToList();
      });

      $(`th.sortable`).on("click", (e) => {
        //when you click sortable update the options and redirect.
        if (e.target.dataset.name == this.viewModel.list.options.sort_col) {
            this.toggleSortDirection();
        } else {
            this.viewModel.list.options.sort_col = e.target.dataset.name;
            this.storage.sortCol = e.target.dataset.name;
            this.viewModel.list.options.sort_dir = "asc";
            this.storage.sortDir = "asc";
        }
            this.navigateToList();
      });

      $('.searchfield').on("keyup", (e) => {
        this.searchVal = $(e.target).val();
        this.runSearch();
      });

      console.log(`${this.viewType} list events bound`);
  
  }
  runSearch() {
    //TODO only set filter and reload page if more than one character has been typed
    //you can use the 'this.searchWaiter' timeout variable declared in constructor
    //make sure you clear the timeout before setting it again.
    this.searchWaiter = 2000;

    if ($('.searchfield').val().length > 1){
      setTimeout(() => {
        //set the storage.filterStr and storage.filterCol values
        if ($('.searchfield').val()){
          this.storage.filterStr = $('.searchfield').val();
          this.storage.filterCol = this.storage.sortCol;
          //call the navigateToList() function (located in view.js)
          this.navigateToList();
        }
      }, this.searchWaiter);
    }
    this.searchWaiter = 0;
  }

  async deleteListItem(id) {
    if (await this.storage.delete(id)){
    } else {
      //call this.render() when done to reload list
      this.render();
    }
  }

  toggleSortDirection(){
    if (this.viewModel.list.options.sort_dir == "asc"){
       this.storage.sortDir = "desc";
       this.viewModel.list.options.sort_dir = "desc";
    } else {
       this.viewModel.list.options.sort_dir = "asc";
       this.storage.sortDir = "asc";
    }
}

}