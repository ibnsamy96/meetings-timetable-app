export const ButtonComponent = {

    render: (btnData = {
        id: '',
        activationMethod: '',
        content: '',
        buttonColorClass: '',
        buttonClasses: '',
        spanClasses: '',
        buttonStyle: '',
        spanStyle: ''
    }) => {
        return `
        <button class="btn ${btnData.buttonColorClass} primaryBoxShadow ${btnData.buttonClasses}" style="${btnData.buttonStyle}" onclick="${btnData.activationMethod}" id='${btnData.id}'>
        <span style="${btnData.spanStyle}" class="m-0 p-0 ${btnData.spanClasses}">${btnData.content}</span>
        </button>
        `
    }
}