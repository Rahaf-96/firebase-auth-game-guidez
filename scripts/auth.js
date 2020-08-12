// listen for auth state changes
auth.onAuthStateChanged((user) => {
  if (user) {
    // get data
    db.collection('/guides')
      .get()
      .then((snapshot) => {
        setupGuides(snapshot.docs);
      });
  } else {
    setupGuides([]);
  }
});

// sign up
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(() => {
    // close the sign up modal and reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

//log out
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// log in
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email, password).then(() => {
    // close the login modal and reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
