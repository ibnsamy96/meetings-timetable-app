export const NavbarComponent = {
    render: () => {
        return `
        <nav class="navbar navbar-light bg-light navBoxShadow" dir='ltr'>
        <div class="container-fluid px-2 ">
            <span class="navbar-brand m-0 mx-auto"><b>Ma3an</b> Meetings Timetable</span>
            <div id='controlBtns' class="d-flex d-none">
                <button class="btn ms-2 btn-primary  primaryBoxShadow"
                    onclick="routeToNewMeeting(this)" id='newMeetingBtn'>
                    <span class="p">أضف اجتماع</span>
                </button>
                <button class="btn ms-2 btn-primary primaryBoxShadow"
                    style="background-color: #191919;padding: .3rem .65rem;" onclick="signOut()" id='fbSignOutBtn'>
                    <span class="p"><i class="fas fa-walking"></i></span>
                    <!-- <img src="./assets/images/fbSignInBtn.svg" /> -->
                </button>
            </div>
        </div>
    </nav>
        `
    }
}