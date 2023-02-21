// UTILITY FUNCTIONS

// HELPER FUNCTIONS
    // @TODO fix alerts not showing up, or showing up very briefly and dissapearing
    
    export const showAlert =(type,alert,setState)=> {
        const alertEl = document.querySelector('.alert')
        setState(alert)
        const alertTimeout = () => setTimeout(() => {
            alertEl.classList.remove(`--${type}`);
            setState('')
        }, 4000);
        if (alertEl.classList.contains(`--${type}`)) {
            clearTimeout(alertTimeout);
        }
        else {
            alertEl.classList.add(`--${type}`);
            alertTimeout();
        }
    }