Feature('usermanagement');

Scenario('can login to admin account', ({ I }) => {
    //I.amOnPage('http://school-management-system.online:24020');
    I.amOnPage('http://localhost:3000/');
    I.click({id: 'open_drawer'});
    I.waitForElement('', 5);
    I.see('Sign in to your account');
    I.fillField('username', 'smsadmin');
    I.fillField('password', 'smsadmin');
    I.click('Sign In');

    //I.waitForElement({id: 'open_drawer'}, 5);
    I.see('School Management System');
    I.see('DASHBOARD FOR ADMIN');
    I.click({id: 'open_drawer'});
    I.see('User profile');
    I.see('Dashboard');
    I.see('Student management');
    I.see('Teacher management');
    I.see('Timetable management');
    I.see('Log out');
});


Scenario('can create group and student', ({ I }) => {
    //login
    //I.amOnPage('http://school-management-system.online:24020');
    I.amOnPage('http://localhost:3000/');
    I.click({id: 'open_drawer'});
    I.fillField('username', 'smsadmin');
    I.fillField('password', 'smsadmin');
    I.click('Sign In');

    I.click({id: 'open_drawer'});
    I.click('Student management');
    I.see('Student management');
});
