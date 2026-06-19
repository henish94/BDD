@abhi
Feature: AbhiBus Search and Booking

  @smoke
  Scenario: Search buses and proceed to payment QR

    Given User opens AbhiBus home page

    When User sets from "Ahmedabad" and to "Mumbai"
    And User selects date "25"
    And User clicks search
    Then User should be navigating to Bus selection page
    And Boarding Points tab should be selected by default
    
    When User selects boarding point Iskcon Circle
    And User opens Dropping Points tab
    And User selects dropping point Andheri East
    And User filters buses by AC
    And User selects seat number 2
    And User selects bus boarding location
    And User selects bus dropping location
    Then User should be navigated to Passenger Information page

    When User closes login popup if visible
    And User selects Secure addon if available
    And User fills passenger information from database
    Then User should be navigated to Payment page

   
    When User selects UPI payment option
    And User generates QR code
    Then Payment QR code should be visible