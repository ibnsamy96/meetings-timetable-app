import {
    ChoiceComponent
} from "./choice.component.js";

export const QuestionComponent = {
    render: (questionData = {
        id: '',
        isMultiple: 'false',
        questionContent: '',
        choices: [{
            id: '',
            content: ''
        }]
    }) => {
        return `
        <li id='${questionData.id}' data-multiple=${questionData.isMultiple} class="h4 my-4">
        <p class="m-0"> ${questionData.questionContent} </p>
        ${ questionData.choices.map(choiceData => ChoiceComponent.render(choiceData)).join('')}
    </li>
        `
    }
}


/*


        <li id='${questionData.id}' data-multiple=${questionData.isMultiple} class="h4 my-4">
        <p class="m-0"> ${questionData.questionContent} </p>
        ${ questionDate.answers.forEach(
            answer => ChoiceComponent.render(answer)
        )        }
    </li>


*/