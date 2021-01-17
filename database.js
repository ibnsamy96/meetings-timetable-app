const databaseApi = "https://ma3an-apps-default-rtdb.firebaseio.com/meetings-organizing";

// const meetingsEndPoint = "meetings.json"

const endPoints = {
    teams: "teams.json",
    meetings: "meetings.json"
}

export const getData = async (url = databaseApi) => {
    const request = await fetch(url, {
        mode: "no-cors",
        method: "GET"
    });

    return request.json();
};

export const postData = async (url = databaseApi, data = {}) => {
    const request = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        mode: "no-cors",
        credentials: "same-origin",
    });

    return request.json();
};