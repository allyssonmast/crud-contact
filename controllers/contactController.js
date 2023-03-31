const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});


//@desc Create new contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is ", req.body);

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(500);
        throw new Error("All fields are mandatory");
    }

    const contact = await Contact.create({
        name, email, phone,user_id:req.user.id
    })

    res.status(201).json(contact);
});

//@desc Get contact
//@route PUT /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
})

//@desc Delete contact
//@route DELITE /api/contacts/:id
//@access public
const deliteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndRemove(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts")
    }
    res.status(200).json({ "message": `Delete contact for ${req.params.id}` });
})

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }


    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts")
    }

    const contactUpdate= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )

    res.status(200).json(contactUpdate);
});

module.exports = { getContacts, createContact, getContact, deliteContact, updateContact };