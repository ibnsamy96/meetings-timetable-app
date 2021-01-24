import {
	restoreUserToken
} from "./auth.js";

const databaseApi = "https://ma3an-apps-default-rtdb.firebaseio.com/meetings-timetable/";



const endPoints = {
	loginInfo: 'login-info.json',
	teams: "teams.json",
	meetings: "meetings.json"
}

const getData = async (url = databaseApi, {
	userToken,
	cacheStatus
}) => {
	const headers = {
		'pragma': 'no-cache',
		'cache-control': 'no-cache'
	}
	const response = await fetch(`${url}?auth=${userToken}`, {
		method: 'GET',
		headers,
	});
	const jsonResponse = await response.json();
	return jsonResponse
};

const postData = async (url = databaseApi, {
	data,
	userToken
}) => {
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


export const postLoginInfo = async (user) => {
	const userId = user.uid;
	const userToken = restoreUserToken()
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
	await postData(loginEndpointUrl, {
		data: userLoginInfo,
		userToken
	})
	console.log('Your logging data is saved.');
}



/*
teams - methods: get - pages: get@new_meeting_page
{
    "creatorId": "e324511434rer",
	"creatorName":"Mahmoud Ibn Samy",
	"creatorEmail":"kazakaza@gmail.com",
	"creationTime":1610902493,
	"branchCode":"tarbya",
	"branchName":"تربية",
	"teamCode":"pr",
	"teamName":"العلاقات العامة",
	"subteam":null,
	"members":[
		"Mahmoud Samy"
	]
}
{
    "creatorId": "e324511434rer",
	"creatorName":"Mahmoud Ibn Samy",
	"creatorEmail":"kazakaza@gmail.com",
	"creationTime":1610902493,
	"branchCode":"gam3a",
	"branchName":"الجامعة",
	"teamCode":"ta3alom",
	"teamName":"إيفنت التعلّم",
	"subteam":{
		"teamCode":"tawasol",
		"teamName":"التواصل",
		"subteam":null,
		"members":[
			"Mahmoud Samy"
		]
	},
	"members":null
}

*/

export const getTeams = async () => {
	// database has branches not teams
	const teamsEndpointUrl = databaseApi + endPoints.teams
	const userToken = restoreUserToken()
	const teamsJson = await getData(teamsEndpointUrl, {
		userToken,
		cacheStatus: true
	}) // {team1Id:{team1Value},team2Id:{teamValue} ...}
	const teamsJsonIds = Object.keys(teamsJson) // ids of all teams
	const teamsData = teamsJsonIds.map(branchId => {
		// returned value -> {team1Id,team1Value}
		return {
			branchId,
			...teamsJson[branchId]
		}
	})
	return teamsData // teamData -> [{team1Id,team1Value},{team2Id,team2Value} ...]
	// TODO make getting teams saved to local storage at the first time
}

/*
meetings - methods: get & post - pages: post@new_meeting_page & get@meetings_home_page
{
    "creatorId": "e324511434rer",
	"creatorName":"Mahmoud Ibn Samy",
	"creatorEmail":"kazakaza@gmail.com",
	"creationTime":1610902493,
	"branchCode":"gam3a",
	"branchName":"الجامعة",
	"teamCode":"ta3alom",
	"teamName":"إيفنت التعلّم"
	"subteam":{
		"teamCode":"tawasol",
		"teamName":"التواصل",
		"subteam":null,
	},
	"date":"25-11-2021",
	"time":"05:00-07:30",
	"members":[
		"mahmoud samy"
	],
    isFinal:true
}

*/

export const getMeetings = async () => {
	let MeetingsEndpointUrl = databaseApi + endPoints.meetings
	let userToken = restoreUserToken()
	let meetingsJson = await getData(MeetingsEndpointUrl, {
		userToken,
		cacheStatus: false
	}) // {meeting1Id:{meeting1Value},meeting2Id:{meeting2Value} ...}
	let meetingsJsonIds = Object.keys(meetingsJson) // ids of all meetings
	let meetingsArrayOfObjects = meetingsJsonIds.map(meetingId => {
		// returned value -> {meeting1Id,meeting1Value}
		return {
			meetingId,
			...meetingsJson[meetingId]
		}
	}).reverse() // we reverse it to get the latest at the first in the dashboard
	return meetingsArrayOfObjects // meetingData -> [{meeting2Id,meeting2Value}, {meeting1Id,meeting1Value} ...]

}

export const postMeeting = async (meetingInfoJson) => {
	const MeetingsEndpointUrl = databaseApi + endPoints.meetings
	const userToken = restoreUserToken()
	await postData(MeetingsEndpointUrl, {
		data: meetingInfoJson,
		userToken
	})
}