const databaseApi = "https://ma3an-apps-default-rtdb.firebaseio.com/meetings-timetable/";



const endPoints = {
    loginInfo: 'login-info.json',
    teams: "teams.json",
    meetings: "meetings.json"
}

const getData = async (url = databaseApi) => {
    const response = await fetch(url, {
        mode: "no-cors",
        method: "GET"
    });
    console.log(await response);
    const jsonResponse = await response.json();
    return jsonResponse
};

const postData = async (url = databaseApi, data = {}, userToken) => {
    const response = await fetch(`${url}?auth=${userToken}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
    });

    const jsonResponse = await response.json();

    return jsonResponse
};

/*
loginInfo
{
    "userId": "e324511434rer",
    "userName": "Mahmoud Ibn Samy",
    "userEmail": "kazakaza@gmail.com",
    "loginTime": 1610902493,
}
*/


export const postLoginInfo = async (user, userToken) => {
    const userId = user.uid;
    const userName = user.email;
    const userEmail = user.displayName;
    const loginTime = new Date();
    const userLoginInfo = {
        userId,
        userName,
        userEmail,
        loginTime
    }
    const loginEndpointUrl = databaseApi + endPoints.loginInfo
    await postData(loginEndpointUrl, userLoginInfo, userToken)
    console.log('Your logging data is saved.');
}



/*
teams - methods: get - pages: get@new_meeting_page
{
    "creatorId": "e324511434rer",
      "creatorName":"Mahmoud Ibn Samy",
      "creatorEmail":"kazakaza@gmail.com",
      "creationTime":1610902493,
      "branch":"gam3a",
      "branchName":"الجامعة",
      "team":"ta3alom",
      "teamName":"إيفنت التعلّم"
      "isSubteamsExist":true,
      "subteam":"tawasol",
      "subteamName":"التواصل",
      "members":[
          "mahmoud samy"
      ]
  }

*/

// export const postNewTeam = async (team, userToken) => {
//     const userId = user.uid;
//     const userName = user.email;
//     const userEmail = user.displayName;
//     const loginTime = new Date();
//     const userLoginInfo = {
//         userId,
//         userName,
//         userEmail,
//         loginTime
//     }
//     const loginEndpointUrl = databaseApi + endPoints.loginInfo
//     await postData(loginEndpointUrl, userLoginInfo, userToken)
//     console.log('Your logging data is saved.');
// }

/*
meetings - methods: get & post - pages: post@new_meeting_page & get@meetings_home_page
{
  "creatorId": "e324511434rer",
	"creatorName":"Mahmoud Ibn Samy",
	"creatorEmail":"kazakaza@gmail.com",
	"creationTime":1610902493,
	"branch":"gam3a",
	"branchName":"الجامعة",
	"team":"ta3alom",
	"teamName":"إيفنت التعلّم"
	"areSubTeamsExist":true,
	"subTeam":"tawasol",
	"subTeamName":"التواصل",
	"date":"25-11-2021",
	"time":"05:00-07:30"
	"members":[
		"mahmoud samy"
	]
}

*/