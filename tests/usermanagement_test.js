Feature('usermanagement');

Scenario('can login to admin account and logout', ({ I }) => {
    //I.amOnPage('http://school-management-system.online:24020');
    I.amOnPage('http://localhost:3000/');
    I.click({id: 'open_drawer'});
    I.see('Sign in to your account');
    I.fillField('username', 'smsadmin');
    I.fillField('password', 'smsadmin');
    I.click('Sign In');

    I.see('School Management System');
    I.see('DASHBOARD FOR ADMIN');
    I.click({id: 'open_drawer'});
    I.see('User profile');
    I.see('Dashboard');
    I.see('Student management');
    I.see('Teacher management');
    I.see('Timetable management');
    I.see('Log out');

    I.click('Log out');
    I.see('School Management System');
    I.see('Welcome');
});


Scenario('can create group', ({ I }) => {
    //login
    //I.amOnPage('http://school-management-system.online:24020');
    I.amOnPage('http://localhost:3000/');
    I.click({id: 'open_drawer'});

    I.fillField('username', 'smsadmin');
    I.fillField('password', 'smsadmin');
    I.click('Sign In');

    //go to student management
    I.see('DASHBOARD FOR ADMIN');
    I.click({id: 'open_drawer'});
    I.click('Student management');
    I.see('Student management');

    //create group
    I.click({id: "manage_groups"});
    I.dontSee('TEST_EG');
    I.fillField(locate({id:'add_new'}), 'TEST_EG');
    //I.click('ADD NEW');
    I.click({id:'submit_new'});
    I.see('TEST_EG');
    //I.click('Student management');
});
Scenario('can create students', ({ I }) => {
    //login
    //I.amOnPage('http://school-management-system.online:24020');
    I.amOnPage('http://localhost:3000/');
    I.click({id: 'open_drawer'});

    I.fillField('username', 'smsadmin');
    I.fillField('password', 'smsadmin');
    I.click('Sign In');

    //go to student management
    I.see('DASHBOARD FOR ADMIN');
    I.click({id: 'open_drawer'});
    I.click('Student management');
    I.see('Student management');

    //Search users for FrontTest (doesn't exist yet)
    I.fillField('Search', 'FrontTest');
    I.pressKey('Enter');
    I.dontSee('FrontTestLN');

    //create FrontTest
    I.click({id:"add_user"});
    I.see('Create new student');
    I.fillField('firstName', 'FrontTest');
    //I.fillField('middleName', 'FrontTestMN');
    I.fillField('lastName', 'FrontTestLN');
    I.fillField('pesel', '00000000000');
    I.fillField('email', 'fronttest@sms.com');
    I.click('Submit');

    //search for FrontTest
    I.fillField('Search', 'FrontTest');
    I.pressKey('Enter');
    I.see('FrontTestLN');
});
