export const ButtonComponent = {

    render: (btn = {
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
        <button class="btn ${btn.buttonColorClass} primaryBoxShadow ${btn.buttonClasses}" style="${btn.buttonStyle}" onclick="${btn.activationMethod}" id='${btn.id}'>
        <span style="${btn.spanStyle}" class="m-0 p-0 ${btn.spanClasses}">${btn.content}</span>
        </button>
        `
    }
}