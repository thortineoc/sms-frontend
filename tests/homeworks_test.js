Feature('homeworks');

Scenario('teacher can add homeworks', ({ I }) => {
    //login
    //I.amOnPage('http://school-management-system.online:24020');
    I.amOnPage('http://localhost:3000/');
    I.click({id: 'open_drawer'});

    I.fillField('username', 't_12345678909');
    I.fillField('password', 'testtest');
    I.click('Sign In');

    I.see('DASHBOARD FOR TEACHER');
    I.click({id: 'open_drawer'});
    I.click('Homework');

    //try to add empty homework
    I.click('Add new');
    I.click('Add');
    I.see('Add assignment');
    I.see('Required');

    //add test homework
    I.fillField('title', 'codecept test title');
    I.fillField('description', 'codecept test description');
    I.fillField('group', '1A');
    I.fillField('subject', 'Biology');




});
