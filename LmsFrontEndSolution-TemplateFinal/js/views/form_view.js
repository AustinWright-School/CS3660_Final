/* FormView class 
This class integrates your FormService.js from Framework 3 into a new FormView class which includes view rendering code as well as your validation code
*/
class FormView extends View {
  "use strict"
  constructor(viewModel, appViewModel, storageService) {

    super(viewModel, appViewModel, storageService);

    this.formId = viewModel.form.id;
    this.method = viewModel.form.method;
    this.templateUrl=appViewModel.formTemplateUrl;
    this.mockData=viewModel.mockFormData;
    this.currentItemId=null;
    this.formChanged=false;
    this._data=[];
  }
  set submitMethod(method) {
    this.method = method;
  }
  get $form() {
    return $("#" + this.formId);
  }
  get form() {
    return this.$form.get(0);
  }
  get formValid() {
    return this.form.checkValidity();
  }
  get $inputs() {
    return $("#" + this.formId + " :input");
  }

  async getData(options = {}) {
    this._data = [];
    if (this.appViewModel.isMock){
      this._data= this.viewModel.mockFormData;
    }
    else{
      //1.  If this.currentItemId isn't null
      if (this.currentItemId) {
        // call RestStorageApi  'get' function to get the item and initialize this._data;
        this._data = await this.storage.get(this.currentItemId);
      } else {
        //2.  Otherwise,  set this._data to an empty array
        this._data = [];
      }
      //3.  Since this is an async function, you can call the api using 'await'
    }
    return this._data;
  }

  async edit(id) {     //'edit' action, called from appController
    this.currentItemId = id;
    await this.render();  //see view.js 'render' method
  }
  async create() {      //'create' action, called from appController
    this.currentItemId = null;
    await this.render();   //see view.js 'render' method
  }

  detachEvents() {
    
      //TODO-Insert your event detach code from Framework 3
      $("form.needs-validation").submit().off();
      $(".form-control").change().off();

    console.log(`${this.apiName} form events detach called`)
  }
  
  bindEvents() {
     //TODO-Insert your event creation code from Framework 3
     //remember, this also includes setting the 'novalidate' attribute was well as setting 'action' and 'method' attributes
     //ADD A CANCEL BUTTON TO YOUR FROM and EVENT HANDLER HERE
     //Cancel should check whether the form has been changed, and confirm with the user if so, otherwise, just redirect to list

     $("form.needs-validation").submit((event) => this.submit(event));
     $("form.needs-validation").attr('novalidate', 'novalidate');
     $(".form-control").change((event) => this.change(event));
     $("#reset").click((ev) => this.reset(ev));
     //add 'novalidate' property to form
    
    console.log(`${this.apiName} form events bound`);

  }

  reset = ev => {
    if (this.formChanged) {
      if (confirm("Stop! Are you sure that you would like to reset the form, and loose all changes?")) {
        this.render();
      }
    }
  }

  submit = ev => {
    //TODO-Insert your submit code from Framework 3
    ev.preventDefault();
    
    if (!this.validateForm()) return;

    //TODO-IN ADDITION, you need to:
    //1.  grab the form data from the form (getFormData utility method)
    //2.  If this.currentItemId isn't null, call RestStorageApi  'update' function to update your object
    if (this.currentItemId){
      this.storage.update(this.currentItemId, this.getFormData());
    } else {
      this.storage.create(this.getFormData());
    }
    //3.  Otherwise,  call the 'create' function to create a new object.
    //4.  The promise pattern is a good one to use here since you are calling an 'async' function from a 'non-async' function.
    //5.  When done,  navigate back to the Team or Player list.
    
  }

  getFormData() {
    //TODO:  return the form data that needs to be posted to the server (any data with 'name' element)-------------------------------------------------------------------
    //reference: https://gomakethings.com/serializing-form-data-with-the-vanilla-js-formdata-object/

    var objtoreturn = {};
    this.viewModel.fields.forEach(field => {
      objtoreturn[field.name] = $(`#${field.name}`).val();
    });
    if (this.apiName === "teams") objtoreturn.league_id = 1;
    return objtoreturn;
  }

