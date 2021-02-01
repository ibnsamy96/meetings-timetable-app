export const MeetingCardComponent = {
    render: (meetingInfo = {}) => {
        console.log(meetingInfo);
        const minorTeamName = meetingInfo.subTeam ? meetingInfo.subTeam : meetingInfo.teamCode
        const majorTeamName = meetingInfo.subTeam ? meetingInfo.teamCode + ' - ' + meetingInfo.branchCode : meetingInfo.branchCode

        return `
        <div class="col">
            <div onclick="toggleTeamData({chosenMeeting:${meetingInfo.id},openIt:${true}})" class="p-3 meetingCard primaryBoxShadow mx-3 ${meetingInfo.isFinal?'final':'notFinal'}">
            
            <p class = "h4 fw-normal m-0 p-0 text-center">يوم ${meetingInfo.date}</p>
            <p class = "h5 fw-normal m-0 p-0 text-center">من الساعة ${meetingInfo.time.split("-")[0]}</p>
            <p class = "h5 fw-normal m-0 p-0 text-center">حتى ${meetingInfo.time.split("-")[1]}</p>
            <p class = "h6 fw-normal m-0 p-0 text-center">تيم الـ ${minorTeamName}</p>
            <p class = "h6 fw-normal m-0 p-0 text-center">${majorTeamName}</p>

            </div>
        </div>
        `
    },
    renderLoading: () => {
        return `
        <div class="col">
        <div class="p-3 border bg-light">loading</div>
        </div>
          `
    }
}