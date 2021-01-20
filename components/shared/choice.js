import {
    showNextQuestion
} from "../pages/meeting-form/meeting-form.js";

export const chooseThisChoice = (selectedElement) => {

    console.log(selectedElement.innerText);
    if (selectedElement.parentElement.dataset.multiple === 'true') {
        selectedElement.classList.toggle('btn-success')
        selectedElement.classList.toggle('btn-info')
    } else {
        if (selectedElement.classList.contains('btn-info')) {

            [...selectedElement.parentElement.children].splice(1).forEach(choice => {
                // console.log(choice);
                choice.classList.remove('btn-success')
                choice.classList.add('btn-info')
            })

        }
        selectedElement.classList.toggle('btn-success')
        selectedElement.classList.toggle('btn-info')
    }

    // if the user un-choose a choice, don't show next question
    showNextQuestion(selectedElement);



}