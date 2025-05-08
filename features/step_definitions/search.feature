Feature: Successful ticket booking

  Scenario: Booking a standard chair
    Given user opened the movie schedule page
    When user selects the standard chair for the film
    And user reserves the chair
    Then user should see the confirmation message "Вы выбрали билеты:"

  Scenario: Booking a VIP chair
    Given user opened the movie schedule page
    When user selects the VIP chair for the film
    And user reserves the chair
    Then user should see the confirmation message "Вы выбрали билеты:"

 Scenario: User tries to select an unavailable movie
    Given user opened the movie schedule page
    When user try to select an unavailable movie
    Then user should remain on the movie selection page and see "Сталкер"