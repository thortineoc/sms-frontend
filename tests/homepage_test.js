Feature('homepage');

Scenario('is visible', ({I}) => {
    //I.amOnPage('http://school-management-system.online:24020');
    I.amOnPage('http://localhost:24020/');
    I.see('School Management System');
    I.see('Welcome');
    I.seeElement(locate({id: 'open_drawer'}));
});

Scenario('goes to login page', ({I}) => {
    //I.amOnPage('http://school-management-system.online:24020');
    I.amOnPage('http://localhost:24020/');
    I.click({id: 'open_drawer'})
    I.see('Sign in to your account');
});
