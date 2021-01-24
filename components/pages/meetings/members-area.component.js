export const MembersAreaComponent = {
    render: () => {
        return `

        <section id="closeTeamData" class="meetingMembersBoxShadow" style="transition:all ease-in-out 500ms;background-color: aqua;
        position: absolute;
        z-index: 200;
        top: 56px;
        right: -400px;
        bottom: 0px;
        width: 400px !important;">
        <button id="openTeamData" onclick="openTeamData(false)">close menu</button>
    </section>
    <div id='hideContent' onclick=openTeamData(false) class="d-none" style="transition:all ease-in-out 500ms;background-color: aqua;
    opacity: 0;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 180;
    -webkit-backdrop-filter:blur(2px);
    backdrop-filter: blur(2px);
    top: 56px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    ">
    </div>

    
        `
    }
}