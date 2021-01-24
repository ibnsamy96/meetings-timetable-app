export const MeetingCardComponent = {
    render: (meetingInfo = {}) => {
        return `
        <div class="col">
            <div class="p-3 border bg-light">${meetingInfo.time}</div>
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