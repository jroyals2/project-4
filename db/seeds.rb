Event.destroy_all
User.destroy_all
TailgateEvent.destroy_all



trey = User.create!(
    name: 'Trey',
    email: 'trey@trey.com',
    password: 'password',
    password_confirmation: 'password'
)

james = User.create!(
    name: 'James',
    email: 'james@james.com',
    password: 'password',
    password_confirmation: 'password'
)

falcons = Event.create!(
    event_name: "FALCONS GAME",
    location: "Atlanta, Georgia",
    zipcode: 30308,
    date: "November 11th, 2017",
    teams: "Atlanta Falcons vs Dallas Cowboys"
)

braves = Event.create!(
    event_name: "BRAVES GAME",
    location: "Atlanta, Georgia",
    zipcode: 30339,
    date: "November 30th, 2017",
    teams: "Atlanta Braves vs New York Mets"
)

Event.create!(
    event_name: "WARRIORS GAME",
    location: "Oakland, California",
    zipcode: "94621",
    date: "December 23rd, 2017",
    teams: "Golden State Warriors vs Boston Celtics"
)
Event.create!(
    event_name: "TEXAN GAME",
    location: "Houston, Texas",
    zipcode: "77054",
    date: "December 31st, 2017",
    teams: "Houston Texans vs Indianapolis Colts"
)
Event.create!(
    event_name: "GIANTS GAME",
    location: "East Rutherford, New Jersey",
    zipcode: "07073",
    date: "November 19th, 2017",
    teams: "Kansas City Cheifs vs New York Giants"
)
Event.create!(
    event_name: "SEAHAWKS GAME",
    location: "Seattle, Washington",
    zipcode: "98134",
    date: "November 20th, 2017",
    teams: "Atlanta Falcons vs Seattle Seahawks"
)

rise = TailgateEvent.create!(
    tailgate_name: "Rise up Birds!",
    about: "This is a great Family tailgate bring everyone!",
    cost: "10 Dollars a head for everything!",
    is_eighteen: false,
    user_id: james.id,
    event_id: falcons.id
)

dirty = TailgateEvent.create!(
    tailgate_name: "The Dirty Dozen",
    about: "Get roudy before the game! Adults only!",
    cost: " 15 Dollars a head for everything!",
    is_eighteen: true,
    user_id: trey.id,
    event_id: falcons.id
)

family = TailgateEvent.create!(
    tailgate_name: "Family hour",
    about: "Playing pitch and having fun! Lots and Lots of FOOD!!!!!!",
    cost: "  Just come along and bring a glove!",
    is_eighteen: false,
    user_id: trey.id,
    event_id: braves.id
)

bro = TailgateEvent.create!(
    tailgate_name: "Bro Down",
    about: "Serious food, Serious drinking, serious fun",
    cost: "20 dollars but the food and drink is worth it",
    is_eighteen: true,
    user_id: james.id,
    event_id: braves.id
)

TailgateMember.create!(
    user_id: james.id,
    tailgate_event_id: dirty.id
)
TailgateMember.create!(
    user_id: trey.id,
    tailgate_event_id: dirty.id
)

TailgateMember.create!(
    user_id: james.id,
    tailgate_event_id: rise.id
)
TailgateMember.create!(
    user_id: trey.id,
    tailgate_event_id: rise.id
)

TailgateMember.create!(
    user_id: james.id,
    tailgate_event_id: family.id
)
TailgateMember.create!(
    user_id: trey.id,
    tailgate_event_id: family.id
)
TailgateMember.create!(
    user_id: james.id,
    tailgate_event_id: bro.id
)
TailgateMember.create!(
    user_id: trey.id,
    tailgate_event_id: bro.id
)