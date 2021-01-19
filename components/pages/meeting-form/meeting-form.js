let questions;

export const disableMeetingForm = (state) => {
    document.querySelector('#fireCheckMeetingForm').disabled = state
    document.querySelector('#fireSubmitMeetingForm').classList.toggle('d-none', !state)
}


export const checkMeetingForm = () => {

    questions = [...document.querySelectorAll('li')].map(question => {
        const answerChoices = [...question.children].splice(1)
        const chosenAnswers = answerChoices.filter(choice => {
                const isChoiceSelected = choice.classList.contains('btn-success')
                return isChoiceSelected
            })
            .map(selectedElement => {
                return {
                    id: selectedElement.id,
                    content: selectedElement.innerText
                }
            })

        return {
            id: question.id,
            answers: chosenAnswers
        }
    })



    if (questions.some(question => question.answers.length < 1)) {
        document.querySelector('#warning').classList.remove('d-none')
    } else {
        document.querySelector('#warning').classList.add('d-none')
        disableMeetingForm(true)
    }
}



export const submitMeetingForm = () => {
    document.querySelector('#newMeetingBtn').classList.remove('d-none')
    console.log(questions);
}