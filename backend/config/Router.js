//Home page
router.get("/", (req, res) => { res.render("index") })


//Employee Page
router.get("/employee", EmployeeController.DisplayUser);