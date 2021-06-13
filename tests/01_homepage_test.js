Feature('homepage');

Scenario('is visible', ({I}) => {
    //I.amOnPage('http://school-management-system.online:24020');
    I.amOnPage('http://localhost:24010/');
    I.see('School Management System');
    I.seeElement(locate({id: 'open_drawer'}));
});

Scenario('goes to login page', ({I}) => {
    //I.amOnPage('http://school-management-system.online:24020');
    I.amOnPage('http://localhost:24010/');
    I.click({id: 'open_drawer'})
    I.see('Sign in to your account');
});
