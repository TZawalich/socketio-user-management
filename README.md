# Socket.io User Management

## Description
A more robust method of handling socket.io users without needing a database. 

Socket.io connections are tracked using socket IDs assigned to each connection. It's great for the system, but tricky to manually keep track of for your applications. These scripts let you pin the ID to other data such as usernames, rooms, etc. for easy calling and use.

**
Designed for multiple user rooms AND for various games users may be playing. 
Remove references to games if unnessary for user management.
You can also change games to some other sort of data type/ validation check. Or not, I dunno, I'm not the boss of you.
You're still going to need to build up a games array/method of controlling the game data.
Feel free to check out the full setup in my tavern games repo 
**
## How to Use
- On socket.join, call the addUser function with the relevant data to push the user into the users array
   - Collect the data from a form or whatever input you like 
   - Make sure the room from the addUser function is then used in the socket.join(room) function.  
- The removeUser, getUser, and getUsersInRoom functions are hopefully self explanitory and require a user to have been pushed into the users array before being called.
- removeUser should be called within a socket.on('disconnect') call in order to properly remove a user from the users array when they disconnect from the server. 
- Having an easily searchable and updatable array of users, their IDs and accompanying data makes for a much cleaner experience managing rooms, and tracking who is doing what on your site or webapp.