  change = ev => {
    //TODO-Insert your code from Framework 3
    if (!this.formChanged) this.formChanged = true;

    var element = ev.currentTarget;
    this.validateField($(element));
  }

  validateForm() {
    //TODO-Insert your code from Framework 3
    var validationSuccess = true;
    for (var field of this.viewModel.fields) {
      if (field.validation.required) 
          if (this.validateRequired($("#" + field.name), field.validation.requiredMessage)){
            if (field.validation.regex)
              if (this.validateRegex($("#" + field.name), field.validation.regex, field.validation.invalidMessage)){
                if (field.validation.matchEl) 
                  if (this.validatePassword($("#" + field.name), field.validation)){
                  } else {
                    validationSuccess = false;
                  }
              } else {
                validationSuccess = false;
              }
          } else {
            validationSuccess = false;
          }
   }

   this.formValidated();
   return validationSuccess;
  }

  validateField($el) {
    //TODO-Insert your code from Framework 3
    let validationAttrs = this.getFieldViewModel($el.attr("name"));

    if (!validationAttrs) {
        console.log("No validation attributres were found for the field.");
        return;
    }

    if (validationAttrs.validation.required) 
        if(this.validateRequired($el, validationAttrs.validation.requiredMessage))
    if (validationAttrs.validation.regex) 
        if(this.validateRegex($el, validationAttrs.validation.regex, validationAttrs.validation.invalidMessage))
    if (validationAttrs.validation.matchEl) 
        if(this.validatePassword($el, validationAttrs.validation));

    this.fieldValidated($el.get(0));
  }

  validateModel(model) {
    //TODO-Insert your code from Framework 3-------------------------------------------------------------------------------------------------------------
  }

  validatePassword($field, view) {
    //TODO-Insert your code from Framework 3, although note that we will not be validating 'repeat' passwords
    if ($field.val() == $("#" + view.matchEl).val()){
      $field.parent().find("div").text(view.mismatchMessage);
      $("#" + view.matchEl).parent().find("div").text(view.mismatchMessage);
      this.setValidity($field.get(0), true, "");
      this.setValidity($("#" + view.matchEl).get(0), true, "");
      return true;
    } else {
      $field.parent().find("div").text(view.mismatchMessage);
      $("#" + view.matchEl).parent().find("div").text(view.mismatchMessage);
      this.setValidity($field.get(0), false, view.mismatchMessage);
      this.setValidity($("#" + view.matchEl).get(0), false, view.mismatchMessage);
      return false;
    }
  }

  validateRequired($field, message) {
    //TODO-Insert your code from Framework 3
    if ($field.val().length > 0){
      $field.parent().find("div").text(message);
      this.setValidity($field.get(0), true, "");
      return true;
    } else {
      $field.parent().find("div").text(message);
      this.setValidity($field.get(0), false, message);
      return false;
    }
  }

  validateRegex($field, regex, message) {
    //TODO-Insert your code from Framework 3
    if (regex.test($field.val())){
      $field.parent().find("div").text(message);
      this.setValidity($field.get(0), true, "");
      return true;
    } else {
      $field.parent().find("div").text(message);
      this.setValidity($field.get(0), false, message);
      return false;
    }
  }

  setValidity(el, isValid, message) {
    //TODO-Insert your code from Framework 3
    if (isValid) {
      el.setCustomValidity("");
    } else {
      el.setCustomValidity(message);
    }
  }

  getFieldViewModel(getId) {
    //TODO-Insert your code from Framework 3
    return this.viewModel.fields.find(field => field.name == getId);
  }

  getElByName(name) {
    let el = $("form [name='" + name + "']");
    return el;
  }
  getEventEl(ev) {
    return $(ev.currentTarget);
  }

  setFieldErrorMessage(el, msg) {
    $(el).closest("div").children(".invalid-feedback").html(msg);
  }
  fieldValidated(el) {
    $(el).closest("div").addClass("was-validated");
  }

  formValidated() {
    this.$form.addClass("was-validated");
  }
}