// Generated from: features/login.feature
import { test } from "playwright-bdd";

test.describe('Login', () => {

  test('User logs into application', async ({ Given, When, Then, And, page }) => { 
    await Given('User opens the login page', null, { page }); 
    await When('User enters email "tradahenish94@gmail.com"', null, { page }); 
    await And('User enters password "HeNiSh94"', null, { page }); 
    await And('User clicks Login button', null, { page }); 
    await Then('User should see dashboard', null, { page }); 
  });

  test('User purchases a product successfully', async ({ Given, When, Then, And, page }) => { 
    await Given('User is logged in', null, { page }); 
    await When('User adds product "ZARA COAT 3" to cart', null, { page }); 
    await And('User opens cart page', null, { page }); 
    await Then('Product "ZARA COAT 3" should be visible in cart', null, { page }); 
    await When('User proceeds to checkout', null, { page }); 
    await And('User selects country "India"', null, { page }); 
    await And('User places the order', null, { page }); 
    await Then('Order should be placed successfully', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given User opens the login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When User enters email \"tradahenish94@gmail.com\"","stepMatchArguments":[{"group":{"start":18,"value":"\"tradahenish94@gmail.com\"","children":[{"start":19,"value":"tradahenish94@gmail.com","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"And User enters password \"HeNiSh94\"","stepMatchArguments":[{"group":{"start":21,"value":"\"HeNiSh94\"","children":[{"start":22,"value":"HeNiSh94","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"And User clicks Login button","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then User should see dashboard","stepMatchArguments":[]}]},
  {"pwTestLine":14,"pickleLine":10,"tags":[],"steps":[{"pwStepLine":15,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given User is logged in","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When User adds product \"ZARA COAT 3\" to cart","stepMatchArguments":[{"group":{"start":18,"value":"\"ZARA COAT 3\"","children":[{"start":19,"value":"ZARA COAT 3","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And User opens cart page","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then Product \"ZARA COAT 3\" should be visible in cart","stepMatchArguments":[{"group":{"start":8,"value":"\"ZARA COAT 3\"","children":[{"start":9,"value":"ZARA COAT 3","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When User proceeds to checkout","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"And User selects country \"India\"","stepMatchArguments":[{"group":{"start":21,"value":"\"India\"","children":[{"start":22,"value":"India","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":21,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"And User places the order","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then Order should be placed successfully","stepMatchArguments":[]}]},
]; // bdd-data-end