Feature('cleanup');

Scenario('remove test user', ({I}) => {
    //login
    //I.amOnPage('http://school-management-system.online:24020');
    I.amOnPage('http://localhost:24010/');
    I.click({id: 'open_drawer'});

    //login
    I.fillField('username', 'smsadmin');
    I.fillField('password', 'smsadmin');
    I.click('Sign In');

    //go to student management
    I.see('DASHBOARD FOR ADMIN');
    I.click({id: 'open_drawer'});
    I.click('Student management');
    I.see('Student management');

    //delete user
    I.click({id: 'filter_users'});
    I.fillField('firstName', 'FrontTest');
    I.click({id: 'apply'});
    I.see('FrontTestLN');
    I.click({id: 's_00000000000'});
    I.see('Personal information');
    I.click({id: 'delete'});
    I.click({id: 'yes'});
});

Scenario('delete test group', ({I}) => {
    //login
    //I.amOnPage('http://school-management-system.online:24020');
    I.amOnPage('http://localhost:24010/');
    I.click({id: 'open_drawer'});

    //login
    I.fillField('username', 'smsadmin');
    I.fillField('password', 'smsadmin');
    I.click('Sign In');

    //go to student management
    I.see('DASHBOARD FOR ADMIN');
    I.click({id: 'open_drawer'});
    I.click('Student management');
    I.see('Student management');

    //delete group
    I.click({id: "manage_groups"});
    I.see('TEST_EG');
    I.click({id: "delete_TEST_EG"});
    I.wait(5);
    I.dontSee('TEST_EG');
});


Scenario('remove test teacher', ({I}) => {
    //login
    //I.amOnPage('http://school-management-system.online:24020');
    I.amOnPage('http://localhost:24010/');
    I.click({id: 'open_drawer'});

    //login
    I.fillField('username', 'smsadmin');
    I.fillField('password', 'smsadmin');
    I.click('Sign In');

    //go to student management
    I.see('DASHBOARD FOR ADMIN');
    I.click({id: 'open_drawer'});
    I.click('Teacher management');
    I.see('Teacher management');

    //delete user
    I.click({id: 'filter_users'});
    I.fillField('firstName', 'testTeacher');
    I.click({id: 'apply'});
    I.see('testTeacherLN');
    I.click({id: 't_88888888888'});
    I.see('Personal information');
    I.click({id: 'delete'});
    I.click({id: 'yes'});
});