/* class View - Parent class for FormView and ListView classes
Contains common functions shared by the subclasses. */
class View {
  constructor(viewModel, appViewModel, storageService) {
    this.storage = storageService;
    this.viewModel = viewModel;
    
    this.templateUrl = null;  //overridden
    this.containerId = appViewModel.containerId;
    this.appViewModel=appViewModel;
    
    this.apiName = viewModel.apiName;
   
    this.templateHtml = null;  //temp to hold template html, no need to retrieve twice
    this._data = [];
    this.mockData=null;
  }
  get $container() {
    return $("#" + this.containerId);
  }
  async getData(options) { //abstract function, overridden by subclassess

  }
  async render(options) {
    await this.renderTemplate(options);
}
  /* render Template is the same for both forms and views */
  async renderTemplate(options) {
    this.detachEvents();

    this.$container.empty().hide();  //empty and hide container
    if (this.appViewModel.isMock){
      this._data = this.mockData;
    }
    else{
      this._data = await this.getData(options);
    }
    
    
    if(!this.viewModel.isMock){
      await this.populateLookups();
     }
    //render the list
    let template = await this.getTemplateHtml();

    //render ejs template passing in 'this' as the 'view'
    //this will allow you to utilize view class functions in your template rendering
    let html = ejs.render(template, {
      view: this
    });
    this.$container.html(html);

    // animate it
    this.$container.slideDown();

    this.bindEvents(this._data);
  }

  async getTemplateHtml() {
    //get template html, cache once so you don't need to load again
    if (!this.templateHtml) {
      this.templateHtml = await $.get(this.templateUrl);
    }
    return this.templateHtml;

  }
  detachEvents() {}
  bindEvents() {};


  async populateLookups() {
    for (let field of this.viewModel.fields) {
      if ("lookupName" in field) {
        await this.storage.getLookup(field.lookupName);
      }
    }
  }
  getFieldValue(fieldView, fieldData, label = false) {
    if ("lookupName" in fieldView) {
      let searchValue = fieldData[fieldView.name];
      let data = this.storage.lookups[fieldView.lookupName].find(obj => obj.value == searchValue);
      if (data === undefined)
        return null;
      else {
        return label ? data.label : data.value;
      }
    } else {
      return fieldData[fieldView.name];
    }
  }

  getLookup(lookupName, id) {
    const lookups = this.storage.lookups;
    if (lookups) {
      const lookupArrByName = lookups[lookupName];
      if (lookupArrByName) {
        const lookupObj = lookupArrByName.find(l => l.id === id);
        if (lookupObj) {
          if ("name" in lookupObj) return lookupObj.name;
          return `${lookupObj.first_name} ${lookupObj.last_name}`;
        }
      }
    }
    return null;
  }
  navigateToList(){
    //make sure you include current query string params when you redirect
    let queryString=this.storage.getQueryString(this.storage.model.options);

    window.location.hash=`#/${this.apiName}${queryString}`;
  }
}