import {
    getSharedComponentCode
} from "../../components-manager.js";

export const NavbarComponent = {
    render: () => {
        return `
        <nav class="navbar fixed-top navbar-light bg-light navBoxShadow py-0" dir='ltr'>
        <div class="container-fluid px-0 ">
            <span class="navbar-brand me-0  my-1">
                <b style="position:relative;z-index:30;    padding-left: 1rem;" class = "bg-light">Ma3an</b>
                <span class="px-1 bg-light" style="position:relative;z-index:30" id="navbarBrandSeparator" >|</span>
                <span id="projectName" style="position:relative;left:-10rem;opacity:0;transition: all 0.5s ease-in-out;">Meetings Timetable</span>
            </span>
            <div id='controlBtns' class="d-flex d-none" style="overflow:hidden">
            
                <div id='sidebar' class = 'row mx-0'>
                    
                
                <!--
                    <div class = 'col px-0' style="overflow:hidden">
                    ${getSharedComponentCode('button', {btnData: {
                        id: 'membersPageBtn',
                        activationMethod: 'routeToAnotherPage(this)',
                        content: 'قائمة الأعضاء',
                        buttonColorClass: 'btn-primary',
                        buttonClasses:'mx-0 w-100',
                        spanClasses:'p',
                        buttonStyle: '',
                        spanStyle: ''
                    }})}
                    </div>
                    
                -->

                    <div class = 'col px-0' style="overflow:hidden">
                        ${getSharedComponentCode('button', {btnData: {
                            id: 'newMeetingBtn',
                            activationMethod: 'routeToAnotherPage(this)',
                            content: 'أضف اجتماع',
                            buttonColorClass: 'btn-primary',
                            buttonClasses:'mx-0 w-100',
                            spanClasses:'p',
                            buttonStyle: '',
                            spanStyle: ''
                        }})}
                    </div>

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