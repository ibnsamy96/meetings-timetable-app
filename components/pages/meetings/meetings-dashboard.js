import {
    getMeetings
} from "../../../database.js";

import {
    MeetingCardComponent
} from "./meeting-card.component.js";

let meetingsDashboardRow;


const showLoadingCards = () => {

    console.log('hi from show');


    const elementExistenceInterval = setInterval(() => {
        meetingsDashboardRow = document.querySelector('#meetingsDashboard .row')
        if (meetingsDashboardRow) {
            meetingsDashboardRow.innerHTML = ''
            for (let i = 0; i < 4; i++) {
                const cardComponent = document.createElement('div')
                meetingsDashboardRow.appendChild(cardComponent)
                cardComponent.outerHTML = MeetingCardComponent.renderLoading()
                console.log(i);
            }
            clearInterval(elementExistenceInterval)
        }
    }, 1)

}


export const initializeDashboard = async () => {

    console.log('hi from init');

    showLoadingCards()

    let meetingsArrayOfObjects = await getMeetings()

    // console.table(meetingsArrayOfObjects);

    const closeTeamDataElement = document.querySelector('#closeTeamData')
    closeTeamDataElement.style.right = '-' + getComputedStyle(closeTeamDataElement).getPropertyValue('width')
    console.log(getComputedStyle(closeTeamDataElement).getPropertyValue('width'));

    let meetingsHTML = '';

    meetingsArrayOfObjects.forEach(meetingInfo => {
        meetingsHTML = meetingsHTML + MeetingCardComponent.render(meetingInfo)
    });

    meetingsDashboardRow.innerHTML = meetingsHTML

}

export const getTeamMembers = (chosenMeeting) => {
    // method to get team members and return them as an array of names
}