Feature('homepage');

Scenario('is visible', ({ I }) => {
    //I.amOnPage('http://school-management-system.online:24020');
    I.amOnPage('http://localhost:3000/');
    I.see('School Management System');
    I.see('Welcome');
    I.seeElement(locate({id:'open_drawer'}));
});

Scenario('can log in', ({I}) => {
   //I.amOnPage('http://school-management-system.online:24020');
   I.amOnPage('http://localhost:3000/');
   I.click({id:'open_drawer'})
   I.see('Sign in to your account');
   I.fillField('username', 'smsadmin');
   I.fillField('password', 'smsadmin');
   I.click('Sign In');
});
