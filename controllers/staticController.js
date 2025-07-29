exports.handlerstatic = (req, res) => {
  console.log("✅ Rendering signup.ejs in handlerstatic");
  res.render("signup"); // signup.ejs must exist inside views/
};
