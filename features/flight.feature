@flight
Feature: Flight booking
  
  @smoke
  Scenario Outline: Start flight booking flow
    Given the user is on the AbhiBus homepage
    When the user opens the Flights tab
    And the user selects origin "<originCity>" and "<originAirport>"
    And the user selects destination "<destinationCity>" and "<destinationAirport>"
    And the user selects departure date "<departureDate>"
    And the user selects "<adultsCount>" adult traveller
    And the user searches flights
    Then the user should see flight search results

    Examples:
      | originCity | originAirport                                  | destinationCity | destinationAirport              | departureDate          | adultsCount |
      | Ahmedabad  | Sardar Vallabhbhai Patel International Airport | Mumbai          | Mumbai, Maharashtra, India      | June 25, 2026          | 4           |