import {
    getMeetings
} from "../../../database.js";

import {
    MeetingCardComponent
} from "./meeting-card.component.js";

let meetingsDashboardComponent;


const showLoadingCards = () => {

    const elementExistenceInterval = setInterval(() => {
        meetingsDashboardComponent = document.querySelector('#meetings-dashboard')
        console.log(1);
        if (meetingsDashboardComponent) {

            for (let i = 0; i < 6; i++) {

                const cardComponent = document.createElement('div')
                meetingsDashboardComponent.appendChild(cardComponent)
                cardComponent.outerHTML = MeetingCardComponent.renderLoading()
                console.log(i);
            }
            clearInterval(elementExistenceInterval)
        }
    }, 1)

}


export const initializeDashboard = async () => {

    showLoadingCards()

    const meetingsArrayOfObjects = await getMeetings()

    console.log(await meetingsArrayOfObjects);

    getMeetings().then((data) => {
        console.log(data);
    })

    let meetingsHTML = '';

    meetingsArrayOfObjects.forEach(meetingInfo => {
        meetingsHTML = meetingsHTML + MeetingCardComponent.render(meetingInfo)
    });

    meetingsDashboardComponent.innerHTML = meetingsHTML

}