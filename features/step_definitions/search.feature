Feature: ticket reservation
    Scenario: The user books a standard seat and receives an electronic ticket
    Given user opened the movie schedule page
    When user selects Thursday and a movie
    And user selects an empty seat
    And user confirms the reservation
    And user clicks get the code
    Then user sees the text "Электронный билет"

    Scenario: The user books a vip seat and receives an electronic ticket
    Given user opened the movie schedule page
    When user selects Friday and a movie
    And user selects an empty seat vip
    And user confirms the reservation
    And user clicks get the code
    Then user sees the text "Электронный билет"

    Scenario: The user books a reserved chair VIP
    Given user opened the movie schedule page
    When user selects Sunday and a movie
    And user selects an empty vip chair
    And user confirms the reservation
    And user clicks get the code
    Then user sees the text "Электронный билет"
    When the user returns to the booking page and selects the same Sunday and movie
    Then the VIP chair should be disabled for reservation