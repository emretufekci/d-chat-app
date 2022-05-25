import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';


// Database
export const db = GUN({
    peers: [
      'http://localhost:3030/gun'
    ]
  });
  
// Gun User
export const user = db.user().recall({sessionStorage: true});

// Current User's username
export let gunUsername = ""

user.get('alias').on(v => gunUsername.set(v))

db.on('auth', async(event) => {
    const alias = await user.get('alias'); // username string
    gunUsername = alias
    console.log(`signed in as ${alias}`);
});