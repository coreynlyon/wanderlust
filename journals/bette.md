1/9 

Pushed wanderlust_draft to gitlab and we pulled to the other branches. Today we started on our own features, we were able to divide up the task based on points and I started on tables in migration folder and created queries and routers folder. Did some research on authenticator.


1/10

Completed the users authenticator, users in routers and queries backend (not yet tested), mapped out data structure models and compared mongo and postgres db. I did some research on the databases and continued conversation about which to use with SEIRs and other groups. Was preparing to present to group tomorrow and decide if we want postgres vs. mongodb


1/11

We decided to stick with postgres. The main reason we stuck with postgres is because we may want other users to access CRUD permissions which makes it more expensive for a mongo db. This was a stretch goal and we realize that you can use either databases and we already put in the leg work to create our app with postgres. I completed the authentication codes and am testing it. stayed up til 8:30 with matt and carter to try to trouble shoot and then we called it a day.

1/12

I am testing and trying to troubleshoot authentication. This has been very confusing since I am told one thing and than another. I comparing codes, and testing things on my own. Attended andrew's talk about auth but I was still confused on my errors. It kept saying either hashed_password or email was a atributeError. I couldn't catch what was wrong so i talked to folks who were successful. We put in a code that daniel had in his repo and I reformatted my code. It still did not work...

1/13

Had a one-on-one with andrew, turns out my table and name on users.py was not matching up. Also one of my attributes listed was mislabaled so it was out of index. After fixing the mispellings and errors, it ran succesfully. So creating a user, login, logout, edit, and delete user was working. Get a list of users was not working but we decided we did not need it. I was considering exploring roles to provide viewing access to other users as stated in our MVP.

1/17

Today, I met up with my friend to tackle feature 3 and to map out how it would look with postgres. I was looking at the example by daniel where he created roles and added filters in the routers. I was presented with many different options, I added roles and status to the trip table. I later learned that I haven't thought out why i need status and it seems like more work than necessary. We tried our first merge today with the group, I am starting to getthe process for merging.

1/18

Worked on frontend auth using andrew's new advice and was able to complete signup FE and tracey helped me with testing and updating login form as well. Still dabbling with feature 3, I created a viewers table in hopes of grabbing users email and using trip_id as a foreign key. Plan to meet with james to get second opinion. 

1/19

Met with james, we completed viewers table and still needed to map out how it was going to work. I put this on the back burner for now. I got login/signup fully working on the FE and its in app.js and Nav.js with Tracey's help. It took awhile but we were running into issues while merging and pulling from main. I ended up going to someone else's branch to grab their package-lock json and modules. I did reasearch and readings on how to restrict view and authorize view.

1/20

Worked with Tracey on viewers, I created a whole queries for viewers. We were wondering how to connect the two databases to access users info. we found out we couldn't connect from two different databases, we considered poller. After meeting with Andrew, we discovered it was a security issue and then considered just keeping the table and adding emails that are not restricted to viewers. The issue we ran into is how do we send it to non-users. 

1/23

I completed the unit test for user_service. Tracey and I mapped out how we wanted the viewers table. we got help from matt and added a creator to the trip table. We wanted to add the creator so that we can use it as a filter to grab the creator and id within trips. We decided we wanted to grab email by trip_id and to view trip_ids from an email. It makes sense for the user to be able to view all of their trips that they were invited too as well as their own. We decided we needed to grab emails based on trip_id for creator to view who was added to their trip. I learned out about liveshare today, it was extremely useful.

1/24

Tracey and I met up with James again to resolve our issue from yesterday, we were having trouble with creating trips and getting on trip (401 unauthorized).  I created the logout FE while waiting for help. We moved somethings around in I discoverd we were supposed to use authenticator.get_current_account_data instead of get_current_user. get_current_user forced us to add in an Authorization each time and authenticator.get_current_account_data was a built in function that included the authorization token. 

1/25

Tracey and I pair programmed. From yesterday, I changed the email and user id to to have quotations and brackets. That allowed us to make the conditional statement for add viewers work. We decided to try a stretch goal and allow viewers to update trips and allowing users to get their trips they were invited to but then we ran into another issue. When creating the conditional statements, we were having trouble grabbing the correct [trip id and user id and email]. We kept having positional argument issues and we started messing around with the trips queries and tried to debug by printing and running code. After lunch, we got help from Andrew and discovered that the order matter and we were missing the user id in the queries and router.

1/26

I am testing the endpoints and looking over code Tracey completed. I didn't feel proficient in FE part for hiding the login link and having th logout link appear. Our deployment broke so we are sitting here. I wanted to learn how Tracey added the buttons. I know how to make a page but not proficient enough to manipulate a page on the FE. 