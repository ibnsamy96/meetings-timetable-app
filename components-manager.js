import {
    LoginComponent
} from "./components/pages/login/login.component.js";
import {
    MeetingFormComponent
} from "./components/pages/meeting-form/meeting-form.component.js";
import {
    MeetingsDashboardComponent
} from "./components/pages/meetings/meetings-dashboard.component.js";

import {
    NavbarComponent
} from "./components/shared/navbar.component.js";

const pagesRouter = [{
        key: 'login',
        component: LoginComponent
    },
    {
        key: 'meeting-form',
        component: MeetingFormComponent
    },
    {
        key: 'meetings-dashboard',
        component: MeetingsDashboardComponent
    }
]

const sharedComponentsRouter = [{
    key: 'navbar',
    component: NavbarComponent
}]


export const getPageComponentCode = (key) => {
    const [component] = pagesRouter.filter(component => component.key === key)
    return component.component.render()
}

export const getSharedComponentCode = (key) => {
    const [component] = sharedComponentsRouter.filter(component => component.key === key)
    return component.component.render()
}