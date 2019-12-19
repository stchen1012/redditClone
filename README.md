# redditClone

Welcome to the redditClone! redditClone is a website with similar functionalities to Reddit. On this website users will have the ability to create posts, comment on a posts and delete comments once they are logged in. Users who are not logged in or signed up will have the ability to view all posts from other users. This application has a simple, streamlined and user-friendly interface.

## Table of Contents
* [Project Deliverables and Timeline](#project-deliverables-and-timeline)
* [Technologies Used](#general-approach)
* [General Approach](#general-approach)
* [User stories](#user-stories)
* [Website](#website)

## Project Deliverables and Timeline

9/24
Planning Phase
-	User stories
-	Mock ups
-	Discussion of project features and deliverables

9/25
-	Add user login/sign up functionalities
-	Create landing page for users that loads all posts 
-	Added in buttons and checks for which buttons to be displayed when user is logged in

9/26
-	Add post creation functionality 
-	Add obtaining individual user posts
-	Add CSS

9/27
-	Add comment creation functionality
-	Add comment deletion functionality
-	Add more CSS

9/28
-	Readme

## Technologies Used
-	JavaScript, HTML, CSS - utilized VSCode to build, edit, and troubleshoot our code
-	Bootstrap - CSS
-	Git / GitHub - to host our code for version control and a shared working repository
-	Pivotal Tracker - to write user stories and keep track of the technical requirements

## General Approach

We took a collaborative and systematic approach to ensure that all the core functionalities were implemented on a simple user interface. We began with the planning phase, sketching out our ideas, reviewing the features to be included, and developing a deliverables timeline. We also agreed to implement Bootstrap so that we could focus more on coding the technical requirements of the website.

A few of the challenges that we encountered and how we resolved those issues:
-	Initially we began with one massive JavaScript file that contained all the code and functions for various pages. This began to become problematic as some of the technical requirements were difficult to implement with so many event listeners and function calls all on the same page. This approach also took extra time to troubleshoot when looking through the code so ultimately we moved split up the one JS file to multiple JS files matching their html page counterparts.
-	Figuring out how to store the JSON token so that the user profile would be authenticated and the user would be allowed to delete and create posts and comments. We resolve this by using session and session storage.
-	Another challenge was figuring out how to obtain the specific data associated the form the user was interacting with, as we had multiple forms loaded on the same page. This was resolved by retrieving the information from the event.
-	Figuring out how to display the comment(s) associated with the specific post. Although the code was set up in such a way to help facilitate this functionality by already including the specific post ids with each post and passing through the post id to the fetch comments call, there was difficulty rendering the comment. We resolved this by storing the post id as a variable and manipulating the DOM with this id.
-	General GitHub issues when committing and pulling code.

Once we finished coding the main functionalities, the code was reviewed to remove redundancies and features tested to ensure that they were working properly. 

## User stories
Link:   https://www.pivotaltracker.com/n/projects/2400338

## Website
Home Page

![alt text](https://github.com/stchen1012/redditClone/blob/master/HomePage.png)

Sign Up
![alt text](https://github.com/stchen1012/redditClone/blob/master/Sign%20up.png)

See post
![alt text](https://github.com/stchen1012/redditClone/blob/master/See%20Post.png)
