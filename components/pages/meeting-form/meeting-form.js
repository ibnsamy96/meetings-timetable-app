import {
    getTeams,
    postMeeting
} from "../../../database.js";

import {
    QuestionComponent
} from "../../shared/question.component.js";
import {
    restoreUserInfo
} from "../../../auth.js";


let questions;

const timeRegex = /^(2[0-3]|[0-1][0-9]):[0-5][0-9]$/
// const dateRegex = /^[1-31]\/[1-12]\/2021$/
const dateRegex = /^20([2-9][1-9]|[3-9]0)\/(1[0-2]|[1-9])\/([1-9]|[1-2][0-9]|3[01])$/

let branches;

// TODO remove next function in production to use the automatically generated branches
const temporaryBranches = async () => {
    // branch to get data locally to be used in development
    const response = await fetch('.//components/pages/meeting-form/temporaryBranches.json')
    const teams = await response.json()
    const branchesIds = Object.keys(teams) // ids of all teams
    const teamsData = branchesIds.map(branchId => {
        // returned value -> {team1Id,team1Value}
        return {
            branchId,
            ...teams[branchId]
        }
    })
    return teamsData // teamData -> [{team1Id,team1Value},{team2Id,team2Value} ...]
};

let questionsList;
// TODO remove next variable if not user
const temporaryQuestionsList = [{
        id: 'meetingDate',
        questionContent: 'ادخل التاريخ',
    },
    {
        id: 'meetingTime',
        questionContent: 'ادخل الوقت',
    },
    {
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
    },
    {
        isMultiple: 'false',
        questionContent: 'في أي فريق فرعي؟',
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


    //  TODO: in json file, just make it teams and subTeams, remove branch level

    if (selectedElement) {

        // console.log(selectedElement.parentElement.querySelectorAll('.btn-success').length);

        // console.log(selectedElement);
        const clickedQuestionIndex = temporaryQuestionsList.findIndex(question => question.questionContent === selectedElement.parentElement.firstElementChild.innerText.trim())
        console.log('clickedQuestionIndex ' + clickedQuestionIndex);
        console.log('nextQuestionIndex ' + nextQuestionIndex);

        if (nextQuestionIndex - clickedQuestionIndex > 1) {
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
            // because the user un-choose a choice, don't show next question
            return
        }
    }

    console.log('hi');
    let nextQuestionHTML;

    switch (nextQuestionIndex) {
        case 0:
            nextQuestionHTML = QuestionComponent.renderDate(temporaryQuestionsList[nextQuestionIndex]) +
                QuestionComponent.renderTime(temporaryQuestionsList[nextQuestionIndex + 1]) +
                QuestionComponent.renderSelect(temporaryQuestionsList[nextQuestionIndex + 2]);
            nextQuestionIndex += 2

            break;
        case 3:
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
        case 4:
            const teamQuestionId = selectedElement.id + '-teams'
            const branchTeamsChoices = branches.filter(branch => branch.branchCode === selectedElement.id).map(branch => {
                const branchTeams = branch.teams
                return branchTeams.map(branchTeam => {
                    // console.log(branchTeam);
                    return {
                        id: branchTeam.teamCode,
                        content: branchTeam.teamName
                    }

                })

            })[0]
            console.log(branchTeamsChoices);
            const generalBranchMeetingObject = {
                id: 'general',
                content: selectedElement.id === 'gam3a' ? 'اجتماع عام للجامعة' : 'اجتماع عام ل' + selectedElement.innerText
            }
            branchTeamsChoices.push(generalBranchMeetingObject)
            nextQuestionHTML = QuestionComponent.renderSelect({
                id: teamQuestionId,
                choices: branchTeamsChoices,
                ...temporaryQuestionsList[nextQuestionIndex],
            })
            break;
        case 5:
            const previousChoiceIdArray = selectedElement.parentElement.id.split('-')
            const branchCode = previousChoiceIdArray[0]
            // const teamCode = previousChoiceIdArray[1]
            console.log(previousChoiceIdArray);
            const previousChoiceId = previousChoiceIdArray.slice(0, previousChoiceIdArray.length - 1).join('-')
            const selectedTeamId = selectedElement.id
            const subTeamQuestionId = `${previousChoiceId}-${selectedTeamId}-subTeams`
            console.log(selectedElement.parentElement.id);
            console.log(subTeamQuestionId);

            const teamObject = branches.find(branch => branch.branchCode === branchCode).teams.find(team => {
                // console.log(team)
                return previousChoiceIdArray.length > 2 ? previousChoiceIdArray[1] : selectedTeamId === team.teamCode
            })
            console.log(teamObject);
            const subTeamsArrayOfObject = teamObject.subTeam

            if (subTeamsArrayOfObject) {
                const teamSubTeamsChoices = subTeamsArrayOfObject.map(subTeamObject => {
                    // console.log(subTeamObject);
                    return {
                        id: subTeamObject.teamCode,
                        content: subTeamObject.teamName
                    }

                })

                console.log(teamSubTeamsChoices);
                const generalTeamMeetingObject = {
                    id: 'general',
                    content: selectedElement.innerText.slice(0, 2) === 'ال' ? "اجتماع عام ل" + selectedElement.innerText.slice(2) : "اجتماع عام ل" + selectedElement.innerText
                }
                teamSubTeamsChoices.push(generalTeamMeetingObject)
                nextQuestionHTML = QuestionComponent.renderSelect({
                    id: subTeamQuestionId,
                    choices: teamSubTeamsChoices,
                    ...temporaryQuestionsList[nextQuestionIndex],
                })
            } else {
                nextQuestionIndex += 1
            }

            break;
        default:
            console.log('entered default');
            document.querySelector('#fireCheckMeetingForm').disabled = false
            break;
    }
    if (nextQuestionIndex < temporaryQuestionsList.length) {
        console.log(' nextQuestionIndex ' + nextQuestionIndex);
        nextQuestionIndex += 1
        appendQuestion(nextQuestionHTML)
    } else {
        // // enable btn
        // document.querySelector('#fireCheckMeetingForm').disabled = false

    }

}

export const initializeForm = async () => {
    // TODO remove next variable in production to use the automatically generated branches
    branches = await temporaryBranches();
    if (!branches) {
        console.log('getting branches');
        branches = await getTeams()
        // TODO remove showNextQuestion and uncomment updateQuestionsList()
        showNextQuestion()
        // updateQuestionsList()
    } else {
        console.log('branches is cached');
        const isFormExist = setInterval(() => {
            console.log('in interval');
            if (document.querySelector('#meeting-form-component .col ol')) {
                // TODO remove showNextQuestion and uncomment updateQuestionsList()
                showNextQuestion()
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
    }


    if (!answersOfTimeQuestions.every(answerDiv => timeRegex.test(answerDiv.innerText))) {
        // some time elements aren't formatted properly
        document.querySelector('#warning-timeNotFormattedProperly').classList.remove('d-none')
    } else {
        //good, all time elements are formatted properly
        document.querySelector('#warning-timeNotFormattedProperly').classList.add('d-none')
    }


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



export const submitMeetingForm = async () => {
    nextQuestionIndex = 0
    document.querySelector('#newMeetingBtn').classList.remove('active')
    document.querySelector('#newMeetingBtn').style.cursor = 'pointer'
    document.querySelector('#newMeetingBtn').style.opacity = '1'
    // console.table(questions);
    console.log(questions);
    const userInfo = restoreUserInfo()
    const meetingDateQuestionAnswers = questions.find(question => question.id === 'meetingDate').answers.map(answer => answer.content.trim())
    const meetingTimeQuestionAnswers = questions.find(question => question.id === 'meetingTime').answers.map(answer => answer.content.trim())
    const isFinal = questions[2].answers[0].id === 'yes' ? true : false
    const meetingInfoJson = {
        "creatorId": userInfo.userId,
        "creatorName": userInfo.userName,
        "creatorEmail": userInfo.userEmail,
        "creationTime": new Date(),
        "date": meetingDateQuestionAnswers.join('-'),
        "time": meetingTimeQuestionAnswers.join('-'),
        "isFinal": isFinal,
        "branchCode": questions[3].answers[0].id,
        "teamCode": questions[4].answers[0].id,
        "subTeam": questions[5] ? questions[5].answers[0].id : null,
        "subSubTeam": questions[6] ? questions[6].answers[0].id : null
    }
    console.log(meetingInfoJson);

    await postMeeting(meetingInfoJson);
    console.log('Meeting Sent');
}