# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Gevork Manukyan**

Time spent: **23.7** hours spent in total

Link to project: https://glitch.com/edit/#!/jazzy-quill-burglar

## Required Functionality

The following **required** functionality is complete:

* [✔] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [✔] "Start" button toggles between "Start" and "Stop" when clicked. 
* [✔] Game buttons each light up and play a sound when clicked. 
* [✔] Computer plays back sequence of clues including sound and visual cue for each button
* [✔] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [✔] User wins the game after guessing a complete pattern
* [✔] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [✔] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [✔] Buttons use a pitch (frequency) other than the ones in the tutorial
* [✔] More than 4 functional game buttons
* [✔] Playback speeds up on each turn (Dynamic Difficulty)
* [✔] Computer picks a different pattern each time the game is played
* [✔] Player only loses after 3 mistakes (instead of on the first mistake)
* [✔] Game button appearance change goes beyond color (e.g. add an image)
* [✔] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [✔] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [✔] Menu buttons disabled during game session
- [✔] Buttons disabled during computer playback, and re-enabled during player's turn
- [✔] Health bar that displays how many chances player has left
- [✔] Dropdown menu for selecting a button amount (4 to 8 buttons possible at a time)
- [✔] Dropdown menu for selecting a difficulty setting (Easy, Medium, Hard, Dynamic)
- [✔] Multiple difficulty levels to choose from, each with specific timer length, pattern length, and playback speed.
- [✔] Dropdown menu for selecting a sound theme (Melody, Pokemon, Nintendo)
- [✔] Multiple sound themes each with their own set of sounds and button icons when pressed
- [✔] Turn Status indicator that indicates when the player should wait for the playback and when to start pressing buttons
- [✔] Fixed sound/image stuck bug that happened when player clicked, draged off game button, then let go

## Video Walkthrough

Here's a walkthrough of implemented user stories:
![](https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2FMemory_Game.gif?v=1616540233730)


## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

    #### HTML/CSS
      * https://www.freecodecamp.org/news/how-to-keep-your-footer-where-it-belongs-59c6aa05c59c/  

      * https://www.w3schools.com/css//css3_buttons.asp  

      * https://www.w3schools.com/csSref/css_selectors.asp  

      * https://cssreference.io/  

      * https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes  

      * https://upload.wikimedia.org/wikipedia/commons/7/7a/Boxmodell-detail.png  
 
      * https://www.w3schools.com/cssref/css_units.asp  

      * https://www.w3schools.com/cssref/css3_pr_box-shadow.asp  

      * https://www.w3schools.com/cssref/pr_pos_z-index.asp  

      * https://www.w3schools.com/cssref/css_selectors.asp  

      * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys  

      * https://stackoverflow.com/  
  
  
    #### Images/Sounds  
      * http://www.realmofdarkness.net/sb/  

      * https://www.101soundboards.com/boards/10990-sonic-the-hedgehog-sounds#  

      * https://freepngimg.com/  


    #### Colors  
      * https://www.rapidtables.com/web/css/css-color.html  

      * https://www.canva.com/colors/color-wheel/  



2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

      What had to be my biggest challenge in creating this submission was understanding how different HTML elements worked and interacted together, along with their CSS properties. Before this project, 
      I was someone who knew fairly little about HTML and CSS, which is why it took me some extra time to get acquainted with the different parts. Before I started coding anything significant, I decided 
      to read about HTML and CSS to get familiar with the languages. I had to inform myself about HTML tags and their functions. I read about different tags and how they are used in tandem to create a 
      webpage, but more importantly, I learned a few good tagging practices to use in my project. Two of these good practices were the use of a page container and a content wrap, which both gave me better 
      flexibility in the layout of my webpage. Something else I learned that aided me in understanding the inner workings of a webpage was the CSS Box Model. After learning about the CSS Box Model I felt
      more confident while working on the project, because the model defined the rules that which the elements in HTML worked and provided context to the code. The Box Model gave me a better visual 
      understanding of the different CSS rules and properties and how they are represented on the page, in turn giving me a better grasp of the page's layout. The page's layout; if I had to put it simply,
      this was the hardest hurdle to overcome. A webpage's layout, I've learned, is the blueprint to a website. A good blueprint will result in a good product, while bad blueprint will result in a poor one.
      Thus, to overcome this hurdle I spent lots of my time learning how to create a good blueprint, using various online sources and through much trial and error. And though I have not mastered this skill,
      I do believe that I have grown substantially compared to when I started.
    


3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 

      * What are some strategies and tactics one can use to plan out a page layout?  
      * What are some tools to help with planning out a webpage?  
      * What are some helpful HTML good practices that are helpful to know?  
      * What are some ways to better organize HTML and CSS code?  


4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 

      If I had more time to work on this project there are quite a few things I had in mind to change. Firstly, I would clean up my JavaScript coding by creating multiple files for related functions as well as make some 
      classes to add more flexibility and better understanding to my code. I would also work on the asthetics of my webpage, creating a better design and adding a more cleaner looking user interface. I would change the 
      text layout and design to add more diversity to the page and experient with different color themes. Functionality-wise, I would add more sound themes to choose from along with customized buttons for each theme. 
      I would also add a random theme option which takes all the possible themes/sounds and randomly assigns one to each button. To go off the last statement, there could also be a select randomness, which is similar to the 
      previously mentioned randomness, but instead the player can filter which themes they want to be mixed together. In terms of gameplay, I would add another game mode where the timer carries over between sequences. I would 
      also add a game mode where the pattern is infinetly generated and the player has to see how far they can go before losing. Joined with this I could add a leaderboard system that keeps track of peoples' records. 


## License

    Copyright Gevork Manukyan

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.