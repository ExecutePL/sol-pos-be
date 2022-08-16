/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
    Box,
    Button,
    FormControl,
    InputAdornment,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import Email from "@mui/icons-material/Email";
import Lock from "@mui/icons-material/Lock";
import { MouseEventHandler, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../api/gql/mutations/user/loginUser";
import { Loading } from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { LOGIN_USER_BY_WORKER } from "../api/gql/mutations/user/loginUserByWorker";
import { DataArray } from "@mui/icons-material";

interface LoginProps {
    handleSingupClick: MouseEventHandler;
}

export const Login = ({ handleSingupClick }: LoginProps) => {
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [isLoginError, setIsLoginError] = useState<boolean>(false);
    const navigate = useNavigate();
    // const waiterToken = localStorage.getItem("waiterToken");
    // const [isWaiter, setIsWaiter] = useState(false);
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        onCompleted: (data) => {
            if (!data) return;
            const loginToken = data.loginUser;
            localStorage.setItem("login", loginToken);
            setIsLoginError(false);
            navigate("/tables");
        },
        onError: () => setIsLoginError(true),
    });

    // const [loginUserByWorker, { loading: loginUserByWorkerLoading }] =
    //     useMutation(LOGIN_USER_BY_WORKER);

    const handleLoginClick = () => {
        loginUser({ variables: { email, password } });
    };

    // useEffect(() => {
    //     if (waiterToken !== "undefined" && waiterToken !== null) {
    //         setIsWaiter(true);
    //         console.log(waiterToken);
    //         loginUserByWorker({
    //             variables: { remember_token: waiterToken },
    //             onCompleted: (data) => {
    //                 const loginToken = data.loginUser;
    //                 localStorage.setItem("login", loginToken);
    //                 setIsLoginError(false);
    //                 navigate("/tables");
    //             },
    //             onError: () => {
    //                 localStorage.removeItem("waiterToken");
    //                 navigate("/");
    //             },
    //         });
    //     }
    //     setIsWaiter(false);
    // }, []);

    return (
        <Box
            css={css`
                max-width: 420px;
                width: 100%;
                border: 1px solid #fff;
                padding: 30px;
                margin: 5vh auto 0;
                background: rgba(255, 255, 255, 0.4);
            `}
        >
            <Typography
                variant="h1"
                css={css`
                    text-align: center;
                    font-size: 40px;
                    font-weight: 700;
                    padding-bottom: 40px;
                    color: rgba(0, 0, 0, 0.7);
                `}
            >
                Login
            </Typography>

            <FormControl
                css={css`
                    display: grid;
                    gap: 25px;
                `}
            >
                <TextField
                    id="email"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email />
                            </InputAdornment>
                        ),
                    }}
                    placeholder="Email Adress"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="password"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        ),
                    }}
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isLoginError && (
                    <Typography
                        css={css`
                            color: red;
                            font-size: 11.5px;
                        `}
                    >
                        The user name or password are incorrect. This is easily
                        corrected by typing the correct user name and password.
                    </Typography>
                )}
                <Link
                    href="#"
                    css={css`
                        text-decoration: none;
                        color: #8968fc;
                    `}
                >
                    Forgot password?
                </Link>
                <Button
                    variant="contained"
                    size="large"
                    css={css`
                        background-color: #8968fc;
                        color: #fff;
                    `}
                    onClick={handleLoginClick}
                >
                    Login
                </Button>
                <Typography>
                    Not yet account?{" "}
                    <Button
                        href="#"
                        css={css`
                            text-decoration: none;
                            line-height: 1;
                            color: #8968fc;
                        `}
                        onClick={handleSingupClick}
                    >
                        Singup now!
                    </Button>
                </Typography>
            </FormControl>

            {/* {isWaiter && <Loading />} */}
            {loading && <Loading />}
        </Box>
    );
};
