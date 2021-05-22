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
    I.fillField('title', 'codecept-test-title');
    I.fillField('description', 'codecept test description');
    I.click({id: 'mui-component-select-group'});
    I.see('1A');
    I.click({id: 'v1A'});
    I.click({id: 'mui-component-select-subject'});
    I.see('Biology');
    I.click({id: 'vBiology'});
    I.click('Add');

    //check homework details
    I.see('User profile');
    I.click({id: 'tree_Biology'});
    I.click({id: 'tree_1A'});
    I.click({id: 'tree_codecept-test-title'});
    I.see('Homework details');

});
