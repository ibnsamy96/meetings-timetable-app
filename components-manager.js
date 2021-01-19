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
import {
    ButtonComponent
} from "./components/shared/button.component.js";

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
    },
    {
        key: 'button',
        component: ButtonComponent
    }
]

const isSmallScreen = window.innerWidth <= 767 ? true : false





export const getPageComponentCode = (key) => {
    const [component] = pagesRouter.filter(component => component.key === key)
    return component.component.render()

}

export const getSharedComponentCode = (key, btn = {
    id: '',
    activationMethod: '',
    content: '',
    buttonClasses: '',
    spanClasses: '',
    buttonStyle: '',
    spanStyle: ''
}) => {
    const [component] = sharedComponentsRouter.filter(component => component.key === key)
    if (component.key === 'button') {
        const handledButtonObject = handleButtonAttributes(btn)
        return component.component.render(handledButtonObject)
    } else {
        return component.component.render()
    }
}

function handleButtonAttributes(btn) {

    // check for button values and put right value depending on screen size.
    // if the object has atNotSmallScreen attribute then it means there a responsive content and if not put the available content
    const id = btn.id
    const activationMethod = btn.activationMethod

    const content = btn.content.atSmallScreen ? isSmallScreen ? btn.content.atSmallScreen : btn.content.atNotSmallScreen : btn.content

    const buttonColorClass = btn.buttonColorClass.atSmallScreen ? isSmallScreen ? btn.buttonColorClass.atSmallScreen : btn.buttonColorClass.atNotSmallScreen : btn.buttonColorClass

    const buttonClasses = btn.buttonClasses.atSmallScreen ? isSmallScreen ? btn.buttonClasses.atSmallScreen : btn.buttonClasses.atNotSmallScreen : btn.buttonClasses

    const spanClasses = btn.spanClasses.atSmallScreen ? isSmallScreen ? btn.spanClasses.atSmallScreen : btn.spanClasses.atNotSmallScreen : btn.spanClasses

    const buttonStyle = btn.buttonStyle.atSmallScreen ? isSmallScreen ? btn.buttonStyle.atSmallScreen : btn.buttonStyle.atNotSmallScreen : btn.buttonStyle

    const spanStyle = btn.spanStyle.atSmallScreen ? isSmallScreen ? btn.spanStyle.atSmallScreen : btn.spanStyle.atNotSmallScreen : btn.spanStyle

    return {
        id,
        activationMethod,
        content,
        buttonColorClass,
        buttonClasses,
        spanClasses,
        buttonStyle,
        spanStyle
    }

}