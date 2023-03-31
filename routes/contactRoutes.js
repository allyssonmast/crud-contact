const express = require("express");
const router = express.Router();
const { getContacts, createContact, getContact, updateContact, deliteContact } = require("../controllers/contactController");
const validateToken = require("../middleware/validateToken");


router.use(validateToken)

router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deliteContact);



module.exports = router;
