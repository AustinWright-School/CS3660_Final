var playerViewModel= {
    apiName:"players",    //new, we use this to determine api to call
    list: {
        
        //You can use these as default options for your calls to your REST Service 'list' function
        options: {
            sort_col:"first_name",
            sort_dir:"asc",
            limit: null,
            offset:null,
            filter_col: null,
            filter_str: null,
            is_lookup:null,
            alt_table:null       
            },
        listButtonId: "playerButton",   //button id for players list, use while rendering list dynamicall
        listTitle: "Player List",    //title above list
        templateUrl: "js/views/templates/list_template.ejs",  //path to lodash template
        id: "player-list",
        tableClasses:"table table-striped"   //bootstrap classes to apply to my table
    },
    //The following can be used in rendering your form
    //dynamic rendering via lodash is recommended, but not required for the final
    form: {
        id: "my-form",
        addFormTitle: "Add Player",
        createFormTitle: "Create Player",
        deleteTitle: "Delete Player",
        editFormTitle: "Edit Player",
        actionUrl:"",
        method: "POST",
        lookupName: "players",
        suppressSubmit: true,
        templateUrl: "js/views/templates/form_template.ejs"
    },
    //Meta data for fields.  You can use for rendering your list dynamically.
    //if 'list' is true, then you should render this field in your list
    fields: [
       
        {
            label: "First Name",
            name: "first_name",
            inputType: "text",
            placeholder: "Enter your first name here",
            list: true,
            value: null,
            //as you can see,this player meta data could easily be used to dynamically validate your form
            validation: {
                required: true,
                requiredMessage: "Last name is required!"
            }
        },
        {
            label: "Last Name",
            name: "last_name",
            inputType: "text",
            placeholder: "Enter your last name here",
            list: true,
            validation: {
                required: true,
                requiredMessage: "Last name is required!"
            }
        },
        {
            label: "Team",
            name: "team_id",
            inputType: "select",
            list:true,
            placeholder: "Select a Team",
            //lookupName is the table you will be using on the backend to return a list of 'options' for your
            //select box
            lookupName: "teams",
            validation: {
                required: true
            }
        },
        
        {
            label: "User Name",
            name: "user_name",
            inputType: "text",
            placeholder: "Enter your user name here",
            list: false,
            validation: {
                required: true,
                requiredMessage: "User name is required!"
            }
        },

        {
            label: "Address",
            name: "address1",
            inputType: "text",
            list: false,
            placeholder: "Enter your address name here",
            validation: {
                required: true,
                requiredMessage: "Address is required!"
            }
        },
        {
            label: "Address 2",
            name: "address2",
            inputType: "text",
            placeholder: "Enter your address name here",
            list: false,
            validation: {
                required: false
            }
        },
        {
            label: "City",
            name: "city",
            inputType: "text",
            placeholder: "Enter your city name here",
            list: false,
            validation: {
                required: true,
                requiredMessage: "City is required!"
            }
        },
        {
            label: "State",
            name: "state",
            inputType: "text",
            placeholder: "Enter your state name here",
            list: false,
            validation: {
                required: true,
                requiredMessage: "State is required!"
            }
        },
        {
            label: "Zip",
            name: "zip",
            inputType: "text",
            placeholder: "Enter your zip code here",
            list: false,
            validation: {
                required: true,
                requiredMessage: "Zip Code is required!",
                regex: /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/
            }
        },
        {
            label: "Email Address",
            name: "email",
            inputType: "email",
            placeholder: "Enter your email here",
            list: false,
            validation: {
                required: true,
                requiredMessage: "Email Address is required!",
                invalidMessage: "Invalid Email address",
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            }
        },
        {
            label: "Phone Number",
            name: "phone",
            inputType: "text",
            placeholder: "Enter your phone number here",
            list: true,
            validation: {
                required: true,
                requiredMessage: "Phone Number is required!",
                invalidMessage: "Invalid Phone Number",
                regex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
            }
        },
        {
            label: "Password",
            name: "password",
            inputType: "password",
            placeholder: "Enter your Password",
            list: false,
            validation: {
                required: true,
                requiredMessage: "Password!",
                invalidMessage: "Invalid Password-must have 1 upper case, 1 lower case, 1 number, and min 8 chars",
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/im
            }
        },{
            label: "Notes",
            name: "notes",
            inputType: "text",
            placeholder: "Enter your Notes",
            list: false,
            validation: {
                required:false
            }
        }
    
    ],
    mockListData: [
        {
            "id": 1,
            "first_name": "Kensdffdsf(MOCK)",
            "last_name": "Jensonsdfsfs",
            "address1": "ksdf",
            "address2": "lsdkfjs",
            "notes": "lsdkfjdsl",
            "city": "sldfkj",
            "state": "",
            "zip": "56",
            "team_id": 4,
            "email": "ken@ken.com",
            "phone": "801-333-4444",
            "password": "fgfdgf",
            "user_name": "ksdjflskjs",
            "license_level_id": 1,
            "person_type": "player"
        },
        {
            "id": 2,
            "first_name": "Benneeeee(MOCK)",
            "last_name": "JensonccvxcvasdfsdFFFFFFFFsdfsf",
            "address1": "sadfasdfsf",
            "address2": "Apt. 3",
            "notes": "My notesasdfas",
            "city": "Orem",
            "state": "UT",
            "zip": "54",
            "team_id": 4,
            "email": "benjenson@gmail.com",
            "phone": "801-333-4444",
            "password": "K3nny_jay",
            "user_name": "sdfsdxcvxvxcvxv",
            "license_level_id": 1,
            "person_type": "player"
        },
        {
            "id": 5,
            "first_name": "Jen(MOCK)",
            "last_name": "Jenson",
            "address1": "1527 N. 230 w.",
            "address2": "Apt. 3",
            "notes": "My notes",
            "city": "Orem",
            "state": "UT",
            "zip": "1",
            "team_id": 4,
            "email": "j.jenson@gmail.com",
            "phone": "801-333-4444",
            "password": "mypassword",
            "user_name": "jjenson",
            "license_level_id": 1,
            "person_type": "player"
        },
        {
            "id": 9,
            "first_name": "Hannah (MOCK)",
            "last_name": "Jenson",
            "address1": "1527 N. 230 w.",
            "address2": "Apt. 3",
            "notes": "My notes",
            "city": "Orem",
            "state": "UT",
            "zip": "1",
            "team_id": 4,
            "email": "hjenson@gmail.com",
            "phone": "801-333-4444",
            "password": "mypassword",
            "user_name": "hjenson",
            "license_level_id": 1,
            "person_type": "player"
        },
        {
            "id": 11,
            "first_name": "Zee (MOCK)",
            "last_name": "Downs (MOCK)",
            "address1": "asdf",
            "address2": "asdf",
            "notes": "dfasdf",
            "city": "Orem",
            "state": "UT",
            "zip": "54",
            "team_id": 4,
            "email": "kennethjenson@gmail.com",
            "phone": "",
            "password": "K3nnyjay",
            "user_name": "Kjenson",
            "license_level_id": 1,
            "person_type": "player"
        }
    ],
    mockFormData:{
        "id": 5,
        "first_name": "Jen",
        "last_name": "Jenson",
        "address1": "1527 N. 230 w.",
        "address2": "Apt. 3",
        "notes": "My notes",
        "city": "Orem",
        "state": "UT",
        "zip": "1",
        "team_id": 4,
        "email": "j.jenson@gmail.com",
        "phone": "801-333-4444",
        "password": "mypassword",
        "user_name": "jjenson",
        "license_level_id": 1,
        "person_type": "player"
    },
    mockLookupData: {
        
        teams: [{
            "label": "Sweet Team",
            "value": 4
        }, {
            "label": "Sweet Teamv2",
            "value": 5
        }, {
            "label": "BarnstormerssdfdsfsFFFFFFFFFFGG",
            "value": 6
        }, {
            "label": "q Team",
            "value": 8
        }, {
            "label": "j Team",
            "value": 9
        }, {
            "label": "k Team",
            "value": 11
        }, {
            "label": "p Team",
            "value": 12
        }, {
            "label": "s Team",
            "value": 13
        }, {
            "label": "Barnstormers",
            "value": 14
        }]
    }
}