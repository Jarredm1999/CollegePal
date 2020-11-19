Feature: Allow the user to signup and view their selected colleges
    Scenario: User signs in and views their colleges
      Given user enters their email, password, and name
      When the user clicks next
      Then "/signup/email/test@gmail.com/password/testpass/name/test user" is returned as the signup url