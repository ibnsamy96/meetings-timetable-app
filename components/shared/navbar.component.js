import {
    getSharedComponentCode
} from "../../components-manager.js";

export const NavbarComponent = {
    render: () => {
        return `
        <nav class="navbar navbar-light bg-light navBoxShadow" dir='ltr'>
        <div class="container-fluid px-2 ">
            <span class="navbar-brand m-0 mx-auto"><b>Ma3an</b> Meetings Timetable</span>
            <div id='controlBtns' class="d-flex d-none">
                

                ${getSharedComponentCode('button', {btnData: {
                    id: 'newMeetingBtn',
                    activationMethod: 'routeToNewMeeting(this)',
                    content: {atSmallScreen:'<i class="far fa-calendar-plus"></i>',atNotSmallScreen:'أضف اجتماع'},
                    buttonColorClass: 'btn-primary',
                    buttonClasses:'ms-2',
                    spanClasses:{atSmallScreen:'h1',atNotSmallScreen:'p'},
                    buttonStyle: '',
                    spanStyle: ''
                }})}
                
     
                ${getSharedComponentCode('button',{btnData:{
                    id: 'fbSignOutBtn',
                    activationMethod: 'signOut()',
                    content: '<i class="fas fa-walking"></i>',
                    buttonColorClass: 'btn-primary',
                    buttonClasses: 'ms-2',
                    spanClasses: 'p',
                    buttonStyle: 'background-color: #191919;padding: .3rem .65rem;',
                    spanStyle: ''
                }})}
                
            </div>
        </div>
    </nav>
        `
    }
}