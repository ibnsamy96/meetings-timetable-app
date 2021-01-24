export const LoadingComponent = {
    renderFull: () => {
        return `
        <section id='loadingComponentFullPage' class="text-center d-flex justify-content-center align-items-center mt-4 mb-4">
            <div id='' class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </section>
        `
    },
    renderSmall: () => {
        return `
        <div style="height:100%;display: flex;justify-content: center;align-items: center;"> 
            <div id='' class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        `
    }
}