export const NavbarComponent = {
    render: () => {
        return `
        <nav class="navbar navbar-light bg-light navBoxShadow" dir='ltr'>
        <div class="container-fluid px-2 ">
            <span class="navbar-brand m-0 mx-auto"><b>Ma3an</b> Meetings Timetable</span>
            <div class="d-flex">
                <button class="btn ms-2 fbBtn primaryBoxShadow d-none"
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