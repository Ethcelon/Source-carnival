/*
 * Express Router for serving the templates
 * Team pclubGU
 * The MIT License
 */
var http = require('http'),
    express = require('express'),
    session = require('express-session'),
    fs = require('fs'),
    db = require('./scripts/db'),
    flash = require('connect-flash'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

function isLoggedin(req, res, next) {
        if(req.isAuthenticated()) {
                return next();
        }
        res.redirect('/');
}

module.exports.app = function() {
        var port = process.env.PORT || 8000;
        var app = express();
        var router = express.Router();
        var errorPage = fs.readFileSync("404.html", "UTF-8");

        app.use(express.static('assets'));
        app.set('title', "GUSAC Carnival 4");
        app.set('view engine', 'ejs');
        app.use(session({
                secret : 'gusac123!@#',
                resave : true,
                saveUninitialized : true
        }));
        app.use(cookieParser());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(flash());

        router.get('/', function(req, res) {
                res.render('index.ejs');
        });

        router.get('/about', function(req, res) {
                res.render('about.ejs');
        });

        router.get('/contact', function(req, res) {
                res.render('contact.ejs');
        });

        router.post('/controller/contact', function(req, res) {
                var name = req.body.name,
                    phone = req.body.phone,
                    email = req.body.email,
                    query = req.body.query;
        });

        router.get('/events', function(req, res) {
                res.render('events.ejs');
        });

        router.get('/events/:name', function(req, res) {
                var page = req.params.name;
                if(page == "arqueria") {
                    res.render('eventcontent', {
                        title: "Arqueria | Carnival",
                        eventname: "Arqueria",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Participants must prepare a bot (wired or wireless) which must be capable of moving on a metal rod and shooting an ordinary table tennis ball by aiming the bull's eye. Competition consists of 2 rounds.",
                        description: "ARQUERIA!!!!!! Are u ready for Spanish archery? Not like other archeries,let’s be technical and automotive. We would like a BOT to aim the target.Its purpose is to have an unmanned hunting source at wilder times.",
                        probstmt: "Participants must prepare a bot (wired or wireless) which must be capable of moving on a metal rod and shooting an ordinary ping pong ball aiming the bull's eye. The event consists of 3 rounds",
                        rules: "1) 15 points will be reduced each time the bot falls down. 2) 20 points will be reduced for each restart (if requested by the participants). 3) Only a maximum of 2 restarts are allowed. 4) Radius of ball to be shot is 2cm. 5) Damaging the ARENA will lead to elimination.",
                        judging: "30 Points will be awarded for crossing the threshold point. End point of the bot must cross the threshold point to get all the 30points. Points for shooting the ping pong ball at the bull’s eye depends upon the point at which the ball is shot at target sheet as mentioned in the diagram.",
                        rounds: "Round1: The Bot must move on the horizontal metal rod which is supported by two pillars and it is marked with a threshold point. The threshold is after 40 centimeters from the initial point of the bot. When it reaches the threshold it should stop and shoot balls (ordinary ping pong balls) targeting a bull's eye. Round 2: In this round, the bot must move on a rod which is inclined at an angle of 30 degrees form the horizontal line. After reaching a threshold point it should fire balls (ordinary ping pong balls) on the bull’s eye. Round 3 : This round is the same as Round 2 except that the Bot must hit the bull's eye which is rotating around its own axis at the rate of 10 rotations per minute.As we know that the bull’s eye is a thin cardboard sheet of two sides. One side consists of bull’s eye and the other side is plain. The bot should not shoot on the plain side. If the ball strikes the plain side then negative points will be given. Assume that the horizontal rod is on x-axis and the vertical rod is on y-axis. Then the bull’s eye is on the z-axis i.e, into the sheet of paper",
                        specifications: "The distance between the two vertical rods is 2 meters. The rod is of 2 inch in diameter. Distance between rod and the ground is 1 meter. Distance between rod and the center of bulls eye is 0.25 meter.(in y direction). Distance between the bulls eye and the horizontal rod in z direction is 1 meter. Bot must be less than 30cm in length, breadth and height.",
                        contact: " Gowtham Srinivas (9542945129, penjarlagowtham@gmail.com), Sarath Chandra (9704967303, krishnasarathchandra@gmail.com)",
                        further: ""
                    });
                }
                else if (page == "casestudy") {
                    res.render('eventcontent', {
                        title: "Case Study | Carnival",
                        eventname: "Case Study",
                        imgname: "2.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Imagine your life without facebook, YouTube or Google. Hard isn’t it? The harder truth is out of 1.28 billion people in India, only 243 million people have access to internet which is less than 20% of the total population.",
                        description: "Imagine your life without facebook, YouTube or Google. Hard isn’t it? The harder truth is, out of 1.28 billion people in India, only 243 million people have access to the internet which is less than 20% of the total population. This is in stark contrast to 86% in the USA and 89% in the UK. As more and more companies are turn to digitization of their markets and services, people in rural India still travel miles to gain access to the internet. Do you think the idea of Modi’s government to provide high speed internet connectivity to all rural areas in India can be realized by 2019? Don’t you want to see a DIGITAL INDIA? This event aims to involve students from diverse fields to come up with ideas on tackling this problem.",
                        probstmt: "The team should submit an abstract on the given topic or as guided by the Event Co-ordinators",
                        rules: "Teams can have a maximum of 3 members. All the members need to participate in the presentation equally.",
                        judging: "The abstract will be shortlisted purely on the basis of feasibility of the solutions and the extent of impact on the society. The decisions made by the judges will be final and irrevokable. In case of a clash between two ideas, public opinion will be considered.",
                        rounds: "Round 1: In this round, the participants are given a list of topics and asked to select a topic. They will have to submit an abstract on the selected topic. The list of topics will be disclosed two weeks prior to the date of the event. The abstracts are to be submitted online. The shortlisted candidates shall proceed to the next round held during the carnival. Round 2: The shortlisted candidates need to come with a detailed version of their abstract which will be scrutinized by the judging panel. They need to take public opinion to support their idea and state a conclusion which aptly suits the situation. Round 3: Selected candidates need to give a presentation on their solution.",
                        specifications: "",
                        contact: "Sravya (9963560718), Keerthi Kaushal (9177575776)",
                        further: ""
                    });
                }
                else if (page == "magnogenesis") {
                    res.render('eventcontent', {
                        title: "Magnogenesis | Carnival",
                        eventname: "Magnogenesis",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Magnetic levitation, maglev or magnetic method by which an object is suspended with no support other than magnetic fields. Magnetic force is used to counteract the effects of the gravitational and any other accelerations.",
                        description: "Magnetic levitation, maglev or magnetic method by which an object is suspended with no support other than magnetic fields. Magnetic force is used to counteract the effects of the gravitational and any other accelerations.",
                        probstmt: "1. In our event the participants should make a device which isbalanced in air by using the concept of magnetic levitation. * 2. The device should be made in such a way that the magnetic levitation can be used to create a continuous rotatory motion to thefloating part. 3. The change in flux during the rotatory motion is used to produce voltage in a copper coil which serves as the judging criteria**. 4. We will check the voltage produced at the ends of the coil using a DMM (Digital Multi Meter). *The procedure to make a magnetic levitation device is given in the following link https://www.youtube.com/watch?v=FM0c0GL9ha0 ** The voltage produced can be measured using a Digital Multi-meter. https://www.facebook.com/ncharan.sai/videos/o.426744474134669/425534517589202/?type=2&theater",
                        rules: "(1) Motors with any external aid or ready-made turbines should not be used to rotate the levitating part.(2) The number of turns in the coil, radius of the coil and position of the coil should be well planned before participating in the event.(3) The magnets used should be round shaped.(4) The number of magnets should not exceed 25 (In case of magnets with smaller diameter).",
                        judging: "In the first round filtering the participants is done on the basis of the DC and AC voltages produced at the output ends of the coil.In the second round the judgement is done based on the distance travelled by the rover. Top 20% of the round-1 will be qualified to round-2. And in the second round the device which makes the rover cover large distance is given as the winner.",
                        rounds: "In first round the dc and ac voltages obtained at the ends of the copper coil are measured. In the second round a basic rover* is connected at the output and the distance travelled by the rover is measured. *The rover is made using 1.5v basic dc motors.",
                        specifications: "(1) A basic magnetic levitation device should be made and brought by the participants. (2) The magnets used can be of any material.",
                        contact: "Aravinda Karthik (8106828753, karthik.ark4@gmail.com), Radha Rani (9553311770, radharani.b1996@gmail.com), K. Sai Chandra (8121230396, saichandra62@gmail.com)",
                        further: "In the first round the average values of dc and ac voltages respectively will be taken into consideration. In the second round an amplifier and a rectifier is provided by us. The rover will also be provided by us."
                    });
                }
                else if (page == "clashofbots") {
                    res.render('eventcontent', {
                        title: "Clash Of Bots | Carnival",
                        eventname: "Clash Of Bots",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "The theme of the event is to construct a bot which has the immense capability to destroy the enemy bot in the given arena.",
                        description: "Want to have a real experience of REAL STEEL…!!??? Want to take your bot for a real clash…???? Want to have an adrenaline rush…???? This is show time guys…!!!! Get your bots ready to roll…!! We are waiting for you at the arena, bring your bots, have a clash and become the champ!!",
                        probstmt: "The theme of the event is to construct a bot which has the immense capability to destroy the enemy bot in the arena. Basically, the event tests the efficiency and the strength of the bot to sustain in the competition. Moreover, the path for the bot to reach the arena will not be a cake walk. The path will consist of hurdles, which the bot should be able to overcome to reach the arena.",
                        rules: "GENERAL RULES:  The competition will be played on a knock-out basis consisting of 2 players (BOTS) at a time. The maximum duration for round 1 will be 5 minutes and that of round 2 will be 10 min. Any team that is not ready at the time specified will be disqualified from the competition. The machine would be checked for its safety before the competition and would be discarded if found unsafe for other participants and spectators. Judges' decision shall be treated as final and the organizers reserve the rights to change any or all of the above rules as they deem fit.  Violation of any the above rules will lead to disqualification.  Change in rules(if any), will be highlighted on the website and notified to the registered teams. Safety Rules: 1. Compliance with all event rules is mandatory. It is expected that competitors stay within the rules and procedures of their own accord and do not require constant policing. 2. If you have a robot or weapon design that does not fit within the categories set forth in these rules or is in some way ambiguous or borderline, please contact the event organizers. 3. All weapons must have a safety cover on any sharp edges",
                        judging: "1) A robot is declared victorious if its opponent is immobilized. 2) A robot will be declared immobile if it cannot display linear motion of at least one inch in a timed period of 20 seconds. A bot with one side of its drive train disabled will not be counted out if it can demonstrate some degree of controlled movement. 3). If both robots survive the three minutes, the robot with the higher hit points wins. 4.) The winner moves on and the loser is eliminated from the tournament.",
                        rounds: "The event consists of two rounds: ROUND 1: This round will be the eliminating round. The bot should clear some basic obstacles before entering the Main Arena. After entering the Arena both the Bots will clash. There will be a specific time limit for the Clash. The winners will move to the next round. ROUND 2: This is the deciding round. The bots are directly placed in the fighting zone. At the arena, the bots will be having sufficient time for the clash. The winner will be based on the time factor and the clash. Arena will be disclosed at the time of this round NOTE: Both rounds will be having different Arenas. Team Specification: A team may consist of a maximum of 4 participants.",
                        specifications: "Dimensions and Fabrications:  The bot should fit in a box of dimension 40cm x 40 cm x 40 cm (lxbxh) with all mechanisms fully executing motions. Length and width is measured to the extremities of the Robot, i.e. includes any overhanging bodywork, weaponry or protrusions. The external device used to control the bot is not included in the size constraint. Mobility: All bots must have easily visible and controlled mobility in order to compete. Methods of mobility include: Rolling (wheels, tracks or the whole robot). Jumping and hopping is not allowed. Flying (using air foil, helium balloons, ornithopters, etc.) is not allowed. Robot Control Requirements: If the bot is wired then the wire should remain slack under all circumstances during the competition. All the wires coming out of the bot should be stacked as a single unit. The wires should be properly insulated. Teams are suggested to use only rated wires such as ISI marked. Loose connections or improper wiring may lead to direct disqualification even before the event.If the bot is controlled wirelessly, the bot must at least have a four frequency remote control circuit or two dual control circuits which may be interchanged before the start of the race to avoid frequency interference with other teams. Cases of any interference in the wireless systems will not be considered forrematch. Remote control systems from toys may be used. Remote control systems available in the market may also be used. Battery and POWER: The machine can be powered electrically only. Batteries must be sealed and immobilized- electrolyte types (such as Li-ion, NiCd, NiMH or dry cells). Working voltages must not exceed 24V DC (mean voltage) at any point of time. All power connections must be of an adequate grade and adequately insulated. Cables must be routed to minimize the chances of being cut. All efforts must be made to protect battery terminals from a direct shot and causing a battery fire, failure to do so will cause direct disqualification. Motors: The robot should move as fast as possible around the arena with the help of motors. DC motors and stepper motors (12V-24V) can be used as per the design of bots",
                        contact: "Rakesh Inty (9848236975, rakeshinty@yahoo.com), Vishnu Varma Pusapati (8374729000,vishnuvarma5427@gmail.com)",
                        further: "VIDEO LINKS: https://www.youtube.com/watch?v=uBRzHZlQUkU, https://www.youtube.com/watch?v=olQ4FkkguLM, https://www.youtube.com/watch?v=9aTY0TcRoiE"
                    });
                }
                else if (page == "extremeadv") {
                    res.render('eventcontent', {
                        title: "Extreme Adventures | Carnival",
                        eventname: "Extreme Adventures",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Build a bot that is capable of traversing a grid and passing through different stages.The bot has to traverse a grid and should be able to pass through different stages placed randomly.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "jury") {
                    res.render('eventcontent', {
                        title: "You the Jury | Carnival",
                        eventname: "You the Jury",
                        imgname: "6.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Its Judgment time. Put your legal knowledge and analytical skills to test and deliver justice to your clients. Solve the given case within the stipulated time and present your arguments to justify your points.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "killerquest") {
                    res.render('eventcontent', {
                        title: "Killer Quest | Carnival",
                        eventname: "Killer Quest",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Step into the shoes of a private detective and solve puzzling cases Hunt down clues and catch the quest Hone your detective skills..!!!",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "pharmascruto") {
                    res.render('eventcontent', {
                        title: "Pharmascruto | Carnival",
                        eventname: "Pharmascruto",
                        imgname: "8.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Gear up for one of the most awaited and brain storming events of GUSAC Carnival V.4.0. Get ready to tickle your nerves and dive into your world of pharmacy.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "60secs") {
                    res.render('eventcontent', {
                        title: "60 Seconds to Fame | Carnival",
                        eventname: "60 Seconds to Fame",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Participants should pull the crowd and judges and impress them.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "cstrike") {
                    res.render('eventcontent', {
                        title: "Counter Strike | Carnival",
                        eventname: "Counter Strike",
                        imgname: "10.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Get ready to wake the gamer in you! Prove your combat skills head on in Counter Strike.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "fifa") {
                    res.render('eventcontent', {
                        title: "Fifa | Carnival",
                        eventname: "Fifa",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Are you a football freak???.....Are you good at it???......Then it’s time to showcase your FIFA skills on a head on match.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "steeryouway") {
                    res.render('eventcontent', {
                        title: "Steer Your Way | Carnival",
                        eventname: "Steer Your Way",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "The game is based on the game of steady hands. There will be a specially equipped rover provided and the participant is supposed to guide the rover along the length of the wire without touching the ring attached to the rover.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "Jenga") {
                    res.render('eventcontent', {
                        title: "Jenga | Carnival",
                        eventname: "Jenga",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Blocks are arranged in tower form. Participants should remove each one block from the tower and place in top of tower such that structure should not fall.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "roborun") {
                    res.render('eventcontent', {
                        title: "Robo Run | Carnival",
                        eventname: "Robo Run",
                        imgname: "14.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "An autonomous robot starting from the point marked on arena should reach  the end point tracing the path.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "civilstructures") {
                    res.render('eventcontent', {
                        title: "Civil Structures | Carnival",
                        eventname: "Civil Structures",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "The participants need to construct an arch with supports using bricks and sand only instead of using concrete and steel. The arch constructed should be capable of bearing the weights that will be placed on it. A team of 3 participants will be allowed to peform the event.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "wargames") {
                    res.render('eventcontent', {
                        title: "War Games | Carnival",
                        eventname: "War Games",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Did you watch die hard 4, wargames or the matrix because you couldn't get enough? Does mr. robot keep you awake all night? Do you look in the source code for clues? This event is for you! All you have to do is play the games to win.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "enigma") {
                    res.render('eventcontent', {
                        title: "Enigma | Carnival",
                        eventname: "Enigma",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "An Enigma machine was a series of electro-mechanical rotor cipher machines developed and used in the early to early-mid twentieth century for commercial and military usage.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "magnetron") {
                    res.render('eventcontent', {
                        title: "Magnetron | Carnival",
                        eventname: "Magnetron",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Magnetron is based on the principle of electromagnetism. A rover(bot) is attached with an electromagnet to its arm which should be capable of displacing any kind of small ferric substances (pins, nails, screws) from the given place to the destination with the help of magnetising and demagnetising the electromagnet as per the requirement.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "riptide") {
                    res.render('eventcontent', {
                        title: "Riptide | Carnival",
                        eventname: "Riptide",
                        imgname: "19.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "The participants are given a particular task in each round. They are to carry out the task inthe most simplest, yet efficient manner. The difficulty level of the task increases as they advance into the next rounds.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "brainiac") {
                    res.render('eventcontent', {
                        title: "Brainiac | Carnival",
                        eventname: "Brainiac",
                        imgname: "20.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "This event is all about your common sense and presence of mind. It is a non-technical event and the Event consists of three rounds. These rounds test your ability to solve simple conundrums and general situations.  Each team should consist of 2 or 3 members.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "treasurehunt") {
                    res.render('eventcontent', {
                        title: "Treasure Hunt | Carnival",
                        eventname: "Treasure Hunt",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Treasure Hunt  is all about finding your milestones for your destination. This is an amusement oriented hunt with an added flavor of thrill and suspense.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "sciencequiz") {
                    res.render('eventcontent', {
                        title: "Science Quiz | Carnival",
                        eventname: "Science Quiz",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "As today’s world is dependent on science and technology,we as  budding  engineers of India  must know the basic scientific theories so as to improve the present day technologies to a higher level thus developing  India to  a “scientific India.”",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "digitalkab") {
                    res.render('eventcontent', {
                        title: "Digital Kabbadi | Carnival",
                        eventname: "Digital Kabbadi",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Participants must prepare a bot (wired or wireless) which must be capable of moving on a metal rod and shooting an ordinary table tennis ball by aiming the bull's eye. Competition consists of 2 rounds",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "waterrock") {
                    res.render('eventcontent', {
                        title: "Water Rocketary | Carnival",
                        eventname: "Water Rocketary",
                        imgname: "24.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Design and construct a water propelled rocket pressurized with air to compete against different constraints in separate rounds.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "electron") {
                    res.render('eventcontent', {
                        title: "Electron | Carnival",
                        eventname: "Electron",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Clear the tasks assigned in each round and present the required outputs of your circuits to advance to the next level.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "paperprep") {
                    res.render('eventcontent', {
                        title: "Paper Presentation | Carnival",
                        eventname: "Paper Presentation",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "This event aims at professional study of concept to ideate for the solution of global challenges and to sway out the information of newborn technology.Participants can present their views on a wide range of topics from international issues to the latest technology.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "canvasideas") {
                    res.render('eventcontent', {
                        title: "Canvas of Ideas | Carnival",
                        eventname: "Canvas of Ideas",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Products are of various types some are helpful and some can be more helpful. The main aim of this event is to enable to participant to design a product to the given requirements. Be creative and think outside the box!",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
        });

        router.get('/register', function(req, res) {
                res.render('register.ejs');
        });

        router.post('/controller/register', function(req, res) {
               db.accAdd({
                       name : req.body['inputName'],
                       user : req.body['inputEmail'],
                       pass : req.body['inputPassword'],
                       email : req.body['inputEmail'],
                       phone : req.body['inputPhoneNumber'],
                       state: req.body['stateName'],
                       college : req.body['collegeName'],
                       dept : req.body['deptName']
               }, function(err) {
                       if(err) {
                               res.status(400).send(err);
                       }
                       else {
                               res.status(200).send('it is done');
                       }
               });
        });

        router.get('/team', function(req, res) {
                res.render('team.ejs');
        });

        router.get('/[0-9]', function(req, res) {
                res.redirect(errorPage);
        });

        router.get('*', function(req, res) {
                var match = 'views/' + req.params[0] + '.ejs';
                fs.exists(match, function(present) {
                        if(present) {
                                fs.readFile(match, function(err, data) {
                                        if(err) {
                                                res.send(errorPage.toStrng(), "UTF-8");
                                        }
                                        else {
                                                res.end(data, "UTF-8");
                                        }
                                });
                        }
                        else {
                                res.end(errorPage.toString(), "UTF-8");
                        }
                });
        });

        app.use('/', router);

        http.createServer(app).listen(port, function() {
                console.log("Front End Application Server started");
        });
}
