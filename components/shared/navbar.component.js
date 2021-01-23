import {
    getSharedComponentCode
} from "../../components-manager.js";

export const NavbarComponent = {
    render: () => {
        return `
        <nav class="navbar navbar-light bg-light navBoxShadow py-0" dir='ltr'>
        <div class="container-fluid px-0 ">
            <span class="navbar-brand m-0 mx-auto my-1"><b>Ma3an</b> Meetings Timetable</span>
            <div id='controlBtns' class="d-flex d-none">
            
                <div id='sidebar'>

                ${getSharedComponentCode('button', {btnData: {
                    id: 'newMeetingBtn',
                    activationMethod: 'routeToNewMeeting(this)',
                    content: 'أضف اجتماع',
                    buttonColorClass: 'btn-primary',
                    buttonClasses:'ms-0',
                    spanClasses:'p',
                    buttonStyle: '',
                    spanStyle: ''
                }})}
                
                </div>
     
                ${getSharedComponentCode('button',{btnData:{
                    id: 'fbSignOutBtn',
                    activationMethod: 'signOut()',
                    content: '<div><i class="fas fa-walking"></i></div>',
                    buttonColorClass: 'btn-dark',
                    buttonClasses: 'ms-0 px-3',
                    spanClasses: 'p',
                    buttonStyle: '',
                    spanStyle: ''
                }})}
                
            </div>
        </div>
    </nav>
        `
    }
}


/*


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

*/