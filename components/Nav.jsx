import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { fetcher } from "../lib/api";
import TextField from "@mui/material/TextField";
import { setToken, unsetToken } from "../lib/auth";
import { useFetchUser, useUser } from "../lib/authContext";
import { Button, InputLabel, OutlinedInput } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Nav() {
  const { user, loading } = useFetchUser();

  const [data, setData] = useState({
    identifier: "",
    password: "",
    showPassword: false,
  });

  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const responseData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: data.identifier,
          password: data.password,
        }),
      }
    );
    if (!responseData.jwt) {
      setError(true);
    } else {
      setToken(responseData);
    }
  }

  const logout = () => {
    unsetToken();
  };

  const handleChange = (e) => {
    setError(false);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setData({
      ...data,
      showPassword: !data.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="bg-white mb-5">
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
          <Link href="/films">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl">Films</span>
            </a>
          </Link>
          <p className="w-1/8 ml-auto">Welcome {user}</p>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link href="/">
              <a className="mr-5 hover:text-gray-900">Home</a>
            </Link>
            <Link href="/films">
              <a className="mr-5 hover:text-gray-900">Films</a>
            </Link>
            {!loading &&
              (user ? (
                <Link href="/profile">
                  <a className="mr-5 hover:text-gray-900">Profile</a>
                </Link>
              ) : (
                ""
              ))}
            {!loading &&
              (user ? (
                <Button
                  size="small"
                  variant="contained"
                  type="submit"
                  onClick={logout}
                  style={{ cursor: "pointer" }}
                  sx={{
                    color: "black",
                    "&:hover": {
                      color: "white",
                    },
                  }}
                >
                  Logout
                </Button>
              ) : (
                ""
              ))}
            {!loading && !user ? (
              <>
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <TextField
                    error={error ? true : false}
                    required
                    size="small"
                    id="outlined-basic"
                    label="Username / Email"
                    variant="outlined"
                    name="identifier"
                    value={data.identifier}
                    onChange={handleChange}
                    helperText={error ? "Incorrect Email or Password." : ""}
                  />

                  <FormControl
                    size="small"
                    sx={{ width: "25ch" }}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      error={error ? true : false}
                      required
                      id="outlined-adornment-password"
                      type={data.showPassword ? "text" : "password"}
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                      sx={{ paddingLeft: "10px" }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {data.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                  <Button
                    size="small"
                    variant="contained"
                    type="submit"
                    sx={{
                      color: "black",
                      padding: 0,
                      margin: "3px",
                      "&:hover": { color: "white" },
                    }}
                  >
                    Login
                  </Button>
                </form>
                <Link href="/register">
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      marginLeft: "10px",
                      color: "black",
                      "&:hover": { color: "white" },
                    }}
                  >
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              ""
            )}
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Nav;
