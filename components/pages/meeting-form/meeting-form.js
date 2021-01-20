import {
    getTeams
} from "../../../database.js";

import {
    QuestionComponent
} from "../../shared/question.component.js";

let questions;

const timeRegex = /^(2[0-3]|[0-1][0-9]):[0-5][0-9]$/
// const dateRegex = /^[1-31]\/[1-12]\/2021$/
const dateRegex = /^20([2-9][1-9]|[3-9]0)\/(1[0-2]|[1-9])\/([1-9]|[1-2][0-9]|3[01])$/

let branches;

const questionsList = [{
        id: 'isFinal',
        isMultiple: 'false',
        questionContent: 'اختر نوع المعاد',
        choices: [{
                id: 'yes',
                content: 'معاد نهائي'
            },
            {
                id: 'no',
                content: 'معاد محتمل'
            }
        ]
    }, {
        id: 'branch',
        isMultiple: 'false',
        questionContent: 'اختر الفرع',
    }

]

let nextQuestionIndex = 0

const appendQuestion = (nextQuestionHTML) => {
    const nextQuestionElement = document.createElement('li')
    document.querySelector('#meeting-form-component .col ol').appendChild(nextQuestionElement)
    nextQuestionElement.outerHTML = nextQuestionHTML
}

export const showNextQuestion = (parentElementId) => {
    // console.log(answeredQuestionID);
    const clickedQuestionIndex = questionsList.findIndex(question => question.id === parentElementId)
    console.log(clickedQuestionIndex);
    console.log(nextQuestionIndex);

    if (nextQuestionIndex - clickedQuestionIndex !== 1) {
        return
    }

    let nextQuestionHTML;
    switch (nextQuestionIndex) {
        case 0:
            nextQuestionHTML = QuestionComponent.renderSelect(questionsList[nextQuestionIndex])

            break;
        case 1:
            nextQuestionHTML = QuestionComponent.renderSelect({
                choices: branches.map(branch => {
                    return {
                        id: branch.branchCode,
                        content: branch.branchName
                    }
                }),
                ...questionsList[nextQuestionIndex],
            })
            break;

        default:
            document.querySelector('#fireCheckMeetingForm').disabled = false
            break;
    }
    if (nextQuestionIndex < questionsList.length) {
        nextQuestionIndex += 1
        appendQuestion(nextQuestionHTML)
    }

}

export const initializeForm = async () => {
    if (!branches) {
        branches = await getTeams()
    }
    showNextQuestion()
    return branches
}





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

    const answersOfTimeQuestions = [...document.querySelectorAll('li.timeQuestion>div.timeQuestion')]
    const dateQuestions = [...document.querySelectorAll('li.dateQuestion')]
    const answersOfDateQuestions = dateQuestions.map(question => {
        return {
            day: question.querySelector('#dateDay'),
            month: question.querySelector('#dateMonth'),
            year: question.querySelector('#dateYear')
        }
    })
    console.log(answersOfDateQuestions);


    if (questions.some(question => question.answers.length < 1)) {
        // some questions have no answers
        document.querySelector('#warning-formNotCompleted').classList.remove('d-none')
    } else {
        //good, all questions have answers
        document.querySelector('#warning-formNotCompleted').classList.add('d-none')

        if (!answersOfTimeQuestions.every(answerDiv => timeRegex.test(answerDiv.innerText))) {
            // some time elements aren't formatted properly
            document.querySelector('#warning-timeNotFormattedProperly').classList.remove('d-none')

        } else {
            //good, all time elements are formatted properly
            document.querySelector('#warning-timeNotFormattedProperly').classList.add('d-none')


            if (!answersOfDateQuestions.every(answerObject => {
                    const answerDiv = `${answerObject.year.innerText.trim()}/${answerObject.month.innerText.trim()}/${answerObject.day.innerText.trim()}`
                    console.log(answerDiv);
                    return dateRegex.test(answerDiv)
                })) {
                // some date elements aren't formatted properly
                document.querySelector('#warning-dateNotFormattedProperly').classList.remove('d-none')

            } else {
                //good, all date elements are formatted properly
                document.querySelector('#warning-dateNotFormattedProperly').classList.add('d-none')
                disableMeetingForm(true)

            }

        }
    }
}



export const submitMeetingForm = () => {
    nextQuestionIndex = 0
    document.querySelector('#newMeetingBtn').classList.remove('d-none')
    console.log(questions);
}