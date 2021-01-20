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

let questionsList;
// TODO remove next variable if not user
const temporaryQuestionsList = [{
        id: 'isFinal',
        isMultiple: 'false',
        questionContent: 'ما نوع المعاد؟',
        choices: [{
                id: 'yes',
                content: 'معاد نهائي'
            },
            {
                id: 'no',
                content: 'معاد محتمل'
            }
        ]
    },
    {
        id: 'branch',
        isMultiple: 'false',
        questionContent: 'في أي فرع؟',
    }, {
        isMultiple: 'false',
        questionContent: 'في أي فريق؟',
    }

]

let nextQuestionIndex = 0

function questionEnhancer(selectedElement) {

    // function to handel next question after the second one

    const isMultiple = false
    const questionId = selectedElement.id

    if (selectedElement.parentElement.id !== 'branch') {
        // next team is a subTeam question 
        const questionContent = "في أي فريق فرعي بفريق " + selectedElement.innerText + "؟"

        // selectedElementId.parent.id format = gam3a-ta3alom-tawasol => this question represents choices of tawasol's sub-teams
        const parentIdArray = selectedElement.parentElement.id.split('-')
        const nextQuestionIndexWillBe = 0 + 1 + parentIdArray.length()

        const thisTeamData = branches.find(branch => branch.branchCode === parentIdArray[0]).teams.find(team => team.teamCode === parentIdArray[1])

    } else {
        // next team is a mainTeam question
        if (selectedElement.id === 'gam3a') {
            const questionContent = "أي فريق بمعًا الجامعة؟"
        } else {
            const questionContent = "في أي فريق بفرع " + selectedElement.innerText + "؟"
        }

        const thisBranchData = branches.filter(branch => branch.branchCode === selectedElement.id)
        thisBranchData.teams.forEach(team => {
            choices.push({
                id: team.teamCode,
                content: teamName
            })
        });

    }

    const choices = []


    // TODO enhance question and return it
    // return enhancedQuestion

}

export const updateQuestionsList = (selectedElement) => {
    // loads to update questionList depending on branch and its teams
    // loads at every selection and loads the whole question list according to the clicked choice

    questionsList = []

    const meetingTypeQuestion = {
        id: 'isFinal',
        isMultiple: 'false',
        questionContent: 'ما نوع المعاد؟',
        choices: [{
                id: 'yes',
                content: 'معاد نهائي'
            },
            {
                id: 'no',
                content: 'معاد محتمل'
            }
        ]
    }


    const branchQuestion = {
        id: 'branch',
        isMultiple: 'false',
        questionContent: 'في أي فرع؟',
    }



    const timeQuestion = {
        id: 'meetingDate',
        questionContent: 'ادخل التاريخ',
    }

    const dateQuestion = {
        id: 'meetingTime',
        questionContent: 'ادخل الوقت',
    }



    const firstTwoQuestions = [meetingTypeQuestion, branchQuestion]

    const lastTwoQuestions = [dateQuestion, timeQuestion]


    questionsList.push(meetingTypeQuestion)
    questionsList.push(branchQuestion)

    if (!selectedElement) return // 



    const nextQuestion = questionEnhancer(selectedElement)






    console.log(branches);


    showNextQuestion(selectedElement)

}

const appendQuestion = (nextQuestionHTML) => {
    const nextQuestionElement = document.createElement('li')
    document.querySelector('#meeting-form-component .col ol').appendChild(nextQuestionElement)
    nextQuestionElement.outerHTML = nextQuestionHTML
}

export const showNextQuestion = (selectedElement) => {
    if (selectedElement) {

        // console.log(selectedElement.parentElement.querySelectorAll('.btn-success').length);

        // console.log(selectedElement);
        const clickedQuestionIndex = temporaryQuestionsList.findIndex(question => question.questionContent === selectedElement.parentElement.firstElementChild.innerText.trim())
        console.log('clickedQuestionIndex ' + clickedQuestionIndex);
        console.log('nextQuestionIndex ' + nextQuestionIndex);

        if (nextQuestionIndex - clickedQuestionIndex !== 1) {
            // if selectedElement wasn't of the last question, then don't append a new question
            if (clickedQuestionIndex > 0) {
                // selectedElement wasn't of the first question, then reload choices using selected choice
                // remove all next questions -> change nextQuestionIndex -> recall the function if a choice was made not removed
                while (document.querySelector('#meeting-form-component .col ol').lastElementChild.id !== selectedElement.parentElement.id) {
                    document.querySelector('#meeting-form-component .col ol').lastElementChild.remove()
                }
                nextQuestionIndex = clickedQuestionIndex + 1
                if (selectedElement.classList.contains('btn-success')) {
                    showNextQuestion(selectedElement)
                }
            }
            return
        }


        if (!selectedElement.classList.contains('btn-success')) {
            // if selectedElement doesn't has 'btn-success' then this method doesn't need to continue
            return
        }
    }

    console.log('hi');
    let nextQuestionHTML;

    switch (nextQuestionIndex) {
        case 0:
            nextQuestionHTML = QuestionComponent.renderSelect(temporaryQuestionsList[nextQuestionIndex])

            break;
        case 1:

            const branchesChoices = branches.map(branch => {
                return {
                    id: branch.branchCode,
                    content: branch.branchName
                }
            })
            nextQuestionHTML = QuestionComponent.renderSelect({
                choices: branchesChoices,
                ...temporaryQuestionsList[nextQuestionIndex],
            })
            break;
        case 2:
            0
            const id = selectedElement.id + '-team'
            const branchTeamsChoices = branches.filter(branch => branch.branchCode === selectedElement.id).map(branch => {
                const branchTeams = branch.teams
                return branchTeams.map(branchTeam => {
                    console.log(branchTeam);
                    return {
                        id: branchTeam.teamCode,
                        content: branchTeam.teamName
                    }

                })

            })[0]
            console.log(branchTeamsChoices);
            nextQuestionHTML = QuestionComponent.renderSelect({
                id,
                choices: branchTeamsChoices,
                ...temporaryQuestionsList[nextQuestionIndex],
            })
            break;
        default:
            console.log('entered default');
            document.querySelector('#fireCheckMeetingForm').disabled = false
            break;
    }
    if (nextQuestionIndex < temporaryQuestionsList.length) {
        nextQuestionIndex += 1
        appendQuestion(nextQuestionHTML)
    } else {
        // // enable btn
        // document.querySelector('#fireCheckMeetingForm').disabled = false

    }

}

export const initializeForm = async () => {
    if (!branches) {
        console.log('getting branches');
        branches = await getTeams()
        showNextQuestion()
        // TODO remove showNextQuestion and uncomment updateQuestionsList()
        // updateQuestionsList()
    } else {
        console.log('branches is cached');
        const isFormExist = setInterval(() => {
            console.log('in interval');
            if (document.querySelector('#meeting-form-component .col ol')) {
                showNextQuestion()
                // TODO remove showNextQuestion and uncomment updateQuestionsList()
                // updateQuestionsList()
                clearInterval(isFormExist)
            }

        }, 1)
    }
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