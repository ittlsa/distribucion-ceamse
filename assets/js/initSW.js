if (navigator.serviceWorker) {

    window.addEventListener('load', function() {

        navigator.serviceWorker.register('http://localhost:4200/serviceWorker.js').then(function(reg) {

            if (reg.installing) {
                console.log('Service worker installing');
            } else if (reg.waiting) {
                console.log('Service worker installed');
            } else if (reg.active) {
                console.log('Service worker active');
            }

        }).catch(function(error) {
            // registration failed
            console.log('Registration failed with ' + error);
        });
    });



}