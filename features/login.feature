Feature: Allow user to login so that the user can view their colleges
    Scenario: User logs in and views their colleges
      Given user enters their email and password
      When the user clicks login
      Then "/login/email/test@gmail.com/password/testpass" is returned as the url