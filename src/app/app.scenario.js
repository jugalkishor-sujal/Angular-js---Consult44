/*
 * This is an e2e test suite.
 */

describe( 'josephsEnrollment', function() {
    var url = '/base/build/index.html#';
    describe( 'smoke test', function() {

        it( 'josephsEnrollment: Initial State', function () {
            // Trigger state change: Load page
            browser().navigateTo(url);
            expect(browser().window().hash()).toEqual('/enroll/start');      
            expect(element('legend').text()).toContain('Market');
        });

    });
});