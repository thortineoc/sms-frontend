Feature('usermanagement');

Scenario('can login to admin account and logout', ({I}) => {
    //homepage
    I.amOnPage('http://school-management-system.online:24020');
    //I.amOnPage('http://localhost:24010/');
    I.click({id: 'open_drawer'});
    I.see('Sign in to your account');
    I.fillField('username', 'smsadmin');
    I.fillField('password', 'smsadmin');
    I.click('Sign In');

    //admin dashboard
    I.see('School Management System');
    I.see('DASHBOARD FOR ADMIN');
    I.click({id: 'open_drawer'});
    I.see('User profile');
    I.see('Dashboard');
    I.see('Student management');
    I.see('Teacher management');
    I.see('Timetable management');
    I.see('Log out');

    //homepage again
    I.click('Log out');
    I.see('School Management System');
    //I.see('Welcome');
});

Scenario('can create group', ({I}) => {
    //login
    I.amOnPage('http://school-management-system.online:24020');
    //I.amOnPage('http://localhost:24010/');
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
    I.fillField(locate({id: 'add_new'}), 'TEST_EG');
    I.click({id: 'submit_new'});
    I.see('TEST_EG');
    I.fillField(locate({id: 'add_new'}), 'TEST_FG');
    I.click({id: 'submit_new'});
    I.see('TEST_FG');

    //delete group
/*    I.click({id: "delete_TEST_EG"});
    I.dontSee('TEST_EG');*/
});

Scenario('can create student', ({I}) => {
    //login
    I.amOnPage('http://school-management-system.online:24020');
    //I.amOnPage('http://localhost:24010/');
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
    I.click({id: "add_user"});
    I.see('Create new student');
    I.fillField('firstName', 'FrontTest');
    I.fillField('lastName', 'FrontTestLN');
    I.fillField('pesel', '00000000000');
    I.fillField('email', 'fronttest@sms.com');
    I.click('Submit');

    I.click({id: "add_user"});
    I.see('Create new student');
    I.fillField('firstName', 'Front1Test');
    I.fillField('lastName', 'Front1TestLN');
    I.fillField('pesel', '11111111111');
    I.fillField('email', 'front1test@sms.com');
    I.click('Submit');
    //search for FrontTest
    I.fillField('Search', 'FrontTest');
    I.pressKey('Enter');
    I.see('FrontTestLN');

});

Scenario('can filter students', ({I}) => {
    //login
    I.amOnPage('http://school-management-system.online:24020');
    //I.amOnPage('http://localhost:24010/');
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

    //filter students by email
    I.click({id: 'filter_users'});
    //I.fillField('email', '@sms');
    I.fillField('firstName', 'FrontTest');
    I.click({id: 'apply'});
    I.wait(5);
    I.dontSee('11111111111');
    I.click({id: 'filter_users'});
    I.clearField('firstName');
    I.fillField('firstName', 'Front1Test');
    I.click({id: 'apply'});
    I.wait(5);
    I.see('11111111111');

    //reset filters
    I.click({id: 'filter_users'});
    I.click({id: 'reset'});
});

Scenario('can change displayed columns', ({I}) => {
    //login
    I.amOnPage('http://school-management-system.online:24020');
    //I.amOnPage('http://localhost:24010/');
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

    //check displayed columns
    I.see('First Name');
    I.see('Last Name');
    I.see('Group');
    I.see('Pesel');
    I.see('Username');
    I.dontSee('Middle Name');
    I.dontSee('E-mail');
    I.dontSee('Phone');
    I.dontSee('ID');

    //completly change displayed columns
    I.click({id: 'columns'});
    I.click({name: '0'});        //First Name
    I.click({name: '1'});        //Middle Name
    I.click({name: '2'});        //Last Name
    I.click({name: '3'});        //E-mail
    I.click({name: '4'});        //Phone
    I.click({name: '5'});        //Group
    I.click({name: '6'});        //Pesel
    I.click({name: '7'});        //Username
    I.click({name: '8'});        //ID
    I.click({id: "apply"});

    //check if displayed columns changed
    I.dontSee('First Name');
    I.dontSee('Last Name');
    I.dontSee('Group');
    I.dontSee('Pesel');
    I.dontSee('Username');
    I.see('Middle Name');
    I.see('E-mail');
    I.see('Phone');
    I.see('ID');
});

Scenario('can delete student', ({I}) => {
    //login
    I.amOnPage('http://school-management-system.online:24020');
    //I.amOnPage('http://localhost:24010/');
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
    I.fillField('firstName', 'Front1Test');
    I.click({id: 'apply'});
    I.see('Front1TestLN');
    I.click({id: 's_11111111111'});
    I.see('Personal information');
    I.click({id: 'delete'});
    I.click({id: 'yes'});
});

Scenario('can delete group', ({I}) => {
    //login
    I.amOnPage('http://school-management-system.online:24020');
    //I.amOnPage('http://localhost:24010/');
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
    I.see('TEST_FG');
    I.click({id: "delete_TEST_FG"});
    I.wait(5);
    I.dontSee('TEST_FG');
});

Scenario('can create teacher', ({I}) => {
    //login
    I.amOnPage('http://school-management-system.online:24020');
    //I.amOnPage('http://localhost:24010/');
    I.click({id: 'open_drawer'});

    I.fillField('username', 'smsadmin');
    I.fillField('password', 'smsadmin');
    I.click('Sign In');

    //go to student management
    I.see('DASHBOARD FOR ADMIN');
    I.click({id: 'open_drawer'});
    I.click('Teacher management');
    I.see('Teacher management');

    //create teacher
    I.click({id: "add_user"});
    I.see('Create new teacher');
    I.fillField('firstName', 'testTeacher');
    I.fillField('lastName', 'testTeacher');
    I.fillField('pesel', '88888888888');
    I.fillField('email', 'testteacher@sms.com');
    I.click('Submit');

});