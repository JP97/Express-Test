const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid")


// get: /api/members
// sends all members as json
router.get('/', (req, res) =>{
    res.json(members)
});

// get: /api/members/:id
// sends one member as json with som condition
router.get('/:id', (req, res) => {
    const found = members.some(members => members.id === parseInt(req.params.id));

    if(found){
        return res.json(members.find(member => member.id === parseInt(req.params.id)));
    }
    res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    // res.send(req.params);
});

// put: /api/members
router.post("/", (req, res) =>{
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email){
       return res.status(400).json({msg: "please include a name and email"});
    }


    // here would be something with sequelize or someother ORM 
    members.push(newMember);
    res.json(members);
});

// put: /api/members/:id
router.put("/:id", (req, res) => {
    const found = members.some(members => members.id === parseInt(req.params.id));

    if(found){
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                // tenary operator to check if value is send
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                
                res.json({msg: "Membet updated", member});
            }
        })
    }
    res.status(400).json({msg: `No member with the id of ${req.params.id}`});
});

// delete: /api/members/:id
router.delete("/:id", (req, res) =>{
    const found = members.some(members => members.id === parseInt(req.params.id));

    if(found){
        return res.json({msg: "Member got deleted",members: members.filter(member => member.id !== parseInt(req.params.id))});
    }
    res.status(400).json({msg: `No member with the id of ${req.params.id}`});
});

module.exports = router;