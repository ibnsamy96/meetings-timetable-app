import {
    QuestionComponent
} from "../../shared/question.component.js";

import {
    getSharedComponentCode
} from "../../../components-manager.js";

import {
    getTeams
} from "../../../database.js";

let teams;

export const MeetingFormComponent = {
    initialize: async () => {
        teams = await getTeams()
    },
    render: async function () {
        if (!teams) {
            await this.initialize()
        }
        console.log(teams);
        return `
        <section id='meeting-form-component' class="pt-2 row">
        <div class="col">
            <h1 class="h2 mb-3 pageHeadingText">أضف اجتماع</h1>
            <ol>

            ${QuestionComponent.renderSelect({
                id : 'isFinal',
                isMultiple : 'false',
                questionContent : 'اختر نوع المعاد',
                choices : [
                    {id:'yes',content:'معاد نهائي'},
                    {id:'no',content:'معاد محتمل'}
                ]
            })}   

            ${QuestionComponent.renderSelect({
                id : 'branch',
                isMultiple : 'false',
                questionContent : 'اختر الفرع',
                choices : [
                    {id:'gam3a',content:'الجامعة'},
                    {id:'tebb',content:'طب'},
                    {id:'handsa',content:'هندسة'},
                    {id:'tarbia',content:'تربية'},
                    {id:'tgara',content:'تجارة'},
                    {id:'asnan',content:'أسنان'}
                ]
            })}           

            ${QuestionComponent.renderSelect({
                id : 'gam3aTeams',
                isMultiple : 'false',
                questionContent : 'اختر الفريق',
                choices : [
                    {id:'pr',content:'العلاقات العامة'},
                    {id:'hr',content:'الموارد البشرية'},
                    {id:'media',content:'الميديا'},
                    {id:'ta3alom',content:'إيفنت التعلّم'},
                    {id:'fr',content:'الموارد المالية'}
                ]
            })}

            ${QuestionComponent.renderSelect({
                id : 'ta3alomSubTeams',
                isMultiple : 'false',
                questionContent : 'اختر الفريق الفرعي',
                choices : [
                    {id:'pr',content:'العلاقات العامة'},
                    {id:'hr',content:'الموارد البشرية'},
                    {id:'media',content:'الميديا'},
                    {id:'fr',content:'الموارد المالية'}
                ]
            })}

            ${QuestionComponent.renderDate({
                id : 'meetingDate',
                questionContent : 'ادخل التاريخ',
            })}

            ${QuestionComponent.renderTime({
                id : 'meetingTime',
                questionContent : 'ادخل الوقت',
            })}

            

            </ol>
            <p id='warning-formNotCompleted' class = 'h6 d-none'>يجب اختيار إجابة واحدة على الأقل في كل سؤال!</p>
            <p id='warning-timeNotFormattedProperly' class = 'h6 d-none'>لم يتم كتابة الوقت بشكل صحيح!
            <br/>
            يجب أن يكون الوقت مكتوب على هيئة hours:minutes و حدود الدقائق هي [00-59] بينما حدود الساعات هي [00-23]
            </p>
            <p id='warning-dateNotFormattedProperly' class = 'h6 d-none'>لم يتم كتابة التاريخ بشكل صحيح!
            <br/>
            يجب أن تكون حدود اليوم [1-31] و حدود الشهر [1-12] و أن يكون العام ضمن القرن الواحد و العشرين
            </p>


            ${getSharedComponentCode('button',{btnData: {
                id: 'fireCheckMeetingForm',
                activationMethod: 'fireCheckMeetingForm()',
                content: "تأكّد من تفرّغ الأعضاء",
                buttonColorClass: 'btn-primary',
                buttonClasses:'h4 fw-normal me-auto',
                spanClasses:"",
                buttonStyle: '',
                spanStyle: ''
            }})}
            
            ${getSharedComponentCode('button',{btnData: {
                id: 'fireSubmitMeetingForm',
                activationMethod: 'fireSubmitMeetingForm()',
                content: "تم التأكّد/أضف الاجتماع",
                buttonColorClass: 'btn-primary',
                buttonClasses:'h4 fw-normal me-auto d-none',
                spanClasses:"",
                buttonStyle: '',
                spanStyle: ''
            }})}
        </div>
        </section>
        `
    }
}

/*


${QuestionComponent.renderSelect({
                id : 'membersNames',
                isMultiple : 'true',
                questionContent : 'اختر أعضاء الفريق',
                choices : [
                    {id:'254311',content:'محمود سامي'},
                    {id:'254311',content:'محمد بسام'},
                    {id:'254311',content:'أحمد عادل'},
                    {id:'254311',content:'محمد النبراوي'}
                ]
            })}


*/