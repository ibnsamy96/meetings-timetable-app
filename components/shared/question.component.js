import {
    ChoiceComponent
} from "./choice.component.js";

export const QuestionComponent = {
    renderSelect: (questionData = {
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
    },
    renderTime: (questionData = {
        id: '',
        questionContent: '',
    }) => {
        return `
        <li id='${questionData.id}' data-multiple='true' class="h4 my-4 timeQuestion">
        <p class="m-0"> ${questionData.questionContent} </p>
        <span class="h5 fw-normal"> من الساعة</span>
        <div onclick="fireChooseThisChoice(this)" id="timeFrom" class="h5 fw-normal secondaryBoxShadow timeQuestion mt-2 btn btn-success"  contenteditable="true"
        >00:00</div>
        <span class="h5 fw-normal"> و حتّى </span>
        <div onclick="fireChooseThisChoice(this)" id="timeTo" class="h5 fw-normal secondaryBoxShadow timeQuestion mt-2 btn btn-success"  contenteditable="true"
        >00:00</div>
      <!--  <input id='input' class="h5 fw-normal secondaryBoxShadow  mt-2 btn btn-success" value='00:00' /> -->
    </li>
        `
    },
    renderDate: (questionData = {
        id: '',
        questionContent: '',
    }) => {
        return `
        <li id='${questionData.id}' data-multiple='true' class="h4 my-4 dateQuestion">
        <p class="m-0"> ${questionData.questionContent} </p>

        <span class="h5 fw-normal"> يوم</span>

        <div onclick="fireChooseThisChoice(this)" id="dateDay" class="h5 fw-normal secondaryBoxShadow dateQuestion mt-2 btn btn-success"  contenteditable="true"
        >1</div>
        <span class="h5 fw-normal"> من شهر </span>
        <div onclick="fireChooseThisChoice(this)" id="dateMonth" class="h5 fw-normal secondaryBoxShadow dateQuestion mt-2 btn btn-success"  contenteditable="true"
        >1</div>
        <span class="h5 fw-normal"> من عام </span>
        <div onclick="fireChooseThisChoice(this)" id="dateYear" class="h5 fw-normal secondaryBoxShadow dateQuestion mt-2 btn btn-success"  contenteditable="true"
        >2021</div>

        <!--


        <div class="h5 fw-normal secondaryBoxShadow dateQuestion mt-2 btn btn-success">
        <div onclick="fireChooseThisChoice(this)" id="dateDay" dateQuestion class="d-inline-block"  contenteditable="true"
        >1</div>
        /
        <div onclick="fireChooseThisChoice(this)" id="dateDay" dateQuestion class="d-inline-block"  contenteditable="true"
        >1</div>
        /
        2021
        
        </div>




 <input id='input' class="h5 fw-normal secondaryBoxShadow  mt-2 btn btn-success" value='00:00' type="number" pattern="/^[1:12]$/" /> 
 <input id='input' class="h5 fw-normal secondaryBoxShadow  mt-2 btn btn-success" value='00:00' type="date" /> 
 -->
    </li>
        `
    },
    renderInput: () => {

    },
}


/*


        <li id='${questionData.id}' data-multiple=${questionData.isMultiple} class="h4 my-4">
        <p class="m-0"> ${questionData.questionContent} </p>
        ${ questionDate.answers.forEach(
            answer => ChoiceComponent.render(answer)
        )        }
    </li>


*/