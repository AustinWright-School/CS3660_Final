/* App View Model-contains application level meta data */
var appViewModel= {
    defaultHash:"#teams",    //default hash to load when hitting root
    containerId:"app_content",  //id of container for rendering content
    isMock: false,
    localEndPoint:"localhost:8080",
    remoteEndPoint:"localhost:8080",    //your beanstalk deploy if applicable
    formTemplateUrl: "js/views/templates/form_template.ejs",
    listTemplateUrl: "js/views/templates/list_template.ejs",
    isLocal:true            // set to false if you want to use beanstalk

}