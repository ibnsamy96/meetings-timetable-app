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





export const getPageComponentCode = async (key) => {
    const [component] = pagesRouter.filter(component => component.key === key)

    return await component.component.render()
}

export const getSharedComponentCode = (key, componentParameters = {
    btnData: {
        id: '',
        activationMethod: '',
        content: '',
        buttonClasses: '',
        spanClasses: '',
        buttonStyle: '',
        spanStyle: ''
    }
}) => {
    const [component] = sharedComponentsRouter.filter(component => component.key === key)
    // console.log(componentParameters.btnData);
    if (component.key === 'button') {
        const handledButtonObject = handleButtonAttributes(componentParameters.btnData)
        return component.component.render(handledButtonObject)
    } else {
        return component.component.render()
    }
}

function handleButtonAttributes(btnData) {

    // check for button values and put right value depending on screen size.
    // if the object has atNotSmallScreen attribute then it means there a responsive content and if not put the available content
    const id = btnData.id
    const activationMethod = btnData.activationMethod

    const content = btnData.content.atSmallScreen ? isSmallScreen ? btnData.content.atSmallScreen : btnData.content.atNotSmallScreen : btnData.content

    const buttonColorClass = btnData.buttonColorClass.atSmallScreen ? isSmallScreen ? btnData.buttonColorClass.atSmallScreen : btnData.buttonColorClass.atNotSmallScreen : btnData.buttonColorClass

    const buttonClasses = btnData.buttonClasses.atSmallScreen ? isSmallScreen ? btnData.buttonClasses.atSmallScreen : btnData.buttonClasses.atNotSmallScreen : btnData.buttonClasses

    const spanClasses = btnData.spanClasses.atSmallScreen ? isSmallScreen ? btnData.spanClasses.atSmallScreen : btnData.spanClasses.atNotSmallScreen : btnData.spanClasses

    const buttonStyle = btnData.buttonStyle.atSmallScreen ? isSmallScreen ? btnData.buttonStyle.atSmallScreen : btnData.buttonStyle.atNotSmallScreen : btnData.buttonStyle

    const spanStyle = btnData.spanStyle.atSmallScreen ? isSmallScreen ? btnData.spanStyle.atSmallScreen : btnData.spanStyle.atNotSmallScreen : btnData.spanStyle

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