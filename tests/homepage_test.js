Feature('homepage');

Scenario('test something', ({ I }) => {
    I.amOnPage('http://52.142.201.18:24020/');
    I.see('School Management System');
});
