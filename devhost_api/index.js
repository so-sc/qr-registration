const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require('passport');
const Razorpay = require('razorpay');
const User = require('./models/user.js');
require('dotenv').config();
require('./auth.js');
require('./dbInit');
const cors = require('cors');
const app = express();
app.enable('trust proxy');
app.use(express.static('public'));
mongoose.connect(process.env.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB cluster'))
    .catch(err => console.error('Could not connect to MongoDB cluster', err));
app.use(session({
    secret: process.env.sessionSec,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.mongoUri }),
    cookie: {
        httpOnly: true,
    }
}));
const {PORT} = process.env;
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: `${process.env.FRONTHOST}`,
    credentials: true,
}));
const razorpayInstance = new Razorpay({
    key_id: process.env.razorID,
    key_secret: process.env.razorSecret
});
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}
app.get('/', (req, res) => {
    res.send("Devhost API is running");
});
app.get('/testend', (req, res) => {
    res.json("I'm Up");
});
const priceMap = {
    "101": 149, "102": 129, "103": 159, "104": 179,
    "105": 149, "106": 139, "107": 159, "108": 129,
    "109": 159, "110": 169
};
app.get('/update-details', isLoggedIn, (req, res) => {
    res.json("hello, " + req.user.username);
    console.log(req.isAuthenticated());
});
app.get('/google-callback', passport.authenticate('google', {
    successRedirect: `${process.env.FRONTHOST}/register`,
    failureRedirect: '/auth/failed'
}));
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
app.get('/auth/failed', (req, res) => {
    res.send("Couldn't Authenticate");
});
app.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

app.post('/createOrder', isLoggedIn, (req, res) => {
    const { amount, currency, receipt, notes, events } = req.body;
    const rcur = findCur(events);
    razorpayInstance.orders.create({ amount: rcur, currency, receipt, notes },
        (err, order) => {
            if (!err) {
                order.events = events;
                console.log(order);
                res.json(order);
            } else {
                res.send(err);
            }
        });
});

app.post('/details_update', isLoggedIn, (req, res) => {
    updet(req.user, req.body);
    console.log(req.body);
    res.json({ added: "ok" });
});

app.post('/socials_upd', isLoggedIn, (req, res) => {
    updet2(req.user, req.body);
    console.log(req.body);
    res.json({ added: "ok" });
});

app.post('/verPayment', isLoggedIn, (req, res) => {
    console.log(req.user);
    const { payment_id, order_id, signature, eventsDet } = req.body;
    const crypto = require('crypto');
    const eSig = crypto.createHmac('sha256', process.env.razorSecret).update(order_id + '|' + payment_id).digest('hex');
    console.log(eSig + " " + signature);
    if (eSig === signature) {
        attachEvents(req.user, eventsDet);
        res.status(200).json({ success: true, message: 'Payment verification successful' });
    } else {
        res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/check-auth', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ authenticated: true, user: req.user });
    } else {
        res.status(401).json({ authenticated: false });
    }
});

app.get('/viewprofile', async (req, res) => {
    const gid = req.query.gid;
    console.log(gid);
    if (!gid) return res.status(404).send('Not Found');

    const user = await User.findOne({ gID: gid + "" });
    if (!user) { return res.status(404).json({ message: "Unknown" }); }
    console.log(user);

    const resbody = {
        message: "gotcha",
        username: user.username,
        college: user.college,
        phone: user.phone,
        email: user.email,
        year: user.year,
        events: user.events,
        branch: user.branch,
        ldn: user.ldn,
        portf: user.portf,
        git: user.git,
        insta: user.insta,
        events: user.events,
        interests: user.interests,
        gId:user.gID
    };

    console.log(resbody);
    return res.json(resbody);
});

const attachEvents = async (luser, events) => {
    console.log(events)
    const user = await User.findOne({ gID: luser.gID });
    const eid = events.map(event => event.event_id);
    user.events = [...new Set([...user.events, ...eid])];
    user.eventDet.push(...events);
    await user.save();
    console.log(user);
};

const findCur = (events) => {
    var cur = 5;
    for (var i = 0; i < events.length; i++) if (priceMap[events[i]] != undefined) cur += priceMap[events[i]];
    return "" + (cur * 100);
};

const updet = async (luser, body) => {
    const user = await User.findOne({ gID: luser.gID });
    user.name = body.name;
    user.email = body.email;
    user.college = body.college;
    user.phone = body.phone;
    user.year = body.year;
    user.branch = body.branch;
    await user.save();
};

const updet2 = async (luser, body) => {
    const user = await User.findOne({ gID: luser.gID });
    if (body.git) user.git = body.git;
    if (body.link) user.ldn = body.link;
    if (body.insta) user.insta = body.insta;
    if (body.red) user.portf = body.red;
    await user.save();
};
