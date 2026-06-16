Feature: Login

  Scenario: User logs into application
    Given User opens the login page
    When User enters email "tradahenish94@gmail.com"
    And User enters password "HeNiSh94"
    And User clicks Login button
    Then User should see dashboard

  Scenario: User purchases a product successfully
    Given User is logged in
    When User adds product "ZARA COAT 3" to cart
    And User opens cart page
    Then Product "ZARA COAT 3" should be visible in cart
    When User proceeds to checkout
    And User selects country "India"
    And User places the order
    Then Order should be placed successfully
