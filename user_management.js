//array where user data will be stored
const users = []
//array of valid game types 
const gamesArray = ["gamename1","gamename2", "gamename3"]

//addUser -- validates user information and adds them to the users array
//used in the socket.join function when a new socket connects to the server
const addUser = ({id, username, room, game}) => {
    //Clean the data
    //remove white space and escape the user name. It's not saved anywhere, but ya know, it's a quick escape.
    username = encodeURI(username.trim())
    tempRoom = room.trim() //temp stored room for use in checking if it exists later on
    game = game.trim()
    room = game+tempRoom //final room name allows for the same room name as long as the game they're playing is different

    //Validate Data -- check if everything exists and matches required routes/rooms/data
    if(!username || !tempRoom || !game){
        return {
            error: 'Username, Game, and Room are required!'
        }
    }

    //check if the game joined is a valid game title/type
    const realGame = gamesArray.includes(game)
    if(!realGame){
        return{
            error: `This isn't a real game.`
        }
    }

    //check for existing user -- can't have two people using the same username in the same room
    const existingUser = users.find((user)=> {
        return user.room === room && user.username === username
    })
    if(existingUser){
        return{
            error: 'Username is in use!'
        }
    }

    //store user -- everything checks out, push the new user to the users array and return if necessary
    const user = {id, username, room, game}
    users.push(user)
    return{user}
}

//removeUser -- remove the user from the users array and return the removed user object
const removeUser = (id) => {
    const index = users.findIndex((user)=> user.id ===id)

    if(index != -1){
        return users.splice(index, 1)[0]
    }
}

//GetUser -- find a user from their socket ID
const getUser = (id) => {
    return users.find((user)=> user.id === id)
}

//find all users in a room
const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room)
}