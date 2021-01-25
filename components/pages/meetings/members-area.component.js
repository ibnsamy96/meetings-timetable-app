export const MembersAreaComponent = {
    render: () => {
        return `

        <section id="closeTeamData" class="meetingMembersBoxShadow px-4" style="transition:all ease-in-out 500ms;background-color: #fff;
        position: fixed;
        z-index: 200;
        top: 48px;
        right: -100vw;
        bottom: 0px;">

        <div class = 'row g-0 mt-5 mb-3'>
     
        <div class = 'col-auto'>
            <button  id="openTeamData" type="button" onclick="toggleTeamData({openIt:false})" class="btn-close" aria-label="Close"></button>
        </div>

            <div class = 'col'>
                <p class = "h5 fw-normal text-center m-0 p-0">أعضاء الفريق</p>
            </div>

            
        </div>
        <div class = 'row g-0 '>
        
        <div class = 'col'>
            <ul class = "ps-0 text-center" style="list-style-type:none">
                <li class="mb-1">محمود سامي</li>
                <li class="mb-1">Mahmoud Ibn Samy</li>

            </ul>
        </div>
        
    </div>

        </section>

        <div id='hideContent' onclick="toggleTeamData({openIt:false})" class="d-none" style="transition:all ease-in-out 500ms;background-color: aqua;
        opacity: 0;
        position: absolute;
        background-color: rgba(255, 255, 255, 0.5);
        z-index: 180;
        -webkit-backdrop-filter:blur(2px);
        backdrop-filter: blur(2px);
        top: 48px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        ">
        </div>

    
        `
    }
}