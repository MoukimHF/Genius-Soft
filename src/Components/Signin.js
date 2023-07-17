import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/FirebaseAuth";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useAuthentification } from '../hooks/auth'
import { useFirebase } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(/images/login.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#FFAF20",
  },
}));

export default function LoginPage({ location, history }) {
  const classes = useStyles();
  const { uiConfig, isAuthenticated } = useAuthentification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState([]);
  const firebase = useFirebase();

  const login = (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess([]);
    firebase
      .login({ email, password })
      .then((u) => {
        history.push("experiences/pleW5Msa2g5dwjUgZLa7");
      })
      .catch((e) => {
        let err = "";
        switch (e.code) {
          case "auth/user-not-found":
            err = "There is no user with this email";
            break;
          case "auth/invalid-email":
            err = "Your email is badly formated";
            break;
          case "auth/wrong-password":
            err = "please check your password";
            break;
          default:
            err = e.message;
        }
        setErrors([err]);
      });
  };

  const forgetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setErrors([]);
        setSuccess([
          "verification mail has been sent please check your mail for more instructions",
        ]);
      })
      .catch((error) => {
        setSuccess([]);
        setErrors(["There is no user corresponding to this email address"]);
      });
  };
  function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;

    if (errors.length > 0) {
      errorsDisplay = (
        <div>
          <h2 className="validation--errors--label">OOps !</h2>
          <div className="validation-errors">
            <ul>
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    if (success.length > 0) {
      errorsDisplay = (
        <div>
          <h2 className="validation--success--label">Hurray !</h2>
          <div className="validation-success">
            <ul>
              {success.map((suck, i) => (
                <li key={i}>{suck}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    return errorsDisplay;
  }
//   if (isAuthenticated) {
//     return <Redirect to={location.state?.from || "/"}></Redirect>;
//   }
  return (
    // <Layout withoutHeader={true}>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>

              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
                style={{ width: "-webkit-fill-available" }}
              />
              <ErrorsDisplay errors={errors} />
              <form className={classes.form} noValidate onSubmit={login}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  style={{ color: "white" }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      to="#"
                      onClick={forgetPassword}
                      variant="body2"
                      style={{
                        color: "rgb(207, 145, 31)",
                        fontSize: "0.875rem",
                        fontFamily: "Roboto",
                        fontWeight: "400",
                        lineHeight: "1.43",
                        letterSpacing: "0.01071em",
                      }}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      to="/signup"
                      variant="body2"
                      style={{
                        color: "rgb(207, 145, 31)",
                        fontSize: "0.875rem",
                        fontFamily: "Roboto",
                        fontWeight: "400",
                        lineHeight: "1.43",
                        letterSpacing: "0.01071em",
                      }}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                {/* <Box mt={5}>
                  <Copyright />
                </Box> */}
              </form>
            </div>
          </Grid>
        </Grid>
  );
}
