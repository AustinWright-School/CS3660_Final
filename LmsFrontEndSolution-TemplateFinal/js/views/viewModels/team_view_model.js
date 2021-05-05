var teamViewModel = {
    apiName: "teams",
   
    list: {

        options: {
            sort_col: "name",
            sort_dir: "asc",
            limit: null,
            offset: null,
            filter_col: null,
            filter_str: null,
            is_lookup: null,
            alt_table: null
        },
        listTitle: "Team List",
        listButtonId: "teamButton",
       
        id: "my-list",
        tableClasses: "table table-striped"
    },
    form: {
        id: "team-form",
        addFormTitle: "Add Team",
        createFormTitle: "Create Team",
        deleteTitle: "Delete Team",
        editFormTitle: "Edit Team",
        actionUrl: "",
        method: "POST",
        lookupName: "teams",
        suppressSubmit: true,
        
    },
    fields: [

        {
            label: "Team Name",
            name: "name",
            inputType: "text",
            placeholder: "Enter your Team name here",
            list: true,
            value: null,
            validation: {
                required: true,
                requiredMessage: "Team Name is required"
            }
        },
        {
            label: "Coach",
            name: "coach_id",
            inputType: "select",
            placeholder: "Select a Coach",
            lookupName: "coaches",
            list: true, //you'll need to display the name of the selected coach in the list
            defaultVal: 0, //default value for dropdown, usually the value that matches 'Select a Coach'
            validation: {
                required: true,
                requiredMessage: "Coach is required"
            }
        },

        {
            label: "Team Notes",
            name: "notes",
            inputType: "text",
            placeholder: "Team Notes",
            list: true,
            value: null,
            validation: {
                required: false,

            }
        }
    ],
    mockFormData:{
        "id": 5,
        "name": "Sweet Teamv2",
        "coach_id": 2,
        "league_id": 1,
        "notes": "my new notessdfadsfadsas"
    },
    mockListData: [{
            "id": 4,
            "name": "Sweet Team (MOCK)",
            "coach_id": 2,
            "league_id": 2,
            "notes": "my new notes"
        },
        {
            "id": 5,
            "name": "Sweet Teamv2(MOCK)",
            "coach_id": 2,
            "league_id": 1,
            "notes": "my new notessdfadsfadsas"
        },
        {
            "id": 6,
            "name": "BarnstormerssdfdsfsFFFFFFFFFFGG(MOCK)",
            "coach_id": 15,
            "league_id": 1,
            "notes": "adfdasfasaadfadsfsdfsfsdfsfFFFdfgdg(MOCK)"
        },
        {
            "id": 8,
            "name": "q Team(MOCK)",
            "coach_id": 55,
            "league_id": 1,
            "notes": "incubate enterprise users"
        },
        {
            "id": 9,
            "name": "j Team(MOCK)",
            "coach_id": 55,
            "league_id": 1,
            "notes": "repurpose FFFFFFFFFF"
        },
        {
            "id": 11,
            "name": "k Team(MOCK)",
            "coach_id": 57,
            "league_id": 1,
            "notes": "generate global interfaces"
        },
        {
            "id": 12,
            "name": "p Team(MOCK)",
            "coach_id": 2,
            "league_id": 1,
            "notes": "recontextualize back-end infrastructures"
        },
        {
            "id": 13,
            "name": "s Team(MOCK)",
            "coach_id": 18,
            "league_id": 1,
            "notes": "whiteboard open-source e-tailers"
        },
        {
            "id": 14,
            "name": "Barnstormers(MOCK)",
            "coach_id": 15,
            "league_id": 1,
            "notes": "harness global communitiesasdfdFFFFFFFsdfsdfg"
        }
    ],
    mockLookupData: {
        coaches: [{
            "label": "Kensdffdsf Jensonsdfsfs",
            "value": 1
        }, {
            "label": "Benneeeee JensonccvxcvasdfsdFFFFFFFFsdfsf",
            "value": 2
        }, {
            "label": "Jen Jenson",
            "value": 5
        }, {
            "label": "Hannah Jenson",
            "value": 9
        }, {
            "label": "Zee Downs",
            "value": 11
        }, {
            "label": "Katheryn Farrell",
            "value": 12
        }, {
            "label": "Geovany Rempel",
            "value": 13
        }, {
            "label": "Malvina Gibson",
            "value": 15
        }, {
            "label": "Ena Schamberger",
            "value": 17
        }, {
            "label": "Mohammad Cole",
            "value": 18
        }, {
            "label": "Elisabeth Schulist",
            "value": 20
        }, {
            "label": "Granville Romaguera",
            "value": 22
        }, {
            "label": "Silas Hodkiewicz",
            "value": 24
        }, {
            "label": "Sammy Lubowitz",
            "value": 25
        }, {
            "label": "Marcelino Fahey",
            "value": 26
        }, {
            "label": "Daphnee West",
            "value": 28
        }, {
            "label": "Mariam Gottlieb",
            "value": 29
        }, {
            "label": "Evie Gottlieb",
            "value": 30
        }, {
            "label": "Harley Blick",
            "value": 31
        }, {
            "label": "Zion Towne",
            "value": 32
        }, {
            "label": "Reuben Bahringer",
            "value": 34
        }, {
            "label": "Nora Heathcote",
            "value": 35
        }, {
            "label": "Bill Boyle",
            "value": 36
        }, {
            "label": "Janick Towne",
            "value": 37
        }, {
            "label": "Leta Emard",
            "value": 38
        }, {
            "label": "Keely Crooks",
            "value": 39
        }, {
            "label": "Judd Von",
            "value": 40
        }, {
            "label": "Toby Harvey",
            "value": 41
        }, {
            "label": "Tia Lindgren",
            "value": 43
        }, {
            "label": "Jillian McLaughlin",
            "value": 47
        }, {
            "label": "Mae Gorczany",
            "value": 49
        }, {
            "label": "Sedrick Gusikowski",
            "value": 51
        }, {
            "label": "Marietta Nikolaus",
            "value": 53
        }, {
            "label": "Kira Leannon",
            "value": 55
        }, {
            "label": "Fidel Durgan",
            "value": 57
        }, {
            "label": "Willa Hettinger",
            "value": 59
        }, {
            "label": "Eldora Conroy",
            "value": 61
        }, {
            "label": "Charlie Lubowitz",
            "value": 63
        }, {
            "label": "Johnpaul Rogahn",
            "value": 65
        }, {
            "label": "Kenny Jenson",
            "value": 71
        }],
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