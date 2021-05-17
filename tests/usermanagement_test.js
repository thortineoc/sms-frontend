Feature('usermanagement');

Scenario('can login to admin account and logout', ({I}) => {
    //homepage
    //I.amOnPage('http://school-management-system.online:24020');
    I.amOnPage('http://localhost:3000/');
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
    I.see('Welcome');
});

Scenario('can create and delete group', ({I}) => {
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
    I.fillField(locate({id: 'add_new'}), 'TEST_EG');
    I.click({id: 'submit_new'});
    I.see('TEST_EG');

    //delete group
    I.click({id: "delete_TEST_EG"});
    I.dontSee('TEST_EG');
});

Scenario('can create and delete student', ({I}) => {
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
    I.click({id: "add_user"});
    I.see('Create new student');
    I.fillField('firstName', 'FrontTest');
    I.fillField('lastName', 'FrontTestLN');
    I.fillField('pesel', '00000000000');
    I.fillField('email', 'fronttest@sms.com');
    I.click('Submit');

    //search for FrontTest
    //I.fillField('Search', 'FrontTest');
    //I.pressKey('Enter');
    I.see('FrontTestLN');

    //delete FrontTest
    I.click({id: "s_00000000000"});
    I.waitForClickable({id: 'delete'});
    I.see('Personal information');
    I.click({id: 'delete'});
    I.see('Are you sure that you want to delete this account?');
    I.click({id: 'yes'});
    I.wait(5);
    I.dontSee('FrontTestLN');
});

Scenario('can filter students', ({I}) => {
    //login
    //I.amOnPage('http://school-management-system.online:24020');
    I.amOnPage('http://localhost:3000/');
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
    I.see('2A');
    I.click({id: 'filter_users'});
    //I.fillField('email', '@sms');
    I.fillField('group', '1B');
    I.click({id: 'apply'});
    I.wait(5);
    I.dontSee('2A');

    //reset filters
    I.click({id: 'filter_users'});
    I.click({id: 'reset'});
    I.see('2A');
});

Scenario('can change displayed columns', ({I}) => {
    //login
    //I.amOnPage('http://school-management-system.online:24020');
    I.amOnPage('http://localhost:3000/');
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
