# Capstone2_EnjoyTheOutdoors - Richard Perez

#### Enjoy the outdoors project includes:
1. [Home Page](home.html)  
 Random content, used grid-layout system to organize it
2. [National Parks Page](nationalparks.html)  
 I gave the user three options to get a list of parks:
    * Search by location  
     The user gets a list of all US states and once they click on one option all parks from that state are shown 
    * Search by park types  
     User is given a list of park descriptions and what's returned is a list of parks that _**contains** that option_  
    * View all  
3. [Mountains Information Page](mountainsinfo.html)  
 User is given a list of 48 mountains and once they click on an option -> details of that mountain are shown, including an image and sunrise/sunset UTC times  
 **I used some fetch method for the sunset/sunrise, advance stuff for me _(at least for now)_**

## Issues I've faced
1.  [National Parks Page](nationalparks.html) - Search by Park  
**Honestly I'm a bit confused with that one since I found one park that doesn't specifically have the description all together in it's name; _but it has parts of it_**  
        Example: Part of the name is: _National Historical Park_  
        The closest options given are:
    * National Park
    * Historic
    * National Monument   
**What did I do:** I converted each of the selected options into an array using _split()_ and compared each word from the selected option with each word from the park name...

2. [Mountains Information Page](mountainsinfo.html) - Sunset/Sunrise times  
    I don't know the _fetch technique_ yet I still used it. The problem was that I couldn't find a way to call the _fetch method_, get the intended output only and repeat that with the other time. **I wanted to use a for loop** 
    **What did I do** I didn't fix it... Well, it's working fine _but_ is not how I originally wanted to code it. The solution was to create 2 rows, 4 cells, call the method twice separately, not in a loop. I don't know how the _.then()_ method works too.
3. [Mountains Information Page](mountainsinfo.html) - Formatting Names  
    I don't know exactly how to name the problem and that was the best I got. Anyways, I decided to add an if statement for when the for loop reaches the "effort" property. The problem was that, because of that if statement, the coordinates property wasn't rendered properly.  
    **What did I do** Added an else before the if... Therefore _else if_ . I spent around 30 minutes trying to figure this out and thought it had to said here. 
4. [National Parks Page](nationalparks.html) - Converting to accordion components  
    There were many problems I've faced within the day I took to do this. But nothing crazy. I'll just list them:  
    * How to make insert data-bs-toggle/target attributes to the programmatically created elements
    *  How to layout the details of the park inside that accordion item
    * How to shorten the amount of steps to add the details inside the accordion items(_now that I think of it, I haven't solved this one..._)
### UPDATES _(any changes)_
1. 11/15/2022: [Mountains Information Page](mountainsinfo.html)  
    **Previously** a table would render once the user clicked an option and the image would appear at the bottom of that table  
    **Now** I changed how the details of the mountain would be shown; I used the Bootstrap card component to do that. I created the elements programmatically, had a conditional for each of the mountain objects so that I controlled the layout
2. 11/17/2022: [National Parks Page](nationalparks.html)  
    **Previously** a table would display once an option is clicked. Each park would show up per row, and it's details were placed in each column, that row  
    **Now** I used the accordion component. Each park is now an accordion item and there is more _**CLICKING for the user!**_. You think they're tired of too much clicking? Anyways, I also added a bit of extra information(_inspiration from Google_) that justs tells how long it took the computer to find all. I added a responsive table inside each accordion items. The name property is the heading of that accordion item
3. [National Parks Page](nationalparks.html) - Park Type Search  
    I think I mentioned that I was confused about what parks to include in the park type search. 
    **Previously** I included any park that contained _any_ of the words from the selected options (because there are 4 options that are 2 words):
    * National Parks
    * National Monuments
    * Recreational Area
    * Scenic Trail  

    Any park that included any of those two words would be displayed
    **Now** I changed it with 4 lines of code, two more if conditionals, 1 new variable and the infamous **break**. Basically, if the selected option is two words test the variable, if it passes -> increment it, break and run again for the second word. Basically, don't create the accordion unless the park type is just one word. Test the second word to make sure that **BOTH** words are included. Now that I think of, I'm pretty sure this is what they meant... _the more you know_