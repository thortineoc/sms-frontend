Feature('homeworks');


Scenario('teacher can add and edit homeworks', ({ I }) => {
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
    I.see('1A');
    I.click({id: 'tree_1A'});
    I.see('codecept-test-title');
    I.click({id: 'tree_codecept-test-title'});
    I.see('Homework details');

    //change homework description
    I.click({id: 'homework_description'});
    I.see('Modify assignment')
    I.clearField('description' );
    I.fillField('description', 'New-homework-description');
    I.click({id: 'Save'} );
});


Scenario('student can add answers', ({ I }) => {
    //login
    //I.amOnPage('http://school-management-system.online:24020');
    I.amOnPage('http://localhost:3000/');
    I.click({id: 'open_drawer'});

    I.fillField('username', 's_12368957894');
    I.fillField('password', 'JemmFitz');
    I.click('Sign In');

    I.see('DASHBOARD FOR STUDENT');
    I.click({id: 'open_drawer'});
    I.click('Homework');

    //add answer
    I.waitForElement({id: 'tree_Biology'}, 30);
    I.click({id: 'tree_Biology'});
    I.see('codecept-test-title');
    I.click({id: 'tree_codecept-test-title'});

    I.see('Homework details');
    I.see('codecept-test-title');
    I.see('New-homework-description');
    I.see('Upload your answer');

    //try to send empty answer
    I.click({id: 'Submit'});
    I.see('You need to upload a file');

});


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

    I.click({id: 'tree_Biology'});
    I.see('1A');
    I.click({id: 'tree_1A'});
    I.see('codecept-test-title');
    I.click({id: 'tree_codecept-test-title'});
    I.see('Homework details');

    I.click('Delete');
    I.see('Are you sure that you want to delete this assignment?');
    I.click('Yes');
    I.see('ADD NEW');
});




