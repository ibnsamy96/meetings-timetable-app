export const ChoiceComponent = {
    render: (choiceData = {
        id: '',
        content: ''
    }) => {
        return `
        <div id="${choiceData.id}" class="h5 fw-normal secondaryBoxShadow  mt-2 btn btn-info"
        onclick="fireChooseThisChoice(this)">${choiceData.content}</div>
        `
    }
}

/*

<div class="h5 fw-normal choice choiceSelected secondaryBoxShadow  mt-2 btn btn-info"
                        onclick="chooseThisChoice(this)"> اختارني أنا ! </div>

*/