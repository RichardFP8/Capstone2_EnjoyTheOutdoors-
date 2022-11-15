# Capstone2_EnjoyTheOutdoors-Richard Perez

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

### Issues I've faced
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

