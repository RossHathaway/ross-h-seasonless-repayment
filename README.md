# ross-h-seasonless-repayment
allow users to upload excel spreadsheets of farmers' repayments to see which seasons the payments will be applied to.
Current response is JSON data only.

Current project status

Not completed; has some of the logic working in the snippet I provided, but when I started working on applying extra money left over after all credits have been paid off to the most recent season, some of the logic that had worked previously stopped working.

All I send back to the client is JSON data of the transactions that will be applied, but I do have the previous state of the outstanding credits for farmers in the uploaded document ready to send as well.

There is a form for users to upload excel docs, and I read those on the server.

There is also an SQLite database. Earlier, I had a seeding script that could add the example data from the spreadsheet provided, but I ended up changing to a different driver and was not able to seed the database with that. Right now, the database will be created automatically when the server is run, but it does not have data. I had to copy and paste the SQL commands into the command line to add the example data.

Estimate on the outstanding work: 3 good work days to get do a decent MVP including seeding database automatically.

Successes/what went well
I learned more about/reviewed promises when I was trying to use promises with a database driver that did not support them.

I noticed I was thinking about how to organize my code more. I know there is much to be desired for the code I wrote more recently because I was hurrying, but earlier on I did better than I have done before with code organization.

Bumps/what you wished went better
Time management - I ended up getting stuck on a few bugs that I could have just left for later or made a quick workaround instead of trying to really understand the problem and fix it, and I did not finish the MVP because of that.

How you would improve your approach in future projects
I would have to remind myself that I should have a very basic, working solution before getting too involved in details.

Improvements/enhancements to this project for future consideration
- finishing MVP
- tests
- keeping track of debts in database so I can look them up instead of calculating each time.
- use sessions to check with user before persisting changes in database
- allow users to set time of year that will automatically apply payments to current season
- allow user to download excel file of changes
- code abstraction / organization for better readability
