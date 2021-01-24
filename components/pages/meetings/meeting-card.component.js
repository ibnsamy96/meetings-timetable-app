export const MeetingCardComponent = {
    render: (meetingInfo = {}) => {
        console.table(meetingInfo);
        return `
        <div class="col">
            <div class="p-3 meetingCard primaryBoxShadow mx-2 ${meetingInfo.isFinal?'final':'notFinal'}">
            
            <p class = "h4 fw-normal m-0 p-0 text-center">${meetingInfo.teamCode}</p>
            
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