Feature('grades');

Scenario('teacher can see grades', ({I}) => {
    //login
    I.amOnPage('http://school-management-system.online');
    //I.amOnPage('http://localhost:3000/');
    I.click({id: 'open_drawer'});

    I.fillField('username', 't_12345678909');
    I.fillField('password', 'testtest');
    I.click('Sign In');

    //go to grades view
    I.see('DASHBOARD FOR TEACHER');
    I.click({id: 'open_drawer'});
    I.see('Grades');
    I.click('Grades');

    //select subject and group
    I.click({id: 'selectSubjects'});
    I.click({id: 'vBiology'});
    I.click({id: 'selectGroups'});
    I.click({id: 'v1A'});

    //see grades and grades details
    I.waitForElement({id: 'grade_3'}, 30);
    I.moveCursorTo({id: 'grade_3'});
    I.see('2021-05-06');
});


Scenario('teacher can add, update an delete grades', ({I}) => {
    //login
    I.amOnPage('http://school-management-system.online');
    //I.amOnPage('http://localhost:3000/');
    I.click({id: 'open_drawer'});

    I.fillField('username', 't_12345678909');
    I.fillField('password', 'testtest');
    I.click('Sign In');

    //go to grades view
    I.see('DASHBOARD FOR TEACHER');
    I.click({id: 'open_drawer'});
    I.see('Grades');
    I.click('Grades');

    //select subject and group
    I.click({id: 'selectSubjects'});
    I.click({id: 'vBiology'});
    I.click({id: 'selectGroups'});
    I.click({id: 'v1A'});

    //add new grade
    I.waitForElement({id: 'add_REGULAR_7b27c5d9-15e5-4766-b13f-a78831bd92c6'}, 30);
    I.click({id: 'add_REGULAR_7b27c5d9-15e5-4766-b13f-a78831bd92c6'});
    I.see('Add grade');
    I.fillField('grade', '5');
    I.fillField('description', 'codeceptjs test description');
    I.click('Add');
    I.moveCursorTo({id: 'grade_5'});
    I.see('codeceptjs test description');

    //update grade
    I.click({id: 'grade_5'});
    I.see('Modify grade');
    I.clearField('description');
    I.fillField('description', 'new test description');
    I.click('Save');
    I.moveCursorTo({id: 'grade_5'});
    I.see('new test description');

    //delete grade
    I.click({id: 'grade_5'});
    I.see('Modify grade');
    I.click('Delete');
    I.dontSeeElement({id: 'grade_5'});
});

Scenario('student can see grades', ({I}) => {
    //login
    I.amOnPage('http://school-management-system.online');
    //I.amOnPage('http://localhost:3000/');
    I.click({id: 'open_drawer'});

    I.fillField('username', 's_12368957894');
    I.fillField('password', 'JemmFitz');
    I.click('Sign In');

    I.see('DASHBOARD FOR STUDENT');
    I.click({id: 'open_drawer'});
    I.see('Grades');
    I.click('Grades');

    I.seeElement({id: 'grade_3'});
    I.moveCursorTo({id: 'grade_3'});
    I.see('2021-05-06');
});